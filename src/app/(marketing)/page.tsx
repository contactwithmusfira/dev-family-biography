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
  title: "Living Echoes Biography Centers | Private Digital Biographies",
  description:
    "Living Echoes Biography Centers professionally creates and preserves private digital biographies and life stories — written by our team and shared only with the family you choose.",
}

const trustItems = [
  "Private by design",
  "One-time package payment",
  "Professionally written",
]

const steps: TimelineStep[] = [
  {
    icon: Gift,
    title: "Purchase the Founder's Package",
    description:
      "A single, one-time Founding Member payment covers one person's professionally written biography, including one year of complimentary remote access to the Family Portal.",
  },
  {
    icon: Images,
    title: "Share their life story with us",
    description:
      "Send photos, videos (up to 3 minutes each), and written memories by email or any private channel our team agrees on with you. Our team handles creation — there is no customer upload portal.",
  },
  {
    icon: BookHeart,
    title: "We craft the biography",
    description:
      "Our team writes and assembles the digital biography from what you share. When it is ready, we invite your authorized family members to the private portal.",
  },
  {
    icon: Lock,
    title: "Your family receives private access",
    description:
      "Up to 10 authorized members get their own login to view the biography in a private, view-only portal. Families cannot upload, edit, or modify biography content.",
  },
]

const values: Pillar[] = [
  {
    icon: ShieldCheck,
    title: "Private & secure",
    description:
      "Every biography lives behind a private login. Nothing is public, and only the family members you authorize can view it.",
  },
  {
    icon: Users,
    title: "Made for the whole family",
    description:
      "Up to 10 authorized family members — parents, siblings, children — can revisit the life story whenever they need to, each with their own login.",
  },
  {
    icon: BookHeart,
    title: "Written with care, by us",
    description:
      "You do not write or upload content yourself. Share your materials offline and our team professionally creates and preserves the biography.",
  },
  {
    icon: InfinityIcon,
    title: "A lasting legacy",
    description:
      "Your loved one's life story is thoughtfully written and securely hosted, with one year of complimentary remote access included and the option to continue thereafter.",
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
              A private, lasting place to honor the life stories you cherish.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Living Echoes Biography Centers professionally creates a
              beautifully written digital biography for your loved one — crafted
              by our team, and shared only with the people you choose.
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
          <SectionHeading title="Why families choose Living Echoes Biography Centers" />

          <div className="mt-12">
            <PillarList pillars={values} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to preserve a life story?"
        description="Reserve the Founder's Digital-Only Package today, and let us help you create a lasting digital biography."
        buttonLabel="View the Founder's Package"
        buttonHref="/package"
      />
    </>
  )
}
