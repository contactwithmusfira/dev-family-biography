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
import { checkoutApprovalWindowLabel } from "@/lib/marketing/checkout-confirmation-copy"

export const metadata: Metadata = {
  title: "Founder's Digital-Only Package | Living Echoes",
  description:
    "A one-time payment for one private, professionally written digital memorial — curated by our team and shared with up to ten family members you choose.",
}

// Confirm final Founder's Package pricing in Stripe before launch.
const packagePrice = "$799"

const features = [
  "One professionally written, private biography for your loved one",
  "Photos and videos curated into their story (videos up to 3 minutes)",
  "Private portal access for up to 10 authorized family members",
  "Fully handled by our team — share materials by email or private contact",
  "Secure, permanent private hosting — view-only in the family portal",
]

const trustItems = [
  "One-time payment",
  "One biography per package",
  "Private & secure",
]

const faqs = [
  {
    question: "Does one package cover more than one person?",
    answer:
      "The Founder's Digital-Only Package includes one person's biography. An additional person would require a separate purchase or the applicable Family Echoes option when available.",
  },
  {
    question: "What do I need to send you?",
    answer:
      "Photos, videos (up to 3 minutes each), and any written memories or notes you'd like included. Send these by email or any other private communication method our team agrees on with you — there is no customer upload portal.",
  },
  {
    question: "Who can view the memorial once it's ready?",
    answer:
      "Up to 10 authorized family members you choose. Each person gets their own private login. No one outside the people you authorize can see the memorial.",
  },
  {
    question: "Can family members download photos or videos?",
    answer:
      "No. Media is view-only within the private family portal — there is no download option for family members.",
  },
  {
    question: "Can I add more family members later?",
    answer:
      "Yes. Contact us and we can invite additional authorized members. The default package includes up to 10; our team can adjust that limit when needed.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "You'll receive a confirmation that your payment was received. Your family account is reviewed and portal access is activated by our team — please allow up to 2 business days. We'll email you when your private portal is ready. There is no login for you to use immediately after checkout.",
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
            One payment for one private, lasting digital memorial — written and
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
                  One-time payment · one biography
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
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  After payment, your family account is reviewed by our team.
                  Portal access is activated within{" "}
                  {checkoutApprovalWindowLabel}. We&apos;ll email you when your
                  private portal is ready.
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
