// Request handler for the owner-only content assistant.
// Dependencies are injected so the whole flow can be tested without network access.
//
//   deps.getOwnerClient(jwt) -> Supabase client acting as the caller
//   deps.runStructured({ system, content, schema, maxTokens }) -> { json, usage, model }

import { SECTIONS, TARGET_LOCALES, fieldsOf } from "./sections.js";
import { toContentBlocks, UserError } from "./documents.js";
import { runPipeline } from "./pipeline.js";

const MODES = new Set(["generate", "refine", "translate"]);
const SCOPES = new Set(["fields", "detail"]);
const UPLOAD_BUCKET = "admin-uploads";
const PATH_RE = /^[A-Za-z0-9-]{8,64}\/[A-Za-z0-9._-]{1,150}$/;
const MAX_INSTRUCTIONS = 4000;
const MAX_FIELDS_BYTES = 300_000;

function fail(status, message) {
  throw new UserError(message, status);
}

function parseBody(body) {
  const b = body && typeof body === "object" ? body : {};
  const mode = String(b.mode || "generate");
  const scope = String(b.scope || "fields");
  const section = String(b.section || "");
  const instructions = typeof b.instructions === "string" ? b.instructions.trim() : "";
  const files = Array.isArray(b.files) ? b.files : [];
  const fields = b.fields && typeof b.fields === "object" && !Array.isArray(b.fields) ? b.fields : null;
  const locale = String(b.locale || "");

  if (!MODES.has(mode)) fail(400, "Unknown mode.");
  if (!SCOPES.has(scope)) fail(400, "Unknown scope.");
  if (!SECTIONS[section]) fail(400, "Unknown section.");
  if (instructions.length > MAX_INSTRUCTIONS) fail(400, `Instructions are too long (max ${MAX_INSTRUCTIONS} characters).`);
  if (scope === "detail" && !fieldsOf(section, { json: true }).length) fail(400, "This section has no details page.");
  if (mode === "translate" && !TARGET_LOCALES.includes(locale)) fail(400, "Unknown language.");
  if (mode !== "generate" && !fields) fail(400, "Current fields are required for this action.");
  if (fields && JSON.stringify(fields).length > MAX_FIELDS_BYTES) fail(413, "The content is too large to send.");
  if (mode === "generate" && scope === "fields" && !instructions && files.length === 0) {
    fail(400, "Attach at least one document or describe what you want.");
  }
  for (const f of files) {
    if (!f || typeof f.path !== "string" || !PATH_RE.test(f.path) || f.path.includes("..")) fail(400, "Invalid file reference.");
  }
  return { mode, scope, section, instructions, files, fields, locale };
}

async function downloadFiles(client, files) {
  const out = [];
  for (const f of files) {
    const { data, error } = await client.storage.from(UPLOAD_BUCKET).download(f.path);
    if (error || !data) fail(400, `Could not read the uploaded file "${f.name || f.path}". Please upload it again.`);
    out.push({ name: String(f.name || f.path.split("/").pop()), buffer: Buffer.from(await data.arrayBuffer()) });
  }
  return out;
}

export async function handleGenerate(req, res, deps) {
  try {
    if (req.method !== "POST") fail(405, "Method not allowed.");

    // --- 1. Only the owner may call this (decided by the database, not by us) ---
    const jwt = String(req.headers?.authorization || "").replace(/^Bearer\s+/i, "");
    if (!jwt) fail(401, "Please sign in.");
    const client = deps.getOwnerClient(jwt);
    const { data: isOwner, error: authError } = await client.rpc("is_owner");
    if (authError) fail(401, "Your session is not valid. Please sign in again.");
    if (isOwner !== true) fail(403, "This account is not allowed to use the content assistant.");

    // --- 2. Validate the request ---
    const { mode, scope, section, instructions, files, fields, locale } = parseBody(req.body);

    // --- 3. Read the documents (as the owner; storage rules apply) ---
    const downloaded = files.length ? await downloadFiles(client, files) : [];
    const { blocks, notes: readNotes } = downloaded.length ? await toContentBlocks(downloaded) : { blocks: [], notes: [] };

    // --- 4. Run the shared pipeline (prompts, schema, validation, one retry) ---
    const body = await runPipeline({ deps, mode, scope, section, instructions, blocks, fields, locale });
    if (readNotes.length) body.readNotes = readNotes;
    return res.status(200).json({ ok: true, ...body });
  } catch (err) {
    if (err instanceof UserError) return res.status(err.status).json({ error: err.message });
    console.error("generate failed:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
