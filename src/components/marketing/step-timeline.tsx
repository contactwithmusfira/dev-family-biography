import type { LucideIcon } from "lucide-react"

export type TimelineStep = {
  icon: LucideIcon
  title: string
  description: string
}

/**
 * A connected, numbered sequence of steps — a horizontal timeline on large
 * screens (numeral + icon medallions linked by a hairline), a simple
 * vertical list on small screens.
 */
export function StepTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-6 hidden h-px bg-border lg:block"
        aria-hidden="true"
      />
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <div className="relative z-10 flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <span
                className="font-heading text-2xl font-semibold text-gold-300"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
