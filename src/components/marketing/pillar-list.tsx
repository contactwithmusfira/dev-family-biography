import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

/**
 * A light, borderless icon-led list of feature/value rows — used instead of
 * a grid of boxed cards for a calmer, more editorial feel.
 */
export function PillarList({
  pillars,
  columns = 2,
}: {
  pillars: Pillar[]
  columns?: 2 | 3
}) {
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-10 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3"
      )}
    >
      {pillars.map((pillar) => (
        <div key={pillar.title} className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground ring-1 ring-gold-200">
            <pillar.icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
