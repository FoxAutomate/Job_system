import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/Providers";
import { getMetadataBase } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const siteTitle = "Canning Brothers Careers — tööpakkumised";
const description =
  "Canning Brothers: villimisliinid, masinaehitus, Tallinn. Kandideeri veebis või saada CV.";

/** Same hero visual as the site — avoids link previews picking a doc-like asset. */
const defaultOgImage = "/cannery/full_machine_cannery_line.png";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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
        alt: "Canning Brothers — villimisliin",
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
