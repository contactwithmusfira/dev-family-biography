"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import type { NavItem } from "@/lib/marketing-nav"

export function MobileNav({
  navItems,
  legalItems,
}: {
  navItems: NavItem[]
  legalItems: NavItem[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator className="mx-4 w-auto" />
        <nav
          className="flex flex-col gap-1 px-4 pb-4"
          aria-label="Legal"
        >
          {legalItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
