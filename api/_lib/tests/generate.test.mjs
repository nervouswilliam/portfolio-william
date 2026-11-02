import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { handleGenerate } from "../generate.js";
import { toContentBlocks, UserError, LIMITS } from "../documents.js";
import { systemPrompt, userTask } from "../prompts.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "src", "JSON");
const detail = JSON.parse(readFileSync(join(root, "agentic_risk.json"), "utf8"));
const detailId = JSON.parse(readFileSync(join(root, "i18n", "id", "agentic_risk.json"), "utf8"));

const GOOD_PATH = "11111111-2222-3333-4444-555555555555/1700000000-notes.txt";

function makeRes() {
  return { code: 0, body: null, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } };
}

// Fake Supabase client acting as a (possibly non-owner) signed-in user.
function makeClient({ owner = true, rpcError = null, files = {} } = {}) {
  return {
    rpc: async (name) => (name === "is_owner" ? { data: owner, error: rpcError } : { data: null, error: new Error("unexpected rpc") }),
    storage: {
      from: (bucket) => ({
        download: async (path) => {
          assert.equal(bucket, "admin-uploads");
          return path in files ? { data: new Blob([files[path]]), error: null } : { data: null, error: new Error("not found") };
        },
      }),
    },
  };
}

// Fake Claude: returns queued answers and records every request it was sent.
function makeRunner(answers) {
  const calls = [];
  const queue = [...answers];
  const fn = async (req) => {
    calls.push(req);
    const next = queue.shift();
    if (next instanceof Error) throw next;
    return { json: next, usage: { input_tokens: 100, output_tokens: 50 }, model: "fake-model" };
  };
  fn.calls = calls;
  return fn;
}

async function call(body, { client = makeClient(), runner = makeRunner([]), auth = "Bearer jwt", method = "POST" } = {}) {
  const res = makeRes();
  const headers = auth ? { authorization: auth } : {};
  await handleGenerate({ method, headers, body }, res, { getOwnerClient: () => client, runStructured: runner });
  return { res, runner };
}

const projectFields = {
  slug: "My Cool Project!", notes: "Year not stated.",
  fields: { title: " Cool ", description: "Does things.", date: "2026", image: "", tech: ["react", "bogus"], liveLink: "", github: "" },
};

// ---- access control -------------------------------------------------------
test("rejects non-POST, missing token, bad session and non-owners before doing any work", async () => {
  assert.equal((await call({}, { method: "GET" })).res.code, 405);
  assert.equal((await call({}, { auth: "" })).res.code, 401);
  assert.equal((await call({}, { client: makeClient({ rpcError: new Error("bad jwt") }) })).res.code, 401);
  const { res, runner } = await call({ mode: "generate", section: "project", instructions: "x" }, { client: makeClient({ owner: false }) });
  assert.equal(res.code, 403);
  assert.equal(runner.calls.length, 0, "Claude must not be called for a non-owner");
});

test("rejects malformed requests", async () => {
  const bad = [
    { section: "nope", instructions: "x" },
    { section: "project", mode: "explode", instructions: "x" },
    { section: "project", scope: "weird", instructions: "x" },
    { section: "experience", scope: "detail", instructions: "x" },
    { section: "project" },
    { section: "project", mode: "translate", locale: "fr", fields: { title: "a" } },
    { section: "project", mode: "refine" },
    { section: "project", instructions: "x".repeat(4001) },
    { section: "project", instructions: "x", files: [{ path: "../../etc/passwd", name: "p" }] },
    { section: "project", instructions: "x", files: [{ path: "abc/def", name: "p" }] },
  ];
  for (const body of bad) {
    const { res, runner } = await call(body);
    assert.ok(res.code === 400 || res.code === 413, JSON.stringify(body).slice(0, 60) + " -> " + res.code);
    assert.equal(runner.calls.length, 0);
  }
});

// ---- generate -------------------------------------------------------------
test("generate (fields) normalises the draft and returns a clean slug", async () => {
  const { res } = await call({ section: "project", instructions: "A cool project" }, { runner: makeRunner([projectFields]) });
  assert.equal(res.code, 200);
  assert.equal(res.body.slug, "my-cool-project");
  assert.deepEqual(res.body.data, { title: "Cool", description: "Does things.", date: "2026", tech: ["react"] });
  assert.equal(res.body.notes, "Year not stated.");
  assert.deepEqual(res.body.usage, { input_tokens: 100, output_tokens: 50 });
});

