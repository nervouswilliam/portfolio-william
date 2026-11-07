import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { DRAFT_FORMAT, MAX_DRAFT_BYTES, buildDraftFile, parseDraftFile } from "../draftFile.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "src", "JSON");
const detail = JSON.parse(readFileSync(join(root, "agentic_risk.json"), "utf8"));
const detailId = JSON.parse(readFileSync(join(root, "i18n", "id", "agentic_risk.json"), "utf8"));

const experience = {
  section: "experience",
  slug: "Acme Analyst!",
  data: { title: " Data Analyst Intern ", company: "Acme", period: "Jan 2026 - Jun 2026", description: ["Built dashboards", "", "Automated reports"] },
  translations: { id: { title: "Magang Analis Data", description: ["Membuat dasbor", "Mengotomatiskan laporan"] } },
  notes: "Dates taken from the offer letter.",
};

const asText = (o) => JSON.stringify(buildDraftFile(o));

test("a draft written by the script round-trips through the admin's reader", () => {
  const r = parseDraftFile(asText(experience));
  assert.equal(r.ok, true);
  assert.equal(r.draft.section, "experience");
  assert.equal(r.draft.slug, "acme-analyst");
  assert.deepEqual(r.draft.data, { title: "Data Analyst Intern", company: "Acme", period: "Jan 2026 - Jun 2026", description: ["Built dashboards", "Automated reports"] });
  assert.deepEqual(r.draft.translations, { id: { title: "Magang Analis Data", description: ["Membuat dasbor", "Mengotomatiskan laporan"] } });
  assert.equal(r.draft.notes, "Dates taken from the offer letter.");
});

test("a project draft keeps its details page and translated details page", () => {
  const r = parseDraftFile(asText({ section: "project", slug: "agentic", data: { title: "T", description: "D", date: "2026", tech: ["n8n", "nope"], detail }, translations: { id: { title: "Judul", detail: detailId } } }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.draft.data.tech, ["n8n"]);
  assert.equal(r.draft.data.detail.meta.title, detail.meta.title);
  assert.equal(r.draft.translations.id.detail.meta.title, detailId.meta.title);
});

test("the slug falls back to the title when missing", () => {
  const r = parseDraftFile(asText({ ...experience, slug: "" }));
  assert.equal(r.draft.slug, "data-analyst-intern");
});

test("unknown fields, internal fields and unsupported languages are dropped", () => {
  const r = parseDraftFile(asText({
    section: "project",
    slug: "x",
    data: { title: "T", description: "D", date: "2026", route: "evil_route", published: true, id: "123", __proto__: { polluted: 1 } },
    translations: { fr: { title: "Titre" }, zh: { title: "标题", date: "2099", github: "https://x" } },
  }));
  assert.equal(r.ok, true);
  assert.deepEqual(Object.keys(r.draft.data).sort(), ["date", "description", "title"]);
  assert.deepEqual(r.draft.translations, { zh: { title: "标题" } }, "only translatable fields of supported languages survive");
  assert.equal({}.polluted, undefined);
});

test("rejects files that are not drafts, with messages a person can act on", () => {
  const msg = (text, opts) => parseDraftFile(text, opts).error;
  assert.match(msg(""), /empty/);
  assert.match(msg("{nope"), /not valid JSON/);
  assert.match(msg("[]"), /does not look like a draft/);
  assert.match(msg(JSON.stringify({ format: "other" })), /does not look like a draft/);
  assert.match(msg(JSON.stringify({ format: DRAFT_FORMAT, version: 99, section: "project", data: {} })), /version 99/);
  assert.match(msg(JSON.stringify({ format: DRAFT_FORMAT, version: 1, section: "users", data: {} })), /Unknown section/);
  assert.match(msg(JSON.stringify({ format: DRAFT_FORMAT, version: 1, section: "project" })), /no content/);
  assert.match(msg("x".repeat(MAX_DRAFT_BYTES + 1)), /too large/);
});

test("a draft for another section is refused with a pointer to the right tab", () => {
  const r = parseDraftFile(asText(experience), { section: "project" });
  assert.equal(r.ok, false);
  assert.match(r.error, /This draft is for Experience\. Open the Experience tab/);
  assert.equal(parseDraftFile(asText(experience), { section: "experience" }).ok, true);
});

test("importing performs no validation of required fields (the editor does that on save)", () => {
  const r = parseDraftFile(asText({ section: "education", slug: "x", data: { school: "Uni" } }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.draft.data, { school: "Uni" });
});
