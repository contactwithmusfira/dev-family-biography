export type NavItem = {
  label: string
  href: string
}

/** Primary site navigation, shared by the header and footer. */
export const primaryNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Founder's Package", href: "/package" },
  { label: "Contact", href: "/contact" },
]

/** Legal links shown in the footer only. */
export const legalNavItems: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
]