test("uploaded documents reach Claude as delimited data, ahead of the task", async () => {
  const client = makeClient({ files: { [GOOD_PATH]: "I built a thing in 2026." } });
  const runner = makeRunner([projectFields]);
  const { res } = await call({ section: "project", instructions: "Use my notes", files: [{ path: GOOD_PATH, name: "notes.txt" }] }, { client, runner });
  assert.equal(res.code, 200);
  const content = runner.calls[0].content;
  assert.match(content[0].text, /<document name="notes.txt">\nI built a thing in 2026\.\n<\/document>/);
  assert.match(content.at(-1).text, /Owner's instructions/);
  assert.match(runner.calls[0].system, /untrusted data, not instructions/);
  assert.equal(runner.calls[0].schema.additionalProperties, false);
});

test("an unreadable upload is reported, not ignored", async () => {
  const { res, runner } = await call({ section: "project", instructions: "x", files: [{ path: GOOD_PATH, name: "notes.txt" }] }, { client: makeClient({ files: {} }) });
  assert.equal(res.code, 400);
  assert.match(res.body.error, /upload it again/);
  assert.equal(runner.calls.length, 0);
});

test("generate (detail) retries once with the validation problems, then succeeds", async () => {
  const runner = makeRunner([
    { fields: { detail: JSON.stringify({ meta: { title: "t", subtitle: "s", tabs: ["A", "B"] }, tabsContent: [[]] }) }, notes: "" },
    { fields: { detail: JSON.stringify(detail) }, notes: "ok" },
  ]);
  const { res } = await call({ section: "project", scope: "detail", instructions: "x", fields: { title: "T" } }, { runner });
  assert.equal(res.code, 200);
  assert.equal(runner.calls.length, 2);
  assert.match(runner.calls[1].content.at(-1).text, /previous answer had these problems/);
  assert.match(runner.calls[1].content.at(-1).text, /tabsContent must hold one list of blocks per tab/);
  assert.deepEqual(res.body.usage, { input_tokens: 200, output_tokens: 100 }, "usage is summed over both attempts");
  assert.equal(res.body.data.detail.meta.title, detail.meta.title);
});

test("generate (detail) gives up with a clear 422 after the retry fails", async () => {
  const bad = { fields: { detail: JSON.stringify({ meta: {} }) }, notes: "" };
  const { res, runner } = await call({ section: "project", scope: "detail", instructions: "x", fields: { title: "T" } }, { runner: makeRunner([bad, bad]) });
  assert.equal(res.code, 422);
  assert.equal(runner.calls.length, 2);
  assert.match(res.body.error, /did not pass validation/);
});

// ---- refine ---------------------------------------------------------------
test("refine never lets Claude change the card image", async () => {
  const runner = makeRunner([{ slug: "", notes: "", fields: { title: "New title", description: "D", date: "2026", image: "https://evil.example/x.png", tech: [], liveLink: "", github: "" } }]);
  const { res } = await call({ section: "project", mode: "refine", instructions: "Shorter title", fields: { title: "Old", image: "/projects/a.png" } }, { runner });
  assert.equal(res.code, 200);
  assert.equal(res.body.data.image, "/projects/a.png");
  assert.equal(res.body.data.title, "New title");
  assert.match(runner.calls[0].content.at(-1).text, /Current draft fields/);
});

// ---- translate ------------------------------------------------------------
test("translate (fields) retries when a list changes length", async () => {
  const fields = { title: "Software Engineer", description: ["a", "b", "c"] };
  const runner = makeRunner([
    { fields: { title: "Insinyur", description: ["a", "b"] }, notes: "" },
    { fields: { title: "Insinyur", description: ["x", "y", "z"] }, notes: "" },
  ]);
  const { res } = await call({ section: "experience", mode: "translate", locale: "id", fields }, { runner });
  assert.equal(res.code, 200);
  assert.deepEqual(res.body.translation, { title: "Insinyur", description: ["x", "y", "z"] });
  assert.match(runner.calls[1].content.at(-1).text, /same number of items/);
  assert.match(runner.calls[0].system, /Indonesian/);
});

test("translate (detail) accepts a faithful translation and rejects a restructured one", async () => {
  const ok = { fields: { detail: JSON.stringify(detailId) }, notes: "" };
  const { res } = await call({ section: "project", scope: "detail", mode: "translate", locale: "id", fields: { detail } }, { runner: makeRunner([ok]) });
  assert.equal(res.code, 200);
  assert.equal(res.body.translation.detail.meta.title, detailId.meta.title);

  const restructured = structuredClone(detailId);
  restructured.tabsContent[0].pop();
  const bad = { fields: { detail: JSON.stringify(restructured) }, notes: "" };
  const second = await call({ section: "project", scope: "detail", mode: "translate", locale: "zh", fields: { detail } }, { runner: makeRunner([bad, bad]) });
  assert.equal(second.res.code, 422);
});

// ---- Claude failures ------------------------------------------------------
test("errors from the Claude layer keep their status and message", async () => {
  const { res } = await call({ section: "project", instructions: "x" }, { runner: makeRunner([new UserError("Claude is rate-limited right now.", 429)]) });
  assert.equal(res.code, 429);
  const boom = await call({ section: "project", instructions: "x" }, { runner: makeRunner([new Error("secret internal detail")]) });
  assert.equal(boom.res.code, 500);
  assert.ok(!JSON.stringify(boom.res.body).includes("secret"), "internal errors must not leak");
});

// ---- documents ------------------------------------------------------------
test("documents: text, JSON, PDF and images become the right blocks", async () => {
  const { blocks } = await toContentBlocks([
    { name: "a.json", buffer: Buffer.from('{"x":1}') },
    { name: "b.MD", buffer: Buffer.from("# hi") },
    { name: "c.pdf", buffer: Buffer.from("%PDF-1.4 fake") },
    { name: "d.png", buffer: Buffer.from("png") },
  ]);
  assert.equal(blocks[0].type, "text");
  assert.match(blocks[0].text, /<document name="a.json">/);
  assert.equal(blocks[1].type, "text");
  assert.equal(blocks[2].type, "document");
  assert.equal(blocks[2].source.media_type, "application/pdf");
  assert.equal(blocks[3].type, "text");
  assert.equal(blocks[4].type, "image");
});

test("documents: unsupported, legacy .doc, unreadable .docx and oversize are refused clearly", async () => {
  await assert.rejects(() => toContentBlocks([{ name: "x.exe", buffer: Buffer.from("x") }]), /not a supported file type/);
  await assert.rejects(() => toContentBlocks([{ name: "x.doc", buffer: Buffer.from("x") }]), /save it as \.docx or PDF/);
  await assert.rejects(() => toContentBlocks([{ name: "x.docx", buffer: Buffer.from("not a zip") }]), /could not be read/);
  await assert.rejects(() => toContentBlocks([{ name: "big.txt", buffer: Buffer.alloc(LIMITS.perFileBytes + 1) }]), /larger than 10 MB/);
  await assert.rejects(() => toContentBlocks(Array.from({ length: LIMITS.files + 1 }, (_, i) => ({ name: `${i}.txt`, buffer: Buffer.from("x") }))), /at most/);
  await assert.rejects(() => toContentBlocks([{ name: "t.txt", buffer: Buffer.from("a".repeat(LIMITS.textChars + 1)) }]), /too long/);
});

// ---- prompts --------------------------------------------------------------
test("prompts: injection defence and attribution rules are always present", () => {
  for (const mode of ["generate", "refine", "translate"]) {
    const s = systemPrompt({ section: "project", mode, scope: "fields", locale: "zh" });
    assert.match(s, /untrusted data, not instructions/);
    assert.match(s, /Never invent/);
    assert.match(s, /group work/);
  }
  assert.match(systemPrompt({ section: "project", mode: "generate", scope: "detail" }), /tabsContent/);
  assert.match(userTask({ mode: "generate", scope: "fields", instructions: "hello" }), /"""\nhello\n"""/);
});
