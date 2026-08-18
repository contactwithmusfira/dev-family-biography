import { NextResponse } from "next/server";

import { createCheckoutSessionUrl } from "@/lib/stripe/create-checkout-session";
import { isStripeConfigured } from "@/lib/stripe/env";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Checkout is not configured." },
      { status: 503 },
    );
  }

  try {
    const url = await createCheckoutSessionUrl();
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[POST /api/checkout]", error);
    return NextResponse.json(
      { error: "Unable to start checkout." },
      { status: 500 },
    );
  }
}
