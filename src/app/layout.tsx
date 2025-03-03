import React from "react";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/lib/google-analytics";
import CookieConsent from "./cookieconsent";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProviders } from "./components/providers/theme-provider";
import ToastProvider from "./components/providers/toastprovider";
import Navbar from "./components/header-footer/navbar";
import Footer from "./components/header-footer/footer";
import MiniPlayer from "./components/stream/mini-player";
import { MiniPlayerProvider } from "./context/mini-player-context";
import "./styles/globals.css";

const sans = localFont({
  src: "/fonts/croozefm-geltaverse-912912912912.woff2",
  variable: "--fonts-sans",
  display: "swap",
  style: "normal",
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
    images: ["https://croozefm.blob.core.windows.net/images/default.png"],
  },

  twitter: {
    title: "Welcome - 91.2 Crooze FM",
    description:
      "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: ["https://croozefm.blob.core.windows.net/images/default.png"],
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
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <GoogleAnalytics ga_id={ga_id} />
      </head>
      <body
        className={`${sans.variable} relative antialiased bg-light dark:bg-dark`}
      >
        <ThemeProviders>
          <div className="w-full font-sans text-dark dark:text-light">
            <MiniPlayerProvider>
              <CookieConsent />
              <Navbar />
              <ToastProvider />
              {children}
              <Analytics />
              <SpeedInsights />
              <MiniPlayer />
              <Footer />
            </MiniPlayerProvider>
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
