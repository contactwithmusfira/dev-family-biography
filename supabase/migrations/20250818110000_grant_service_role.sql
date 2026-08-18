-- Server-side operations (Stripe webhook, checkout) use the service_role client.
-- The initial grants migration only covered authenticated for table access.

grant usage on type public.family_status to service_role;
grant usage on type public.biography_status to service_role;
grant usage on type public.media_type to service_role;
grant usage on type public.order_status to service_role;
grant usage on type public.organization_member_role to service_role;

grant select on public.organizations to service_role;
grant select, insert, update on public.families to service_role;
grant select, insert, update on public.orders to service_role;
