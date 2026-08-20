import type { Metadata } from "next"
import { HeartHandshake, Lock, NotebookPen, Quote } from "lucide-react"

import { Container } from "@/components/marketing/container"
import { HeroGlow } from "@/components/marketing/hero-glow"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PillarList, type Pillar } from "@/components/marketing/pillar-list"
import { CtaBanner } from "@/components/marketing/cta-banner"

export const metadata: Metadata = {
  title: "About | Living Echoes Biography Centers",
  description:
    "Living Echoes Biography Centers helps families preserve the life stories of the people they love through private, professionally written digital biographies.",
}

const pillars: Pillar[] = [
  {
    icon: NotebookPen,
    title: "Guided by our team",
    description:
      "You share photos, videos, and memories offline — our team writes and assembles the biography for you. There is nothing to upload or format yourself.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description:
      "Biographies are never public. Up to 10 authorized family members receive their own private, view-only login. Families cannot edit or modify content.",
  },
  {
    icon: HeartHandshake,
    title: "Built to last",
    description:
      "Once created, your loved one's life story is securely preserved for your family — with one year of complimentary remote access included.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <HeroGlow />
        <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-24">
          <h1 className="max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            About Living Echoes Biography Centers
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We help families preserve the life stories of the people they love —
            with the care and dignity those stories deserve.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="mx-auto max-w-3xl">
          <div className="relative">
            <Quote
              className="pointer-events-none absolute -top-6 -left-4 -z-10 size-20 text-gold-100"
              aria-hidden="true"
              strokeWidth={1}
            />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Why we exist
            </h2>
          </div>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <span className="float-left mr-3 font-heading text-6xl leading-[0.75] text-primary italic">
                A
              </span>
              life is more than dates and facts — it&apos;s a collection of
              moments, voices, and photographs that mean everything to the
              people who were there. Living Echoes Biography Centers exists to
              gather those pieces into a single, lasting place: a private
              digital biography that a family can return to for years to come.
            </p>
            <p>
              Rather than asking families to build something themselves during
              an already difficult time, our team does the work. You send us
              what you have — offline, at your own pace — and we turn it into a
              thoughtfully written life story, ready for the people who matter
              most to see.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-secondary/40 py-20">
        <Container>
          <SectionHeading title="How we work" />

          <div className="mt-12">
            <PillarList pillars={pillars} columns={3} />
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Have questions before you get started?"
        description="We're happy to walk you through how everything works."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  )
}
