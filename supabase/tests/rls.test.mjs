// Verifies the security rules in supabase/schema.sql against a real Postgres
// engine (PGlite, in-memory). Supabase's `auth` and `storage` schemas are
// stubbed just enough for the policies to run.
//
//   npm run test:rls

import { test, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PGlite } from "@electric-sql/pglite";

const here = dirname(fileURLToPath(import.meta.url));
const schemaSql = readFileSync(join(here, "..", "schema.sql"), "utf8");

const OWNER = "owner@example.com";
const claims = {
  owner: { sub: "u-owner", email: OWNER, app_metadata: { provider: "google" } },
  ownerUpperCase: { sub: "u-owner", email: OWNER.toUpperCase(), app_metadata: { provider: "google" } },
  stranger: { sub: "u-x", email: "stranger@example.com", app_metadata: { provider: "google" } },
  // Same email as the owner but NOT via Google (e.g. a password signup someone made).
  spoofedProvider: { sub: "u-y", email: OWNER, app_metadata: { provider: "email" } },
};

const supabaseStub = `
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  create function auth.jwt() returns jsonb language sql stable as $$
    select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
  $$;
  grant usage on schema auth to anon, authenticated;
  grant execute on function auth.jwt() to anon, authenticated;
  grant usage on schema public to anon, authenticated;
  create schema storage;
  create table storage.buckets (
    id text primary key, name text not null, public boolean default false,
    file_size_limit bigint, allowed_mime_types text[]
  );
  create table storage.objects (
    id uuid primary key default gen_random_uuid(), bucket_id text, name text
  );
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon, authenticated;
  grant select, insert, update, delete on storage.objects to anon, authenticated;
`;

let db;

before(async () => {
  db = new PGlite();
  await db.exec(supabaseStub);
  await db.exec(schemaSql);
  // Applying the schema twice must be safe (it is documented as idempotent).
  await db.exec(schemaSql);
  await db.exec(`insert into public.owner_emails (email) values ('${OWNER}')`);
});

beforeEach(async () => {
  await db.exec("reset role");
  await db.exec("delete from public.content_items");
  await db.exec("delete from storage.objects");
  await db.exec(`
    insert into public.content_items (section, slug, data, published) values
      ('project', 'live-one', '{"title":"Live"}', true),
      ('project', 'draft-one', '{"title":"Draft"}', false)
  `);
});

// Run `fn` as a given role/claims, always restoring the superuser afterwards.
async function as(role, claimSet, fn) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claims', $1, false)", [claimSet ? JSON.stringify(claimSet) : ""]);
  await db.exec(`set role ${role}`);
  try {
    return await fn();
  } finally {
    await db.exec("reset role");
  }
}

// A write is "denied" if Postgres raises, or if RLS filters it down to zero rows.
async function writeDenied(role, claimSet, sql, params = []) {
  try {
    const res = await as(role, claimSet, () => db.query(sql, params));
    return (res.affectedRows ?? 0) === 0;
  } catch {
    return true;
  }
}

const titles = (res) => res.rows.map((r) => r.data.title).sort();

test("anonymous visitors see only published content", async () => {
  const res = await as("anon", null, () => db.query("select data from public.content_items"));
  assert.deepEqual(titles(res), ["Live"]);
});

test("signed-in strangers still see only published content", async () => {
  const res = await as("authenticated", claims.stranger, () => db.query("select data from public.content_items"));
  assert.deepEqual(titles(res), ["Live"]);
});

test("owner sees drafts as well", async () => {
  const res = await as("authenticated", claims.owner, () => db.query("select data from public.content_items"));
  assert.deepEqual(titles(res), ["Draft", "Live"]);
});

test("owner email match is case-insensitive", async () => {
  const res = await as("authenticated", claims.ownerUpperCase, () => db.query("select public.is_owner() as ok"));
  assert.equal(res.rows[0].ok, true);
});

test("is_owner() is false for anon, strangers, and a non-Google login with the owner's email", async () => {
  for (const [role, c] of [["anon", null], ["authenticated", claims.stranger], ["authenticated", claims.spoofedProvider]]) {
    const res = await as(role, c, () => db.query("select public.is_owner() as ok"));
    assert.equal(res.rows[0].ok, false);
  }
});

test("anonymous visitors cannot insert, update or delete", async () => {
  assert.ok(await writeDenied("anon", null, "insert into public.content_items (section, slug) values ('project','evil')"));
  assert.ok(await writeDenied("anon", null, "update public.content_items set data = '{\"title\":\"pwned\"}'"));
  assert.ok(await writeDenied("anon", null, "delete from public.content_items"));
});

