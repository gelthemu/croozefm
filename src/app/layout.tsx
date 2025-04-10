import React from "react";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/lib/google-analytics";
import CookieConsent from "./cookieconsent";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProviders } from "./components/providers/theme-provider";
import Navbar from "./components/header-footer/navbar";
import Footer from "./components/header-footer/footer";
import MiniPlayer from "./components/stream/mini-player/mini-player";
import { MiniPlayerProvider } from "./context/mini-player-context";
import Chat from "@/app/components/providers/chat/chat";
import { ChatProvider } from "./context/chat-context";
import MediaSessionHandler from "./components/stream/mini-player/components/media-session";
import FullscreenCarousel from "./i/team/components/profile/gallery/fullscreen-gallery";
import { CarouselProvider } from "./context/carousel-context";
import { DownloadProvider } from "./context/download-context";
import DownloadStatus from "./c/mixtapes/components/downloads/download-status";
import { SuggestionFormProvider } from "./context/suggestion-form-context";
import SuggestionForm from "./components/providers/suggestion-form";
import { RESOURCES } from "@/data/endpoints";
import PageJsonLd from "./home/components/json-ld-data";
import { CanonicalUrl } from "./home/components/canonical-url";
import "./styles/globals.css";

const sans = localFont({
  src: "/fonts/cfm-geltaverse-912912912912.woff2",
  variable: "--fonts-sans",
  display: "swap",
  style: "normal",
  preload: true,
});

const ga_id = "G-RLHVV5YR9Y";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
  themeColor: "#151515",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    template: "%s | CFM Pulse",
    default: "Hi | CFM Pulse",
  },
  description:
    "CFM Pulse is the largest Crooze FM Fan Base. Home to Fans of Western Uganda's Biggest Radio Station. By CFM Fans, for CFM Diehards.",
  keywords:
    "cfm pulse, 91.2 crooze fm, crooze fm online, western uganda, crooze fm stream live, mbarara city, crooze fm mixtapes, african music",
  metadataBase: new URL("https://cfm.geltaverse.com"),
  applicationName: "CFM Pulse",
  creator: "Gelthem Mucunguzi",
  publisher: "Gelthem Mucunguzi",

  openGraph: {
    title: {
      template: "%s | CFM Pulse",
      default: "",
    },
    description: "Home to Fans of Western Uganda's Biggest Radio Station.",
    url: "https://cfm.geltaverse.com/",
    type: "website",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home to Fans of Western Uganda's Biggest Radio Station",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    title: {
      template: "%s | CFM Pulse",
      default: "",
    },
    description: "Home to Fans of Western Uganda's Biggest Radio Station",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home to Fans of Western Uganda's Biggest Radio Station",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://geltaverse.com" />
        <link rel="dns-prefetch" href="https://geltaverse.com" />
        <link rel="preconnect" href="https://assets.geltaverse.com" />
        <link rel="dns-prefetch" href="https://assets.geltaverse.com" />
        <link rel="preconnect" href="https://transaudio.geltaverse.com/" />
        <link rel="dns-prefetch" href="https://transaudio.geltaverse.com/" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="mask-icon" href="/cfm-pulse-svg.svg" color="#151515" />

        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#151515" />
        <meta name="msapplication-TileImage" content="/ms-icon-144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <link
          rel="icon"
          href="/favicon-16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="icon" href="/cfm-pulse-svg.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-96.png"
          sizes="96x96"
          type="image/png"
        />
        <CanonicalUrl />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <GoogleAnalytics ga_id={ga_id} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#151515"
        ></meta>
        <meta name="msapplication-TileColor" content="#151515" />
        <meta property="og:site_name" content="CFM Pulse" />
        <meta property="og:locale" content="en_US" />
        <meta
          name="google-site-verification"
          content="OfHaVPKM9Wu-vYzI9izprYBxt9AaQM7LmbovFBXMTDk"
        />
        <meta name="msvalidate.01" content="781D56DEEBBD64612B4741E403DBABE7" />
        <PageJsonLd />
      </head>
      <body className={`${sans.variable} relative antialiased`}>
        <DownloadProvider>
          <ThemeProviders>
            <div className="w-full font-sans text-dark dark:text-light">
              <CarouselProvider>
                <ChatProvider>
                  <MiniPlayerProvider>
                    <SuggestionFormProvider>
                      <MiniPlayer />
                      <Chat />
                      <DownloadStatus />
                      <SuggestionForm />
                      <Navbar />
                      <div className="w-full bg-light/90 dark:bg-dark/95 bg-fixed bg-no-repeat bg-cover bg-top bg-[url(https://assets.geltaverse.com/media/cfm_header.jpg)] bg-blend-soft-light">
                        <div className="w-full bg-light/80 dark:bg-dark/95">
                          <main className="w-full max-w-screen-lg mx-auto min-h-screen px-2 py-16">
                            <div className="container mx-auto">{children}</div>
                          </main>
                        </div>
                      </div>
                      <Analytics />
                      <SpeedInsights />
                      <Footer />
                      <CookieConsent />
                      <FullscreenCarousel />
                      <MediaSessionHandler />
                    </SuggestionFormProvider>
                  </MiniPlayerProvider>
                </ChatProvider>
              </CarouselProvider>
            </div>
          </ThemeProviders>
        </DownloadProvider>
      </body>
    </html>
  );
}
