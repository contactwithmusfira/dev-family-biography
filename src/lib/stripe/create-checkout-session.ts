import "server-only";

import { getPrimaryOrganizationId } from "@/lib/organizations/get-primary-organization";
import { FOUNDERS_PRODUCT_SLUG } from "@/lib/stripe/constants";
import { getStripe } from "@/lib/stripe/client";
import { getStripeEnv } from "@/lib/stripe/env";

export async function createCheckoutSessionUrl(): Promise<string> {
  const stripe = getStripe();
  const { STRIPE_PRICE_ID, NEXT_PUBLIC_SITE_URL } = getStripeEnv();
  const tenantId = await getPrimaryOrganizationId();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    phone_number_collection: {
      enabled: true,
    },
    name_collection: {
      individual: {
        enabled: true,
      },
    },
    metadata: {
      product_slug: FOUNDERS_PRODUCT_SLUG,
      tenant_id: tenantId,
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  return session.url;
}
