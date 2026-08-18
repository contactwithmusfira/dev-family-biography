-- Staff RLS policies for Milestone 2 admin family/order reads.
-- Webhook writes use the service-role client (bypasses RLS).

create or replace function public.is_staff_of_tenant(p_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.user_id = auth.uid()
      and om.organization_id = p_tenant_id
      and om.is_active = true
      and om.role in ('admin', 'moderator')
  );
$$;

revoke all on function public.is_staff_of_tenant(uuid) from public;
grant execute on function public.is_staff_of_tenant(uuid) to authenticated;

create policy "families_select_staff"
  on public.families for select
  to authenticated
  using (public.is_staff_of_tenant(tenant_id));

create policy "orders_select_staff"
  on public.orders for select
  to authenticated
  using (public.is_staff_of_tenant(tenant_id));
