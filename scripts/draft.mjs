#!/usr/bin/env node
// Create a content draft from your documents using YOUR Claude Code login (no API key),
// then import the resulting file in the admin ("Import draft"). Nothing is published.

import { parseArgs } from "node:util";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SECTIONS, SECTION_IDS, TARGET_LOCALES, fieldsOf } from "../api/_lib/sections.js";
import { UserError, toContentBlocks } from "../api/_lib/documents.js";
import { runPipeline } from "../api/_lib/pipeline.js";
import { buildDraftFile } from "../api/_lib/draftFile.js";
import { checkClaudeCode, createCliRunner } from "./lib/claudeCli.mjs";

const HELP = `
Create a draft from your documents with Claude Code (uses your Claude login; no API key).

Usage
  npm run draft -- [options] <file> [<file> ...]

Options
  -s, --section <name>        ${SECTION_IDS.join(" | ")}   (default: project)
  -i, --instructions <text>   What you want, e.g. "Add this lab as a project. I did the data prep."
      --instructions-file <f> Read the instructions from a text file
      --detail                Also write the project's full details page (slower)
      --translate <langs>     ${TARGET_LOCALES.join(", ")} (comma-separated) or "all"
  -o, --out <folder>          Where to save the draft (default: drafts)
      --model <name>          Model alias or full name (default: Claude Code's default)
      --effort <level>        low | medium | high | xhigh | max
      --use-api-key           Use ANTHROPIC_API_KEY (billed per use) instead of your Claude login
      --claude-bin <path>     Path to the claude executable if it is not on your PATH
      --check                 Test that Claude Code is installed and signed in, then exit
  -h, --help                  Show this help

Files can be PDF, Word (.docx), text/JSON/CSV/Markdown, or images.

Examples
  npm run draft -- --check
  npm run draft -- -s project --detail --translate all -i "Add this lab, I built the data prep" notes.docx workflow.json
  npm run draft -- -s experience -i "Intern at Acme, Jan-Jun 2026" offer-letter.pdf

Then open /admin, pick the section tab, click "Import draft", and choose the saved file.
`;

const OPTIONS = {
  section: { type: "string", short: "s", default: "project" },
  instructions: { type: "string", short: "i" },
  "instructions-file": { type: "string" },
  detail: { type: "boolean", default: false },
  translate: { type: "string" },
  out: { type: "string", short: "o", default: "drafts" },
  model: { type: "string" },
  effort: { type: "string" },
  "use-api-key": { type: "boolean", default: false },
  "claude-bin": { type: "string" },
  check: { type: "boolean", default: false },
  help: { type: "boolean", short: "h", default: false },
};

function parseLocales(value) {
  if (!value) return [];
  const list = value.trim().toLowerCase() === "all" ? [...TARGET_LOCALES] : value.split(",").map((s) => s.trim()).filter(Boolean);
  const bad = list.find((l) => !TARGET_LOCALES.includes(l));
  if (bad) throw new UserError(`Unknown language "${bad}". Use ${TARGET_LOCALES.join(", ")} or all.`);
  return [...new Set(list)];
}

async function uniquePath(dir, slug) {
  for (let i = 0; i < 100; i++) {
    const file = path.join(dir, i === 0 ? `${slug}.json` : `${slug}-${i + 1}.json`);
    try {
      await stat(file);
    } catch {
      return file; // does not exist yet
    }
  }
  throw new UserError("Too many drafts with this name already exist.");
}

