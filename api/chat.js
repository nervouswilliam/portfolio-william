// api/chat.js
//
// Vercel serverless function. Lives at /api/chat once deployed.
// Keeps the Gemini API key server-side — never exposed to the browser.
//
// Required environment variable (set in Vercel dashboard, not in code):
//   GEMINI_API_KEY

import { SYSTEM_PROMPT } from "../src/data/systemPrompt.js";

const GEMINI_MODEL = "gemini-2.5-flash"; // fast + free-tier friendly
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 8; // last N user+model turns kept for context

// ---------------------------------------------------------------------------
// Very small in-memory rate limiter.
// NOTE: this resets whenever the serverless function cold-starts, so it is
// a soft limiter, not a hard guarantee. For real protection, pair this with
// Upstash Redis (see the comment near the bottom of this file).
// ---------------------------------------------------------------------------
const requestLog = new Map(); // ip -> [timestamps]
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 8;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "Too many messages. Please wait a moment before trying again.",
    });
  }

  const { message, history } = req.body || {};

  // --- Input validation -----------------------------------------------
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: "Invalid conversation history." });
  }

  // Trim history to last N turns to bound token usage / cost
  const trimmedHistory = history.slice(-MAX_HISTORY_TURNS * 2);

  // Gemini's "contents" format: alternating user/model turns.
  const contents = [
    ...trimmedHistory.map((turn) => ({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: String(turn.content).slice(0, MAX_MESSAGE_LENGTH) }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.4,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ error: "The assistant is temporarily unavailable." });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try rephrasing your question.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

// ---------------------------------------------------------------------------
// Upgrading the rate limiter later (optional, recommended before heavy traffic):
//
//   npm install @upstash/ratelimit @upstash/redis
//
//   import { Ratelimit } from "@upstash/ratelimit";
//   import { Redis } from "@upstash/redis";
//
//   const ratelimit = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(8, "60 s"),
//   });
//
//   const { success } = await ratelimit.limit(ip);
//   if (!success) return res.status(429).json({ error: "Too many messages." });
//
// This survives cold starts and works across multiple function instances,
// unlike the in-memory Map above.
// ---------------------------------------------------------------------------