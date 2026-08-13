import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/marketing/container"
import { HeroGlow } from "@/components/marketing/hero-glow"

export const metadata: Metadata = {
  title: "Contact | Living Echoes",
  description:
    "Get in touch with Living Echoes to ask questions or get started with the Founder's Digital-Only Package.",
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@livingechoes.com",
    href: "mailto:hello@livingechoes.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(000) 000-0000",
    href: "tel:+10000000000",
  },
]

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
            started? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {contactMethods.map((method) => (
            <Card
              key={method.label}
              className="border-l-4 border-l-gold-400 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground ring-1 ring-gold-200">
                  <method.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-base">
                  {method.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={method.href}
                  className="text-base font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {method.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-2xl bg-secondary/50 p-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-base font-semibold text-foreground">
              Response time
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              We read every message personally and aim to get back to you as
              soon as we can. For account or memorial-specific questions,
              please mention the name on your order so we can find your
              family&apos;s details quickly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
