import type { Metadata } from "next"
import { Mail } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/marketing/container"
import { HeroGlow } from "@/components/marketing/hero-glow"

export const metadata: Metadata = {
  title: "Contact | Living Echoes",
  description:
    "Get in touch with Living Echoes to ask questions or get started with the Founder's Digital-Only Package.",
}

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-20">
      <HeroGlow />
      <Container className="relative mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Have a question about the Founder&apos;s Package, or ready to get
            started? Reach out by email — and after purchase, use the same
            channel to send photos, videos, and memories for the biography.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-md border-l-4 border-l-gold-400 transition-shadow hover:shadow-md">
          <CardHeader>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground ring-1 ring-gold-200">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <CardTitle className="mt-3 text-base">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:hello@livingechoes.com"
              className="text-base font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              hello@livingechoes.com
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For biography materials, send photos and videos (up to 3 minutes
              each) by email or any private method our team agrees on with you.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-2xl bg-secondary/50 p-6 text-center sm:text-left">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Response time
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            We read every message personally. After payment, please allow up to
            2 business days while your family account is reviewed and portal
            access is activated. For memorial-specific questions, mention the
            name on your order so we can find your family&apos;s details
            quickly.
          </p>
        </div>
      </Container>
    </section>
  )
}
