import type { Metadata } from "next"

import { LegalPage, type LegalSection } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Living Echoes",
  description: "How Living Echoes collects, uses, and protects your information.",
}

const sections: LegalSection[] = [
  {
    heading: "1. Information we collect",
    body: [
      "When you purchase the Founder's Digital-Only Package, we collect the name, email address, phone number, and payment details needed to process your order and create your family's account. Payment details are processed by our payment provider and are never stored on our servers.",
      "When an authorized family member is invited to the Family Portal, we collect the name and email address needed to create their login.",
      "We also collect the photos, videos, and written materials you send us so that our team can create your loved one's biography.",
    ],
  },
  {
    heading: "2. How we use your information",
    body: [
      "We use your information to create and manage your family's account, build and publish biographies, provide access to the Family Portal, process payments, and communicate with you about your order and account.",
      "We do not sell your personal information, and we do not use the materials you send us for any purpose other than creating the memorial you purchased.",
    ],
  },
  {
    heading: "3. Sharing with service providers",
    body: [
      "We share information with trusted service providers who help us operate Living Echoes, including payment processing, secure data hosting and storage, and transactional email delivery. These providers are only given the information necessary to perform their services and are not permitted to use it for any other purpose.",
    ],
  },
  {
    heading: "4. Data security",
    body: [
      "Biographies and media are stored privately and are only accessible to authorized family members who have been invited by an administrator. We use industry-standard security practices, including access controls and encrypted storage, to protect your family's information.",
    ],
  },
  {
    heading: "5. Data retention",
    body: [
      "We retain family, biography, and media records for as long as your family's account remains active, so that authorized members can continue to access the memorial. If you would like your information removed, please contact us.",
    ],
  },
  {
    heading: "6. Your rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time by contacting us. We will respond to verified requests in accordance with applicable law.",
    ],
  },
  {
    heading: "7. Children's privacy",
    body: [
      "Living Echoes is intended for use by adults managing a family's memorial. We do not knowingly collect personal information directly from children.",
    ],
  },
  {
    heading: "8. Changes to this policy",
    body: [
      "We may update this policy from time to time. If we make material changes, we will update the date at the top of this page.",
    ],
  },
  {
    heading: "9. Contact us",
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
      intro="This Privacy Policy describes how Living Echoes collects, uses, and protects information when you purchase the Founder's Digital-Only Package, use the Family Portal, or otherwise interact with us."
      sections={sections}
    />
  )
}
