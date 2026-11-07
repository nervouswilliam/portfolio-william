// The core "documents + wishes -> validated draft" logic, independent of HOW Claude
// is called. The serverless endpoint (Anthropic API) and the local script (Claude
// Code CLI) both run this same pipeline, so a draft means the same thing either way.
//
//   deps.runStructured({ system, content, schema, maxTokens }) -> { json, usage, model }

import {
  SECTIONS,
  buildGenerateSchema,
  buildTranslateSchema,
  fieldsOf,
  normalizeFields,
  slugify,
  validateProjectDetail,
  sameDetailShape,
} from "./sections.js";
import { UserError } from "./documents.js";
import { systemPrompt, userTask } from "./prompts.js";

// One call, plus a single retry that tells Claude exactly what was wrong.
async function runChecked(deps, build, check) {
  const usage = { input_tokens: 0, output_tokens: 0 };
  const add = (u) => {
    usage.input_tokens += u?.input_tokens ?? 0;
    usage.output_tokens += u?.output_tokens ?? 0;
  };
  let problems = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const req = build(problems);
    const res = await deps.runStructured(req);
    add(res.usage);
    const result = check(res.json);
    if (!result.problems.length) return { ...result, usage, model: res.model };
    problems = result.problems;
  }
  throw new UserError(`Claude's draft did not pass validation: ${problems.slice(0, 3).join(" ")}`, 422);
}

// mode: generate | refine | translate     scope: fields | detail
// blocks: Claude content blocks for the documents (see documents.js)
export async function runPipeline({ deps, mode, scope, section, instructions = "", blocks = [], fields = null, locale = "" }) {
  const sectionDef = SECTIONS[section];
  const schema = mode === "translate" ? buildTranslateSchema(section, scope) : buildGenerateSchema(section, scope);
  const system = systemPrompt({ section, mode, scope, locale });
  const maxTokens = scope === "detail" ? 28000 : 8000;
  const build = (retryProblems) => ({
    system,
    schema,
    maxTokens,
    content: [...blocks, { type: "text", text: userTask({ mode, scope, instructions, fields: fields ?? undefined, locale, retryProblems }) }],
  });

  if (mode === "translate") {
    const sourceDetail = fields?.detail;
    const r = await runChecked(deps, build, (json) => {
      const { data, problems } = normalizeFields(section, json.fields, { translatableOnly: true, json: scope === "detail" });
      if (scope === "detail") {
        if (!data.detail) problems.push("The translated details page is missing.");
        else {
          problems.push(...validateProjectDetail(data.detail));
          if (sourceDetail && !sameDetailShape(sourceDetail, data.detail)) problems.push("The translated JSON must keep exactly the same structure (keys, tabs, blocks, list lengths) as the English source.");
        }
      } else {
        for (const f of fieldsOf(section, { translatableOnly: true, json: false })) {
          if (f.type === "list" && Array.isArray(fields?.[f.key]) && data[f.key] && data[f.key].length !== fields[f.key].length) {
            problems.push(`"${f.key}" must have the same number of items as the source (${fields[f.key].length}).`);
          }
        }
      }
      return { data, problems, notes: json.notes };
    });
    return { translation: r.data, notes: r.notes, usage: r.usage, model: r.model };
  }

  const r = await runChecked(deps, build, (json) => {
    const { data, problems } = normalizeFields(section, json.fields, { json: scope === "detail" });
    if (scope === "detail") {
      if (!data.detail) problems.push("The details page is missing.");
      else problems.push(...validateProjectDetail(data.detail));
    }
    return { data, problems, notes: json.notes, slug: json.slug };
  });
  const data = { ...r.data };
  if (mode === "refine") {
    // Claude can't produce images: always keep whatever is currently set.
    for (const f of fieldsOf(section, { json: false })) if (f.type === "image" && fields?.[f.key]) data[f.key] = fields[f.key];
  }
  const body = { data, notes: r.notes, usage: r.usage, model: r.model };
  if (mode === "generate" && scope === "fields") {
    body.slug = slugify(r.slug) || slugify(data[sectionDef.titleField]) || "";
  }
  return body;
}
