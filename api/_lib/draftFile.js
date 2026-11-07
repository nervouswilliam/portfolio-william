// The "draft file": what the local script writes and the admin imports.
//
// A draft is just data for the normal editor. Importing it does NOT publish or save
// anything; the owner reviews it in the editor first. Because the file is read from
// disk it is treated as untrusted input: everything is re-normalised against the
// section registry, unknown fields are dropped, and a size cap applies.

import { SECTIONS, TARGET_LOCALES, normalizeFields, slugify } from "./sections.js";

export const DRAFT_FORMAT = "portfolio-draft";
export const DRAFT_VERSION = 1;
export const MAX_DRAFT_BYTES = 2_000_000;

export function buildDraftFile({ section, slug, data, translations = {}, notes = "", source = {} }) {
  return {
    format: DRAFT_FORMAT,
    version: DRAFT_VERSION,
    section,
    slug,
    data,
    translations,
    notes,
    source,
  };
}

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Returns { ok: true, draft } or { ok: false, error } with a message fit for the UI.
export function parseDraftFile(text, { section: expectedSection } = {}) {
  if (typeof text !== "string" || !text.trim()) return { ok: false, error: "The file is empty." };
  if (text.length > MAX_DRAFT_BYTES) return { ok: false, error: "That file is too large to be a draft (2 MB max)." };

  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "That file is not valid JSON." };
  }
  if (!isObj(raw) || raw.format !== DRAFT_FORMAT) {
    return { ok: false, error: "This does not look like a draft file made by `npm run draft`." };
  }
  if (raw.version !== DRAFT_VERSION) {
    return { ok: false, error: `This draft uses version ${raw.version}, but the admin understands version ${DRAFT_VERSION}. Update the project and re-create it.` };
  }
  const def = SECTIONS[raw.section];
  if (!def) return { ok: false, error: `Unknown section "${String(raw.section).slice(0, 30)}".` };
  if (expectedSection && raw.section !== expectedSection) {
    return { ok: false, error: `This draft is for ${def.label}. Open the ${def.label} tab to import it.` };
  }
  if (!isObj(raw.data)) return { ok: false, error: "The draft has no content." };

  const { data, problems } = normalizeFields(raw.section, raw.data);
  if (problems.length) return { ok: false, error: problems.join(" ") };

  const translations = {};
  if (isObj(raw.translations)) {
    for (const lang of TARGET_LOCALES) {
      if (!isObj(raw.translations[lang])) continue;
      const tr = normalizeFields(raw.section, raw.translations[lang], { translatableOnly: true });
      if (Object.keys(tr.data).length) translations[lang] = tr.data;
    }
  }

  return {
    ok: true,
    draft: {
      section: raw.section,
      slug: slugify(raw.slug) || slugify(data[def.titleField]) || "",
      data,
      translations,
      notes: typeof raw.notes === "string" ? raw.notes.slice(0, 2000) : "",
    },
  };
}
