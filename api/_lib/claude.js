// Thin wrapper around the Anthropic SDK for "give me JSON that matches this schema".
//
// Notes (current Claude API conventions):
//  - Structured outputs via output_config.format. Forced tool_choice is rejected
//    by the current Opus models, so it is not used.
//  - Streaming + finalMessage() so long outputs never hit HTTP timeouts.
//  - effort is set explicitly (the default for this model is "medium").
//  - stop_reason "refusal" / "max_tokens" are handled before reading content.
//  - server-side refusal fallback is on by default; set CLAUDE_FALLBACKS=off to disable.

import Anthropic from "@anthropic-ai/sdk";
import { UserError } from "./documents.js";

export const DEFAULT_MODEL = "claude-opus-5-5";

// `options` exists for tests (inject fetch / disable retries).
export function createRunner(env = process.env, options = {}) {
  return async function runStructured({ system, content, schema, maxTokens = 16000 }) {
    if (!env.ANTHROPIC_API_KEY) {
      throw new UserError("The Claude API key is not configured on the server (ANTHROPIC_API_KEY).", 500);
    }
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, ...options });
    const useFallbacks = env.CLAUDE_FALLBACKS !== "off";

    const params = {
      model: env.CLAUDE_MODEL || DEFAULT_MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content }],
      output_config: {
        effort: env.CLAUDE_EFFORT || "medium",
        format: { type: "json_schema", schema },
      },
    };
    if (useFallbacks) {
      params.betas = ["server-side-fallback-2026-07-01"];
      params.fallbacks = "default";
    }

    let message;
    try {
      const stream = useFallbacks ? client.beta.messages.stream(params) : client.messages.stream(params);
      message = await stream.finalMessage();
    } catch (err) {
      if (err instanceof Anthropic.AuthenticationError) throw new UserError("The Claude API key was rejected.", 500);
      if (err instanceof Anthropic.RateLimitError) throw new UserError("Claude is rate-limited right now. Please try again in a minute.", 429);
      if (err instanceof Anthropic.BadRequestError) throw new UserError(`Claude rejected the request: ${err.message}`, 502);
      if (err instanceof Anthropic.APIError) throw new UserError("Claude is temporarily unavailable. Please try again.", 502);
      throw err;
    }

    if (message.stop_reason === "refusal") {
      throw new UserError("Claude declined to process these materials. Try rephrasing your instructions or using different documents.", 422);
    }
    if (message.stop_reason === "max_tokens") {
      throw new UserError("The draft was too long and got cut off. Try asking for a shorter result or fewer tabs.", 502);
    }

    const text = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new UserError("Claude returned an unreadable answer. Please try again.", 502);
    }
    return { json, usage: message.usage, model: message.model };
  };
}