test("signed-in strangers cannot insert, update or delete", async () => {
  const c = claims.stranger;
  assert.ok(await writeDenied("authenticated", c, "insert into public.content_items (section, slug) values ('project','evil')"));
  assert.ok(await writeDenied("authenticated", c, "update public.content_items set data = '{\"title\":\"pwned\"}'"));
  assert.ok(await writeDenied("authenticated", c, "delete from public.content_items"));
});

test("a non-Google login with the owner's email cannot write", async () => {
  const c = claims.spoofedProvider;
  assert.ok(await writeDenied("authenticated", c, "insert into public.content_items (section, slug) values ('project','evil')"));
  assert.ok(await writeDenied("authenticated", c, "update public.content_items set published = true"));
  assert.ok(await writeDenied("authenticated", c, "delete from public.content_items"));
});

test("after all those attempts the data is untouched", async () => {
  await writeDenied("authenticated", claims.stranger, "delete from public.content_items");
  const res = await db.query("select count(*)::int as n from public.content_items");
  assert.equal(res.rows[0].n, 2);
});

test("owner can insert, update and delete", async () => {
  const ins = await as("authenticated", claims.owner, () =>
    db.query("insert into public.content_items (section, slug, data) values ('experience','job-1','{\"title\":\"Dev\"}')")
  );
  assert.equal(ins.affectedRows, 1);
  const upd = await as("authenticated", claims.owner, () =>
    db.query("update public.content_items set published = true where slug = 'job-1'")
  );
  assert.equal(upd.affectedRows, 1);
  const del = await as("authenticated", claims.owner, () =>
    db.query("delete from public.content_items where slug = 'job-1'")
  );
  assert.equal(del.affectedRows, 1);
});

test("updated_at moves forward on update", async () => {
  const before = await db.query("select updated_at from public.content_items where slug = 'live-one'");
  await new Promise((r) => setTimeout(r, 20));
  await as("authenticated", claims.owner, () =>
    db.query("update public.content_items set position = 5 where slug = 'live-one'")
  );
  const after = await db.query("select updated_at from public.content_items where slug = 'live-one'");
  assert.ok(new Date(after.rows[0].updated_at) > new Date(before.rows[0].updated_at));
});

test("the owner list is not readable by anyone but the database function", async () => {
  for (const [role, c] of [["anon", null], ["authenticated", claims.stranger], ["authenticated", claims.owner]]) {
    let leaked = 0;
    try {
      const res = await as(role, c, () => db.query("select email from public.owner_emails"));
      leaked = res.rows.length;
    } catch {
      leaked = 0;
    }
    assert.equal(leaked, 0, `${role} must not read owner_emails`);
  }
});

test("slug and section formats are enforced", async () => {
  for (const sql of [
    "insert into public.content_items (section, slug) values ('project', 'Has Spaces')",
    "insert into public.content_items (section, slug) values ('project', '../escape')",
    "insert into public.content_items (section, slug) values ('Bad-Section', 'ok')",
  ]) {
    await assert.rejects(() => db.query(sql));
  }
});

test("(section, slug) must be unique", async () => {
  await assert.rejects(() => db.query("insert into public.content_items (section, slug) values ('project','live-one')"));
});

test("storage: only the owner can add objects to either bucket", async () => {
  for (const bucket of ["admin-uploads", "site-images"]) {
    const insert = `insert into storage.objects (bucket_id, name) values ('${bucket}', 'f.txt')`;
    assert.ok(await writeDenied("anon", null, insert), `anon -> ${bucket}`);
    assert.ok(await writeDenied("authenticated", claims.stranger, insert), `stranger -> ${bucket}`);
    assert.ok(!(await writeDenied("authenticated", claims.owner, insert)), `owner -> ${bucket}`);
  }
});

test("storage: private uploads are invisible to everyone but the owner", async () => {
  await db.exec("insert into storage.objects (bucket_id, name) values ('admin-uploads', 'secret.pdf')");
  for (const [role, c, expected] of [["anon", null, 0], ["authenticated", claims.stranger, 0], ["authenticated", claims.owner, 1]]) {
    const res = await as(role, c, () => db.query("select name from storage.objects where bucket_id = 'admin-uploads'"));
    assert.equal(res.rows.length, expected, `${role} sees ${expected}`);
  }
});

test("storage buckets are configured: images public, uploads private", async () => {
  const res = await db.query("select id, public from storage.buckets order by id");
  assert.deepEqual(res.rows, [
    { id: "admin-uploads", public: false },
    { id: "site-images", public: true },
  ]);
});
