import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const siteTitle =
  "Cannery Jobs — Villimismasinate koostaja-tehnik | Cannery OÜ";
const description =
  "Liitu Cannery OÜ meeskonnaga: villimisliinide montaaž, seadistamine ja testimine Laagris (Harjumaa). Brutopalk 1400–1700 €. Kandideeri kiiresti ka telefonist.";

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
        url: "/cannery/Job_proposal.jpeg",
        width: 1200,
        height: 630,
        alt: "Cannery tööpakkumine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
