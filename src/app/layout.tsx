import React from "react";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import type { Metadata, Viewport } from "next";
import { Oswald, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/header-footer/navbar";
import Footer from "./components/header-footer/footer";
import "./styles/globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const ga_id = "G-RLHVV5YR9Y";

export const viewport: Viewport = {
  themeColor: "#151515",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Welcome - 91.2 Crooze FM",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
  keywords:
    "CroozeFM, 91.2 FM, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Western Uganda, News",
  metadataBase: new URL("https://croozefm.geltaverse.com"),
  generator: "Next.js",
  applicationName: "CroozeFM",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Gelthem Mucunguzi", url: "https://geltaverse.com" }],
  creator: "Gelthem Mucunguzi",
  publisher: "Gelthem Mucunguzi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/_io/favicon.ico",
    shortcut: "/_io/favicon-16x16.png",
    apple: "/_io/apple-touch-icon.png",
  },
  manifest: "/_io/site.webmanifest",

  openGraph: {
    title: "Welcome - 91.2 Crooze FM",
    description:
      "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
    type: "music.radio_station",
    url: "https://croozefm.geltaverse.com",
    images: ["https://croozefm.geltaverse.com/assets/shows/default.png"],
  },

  twitter: {
    title: "Welcome - 91.2 Crooze FM",
    description:
      "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: ["https://croozefm.geltaverse.com/assets/shows/default.png"],
  },

  alternates: {
    canonical: "https://croozefm.geltaverse.com",
    languages: {
      "en-US": "/en-US",
    },
  },
  category: "entertainment",
  classification: "Entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <GoogleAnalytics ga_id={ga_id} />
      </head>
      <body
        className={`${oswald.variable} ${montserrat.variable} relative antialiased`}
      >
        <div className="w-full font-montserrat">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </div>
      </body>
    </html>
  );
}
