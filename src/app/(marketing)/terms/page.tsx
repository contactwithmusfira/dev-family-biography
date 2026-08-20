import type { Metadata } from "next"

import { LegalPage, type LegalSection } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Terms & Conditions | Living Echoes Biography Centers",
  description:
    "The terms that govern your use of Living Echoes Biography Centers.",
}

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "By purchasing the Founder's Digital-Only Package or accessing the Family Portal, you agree to these Terms & Conditions. If you do not agree, please do not use our services.",
    ],
  },
  {
    heading: "2. Description of service",
    body: [
      "Living Echoes Biography Centers creates private, digital biographies and life stories on behalf of the families who purchase our Founder's Digital-Only Package. Our team writes and assembles each biography using the photos, videos, and information you provide offline; you do not create, upload, or edit content yourself.",
      "Once a biography is approved and published by our team, up to 10 authorized family members may view it, along with any published photos and videos, through the private, view-only Family Portal.",
    ],
  },
  {
    heading: "3. Payments & remote access",
    body: [
      "The Founder's Digital-Only Package is sold as a one-time payment for one professionally written biography for one person. Purchasing the package creates your family's account; it does not automatically grant portal access, which begins once the biography has been approved and members have been invited.",
      "The package includes one year of complimentary remote access to the Family Portal. Continued remote access after the first year requires a paid subscription, the terms and pricing of which will be communicated separately.",
      "For questions about a specific charge, refund, or your order, please contact us directly.",
    ],
  },
  {
    heading: "4. Account access & security",
    body: [
      "Family Portal access is invite-only and granted by a Living Echoes Biography Centers administrator. Each authorized member receives their own login and is responsible for keeping their credentials confidential.",
      "Authorized family members have view-only access. They may not upload, edit, or modify biography content, manage media, or invite other members through the portal.",
      "We may deactivate a member's access, or an entire family's access, if we believe it is necessary to protect the security of the platform or as otherwise permitted under these terms.",
    ],
  },
  {
    heading: "5. Content ownership & use",
    body: [
      "You retain ownership of the photos, videos, and personal materials you send us. By sending them to Living Echoes Biography Centers, you grant us permission to use them solely to create, host, and update the biography you purchased.",
      "The written biography we produce is provided for your family's private use within the Family Portal and is not intended for public redistribution without our agreement.",
    ],
  },
  {
    heading: "6. Acceptable use",
    body: [
      "You agree not to attempt to access biographies or accounts belonging to other families, share your login credentials with unauthorized people, or use the platform for any unlawful purpose.",
    ],
  },
  {
    heading: "7. Disclaimers & limitation of liability",
    body: [
      "Living Echoes Biography Centers provides its services on an \"as is\" basis. While we take reasonable care in producing and safeguarding each biography, we are not liable for indirect or consequential damages arising from your use of the service, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "8. Governing law",
    body: [
      "These terms are governed by the laws of the jurisdiction in which Living Echoes Biography Centers operates, without regard to conflict-of-law principles. The applicable jurisdiction will be confirmed here before launch.",
    ],
  },
  {
    heading: "9. Changes to these terms",
    body: [
      "We may update these terms from time to time. If we make material changes, we will update the date at the top of this page.",
    ],
  },
  {
    heading: "10. Contact us",
    body: [
      "If you have questions about these terms, please reach out through our Contact page.",
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="Draft — date to be confirmed"
      intro="These Terms & Conditions govern your purchase of the Founder's Digital-Only Package and your use of the Living Echoes Biography Centers Family Portal."
      sections={sections}
    />
  )
}
