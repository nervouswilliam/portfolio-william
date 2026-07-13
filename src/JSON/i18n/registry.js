// Locale-aware project content registry.
//
// src/JSON/*.json is the canonical English source. Files under
// src/JSON/i18n/<locale>/ mirror the exact same schema with only the
// human-readable text fields translated (titles, paragraphs, list/table
// text, highlight box content, etc.) — ids, keys, numbers, names, emails,
// and style fields (color/align/type) stay untouched.
//
// getProjectData() resolves the best available locale, falling back to
// English for any project a translation hasn't been written for yet.

import HDB_en from "../HDB.json";
import HDB_id from "./id/HDB.json";
import HDB_zh from "./zh/HDB.json";

import fraud_en from "../fraud_detection.json";
import fraud_id from "./id/fraud_detection.json";
import fraud_zh from "./zh/fraud_detection.json";

import query_en from "../query.json";
import query_id from "./id/query.json";
import query_zh from "./zh/query.json";

import ev_en from "../EV_Infrastructure.json";
import ev_id from "./id/EV_Infrastructure.json";
import ev_zh from "./zh/EV_Infrastructure.json";

import social_en from "../social_network.json";
import social_id from "./id/social_network.json";
import social_zh from "./zh/social_network.json";

import aml_en from "../AML.json";
import aml_id from "./id/AML.json";
import aml_zh from "./zh/AML.json";

export const PROJECT_TRANSLATIONS = {
  hdb: { en: HDB_en, id: HDB_id, zh: HDB_zh },
  fraud_detection: { en: fraud_en, id: fraud_id, zh: fraud_zh },
  query_optimization: { en: query_en, id: query_id, zh: query_zh },
  ev_infrastructure: { en: ev_en, id: ev_id, zh: ev_zh },
  social_network_analysis: { en: social_en, id: social_id, zh: social_zh },
  machine_learning: { en: aml_en, id: aml_id, zh: aml_zh },
};

export function getProjectData(projectKey, language) {
  const variants = PROJECT_TRANSLATIONS[projectKey];
  if (!variants) return null;
  return variants[language] || variants.en;
}
