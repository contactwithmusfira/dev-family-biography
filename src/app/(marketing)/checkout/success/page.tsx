import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/container";
import { checkoutConfirmationMessage } from "@/lib/marketing/checkout-confirmation-copy";
import { contactEmail } from "@/lib/marketing/contact-email";
import { getStripe } from "@/lib/stripe/client";
import { isStripeConfigured } from "@/lib/stripe/env";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfill-checkout-session";

export const metadata: Metadata = {
  title: "Payment received | Living Echoes Biography Centers",
  robots: {
    index: false,
    follow: false,
  },
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let isVerifiedPayment = false;

  if (sessionId && isStripeConfigured()) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        isVerifiedPayment = true;
        await fulfillCheckoutSession(session);
      }
    } catch (error) {
      console.error("[checkout/success] session verification failed:", error);
    }
  }

  return (
    <Container className="flex max-w-2xl flex-col items-center py-20 text-center sm:py-28">
      <CheckCircle2
        className="size-14 text-primary"
        aria-hidden="true"
      />
      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {isVerifiedPayment ? "Thank you for your purchase" : "Payment received"}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        {checkoutConfirmationMessage}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        When you are ready, send your photos, videos, and written life-story
        materials to{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {contactEmail}
        </a>
        . Our team will guide you from there.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/" />}>
          Return home
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Contact us
        </Button>
      </div>
    </Container>
  );
}
