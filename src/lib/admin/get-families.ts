import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AdminFamilyRow = {
  id: string;
  name: string;
  status: string;
  primaryContactName: string | null;
  primaryContactEmail: string | null;
  primaryContactPhone: string | null;
  createdAt: string;
  latestOrderAmount: number | null;
  latestOrderCurrency: string | null;
  latestOrderStatus: string | null;
};

export async function getAdminFamilies(
  organizationId: string,
): Promise<AdminFamilyRow[]> {
  const supabase = await createClient();

  const { data: families, error: familiesError } = await supabase
    .from("families")
    .select(
      "id, name, status, primary_contact_name, primary_contact_email, primary_contact_phone, created_at",
    )
    .eq("tenant_id", organizationId)
    .order("created_at", { ascending: false });

  if (familiesError) {
    throw new Error(
      `[getAdminFamilies] families query failed: ${familiesError.message}`,
    );
  }

  if (!families?.length) {
    return [];
  }

  const familyIds = families.map((family) => family.id);

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("family_id, amount_total, currency, status, created_at")
    .in("family_id", familyIds)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(
      `[getAdminFamilies] orders query failed: ${ordersError.message}`,
    );
  }

  const latestOrderByFamily = new Map<
    string,
    {
      amount_total: number | null;
      currency: string | null;
      status: string | null;
    }
  >();

  for (const order of orders ?? []) {
    if (!order.family_id || latestOrderByFamily.has(order.family_id)) {
      continue;
    }

    latestOrderByFamily.set(order.family_id, {
      amount_total: order.amount_total,
      currency: order.currency,
      status: order.status,
    });
  }

  return families.map((family) => {
    const latestOrder = latestOrderByFamily.get(family.id);

    return {
      id: family.id,
      name: family.name,
      status: family.status,
      primaryContactName: family.primary_contact_name,
      primaryContactEmail: family.primary_contact_email,
      primaryContactPhone: family.primary_contact_phone,
      createdAt: family.created_at,
      latestOrderAmount: latestOrder?.amount_total ?? null,
      latestOrderCurrency: latestOrder?.currency ?? null,
      latestOrderStatus: latestOrder?.status ?? null,
    };
  });
}
