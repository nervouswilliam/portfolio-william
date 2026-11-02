import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { backendConfigured, getSupabase } from "../lib/backend";
import { localizeData } from "../../api/_lib/sections.js";
import { STATIC_ITEMS } from "./static";

// Published content for a section, with three layers of fallback so the public
// site never goes blank:
//   1. the last database result cached in this browser (no flash of old content)
//   2. the built-in content bundled with the site
//   3. the live database result, as soon as it arrives

const CACHE_PREFIX = "portfolio_content_v1_";
const inflight = new Map();
const listeners = new Map();

const readCache = (section) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + section);
    const rows = raw ? JSON.parse(raw) : null;
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch {
    return null;
  }
};
const writeCache = (section, rows) => {
  try {
    localStorage.setItem(CACHE_PREFIX + section, JSON.stringify(rows));
  } catch {
    /* storage unavailable: fine, we just refetch next time */
  }
};

function fetchSection(section) {
  if (!inflight.has(section)) {
    inflight.set(
      section,
      (async () => {
        const supabase = await getSupabase();
        if (!supabase) return null;
        const { data, error } = await supabase
          .from("content_items")
          .select("*")
          .eq("section", section)
          .eq("published", true)
          .order("position", { ascending: true });
        if (error || !data) return null;
        writeCache(section, data);
        return data;
      })().catch(() => null)
    );
  }
  return inflight.get(section);
}

// Call after the admin saves so the live site (and this tab) refetch.
export function invalidateContent(section) {
  inflight.delete(section);
  try {
    localStorage.removeItem(CACHE_PREFIX + section);
  } catch {
    /* ignore */
  }
  (listeners.get(section) ?? []).forEach((fn) => fn());
}

export function useContent(section) {
  const [state, setState] = useState(() => {
    const cached = backendConfigured ? readCache(section) : null;
    return { items: cached ?? STATIC_ITEMS[section] ?? [], source: cached ? "cache" : "static", loading: backendConfigured };
  });

  useEffect(() => {
    if (!backendConfigured) return undefined;
    let alive = true;
    const load = () =>
      fetchSection(section).then((rows) => {
        if (!alive) return;
        if (rows && rows.length) setState({ items: rows, source: "database", loading: false });
        else setState((s) => ({ ...s, loading: false }));
      });
    load();
    const set = listeners.get(section) ?? new Set();
    set.add(load);
    listeners.set(section, set);
    return () => {
      alive = false;
      set.delete(load);
    };
  }, [section]);

  return state;
}

// An item's fields in the visitor's language, plus its identity.
export function useLocalizedItems(section) {
  const { i18n } = useTranslation();
  const { items, loading, source } = useContent(section);
  const lang = i18n.resolvedLanguage;
  return {
    loading,
    source,
    items: items.map((it) => ({ ...it, fields: localizeData(it.data, it.translations, lang) })),
  };
}
