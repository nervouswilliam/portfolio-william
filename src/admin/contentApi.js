// Everything the admin does against the backend, in one place.
// Security note: none of this is trusted for access control. Row-level security
// in supabase/schema.sql decides who may read drafts or write; the UI merely
// avoids showing buttons that would be refused.

import { getSupabase } from "../lib/backend";
import { invalidateContent } from "../content/useContent";
import { STATIC_ITEMS } from "../content/static";

async function db() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error("The backend is not configured.");
  return supabase;
}

function friendly(error) {
  if (error?.code === "23505") return "That URL name (slug) is already used in this section.";
  if (error?.code === "42501" || /row-level security|permission denied/i.test(error?.message ?? "")) {
    return "You don't have permission to do that. Are you signed in as the owner?";
  }
  return error?.message || "Something went wrong.";
}

function check({ data, error }) {
  if (error) throw new Error(friendly(error));
  return data;
}

export async function listItems(section) {
  const sb = await db();
  return check(await sb.from("content_items").select("*").eq("section", section).order("position", { ascending: true }));
}

export async function saveItem(section, item) {
  const sb = await db();
  const body = { data: item.data, translations: item.translations ?? {}, position: item.position ?? 0, published: !!item.published };
  const row = item.id
    ? check(await sb.from("content_items").update(body).eq("id", item.id).select().single())
    : check(await sb.from("content_items").insert({ section, slug: item.slug, ...body }).select().single());
  invalidateContent(section);
  return row;
}

export async function deleteItem(section, id) {
  const sb = await db();
  check(await sb.from("content_items").delete().eq("id", id));
  invalidateContent(section);
}

export async function patchItem(section, id, patch) {
  const sb = await db();
  const row = check(await sb.from("content_items").update(patch).eq("id", id).select().single());
  invalidateContent(section);
  return row;
}

// Copies the built-in content into the database (published), so it becomes editable.
export async function seedSection(section) {
  const sb = await db();
  const rows = (STATIC_ITEMS[section] ?? []).map((it) => ({
    section,
    slug: it.slug,
    data: it.data,
    translations: it.translations,
    position: it.position,
    published: true,
  }));
  check(await sb.from("content_items").upsert(rows, { onConflict: "section,slug", ignoreDuplicates: true }));
  invalidateContent(section);
  return rows.length;
}

const safeName = (name) => String(name).replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^\.+/, "").slice(-100) || "file";

// Documents for Claude go to a PRIVATE bucket, in a folder named after the user id.
export async function uploadDocument(file) {
  const sb = await db();
  const { data: sessionData } = await sb.auth.getSession();
  const uid = sessionData?.session?.user?.id;
  if (!uid) throw new Error("Please sign in again.");
  const path = `${uid}/${Date.now()}-${safeName(file.name)}`;
  const { error } = await sb.storage.from("admin-uploads").upload(path, file, { upsert: false });
  if (error) throw new Error(friendly(error));
  return { path, name: file.name };
}

export async function removeDocuments(paths) {
  if (!paths.length) return;
  try {
    const sb = await db();
    await sb.storage.from("admin-uploads").remove(paths);
  } catch {
    /* best effort: leftover files are private and owner-only */
  }
}

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function uploadImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("Please choose a PNG, JPEG, WebP or GIF image.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Images must be 5 MB or smaller.");
  const sb = await db();
  const path = `${Date.now()}-${safeName(file.name)}`;
  const { error } = await sb.storage.from("site-images").upload(path, file, { upsert: false, contentType: file.type });
  if (error) throw new Error(friendly(error));
  return sb.storage.from("site-images").getPublicUrl(path).data.publicUrl;
}

// Calls the owner-only serverless endpoint.
export async function askClaude(body) {
  const sb = await db();
  const { data } = await sb.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error("Please sign in again.");

  let res;
  try {
    res = await fetch("/api/admin/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the assistant. Check your connection.");
  }
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok || !json?.ok) {
    if (!json) {
      throw new Error("The assistant endpoint is not available here. It runs on Vercel (or with `vercel dev` locally).");
    }
    throw new Error(json.error || `The assistant failed (HTTP ${res.status}).`);
  }
  return json;
}
