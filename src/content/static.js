// Built-in content: what the site shows before (or without) a database.
//
// It is assembled from the existing translation files and project JSON, so nothing
// is duplicated. Each item has the same shape as a database row:
//   { id, section, slug, data, translations: { id: {...}, zh: {...} }, position }

import en from "../i18n/locales/en.json";
import id from "../i18n/locales/id.json";
import zh from "../i18n/locales/zh.json";
import { PROJECT_TRANSLATIONS } from "../JSON/i18n/registry";

const LANGS = { id, zh };

const EXPERIENCE_META = [
  { slug: "essilor-luxottica-planning-intern", company: "Essilor Luxottica", period: "July 2026 - Present" },
  { slug: "wisely-software-engineer", company: "Wisely", period: "February 2025 - November 2025" },
  { slug: "bca-backend-intern", company: "Bank Central Asia (BCA)", period: "April 2024 - February 2025" },
  { slug: "bca-frontend-intern", company: "Bank Central Asia (BCA)", period: "February 2024 – April 2024" },
  { slug: "dev4you-thesis", company: "Dev4You Nonprofit Platform (Final Year Thesis)", period: "2024 – 2025" },
];

const EDUCATION_META = [
  { slug: "smu-master-it-business", school: "Singapore Management University (SMU)", period: "2026-2027", gpa: "3.58 / 4.00" },
  { slug: "binus-bs-computer-science", school: "Bina Nusantara University (BINUS)", period: "2021-2025", gpa: "3.67 / 4.00" },
];

// slug, i18n key in locales (projects.items.<key>), detail registry key + route (if any)
const PROJECT_META = [
  { slug: "wisely", key: "wisely", date: "2025", image: "/projects/wisely.png", liveLink: "https://www.wisely.id", github: "https://github.com/nervouswilliam/WISE/tree/master/frontend", tech: ["react", "mui", "supabase"] },
  { slug: "dev4you", key: "dev4you", date: "2024", image: "/projects/Dev4You.png", github: "https://github.com/nervouswilliam/skripsi", tech: ["react", "mui", "nodejs", "postgres"] },
  { slug: "needwork", key: "needwork", date: "2025", image: "/projects/needworkapp.png", liveLink: "https://www.needworkapp.com", github: "https://github.com/nervouswilliam/needworkapp.com", tech: ["react", "mui"] },
  { slug: "cestwosin", key: "cestwosin", date: "2023", image: "/projects/CesTwoSkin.png", github: "https://github.com/nervouswilliam/cestwo_skin", tech: ["android", "java", "sqlite"] },
  { slug: "tictactoe", key: "tictactoe", date: "2025", image: "/projects/tictactoe.png", liveLink: "https://www.tictacshift.com", github: "https://github.com/nervouswilliam/TicTacToe", tech: ["react"] },
  { slug: "hdb-resale", key: "HDB resale Value Drivers", date: "2026", image: "/projects/hdb.jpg", tech: ["python", "pandas", "matplotlib"], detailKey: "hdb", route: "hdb_project" },
  { slug: "fraud-detection", key: "fraud-detection", date: "2026", image: "/projects/fraud_detection.jpg", tech: ["knime"], detailKey: "fraud_detection", route: "fraud_detection_project" },
  { slug: "query-optimization", key: "query-optimization", date: "2026", image: "/projects/query_processing.jpg", tech: ["mysql"], detailKey: "query_optimization", route: "query_optimization_project" },
  { slug: "ev-infrastructure", key: "ev-infrastructure", date: "2026", image: "/projects/ev_infrastructure.jpg", tech: ["excel"], detailKey: "ev_infrastructure", route: "ev_infrastructure_project" },
  { slug: "machine-learning", key: "machine-learning", date: "2026", image: "/projects/machine_learning.jpg", tech: ["python", "scikit"], detailKey: "machine_learning", route: "machine_learning_project" },
  { slug: "social-network-analysis", key: "social-network-analysis", date: "2026", image: "/projects/social_network.png", tech: ["python"], detailKey: "social_network_analysis", route: "social_network_analysis_project" },
  { slug: "agentic-risk", key: "agentic-risk", date: "2026", image: "/projects/agentic_risk.png", tech: ["n8n", "openai"], detailKey: "agentic_risk", route: "agentic_risk_project" },
];

const item = (section, slug, position, data, translations) => ({
  id: `static:${section}:${slug}`,
  section,
  slug,
  data,
  translations,
  position,
  static: true,
});

function overlays(pick) {
  return Object.fromEntries(Object.entries(LANGS).map(([lang, res]) => [lang, pick(res, lang)]));
}

const experience = EXPERIENCE_META.map(({ slug, ...meta }, i) =>
  item(
    "experience", slug, i * 10,
    { ...meta, title: en.experience.items[i].title, description: en.experience.items[i].description },
    overlays((res) => ({ title: res.experience.items[i].title, description: res.experience.items[i].description }))
  )
);

const education = EDUCATION_META.map(({ slug, ...meta }, i) =>
  item(
    "education", slug, i * 10,
    { ...meta, degree: en.education.items[i].degree, description: en.education.items[i].description },
    overlays((res) => ({ degree: res.education.items[i].degree, description: res.education.items[i].description }))
  )
);

const project = PROJECT_META.map(({ slug, key, detailKey, ...meta }, i) => {
  const texts = en.projects.items[key];
  const detail = detailKey ? PROJECT_TRANSLATIONS[detailKey] : null;
  return item(
    "project", slug, i * 10,
    { ...meta, title: texts.title, description: texts.description, ...(detail ? { detail: detail.en } : {}) },
    overlays((res, lang) => ({
      title: res.projects.items[key].title,
      description: res.projects.items[key].description,
      ...(detail ? { detail: detail[lang] } : {}),
    }))
  );
});

export const STATIC_ITEMS = { experience, education, project };

// Pins saved by visitors before slugs were cleaned up.
export const LEGACY_PROJECT_IDS = { "HDB resale Value Drivers": "hdb-resale" };
