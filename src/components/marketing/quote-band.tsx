import { Quote } from "lucide-react"

import { Container } from "@/components/marketing/container"

export function QuoteBand({ quote }: { quote: string }) {
  return (
    <section className="border-t border-border bg-primary/5 py-16 sm:py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <Quote
          className="mx-auto size-8 text-gold-400"
          aria-hidden="true"
          strokeWidth={1.5}
        />
        <p className="mt-4 font-heading text-2xl leading-snug text-foreground italic sm:text-3xl">
          {quote}
        </p>
      </Container>
    </section>
  )
}
