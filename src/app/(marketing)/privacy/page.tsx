import type { Metadata } from "next"

import { LegalPage, type LegalSection } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Living Echoes Biography Centers",
  description:
    "How Living Echoes Biography Centers collects, uses, and protects your information.",
}

const sections: LegalSection[] = [
  {
    heading: "1. Information we collect",
    body: [
      "When you purchase the Founder's Digital-Only Package, we collect the name, email address, phone number, and payment details needed to process your order and create your family's account. Payment details are processed by our payment provider and are never stored on our servers.",
      "When an authorized family member is invited to the Family Portal, we collect the name and email address needed to create their login.",
      "We also collect the photos, videos, and written materials you send us offline so that our team can create and update your loved one's digital biography. You do not upload content through a customer-facing portal.",
    ],
  },
  {
    heading: "2. How we use your information",
    body: [
      "We use your information to create and manage your family's account, professionally write and publish biographies, provide private view-only access to the Family Portal, process payments, and communicate with you about your order and account.",
      "We do not sell your personal information, and we do not use the materials you send us for any purpose other than creating and maintaining the biography you purchased.",
    ],
  },
  {
    heading: "3. Family Portal access",
    body: [
      "The Founder's Digital-Only Package includes one year of complimentary remote access to the Family Portal for up to 10 authorized family members. Each member receives their own login with view-only access. Families cannot upload, edit, or modify biography content through the portal.",
      "Continued remote access after the first complimentary year requires a paid subscription. We may contact you before your complimentary access period ends with information about continuing access.",
    ],
  },
  {
    heading: "4. Sharing with service providers",
    body: [
      "We share information with trusted service providers who help us operate Living Echoes Biography Centers, including payment processing, secure data hosting and storage, and transactional email delivery. These providers are only given the information necessary to perform their services and are not permitted to use it for any other purpose.",
    ],
  },
  {
    heading: "5. Data security",
    body: [
      "Biographies and media are stored privately and are only accessible to authorized family members who have been invited by an administrator. We use industry-standard security practices, including access controls and encrypted storage, to protect your family's information.",
    ],
  },
  {
    heading: "6. Data retention",
    body: [
      "We retain family, biography, and media records for as long as your family's account remains active, so that authorized members can continue to access the biography according to their entitlements. If you would like your information removed, please contact us.",
    ],
  },
  {
    heading: "7. Your rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time by contacting us. We will respond to verified requests in accordance with applicable law.",
    ],
  },
  {
    heading: "8. Children's privacy",
    body: [
      "Living Echoes Biography Centers is intended for use by adults managing a family's biography account. We do not knowingly collect personal information directly from children.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    body: [
      "We may update this policy from time to time. If we make material changes, we will update the date at the top of this page.",
    ],
  },
  {
    heading: "10. Contact us",
    body: [
      "If you have questions about this policy or how we handle your information, please reach out through our Contact page.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="Draft — date to be confirmed"
      intro="This Privacy Policy describes how Living Echoes Biography Centers collects, uses, and protects information when you purchase the Founder's Digital-Only Package, use the Family Portal, or otherwise interact with us."
      sections={sections}
    />
  )
}
