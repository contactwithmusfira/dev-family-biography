-- Backfill profiles for auth users created before/onboarding without a profile row.
-- The admin session check requires public.profiles.is_active = true.

insert into public.profiles (id, full_name, is_active)
select
  u.id,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.email),
  true
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- Ensure existing profiles stay active for staff who should already have access.
update public.profiles
set is_active = true
where id in (
  select user_id
  from public.organization_members
  where is_active = true
);
