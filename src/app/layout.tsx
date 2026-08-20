import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Body copy, forms, and all app UI (Admin Dashboard, Family Portal).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings only — a classic, elegant Garamond-style serif chosen to echo
// the client's own brand wordmark (see public/brand/living-echoes-cover.png
// and PRODUCT.md item 30) for a dignified, biography-book feel.
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Fixed-width UI text (e.g. order/reference IDs, timestamps in the admin dashboard).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const description =
  "Living Echoes Biography Centers creates private, professionally written digital biographies and life stories for loved ones.";

// Brand banner sourced from the client's Facebook page — used for social
// share previews and homepage hero. See PRODUCT.md §14 item 30.
const brandCoverImage = {
  url: "/brand/living-echoes-cover.png",
  width: 1024,
  height: 450,
  alt: "Living Echoes Biography Centers — Every life. A story worth remembering.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Living Echoes Biography Centers",
  description,
  openGraph: {
    title: "Living Echoes Biography Centers",
    description,
    type: "website",
    images: [brandCoverImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Echoes Biography Centers",
    description,
    images: [brandCoverImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
