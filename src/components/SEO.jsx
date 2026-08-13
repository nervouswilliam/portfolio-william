import { useEffect } from "react";

const SITE_NAME = "Jeremiah William Sebastian";
const SITE_URL = "https://www.jwseb.com";
const DEFAULT_DESCRIPTION =
  "Portfolio of Jeremiah William Sebastian — a software engineer and analyst bridging engineering and business, with projects spanning full-stack development, statistical analysis, and machine learning.";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Renders nothing — imperatively syncs document.title, meta description,
 * canonical link, and OG/Twitter tags for the current route. A CSR SPA has
 * no per-route server-rendered <head>, so this is the practical substitute:
 * it runs client-side, which covers Google (renders JS before indexing) and
 * any crawler using a headless browser, though not crawlers/bots that fetch
 * raw HTML only — index.html's static tags are the fallback for those.
 */
export default function SEO({ title, description, path = "/", image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Portfolio`;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${path}`;
    const img = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);
    upsertLink("canonical", url);
  }, [title, description, path, image]);

  return null;
}
