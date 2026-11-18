-- AKAL store: products table + image bucket + admin login with a server-side lockout.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.products (
  slug          text primary key,
  name_fr       text not null,
  name_ar       text not null default '',
  category_fr   text not null default '',
  category_ar   text not null default '',
  badge_fr      text,
  badge_ar      text,
  short_fr      text not null default '',
  short_ar      text not null default '',
  description_fr text not null default '',
  description_ar text not null default '',
  image         text not null default '',
  sizes         jsonb not null default '[]'::jsonb,   -- [{ "label": "250 g", "price": 45 }]
  in_stock      boolean not null default true,
  position      integer not null default 0,
  created_at    timestamptz not null default now()
);

alter table public.products enable row level security;

-- Everyone (the public store) can read products.
drop policy if exists "products are public" on public.products;
create policy "products are public" on public.products for select using (true);

-- Only a signed-in admin can add / edit / delete.
drop policy if exists "admin writes products" on public.products;
create policy "admin writes products" on public.products for all
  to authenticated using (true) with check (true);

-- Public bucket for product photos (only signed-in admins can upload).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product images are public" on storage.objects;
create policy "product images are public" on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "admin uploads product images" on storage.objects;
create policy "admin uploads product images" on storage.objects for all
  to authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');

-- ---------------------------------------------------------------------------
-- Admin login: username + 6-digit code, 5 wrong attempts in total lock the panel
-- until the developer runs:   select public.admin_unlock();
-- The counter lives here (server side) so it cannot be bypassed from the browser.
-- The real Supabase Auth password is a long random secret that is only handed out
-- when the username + code are right, so the Auth endpoint cannot be brute-forced.
-- ---------------------------------------------------------------------------
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
  username    text primary key,
  pin_hash    text not null,      -- bcrypt hash of the 6-digit code
  auth_email  text not null,      -- the Supabase Auth user behind this admin
  auth_secret text not null       -- long random Auth password (never shown to anyone)
);

create table if not exists public.admin_lock (
  id       int primary key default 1 check (id = 1),
  failures int not null default 0,
  locked   boolean not null default false
);
insert into public.admin_lock (id) values (1) on conflict do nothing;

-- No policies on purpose: nobody can read these tables directly.
alter table public.admin_users enable row level security;
alter table public.admin_lock  enable row level security;

create or replace function public.admin_login(p_username text, p_pin text)
returns jsonb
language plpgsql security definer set search_path = public, extensions
as $$
declare
  u public.admin_users;
  l public.admin_lock;
begin
  select * into l from public.admin_lock where id = 1 for update;
  if l.locked then return jsonb_build_object('status', 'locked'); end if;

  select * into u from public.admin_users where username = lower(trim(p_username));
  if u.username is not null and u.pin_hash = crypt(p_pin, u.pin_hash) then
    update public.admin_lock set failures = 0 where id = 1;
    return jsonb_build_object('status', 'ok', 'email', u.auth_email, 'secret', u.auth_secret);
  end if;

  update public.admin_lock
     set failures = failures + 1, locked = (failures + 1 >= 5)
   where id = 1 returning * into l;
  if l.locked then return jsonb_build_object('status', 'locked'); end if;
  return jsonb_build_object('status', 'invalid', 'remaining', 5 - l.failures);
end $$;

create or replace function public.admin_is_locked()
returns boolean
language sql security definer set search_path = public
as $$ select locked from public.admin_lock where id = 1 $$;

-- Developer-only helpers (run them from the SQL Editor; the browser cannot call them).
create or replace function public.admin_create(p_username text, p_pin text, p_email text, p_secret text)
returns void
language plpgsql security definer set search_path = public, extensions
as $$
begin
  if p_pin !~ '^[0-9]{6}$' then raise exception 'The code must be exactly 6 digits'; end if;
  if length(p_secret) < 24 then raise exception 'Use a long random Auth password (24+ characters)'; end if;
  insert into public.admin_users (username, pin_hash, auth_email, auth_secret)
  values (lower(trim(p_username)), crypt(p_pin, gen_salt('bf')), p_email, p_secret)
  on conflict (username) do update
    set pin_hash = excluded.pin_hash, auth_email = excluded.auth_email, auth_secret = excluded.auth_secret;
end $$;

create or replace function public.admin_unlock()
returns void
language sql security definer set search_path = public
as $$ update public.admin_lock set failures = 0, locked = false where id = 1 $$;

revoke all on function public.admin_login(text, text) from public;
revoke all on function public.admin_is_locked() from public;
revoke all on function public.admin_create(text, text, text, text) from public, anon, authenticated;
revoke all on function public.admin_unlock() from public, anon, authenticated;
grant execute on function public.admin_login(text, text) to anon, authenticated;
grant execute on function public.admin_is_locked() to anon, authenticated;
