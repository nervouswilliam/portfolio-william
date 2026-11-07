// Test double for `claude -p`. Mimics the real CLI's observable behaviour (flags in,
// one JSON "result" object out, auth failures as is_error + exit code 1) and records
// what it was called with, so tests can check the safety flags and isolation.

import { appendFileSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const json = (p) => JSON.parse(readFileSync(path.join(here, "..", "..", "src", "JSON", p), "utf8"));

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i < 0 ? undefined : args[i + 1];
};

let stdin = "";
for await (const chunk of process.stdin) stdin += chunk;

if (process.env.FAKE_LOG) {
  appendFileSync(
    process.env.FAKE_LOG,
    JSON.stringify({
      args,
      cwd: process.cwd(),
      filesInCwd: readdirSync(process.cwd()),
      hasApiKeyEnv: "ANTHROPIC_API_KEY" in process.env,
      hasClaudeCodeEnv: "CLAUDECODE" in process.env,
      prompt: stdin,
    }) + "\n"
  );
}

const out = (extra) => {
  process.stdout.write(JSON.stringify({ type: "result", subtype: "success", is_error: false, result: "", usage: { input_tokens: 100, output_tokens: 50, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 }, total_cost_usd: 0.02, modelUsage: { "claude-fake-1": {} }, ...extra }));
};

const mode = process.env.FAKE_MODE || "success";
if (mode === "auth") {
  out({ is_error: true, result: "Failed to authenticate: OAuth session expired and could not be refreshed", total_cost_usd: 0, usage: {} });
  process.exit(1);
}
if (mode === "badjson") {
  process.stdout.write("this is not json");
  process.exit(0);
}
if (mode === "nostruct") {
  out({ result: "I could not do that." });
  process.exit(0);
}

const schema = JSON.parse(flag("--json-schema"));
if (schema.properties.ok) {
  out({ structured_output: { ok: true } });
  process.exit(0);
}

const fieldKeys = Object.keys(schema.properties.fields.properties);
const isDetail = fieldKeys.includes("detail");
const tm = /Translate the fields below into (Indonesian|Simplified Chinese)/.exec(stdin);

if (tm) {
  const lang = tm[1] === "Indonesian" ? "id" : "zh";
  if (isDetail) {
    out({ structured_output: { fields: { detail: JSON.stringify(json(`i18n/${lang}/agentic_risk.json`)) }, notes: "" } });
  } else {
    const src = JSON.parse(stdin.slice(stdin.indexOf("{", stdin.indexOf("English source fields:")), stdin.lastIndexOf("}") + 1));
    const fields = {};
    for (const k of fieldKeys) fields[k] = Array.isArray(src[k]) ? src[k].map((x) => `[${lang}] ${x}`) : `[${lang}] ${src[k] ?? ""}`;
    out({ structured_output: { fields, notes: "" } });
  }
} else if (isDetail) {
  const d = json("agentic_risk.json");
  d.meta.title = "Generated details page";
  out({ structured_output: { fields: { detail: JSON.stringify(d) }, notes: "Details written." } });
} else {
  const kind = fieldKeys.includes("company") ? "experience" : fieldKeys.includes("degree") ? "education" : "project";
  const base = {
    project: { title: "Bank Risk Agents Lab", description: "A multi-agent lab.", date: "2026", image: "", tech: ["n8n", "openai"], liveLink: "", github: "" },
    experience: { title: "Data Analyst Intern", company: "Acme Corp", period: "Jan 2026 - Jun 2026", description: ["Built dashboards", "Automated reports"] },
    education: { degree: "BSc Data Science", school: "Example University", period: "2022-2026", gpa: "", description: ["Focus on ML"] },
  }[kind];
  const injected = /IGNORE ALL PREVIOUS INSTRUCTIONS/i.test(stdin);
  out({
    structured_output: {
      slug: kind === "project" ? "Bank Risk Agents Lab!" : `new-${kind}`,
      fields: Object.fromEntries(fieldKeys.map((k) => [k, base[k] ?? ""])),
      notes: injected ? "The document contained instructions aimed at the assistant; they were ignored." : "",
    },
  });
}