// deps lets tests inject a runner and capture output.
export async function main(argv, deps = {}) {
  const log = deps.log ?? ((m) => process.stdout.write(`${m}\n`));
  let parsed;
  try {
    parsed = parseArgs({ args: argv, options: OPTIONS, allowPositionals: true });
  } catch (e) {
    log(`${e.message}\n\nRun with --help for usage.`);
    return 1;
  }
  const { values: v, positionals: filePaths } = parsed;
  if (v.help) {
    log(HELP.trim());
    return 0;
  }

  const runner =
    deps.runStructured ??
    createCliRunner({
      bin: v["claude-bin"] || undefined,
      model: v.model,
      effort: v.effort,
      useApiKey: v["use-api-key"],
    });

  try {
    if (v.check) {
      log("Checking Claude Code (this sends one tiny request)...");
      const ok = await checkClaudeCode(runner);
      log(ok ? "OK: Claude Code is installed and signed in." : "Claude Code answered, but not as expected. Try again.");
      return ok ? 0 : 1;
    }

    const section = v.section;
    if (!SECTIONS[section]) throw new UserError(`Unknown section "${section}". Use one of: ${SECTION_IDS.join(", ")}.`);
    const def = SECTIONS[section];
    const hasDetail = fieldsOf(section, { json: true }).length > 0;
    if (v.detail && !hasDetail) throw new UserError(`${def.label} has no details page, so --detail does not apply.`);
    const locales = parseLocales(v.translate);

    let instructions = (v.instructions ?? "").trim();
    if (v["instructions-file"]) {
      instructions = `${instructions}\n${(await readFile(v["instructions-file"], "utf8")).trim()}`.trim();
    }
    if (!instructions && !filePaths.length) {
      throw new UserError("Give me something to work from: attach at least one file, or describe it with --instructions.\n\nRun with --help for examples.");
    }

    const files = [];
    for (const p of filePaths) {
      let buffer;
      try {
        buffer = await readFile(p);
      } catch {
        throw new UserError(`Could not read "${p}".`);
      }
      files.push({ name: path.basename(p), buffer });
    }
    const { blocks, notes: readNotes } = files.length ? await toContentBlocks(files) : { blocks: [], notes: [] };
    readNotes.forEach((n) => log(`Note: ${n}`));

    const steps = 1 + (v.detail ? 1 : 0) + locales.length;
    let step = 0;
    const announce = (text) => log(`[${++step}/${steps}] ${text}`);
    const pipe = (args) => runPipeline({ deps: { runStructured: runner }, section, blocks, instructions, ...args });

    announce(`Drafting the ${def.singular.toLowerCase()} from your ${files.length ? `${files.length} file${files.length > 1 ? "s" : ""}` : "instructions"}...`);
    const base = await pipe({ mode: "generate", scope: "fields" });
    let data = base.data;
    const notes = [base.notes, ...readNotes].filter(Boolean);

    if (v.detail) {
      announce("Writing the details page (this can take a few minutes)...");
      const detail = await pipe({ mode: "generate", scope: "detail", fields: data });
      data = { ...data, ...detail.data };
      if (detail.notes) notes.push(detail.notes);
    }

    const translations = {};
    for (const locale of locales) {
      announce(`Translating to ${locale}...`);
      const source = Object.fromEntries(
        fieldsOf(section, { translatableOnly: true, json: false }).filter((f) => data[f.key] !== undefined).map((f) => [f.key, data[f.key]])
      );
      const tr = await pipe({ mode: "translate", scope: "fields", fields: source, locale, blocks: [], instructions: "" });
      let overlay = tr.translation;
      if (data.detail) {
        const trDetail = await pipe({ mode: "translate", scope: "detail", fields: { detail: data.detail }, locale, blocks: [], instructions: "" });
        overlay = { ...overlay, ...trDetail.translation };
      }
      translations[locale] = overlay;
    }

    const slug = base.slug || `draft-${Date.now()}`;
    const draft = buildDraftFile({
      section,
      slug,
      data,
      translations,
      notes: notes.join(" "),
      source: { tool: "claude-code-cli", model: base.model, createdAt: new Date().toISOString() },
    });
    const dir = deps.outDir ?? v.out;
    await mkdir(dir, { recursive: true });
    const file = await uniquePath(dir, slug);
    await writeFile(file, `${JSON.stringify(draft, null, 2)}\n`, "utf8");

    log("");
    log(`Saved: ${file}`);
    if (notes.length) log(`Notes from Claude: ${notes.join(" ")}`);
    const cost = runner.stats?.costUsd;
    if (cost) log(`Claude Code's own estimate of the usage: about $${cost.toFixed(2)}. With a subscription this counts against your plan instead of being billed per use.`);
    log("");
    log(`Next: open /admin, choose the ${def.label} tab, click "Import draft", and pick that file. Review it, then publish.`);
    return 0;
  } catch (e) {
    if (e instanceof UserError) {
      log(`Error: ${e.message}`);
      return 1;
    }
    throw e;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (e) => {
      console.error(e);
      process.exit(1);
    }
  );
}
