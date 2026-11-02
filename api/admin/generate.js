// POST /api/admin/generate  (owner only)
//
// Reads documents the owner uploaded to the private "admin-uploads" bucket and asks
// Claude for a draft / revision / translation. It never writes to the database:
// the browser receives the draft, the owner reviews it, and saving goes through the
// normal owner-only database rules.
//
// Env: SUPABASE_URL + SUPABASE_ANON_KEY (or the VITE_ equivalents), ANTHROPIC_API_KEY.
// Optional: CLAUDE_MODEL, CLAUDE_EFFORT, CLAUDE_FALLBACKS=off.

import { createClient } from "@supabase/supabase-js";
import { handleGenerate } from "../_lib/generate.js";
import { createRunner } from "../_lib/claude.js";

const runStructured = createRunner();

function getOwnerClient(jwt) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured on the server.");
  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default function handler(req, res) {
  return handleGenerate(req, res, { getOwnerClient, runStructured });
}
