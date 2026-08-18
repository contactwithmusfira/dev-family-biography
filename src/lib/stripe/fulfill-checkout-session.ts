import "server-only";

import type Stripe from "stripe";

import { getPrimaryOrganizationId } from "@/lib/organizations/get-primary-organization";
import { FOUNDERS_PRODUCT_SLUG } from "@/lib/stripe/constants";
import { deriveFamilyName } from "@/lib/stripe/derive-family-name";
import { createAdminClient } from "@/lib/supabase/admin";

function getPaymentIntentId(
  paymentIntent: Stripe.Checkout.Session["payment_intent"],
): string | null {
  if (!paymentIntent) {
    return null;
  }

  return typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id;
}

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<{ created: boolean; familyId?: string }> {
  if (session.payment_status !== "paid") {
    return { created: false };
  }

  const supabase = createAdminClient();

  const { data: existingOrder, error: existingError } = await supabase
    .from("orders")
    .select("id, family_id")
    .eq("stripe_checkout_session_id", session.id)
    .maybeSingle();

  if (existingError) {
    throw new Error(
      `[fulfillCheckoutSession] existing order lookup failed: ${existingError.message}`,
    );
  }

  if (existingOrder) {
    return {
      created: false,
      familyId: existingOrder.family_id ?? undefined,
    };
  }

  const tenantId =
    session.metadata?.tenant_id ?? (await getPrimaryOrganizationId());

  const customerName = session.customer_details?.name ?? null;
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;
  const customerPhone = session.customer_details?.phone ?? null;

  const orderPayload = {
    tenant_id: tenantId,
    product_slug: session.metadata?.product_slug ?? FOUNDERS_PRODUCT_SLUG,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: getPaymentIntentId(session.payment_intent),
    amount_total: session.amount_total,
    currency: session.currency ?? "usd",
    status: "paid" as const,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    family_id: null,
  };

  const { data: insertedOrder, error: orderInsertError } = await supabase
    .from("orders")
    .insert(orderPayload)
    .select("id")
    .single();

  if (orderInsertError) {
    if (orderInsertError.code === "23505") {
      return { created: false };
    }

    throw new Error(
      `[fulfillCheckoutSession] order insert failed: ${orderInsertError.message}`,
    );
  }

  const { data: family, error: familyError } = await supabase
    .from("families")
    .insert({
      tenant_id: tenantId,
      name: deriveFamilyName(customerName),
      primary_contact_name: customerName,
      primary_contact_email: customerEmail,
      primary_contact_phone: customerPhone,
      status: "active",
    })
    .select("id")
    .single();

  if (familyError) {
    throw new Error(
      `[fulfillCheckoutSession] family insert failed: ${familyError.message}`,
    );
  }

  const { error: orderUpdateError } = await supabase
    .from("orders")
    .update({ family_id: family.id })
    .eq("id", insertedOrder.id);

  if (orderUpdateError) {
    throw new Error(
      `[fulfillCheckoutSession] order update failed: ${orderUpdateError.message}`,
    );
  }

  return { created: true, familyId: family.id };
}
