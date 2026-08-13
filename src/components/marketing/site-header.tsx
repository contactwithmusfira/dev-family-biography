import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/marketing/container"
import { MobileNav } from "@/components/marketing/mobile-nav"
import { SiteLogo } from "@/components/marketing/site-logo"
import { legalNavItems, primaryNavItems } from "@/lib/marketing-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <SiteLogo />

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span
                className="absolute inset-x-0 -bottom-1.5 h-px scale-x-0 bg-gold-500 transition-transform duration-200 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/package" />}
            className="hidden sm:inline-flex"
          >
            Get Started
          </Button>
          <MobileNav navItems={primaryNavItems} legalItems={legalNavItems} />
        </div>
      </Container>
    </header>
  )
}
