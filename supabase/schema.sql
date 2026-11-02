-- Portfolio CMS schema for Supabase.
--
-- HOW TO APPLY: Supabase dashboard -> SQL Editor -> paste this whole file -> Run.
-- It is idempotent, so running it again after edits is safe.
--
-- SECURITY MODEL
--   * Anyone can read rows with published = true (that is the public website).
--   * Only the owner can read drafts or write anything. "Owner" means a user who
--     signed in with Google AND whose email is listed in public.owner_emails.
--   * Enforcement is by Postgres row-level security (RLS), so it holds even if
--     someone calls the database directly with the public anon key.
--
-- AFTER RUNNING, add yourself as owner (use the Google account you sign in with):
--   insert into public.owner_emails (email) values ('you@example.com');

-- ---------------------------------------------------------------------------
-- Owners
-- ---------------------------------------------------------------------------
create table if not exists public.owner_emails (
  email text primary key
);

-- RLS on with no policies = no direct access for anon/authenticated.
-- Only the SECURITY DEFINER function below can read it.
alter table public.owner_emails enable row level security;
revoke all on public.owner_emails from anon, authenticated;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'provider', '') = 'google'
     and exists (
       select 1
       from public.owner_emails o
       where lower(o.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
     );
$$;

revoke all on function public.is_owner() from public;
grant execute on function public.is_owner() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Content
-- ---------------------------------------------------------------------------
create table if not exists public.content_items (
  id           uuid primary key default gen_random_uuid(),
  section      text not null check (section ~ '^[a-z][a-z_]{1,30}$'),
  slug         text not null check (slug ~ '^[a-z0-9][a-z0-9-]{0,62}$'),
  -- Canonical (English) fields; the shape is defined per section in api/_lib/sections.js
  data         jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  -- Per-language overrides, e.g. {"id": {...translatable fields...}, "zh": {...}}
  translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object'),
  position     integer not null default 0,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (section, slug),
  check (pg_column_size(data) < 400000 and pg_column_size(translations) < 800000)
);

create index if not exists content_items_section_idx
  on public.content_items (section, position);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_items_touch on public.content_items;
create trigger content_items_touch
  before update on public.content_items
  for each row execute function public.touch_updated_at();

alter table public.content_items enable row level security;

drop policy if exists "public reads published" on public.content_items;
create policy "public reads published" on public.content_items
  for select to anon, authenticated
  using (published);

drop policy if exists "owner reads all" on public.content_items;
create policy "owner reads all" on public.content_items
  for select to authenticated
  using (public.is_owner());

drop policy if exists "owner inserts" on public.content_items;
create policy "owner inserts" on public.content_items
  for insert to authenticated
  with check (public.is_owner());

drop policy if exists "owner updates" on public.content_items;
create policy "owner updates" on public.content_items
  for update to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "owner deletes" on public.content_items;
create policy "owner deletes" on public.content_items
  for delete to authenticated
  using (public.is_owner());

grant select on public.content_items to anon, authenticated;
grant insert, update, delete on public.content_items to authenticated;

-- ---------------------------------------------------------------------------
-- Storage
--   site-images   : public bucket for images shown on the site (owner uploads)
--   admin-uploads : PRIVATE bucket for documents handed to Claude (owner only)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('site-images', 'site-images', true, 5242880,
    array['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
  ('admin-uploads', 'admin-uploads', false, 10485760, null)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "owner inserts site images" on storage.objects;
create policy "owner inserts site images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_owner());

drop policy if exists "owner updates site images" on storage.objects;
create policy "owner updates site images" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-images' and public.is_owner())
  with check (bucket_id = 'site-images' and public.is_owner());

drop policy if exists "owner deletes site images" on storage.objects;
create policy "owner deletes site images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-images' and public.is_owner());

drop policy if exists "owner manages uploads" on storage.objects;
create policy "owner manages uploads" on storage.objects
  for all to authenticated
  using (bucket_id = 'admin-uploads' and public.is_owner())
  with check (bucket_id = 'admin-uploads' and public.is_owner());
