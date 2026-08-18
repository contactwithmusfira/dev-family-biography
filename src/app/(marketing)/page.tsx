import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  BookHeart,
  Gift,
  Images,
  Infinity as InfinityIcon,
  Lock,
  ShieldCheck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/marketing/container"
import { HeroGlow } from "@/components/marketing/hero-glow"
import { SectionHeading } from "@/components/marketing/section-heading"
import { StepTimeline, type TimelineStep } from "@/components/marketing/step-timeline"
import { QuoteBand } from "@/components/marketing/quote-band"
import { PillarList, type Pillar } from "@/components/marketing/pillar-list"
import { CtaBanner } from "@/components/marketing/cta-banner"

export const metadata: Metadata = {
  title: "Living Echoes | Private Digital Memorials",
  description:
    "Living Echoes creates permanent, private online memorials for loved ones — thoughtfully written and shared only with the family you choose.",
}

const trustItems = [
  "Private by design",
  "One-time payment",
  "Personally written",
]

const steps: TimelineStep[] = [
  {
    icon: Gift,
    title: "Purchase the Founder's Package",
    description:
      "A single, one-time payment covers one person's biography — no subscriptions, no hidden fees.",
  },
  {
    icon: Images,
    title: "Share their story with us",
    description:
      "Send photos, videos (up to 3 minutes each), and memories by email or any private channel our team agrees on with you.",
  },
  {
    icon: BookHeart,
    title: "We craft the biography",
    description:
      "Our team writes and assembles the memorial from what you share. Your account is reviewed and access is activated within up to 2 business days.",
  },
  {
    icon: Lock,
    title: "Your family receives private access",
    description:
      "Up to 10 authorized members get their own login to view the memorial in a private, view-only portal.",
  },
]

const values: Pillar[] = [
  {
    icon: ShieldCheck,
    title: "Private & secure",
    description:
      "Every memorial lives behind a private login. Nothing is public, and only the family members you authorize can view it.",
  },
  {
    icon: Users,
    title: "Made for the whole family",
    description:
      "Invite up to 10 authorized family members — parents, siblings, children — to revisit the memorial whenever they need to.",
  },
  {
    icon: BookHeart,
    title: "Written with care, by us",
    description:
      "You don't have to write or upload anything yourself. Just share your materials — our team handles the rest.",
  },
  {
    icon: InfinityIcon,
    title: "A lasting keepsake",
    description:
      "Once created, the memorial is kept safe and accessible for your family for years to come.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroGlow />
        <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Badge variant="secondary">
              Founder&apos;s Digital-Only Package
            </Badge>
            <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
              A private, lasting place to remember the ones you love.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Living Echoes creates a permanent, beautifully written digital
              memorial for your loved one — crafted by our team, and shared
              only with the people you choose.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/package" />}
              >
                View the Founder&apos;s Package
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Contact Us
              </Button>
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
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
          </div>

          <div className="w-full overflow-hidden rounded-2xl ring-1 ring-border shadow-lg">
            <Image
              src="/brand/living-echoes-cover.png"
              alt="Living Echoes Biography Centers — Every life. A story worth remembering. Honoring Lives. Preserving Legacies. Celebrating Stories."
              width={1024}
              height={450}
              className="h-auto w-full"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-secondary/40 py-20">
        <Container>
          <SectionHeading
            eyebrow="The process"
            title="How it works"
            subtitle="From purchase to a private family portal — here's what to expect."
          />

          <div className="mt-14">
            <StepTimeline steps={steps} />
          </div>
        </Container>
      </section>

      <QuoteBand quote="Every life leaves an echo worth preserving." />

      <section className="py-20">
        <Container>
          <SectionHeading title="Why families choose Living Echoes" />

          <div className="mt-12">
            <PillarList pillars={values} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to create a lasting tribute?"
        description="Reserve the Founder's Digital-Only Package today, and let us help you preserve their story."
        buttonLabel="View the Founder's Package"
        buttonHref="/package"
      />
    </>
  )
}
