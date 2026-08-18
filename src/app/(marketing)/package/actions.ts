"use server";

import { redirect } from "next/navigation";

import { createCheckoutSessionUrl } from "@/lib/stripe/create-checkout-session";
import { isStripeConfigured } from "@/lib/stripe/env";

export async function startCheckout(): Promise<void> {
  if (!isStripeConfigured()) {
    throw new Error(
      "Checkout is not configured. Add Stripe environment variables.",
    );
  }

  const checkoutUrl = await createCheckoutSessionUrl();
  redirect(checkoutUrl);
}
