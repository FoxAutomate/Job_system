import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/Providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const publicSite = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl =
  publicSite && publicSite.length > 0
    ? publicSite
    : process.env.VERCEL_URL != null
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

const siteTitle = "Cannery Careers — Cannery OÜ tööpakkumised";
const description =
  "Cannery OÜ ametikohad: villimisliinid, masinaehitus, Laagri. Kandideeri veebis või saada CV.";

/** Same hero visual as the site — avoids link previews picking a doc-like asset. */
const defaultOgImage = "/cannery/full_machine_cannery_line.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description,
  openGraph: {
    title: siteTitle,
    description,
    locale: "et_EE",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1920,
        height: 1080,
        alt: "Cannery — villimisliin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et" className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
