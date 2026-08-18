import { TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Container } from "@/components/marketing/container"

export type LegalSection = {
  heading: string
  body: string[]
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <section className="py-20">
      <Container className="mx-auto max-w-3xl">
        <h1 className="text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <Alert className="mt-8">
          <TriangleAlert aria-hidden="true" />
          <AlertTitle>Draft content — pending legal review</AlertTitle>
          <AlertDescription>
            This page is draft content prepared for design and layout review.
            It has not been reviewed by legal counsel and must be finalized
            before the site goes live.
          </AlertDescription>
        </Alert>

        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              <div className="mt-2 flex flex-col gap-3">
                {section.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
