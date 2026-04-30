import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ADSENSE_CLIENT = "ca-pub-1375355661820080";
// Replace with your GA4 Measurement ID (e.g. G-XXXXXXXXXX) from Google Analytics
const GA_ID = "G-XXXXXXXXXX";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tn-poll.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tamil Nadu Exit Poll 2026 | TN Assembly Election Results Tracker",
  description:
    "Live Tamil Nadu Assembly Election 2026 exit poll results. Compare seat projections and vote share from CVoter, Axis My India, Today's Chanakya, Jan Ki Baat and more.",
  keywords: [
    "Tamil Nadu exit poll 2026",
    "TN election results",
    "Tamil Nadu assembly election",
    "DMK exit poll",
    "AIADMK exit poll",
    "TN 2026 seat projection",
  ],
  openGraph: {
    title: "Tamil Nadu Exit Poll 2026 — Live Tracker",
    description:
      "Compare exit poll seat projections and vote share from all major agencies for Tamil Nadu Assembly Election 2026.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TN Exit Poll 2026 Live Tracker",
    description: "All exit poll results for Tamil Nadu Assembly Election 2026 in one place.",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
      {GA_ID !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
