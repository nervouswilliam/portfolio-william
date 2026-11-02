// Exercises the real Anthropic SDK against a fake network layer, so we can inspect
// the exact HTTP request it would send and the way streamed answers are parsed.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createRunner, DEFAULT_MODEL } from "../claude.js";
import { UserError } from "../documents.js";

const schema = { type: "object", additionalProperties: false, required: ["a"], properties: { a: { type: "string" } } };
const baseReq = { system: "sys", content: [{ type: "text", text: "hi" }], schema };

function sse(events) {
  const body = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

function streamOf(text, stopReason = "end_turn", model = "claude-opus-5-5") {
  return sse([
    { type: "message_start", message: { id: "msg_1", type: "message", role: "assistant", model, content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 12, output_tokens: 1 } } },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: text.slice(0, 5) } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: text.slice(5) } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: stopReason, stop_sequence: null }, usage: { output_tokens: 7 } },
    { type: "message_stop" },
  ]);
}

function fakeFetch(respond) {
  const seen = [];
  const fn = async (url, init) => {
    seen.push({ url: String(url), headers: Object.fromEntries(new Headers(init.headers)), body: JSON.parse(init.body) });
    return respond(seen.length);
  };
  fn.seen = seen;
  return fn;
}

const env = { ANTHROPIC_API_KEY: "sk-test" };

test("sends a well-formed structured-output request with fallbacks enabled by default", async () => {
  const f = fakeFetch(() => streamOf('{"a":"hello"}'));
  const run = createRunner(env, { fetch: f, maxRetries: 0 });
  const out = await run(baseReq);

  assert.deepEqual(out.json, { a: "hello" });
  assert.deepEqual(out.usage.input_tokens, 12);
  assert.equal(out.model, "claude-opus-5-5");

  const { url, headers, body } = f.seen[0];
  assert.equal(url, "https://api.anthropic.com/v1/messages");
  assert.match(headers["anthropic-beta"], /server-side-fallback-2026-07-01/);
  assert.equal(headers.authorization, "Bearer sk-test");
  assert.equal(body.model, DEFAULT_MODEL);
  assert.equal(body.stream, true);
  assert.equal(body.fallbacks, "default");
  assert.equal(body.system, "sys");
  assert.deepEqual(body.output_config, { effort: "medium", format: { type: "json_schema", schema } });
  // Things the current Opus models reject must not be sent.
  for (const banned of ["tool_choice", "thinking", "temperature", "top_p", "top_k", "betas"]) {
    assert.ok(!(banned in body), `${banned} must not be sent`);
  }
});

test("CLAUDE_FALLBACKS=off uses the plain endpoint without the beta", async () => {
  const f = fakeFetch(() => streamOf('{"a":"x"}'));
  await createRunner({ ...env, CLAUDE_FALLBACKS: "off", CLAUDE_MODEL: "claude-sonnet-5-5", CLAUDE_EFFORT: "low" }, { fetch: f, maxRetries: 0 })(baseReq);
  const { url, headers, body } = f.seen[0];
    assert.ok(!("anthropic-beta" in headers) || !/fallback/.test(headers["anthropic-beta"]));
  assert.ok(!("fallbacks" in body));
  assert.equal(body.model, "claude-sonnet-5-5");
  assert.equal(body.output_config.effort, "low");
});

test("refusals and truncated output become clear errors instead of bad data", async () => {
  await assert.rejects(
    () => createRunner(env, { fetch: fakeFetch(() => streamOf("", "refusal")), maxRetries: 0 })(baseReq),
    (e) => e instanceof UserError && e.status === 422 && /declined/.test(e.message)
  );
  await assert.rejects(
    () => createRunner(env, { fetch: fakeFetch(() => streamOf('{"a":"cut', "max_tokens")), maxRetries: 0 })(baseReq),
    (e) => e instanceof UserError && e.status === 502 && /cut off/.test(e.message)
  );
  await assert.rejects(
    () => createRunner(env, { fetch: fakeFetch(() => streamOf("not json at all")), maxRetries: 0 })(baseReq),
    (e) => e instanceof UserError && /unreadable/.test(e.message)
  );
});

test("API failures are translated into safe messages", async () => {
  const err = (status, type) => () => new Response(JSON.stringify({ type: "error", error: { type, message: "detail" } }), { status, headers: { "content-type": "application/json" } });
  const cases = [
    [401, "authentication_error", 500, /key was rejected/],
    [429, "rate_limit_error", 429, /rate-limited/],
    [400, "invalid_request_error", 502, /rejected the request/],
    [500, "api_error", 502, /temporarily unavailable/],
  ];
  for (const [status, type, expected, re] of cases) {
    await assert.rejects(
      () => createRunner(env, { fetch: fakeFetch(err(status, type)), maxRetries: 0 })(baseReq),
      (e) => e instanceof UserError && e.status === expected && re.test(e.message),
      `${status}`
    );
  }
});

test("a missing API key is reported without calling the network", async () => {
  const f = fakeFetch(() => streamOf("{}"));
  await assert.rejects(() => createRunner({}, { fetch: f })(baseReq), (e) => e instanceof UserError && /not configured/.test(e.message));
  assert.equal(f.seen.length, 0);
});
