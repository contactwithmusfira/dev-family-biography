import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/marketing/container"

export function CtaBanner({
  title,
  description,
  buttonLabel,
  buttonHref,
}: {
  title: React.ReactNode
  description: React.ReactNode
  buttonLabel: string
  buttonHref: string
}) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-16 text-primary-foreground">
      <Leaf
        className="pointer-events-none absolute -bottom-10 -right-6 size-48 text-primary-foreground/5"
        aria-hidden="true"
        strokeWidth={1}
      />
      <Container className="relative flex flex-col items-center gap-5 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-primary-foreground/80">{description}</p>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={<Link href={buttonHref} />}
        >
          {buttonLabel}
        </Button>
      </Container>
    </section>
  )
}
