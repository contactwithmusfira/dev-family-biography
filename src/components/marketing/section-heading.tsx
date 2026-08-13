import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: "center" | "left"
  className?: string
}) {
  const isCentered = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered
          ? "mx-auto max-w-2xl items-center text-center"
          : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-2.5",
            isCentered && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
            {eyebrow}
          </span>
          {isCentered && (
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
          )}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
