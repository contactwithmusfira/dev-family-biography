import type { Metadata } from "next"

import { LegalPage, type LegalSection } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Terms & Conditions | Living Echoes",
  description: "The terms that govern your use of Living Echoes.",
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
      "Living Echoes creates private, digital biographies of loved ones on behalf of the families who purchase our Founder's Digital-Only Package. Our team writes and assembles each biography using the materials you provide; you do not create or upload content yourself.",
      "Once a biography is approved and published by our team, authorized family members you invite may view it, along with any published photos and videos, through the Family Portal.",
    ],
  },
  {
    heading: "3. Payments",
    body: [
      "The Founder's Digital-Only Package is sold as a one-time payment. Purchasing the package creates your family's account; it does not automatically grant portal access, which begins once the biography has been approved and members have been invited.",
      "For questions about a specific charge, refund, or your order, please contact us directly.",
    ],
  },
  {
    heading: "4. Account access & security",
    body: [
      "Family Portal access is invite-only and granted by a Living Echoes administrator. Each authorized member receives their own login and is responsible for keeping their credentials confidential.",
      "We may deactivate a member's access, or an entire family's access, if we believe it is necessary to protect the security of the platform or as otherwise permitted under these terms.",
    ],
  },
  {
    heading: "5. Content ownership & use",
    body: [
      "You retain ownership of the photos, videos, and personal materials you send us. By sending them to Living Echoes, you grant us permission to use them solely to create and host the biography you purchased.",
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
      "Living Echoes provides its services on an \"as is\" basis. While we take reasonable care in producing and safeguarding each memorial, we are not liable for indirect or consequential damages arising from your use of the service, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "8. Governing law",
    body: [
      "These terms are governed by the laws of the jurisdiction in which Living Echoes operates, without regard to conflict-of-law principles. The applicable jurisdiction will be confirmed here before launch.",
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
      intro="These Terms & Conditions govern your purchase of the Founder's Digital-Only Package and your use of the Living Echoes Family Portal."
      sections={sections}
    />
  )
}
