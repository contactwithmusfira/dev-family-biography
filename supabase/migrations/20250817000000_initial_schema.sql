-- Living Echoes Phase 1 — core schema
-- Apply via Supabase Dashboard SQL editor or: supabase db push

-- ---------------------------------------------------------------------------
-- Extensions & helpers
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.family_status as enum ('active', 'deactivated');

create type public.biography_status as enum ('draft', 'approved', 'archived');

create type public.media_type as enum ('image', 'video');

create type public.order_status as enum (
  'pending',
  'paid',
  'failed',
  'refunded',
  'cancelled'
);

create type public.organization_member_role as enum ('admin', 'moderator');

-- ---------------------------------------------------------------------------
-- Organizations (tenant root)
-- ---------------------------------------------------------------------------

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  is_primary boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create unique index organizations_one_primary_idx
  on public.organizations (is_primary)
  where is_primary = true;

-- ---------------------------------------------------------------------------
-- Profiles (global identity, 1:1 with auth.users)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  is_platform_admin boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Organization membership (staff)
-- ---------------------------------------------------------------------------

create table public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.organization_member_role not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (organization_id, user_id)
);

create index organization_members_user_id_idx
  on public.organization_members (user_id);

create trigger organization_members_set_updated_at
before update on public.organization_members
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Families (customer account container)
-- ---------------------------------------------------------------------------

create table public.families (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.organizations (id) on delete restrict,
  name text not null,
  status public.family_status not null default 'active',
  primary_contact_name text,
  primary_contact_email text,
  primary_contact_phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index families_tenant_id_idx on public.families (tenant_id);
create index families_status_idx on public.families (status);

create trigger families_set_updated_at
before update on public.families
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Family members (authorized portal users)
-- ---------------------------------------------------------------------------

create table public.family_members (
  family_id uuid not null references public.families (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  tenant_id uuid not null references public.organizations (id) on delete restrict,
  relationship_label text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (family_id, user_id)
);

create unique index family_members_one_family_per_user_idx
  on public.family_members (user_id);

create index family_members_tenant_id_idx on public.family_members (tenant_id);

create trigger family_members_set_updated_at
before update on public.family_members
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Biographies
-- ---------------------------------------------------------------------------

create table public.biographies (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families (id) on delete cascade,
  tenant_id uuid not null references public.organizations (id) on delete restrict,
  full_name text not null,
  story text,
  status public.biography_status not null default 'draft',
  approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index biographies_family_id_idx on public.biographies (family_id);
create index biographies_tenant_id_idx on public.biographies (tenant_id);
create index biographies_status_idx on public.biographies (status);

create trigger biographies_set_updated_at
before update on public.biographies
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Media
-- ---------------------------------------------------------------------------

create table public.media (
  id uuid primary key default gen_random_uuid(),
  biography_id uuid not null references public.biographies (id) on delete cascade,
  family_id uuid not null references public.families (id) on delete cascade,
  tenant_id uuid not null references public.organizations (id) on delete restrict,
  media_type public.media_type not null,
  storage_path text not null,
  caption text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index media_biography_id_idx on public.media (biography_id);
create index media_family_id_idx on public.media (family_id);
create index media_tenant_id_idx on public.media (tenant_id);

create trigger media_set_updated_at
before update on public.media
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Orders / payments (subscription-ready shape)
-- ---------------------------------------------------------------------------

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references public.families (id) on delete set null,
  tenant_id uuid not null references public.organizations (id) on delete restrict,
  product_slug text not null default 'founders-digital-only',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  amount_total integer,
  currency text not null default 'usd',
  status public.order_status not null default 'pending',
  customer_name text,
  customer_email text,
  customer_phone text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index orders_family_id_idx on public.orders (family_id);
create index orders_tenant_id_idx on public.orders (tenant_id);
create index orders_status_idx on public.orders (status);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Seed primary organization
-- ---------------------------------------------------------------------------

insert into public.organizations (name, slug, is_primary, is_active)
values ('Living Echoes', 'living-echoes', true, true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security (baseline — tighten as admin/portal routes land)
-- ---------------------------------------------------------------------------

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.biographies enable row level security;
alter table public.media enable row level security;
alter table public.orders enable row level security;

-- Users can read their own profile
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Family members can read their own membership rows
create policy "family_members_select_own"
  on public.family_members for select
  to authenticated
  using (user_id = auth.uid());

-- Staff can read orgs they belong to
create policy "organizations_select_member"
  on public.organizations for select
  to authenticated
  using (
    exists (
      select 1
      from public.organization_members om
      where om.organization_id = organizations.id
        and om.user_id = auth.uid()
        and om.is_active = true
    )
  );

create policy "organization_members_select_own"
  on public.organization_members for select
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Private media storage bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  false,
  524288000,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/quicktime',
    'video/webm'
  ]
)
on conflict (id) do nothing;
