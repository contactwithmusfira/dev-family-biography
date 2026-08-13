import Link from "next/link"
import { Leaf } from "lucide-react"

import { cn } from "@/lib/utils"

export function SiteLogo({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "inverted"
}) {
  const isInverted = variant === "inverted"

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading text-lg font-medium",
        isInverted ? "text-primary-foreground" : "text-foreground",
        className
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isInverted
            ? "bg-gold-500 text-navy-950"
            : "bg-primary text-primary-foreground"
        )}
      >
        <Leaf className="size-4" aria-hidden="true" />
      </span>
      <span>
        Living{" "}
        <span className={isInverted ? "text-gold-400" : "text-primary"}>
          Echoes
        </span>
      </span>
    </Link>
  )
}
