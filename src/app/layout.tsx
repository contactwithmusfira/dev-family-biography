import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Body copy, forms, and all app UI (Admin Dashboard, Family Portal).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings only — warm editorial serif for a dignified, biography-book feel.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Fixed-width UI text (e.g. order/reference IDs, timestamps in the admin dashboard).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Living Echoes creates permanent, private online memorials for loved ones.";

// Real brand banner sourced from the client's Facebook page — used as the
// social share preview until an official logo/OG asset is provided.
// See public/brand/living-echoes-cover.png and PRODUCT.md item 30.
const brandCoverImage = {
  url: "/brand/living-echoes-cover.png",
  width: 1024,
  height: 450,
  alt: "Living Echoes Biography Centers — Every life. A story worth remembering.",
};

export const metadata: Metadata = {
  title: "Living Echoes",
  description,
  openGraph: {
    title: "Living Echoes",
    description,
    type: "website",
    images: [brandCoverImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Echoes",
    description,
    images: [brandCoverImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
