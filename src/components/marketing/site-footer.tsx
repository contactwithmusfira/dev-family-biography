import Link from "next/link"
import { Mail, Phone } from "lucide-react"

import { Container } from "@/components/marketing/container"
import { SiteLogo } from "@/components/marketing/site-logo"
import { legalNavItems, primaryNavItems } from "@/lib/marketing-nav"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <SiteLogo variant="inverted" />
          <p className="max-w-xs text-sm text-primary-foreground/70">
            Permanent, private digital memorials — thoughtfully written and
            lovingly preserved for the families who cherish them.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-primary-foreground">
            Explore
          </h2>
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-primary-foreground">
            Legal
          </h2>
          <nav className="flex flex-col gap-2" aria-label="Legal">
            {legalNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-primary-foreground">
            Contact
          </h2>
          <a
            href="mailto:hello@livingechoes.com"
            className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            hello@livingechoes.com
          </a>
          <a
            href="tel:+10000000000"
            className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            (000) 000-0000
          </a>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-primary-foreground/10 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} Living Echoes. All rights reserved.</p>
        <p>Made with care, for the memories that matter.</p>
      </Container>
    </footer>
  )
}
