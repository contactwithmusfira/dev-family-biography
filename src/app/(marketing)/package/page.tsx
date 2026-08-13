import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/marketing/container"
import { HeroGlow } from "@/components/marketing/hero-glow"
import { SectionHeading } from "@/components/marketing/section-heading"

export const metadata: Metadata = {
  title: "Founder's Digital-Only Package | Living Echoes",
  description:
    "A one-time payment for a private, professionally written digital memorial — curated by our team and shared only with the family you choose.",
}

// Placeholder price — confirm final Founder's Package pricing before launch.
const packagePrice = "$799"

const features = [
  "A professionally written, private biography for your loved one",
  "Photos and videos curated into their story",
  "Private portal access for the family members you choose",
  "Fully handled by our team — just share your materials with us",
  "Secure, permanent private hosting for your family's memorial",
]

const trustItems = [
  "One-time payment",
  "No subscription",
  "Private & secure",
]

const faqs = [
  {
    question: "What do I need to send you?",
    answer:
      "Photos, videos, and any written memories or notes you'd like included. You can send these by email, file transfer, or by phone — there's no upload portal to figure out.",
  },
  {
    question: "Who can view the memorial once it's ready?",
    answer:
      "Only the family members you'd like to invite. Each person gets their own private login, and no one outside the people you authorize can see the memorial.",
  },
  {
    question: "Can I add more family members later?",
    answer:
      "Yes. Contact us at any time and we can invite additional authorized family members to the portal.",
  },
  {
    question: "How long does it take to create the memorial?",
    answer:
      "It depends on the materials you send and how much detail you'd like included. Our team will keep you updated on progress after you purchase.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No. The Founder's Digital-Only Package is a single, one-time payment — there are no recurring charges.",
  },
]

export default function PackagePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <HeroGlow />
        <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-24">
          <h1 className="max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            The Founder&apos;s Digital-Only Package
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One payment. A private, lasting digital memorial — written and
            built by our team, shared only with the family you choose.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="mx-auto flex max-w-xl flex-col items-center">
          <div className="relative w-full">
            <span className="absolute -top-3 right-6 z-10 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950 shadow-sm">
              Founding Member Offer
            </span>
            <Card className="border-t-4 border-t-gold-400">
              <CardHeader className="items-center gap-2 text-center">
                <span className="text-sm font-medium text-muted-foreground">
                  One-time payment
                </span>
                <span className="font-heading text-5xl font-semibold text-foreground">
                  {packagePrice}
                </span>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-3 bg-transparent">
                <Button
                  size="lg"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href="/contact" />}
                >
                  Get Started
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Ready to purchase? Contact us and we&apos;ll walk you
                  through the next steps.
                </p>
              </CardFooter>
            </Card>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {trustItems.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-secondary/40 py-20">
        <Container className="mx-auto max-w-2xl">
          <SectionHeading title="Frequently asked questions" />
          <Accordion className="mt-10" multiple>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  )
}
