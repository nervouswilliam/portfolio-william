import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  SECTIONS, slugify, buildGenerateSchema, buildTranslateSchema, normalizeFields,
  validateItemData, validateProjectDetail, sameDetailShape, localizeData,
} from "../sections.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "src", "JSON");
const load = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

// Structured outputs reject anything that isn't a closed object.
function assertStrictSchema(node, path = "schema") {
  if (node.type === "object") {
    assert.equal(node.additionalProperties, false, `${path} must set additionalProperties:false`);
    assert.deepEqual([...node.required].sort(), Object.keys(node.properties).sort(), `${path} must require every property`);
    for (const [k, v] of Object.entries(node.properties)) assertStrictSchema(v, `${path}.${k}`);
  }
  if (node.type === "array") assertStrictSchema(node.items, `${path}[]`);
}

test("slugify produces URL-safe slugs", () => {
  assert.equal(slugify("Agentic AI: Risk Workflow!"), "agentic-ai-risk-workflow");
  assert.equal(slugify("  Crème brûlée  "), "creme-brulee");
  assert.equal(slugify("../../etc"), "etc");
  assert.equal(slugify(""), "");
});

test("generate/translate schemas are strict for every section and scope", () => {
  for (const id of Object.keys(SECTIONS)) {
    for (const scope of ["fields", "detail"]) {
      const hasJson = SECTIONS[id].fields.some((f) => f.type === "json");
      if (scope === "detail" && !hasJson) continue;
      assertStrictSchema(buildGenerateSchema(id, scope), `${id}.generate.${scope}`);
      assertStrictSchema(buildTranslateSchema(id, scope), `${id}.translate.${scope}`);
    }
  }
});

test("project field scope excludes the details page; detail scope is only the details page", () => {
  assert.ok(!("detail" in buildGenerateSchema("project", "fields").properties.fields.properties));
  assert.deepEqual(Object.keys(buildGenerateSchema("project", "detail").properties.fields.properties), ["detail"]);
  assert.ok("slug" in buildGenerateSchema("project", "fields").properties);
  assert.ok(!("slug" in buildGenerateSchema("project", "detail").properties));
});

test("translate schemas only contain translatable fields", () => {
  assert.deepEqual(Object.keys(buildTranslateSchema("experience", "fields").properties.fields.properties).sort(), ["description", "title"]);
  assert.deepEqual(Object.keys(buildTranslateSchema("project", "fields").properties.fields.properties).sort(), ["description", "title"]);
});

test("internal fields never reach the editor schema", () => {
  assert.ok(!("route" in buildGenerateSchema("project", "fields").properties.fields.properties));
});

test("normalizeFields cleans model output", () => {
  const { data, problems } = normalizeFields("project", {
    title: "  Hello  ", description: "", date: "2026", image: "", liveLink: "",
    tech: ["react", "react", "not-a-tech"], github: "https://github.com/x/y", route: "evil",
  }, { json: false });
  assert.deepEqual(data, { title: "Hello", date: "2026", tech: ["react"], github: "https://github.com/x/y" });
  assert.deepEqual(problems, []);
});

test("normalizeFields parses JSON strings and reports bad JSON", () => {
  assert.deepEqual(normalizeFields("project", { detail: '{"a":1}' }, { json: true }).data, { detail: { a: 1 } });
  assert.equal(normalizeFields("project", { detail: "{oops" }, { json: true }).problems.length, 1);
  assert.deepEqual(normalizeFields("project", { detail: "" }, { json: true }).data, {});
});

test("normalizeFields turns multi-line text into a list", () => {
  assert.deepEqual(normalizeFields("experience", { description: "a\n\n b \n" }).data.description, ["a", "b"]);
});

test("validateItemData enforces required fields and formats", () => {
  assert.deepEqual(validateItemData("experience", { title: "T", company: "C", period: "P" }), []);
  assert.ok(validateItemData("experience", { title: "T" }).length >= 2);
  const base = { title: "T", description: "D", date: "2026" };
  assert.deepEqual(validateItemData("project", base), []);
  assert.ok(validateItemData("project", { ...base, date: "26" }).length);
  assert.ok(validateItemData("project", { ...base, github: "javascript:alert(1)" }).length);
  assert.ok(validateItemData("project", { ...base, image: "javascript:alert(1)" }).length);
  assert.ok(validateItemData("project", { ...base, image: "/projects/../../etc" }).length);
  assert.deepEqual(validateItemData("project", { ...base, image: "/projects/a.png" }), []);
});

test("every existing project detail page passes the validator", () => {
  for (const f of ["HDB.json", "fraud_detection.json", "query.json", "EV_Infrastructure.json", "social_network.json", "AML.json", "agentic_risk.json"]) {
    assert.deepEqual(validateProjectDetail(load(f)), [], f);
  }
});

test("validateProjectDetail rejects malformed pages", () => {
  const ok = load("HDB.json");
  assert.ok(validateProjectDetail(null).length);
  assert.ok(validateProjectDetail({ ...ok, tabsContent: ok.tabsContent.slice(1) }).length);
  assert.ok(validateProjectDetail({ ...ok, meta: { ...ok.meta, tabs: [] } }).length);
  const badBlock = structuredClone(ok);
  badBlock.tabsContent[0][0] = { type: "script", src: "x" };
  assert.ok(validateProjectDetail(badBlock).some((e) => e.includes("unknown block type")));
  const badList = structuredClone(ok);
  badList.tabsContent[0][0] = { type: "textCard", title: "t", paragraphs: "not a list" };
  assert.ok(validateProjectDetail(badList).length);
});

test("translated detail pages keep the English structure", () => {
  assert.ok(sameDetailShape(load("HDB.json"), load("i18n/id/HDB.json")));
  assert.ok(sameDetailShape(load("agentic_risk.json"), load("i18n/zh/agentic_risk.json")));
  assert.ok(!sameDetailShape(load("HDB.json"), load("query.json")));
});

test("localizeData overlays only the requested language", () => {
  const data = { title: "A", company: "C" };
  const tr = { id: { title: "B" } };
  assert.deepEqual(localizeData(data, tr, "id"), { title: "B", company: "C" });
  assert.deepEqual(localizeData(data, tr, "zh"), data);
  assert.deepEqual(localizeData(data, tr, "en"), data);
  assert.deepEqual(localizeData(data, undefined, "id"), data);
});
