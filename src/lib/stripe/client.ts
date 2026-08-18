import "server-only";

import Stripe from "stripe";

import { getStripeEnv } from "@/lib/stripe/env";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const { STRIPE_SECRET_KEY } = getStripeEnv();
    stripeClient = new Stripe(STRIPE_SECRET_KEY);
  }

  return stripeClient;
}
