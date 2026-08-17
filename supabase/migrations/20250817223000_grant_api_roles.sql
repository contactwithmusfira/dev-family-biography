-- Supabase PostgREST requires explicit grants to anon/authenticated roles.
-- RLS policies alone are not enough. Without these, the app sees empty results
-- even when rows exist (SQL Editor runs as postgres and bypasses both).

grant usage on schema public to anon, authenticated, service_role;

grant usage on type public.family_status to authenticated;
grant usage on type public.biography_status to authenticated;
grant usage on type public.media_type to authenticated;
grant usage on type public.order_status to authenticated;
grant usage on type public.organization_member_role to authenticated;

-- Read access needed for admin auth checks and future portal reads
grant select on public.organizations to authenticated;
grant select on public.profiles to authenticated;
grant select on public.organization_members to authenticated;
grant select on public.families to authenticated;
grant select on public.family_members to authenticated;
grant select on public.biographies to authenticated;
grant select on public.media to authenticated;
grant select on public.orders to authenticated;

-- Staff will mutate these in Milestone 2+ (RLS still enforces row scope)
grant insert, update, delete on public.families to authenticated;
grant insert, update, delete on public.family_members to authenticated;
grant insert, update, delete on public.biographies to authenticated;
grant insert, update, delete on public.media to authenticated;
grant insert, update, delete on public.orders to authenticated;

grant update on public.profiles to authenticated;

-- Default privileges for future tables in public schema
alter default privileges in schema public
grant select on tables to authenticated;

alter default privileges in schema public
grant usage on types to authenticated;
