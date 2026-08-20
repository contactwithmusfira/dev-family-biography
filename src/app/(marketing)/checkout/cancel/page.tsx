import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/container";

export const metadata: Metadata = {
  title: "Checkout cancelled | Living Echoes Biography Centers",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutCancelPage() {
  return (
    <Container className="flex max-w-2xl flex-col items-center py-20 text-center sm:py-28">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Checkout cancelled
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Your payment was not completed. You can return to the package page and
        try again whenever you are ready.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/package" />}>
          Back to package
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
