import React from "react";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/lib/google-analytics";
import CookieConsent from "./cookieconsent";
import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display } from "next/font/google";
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
import "./styles/globals.css";

const sans = localFont({
  src: "/fonts/cfm-geltaverse-912912912912.woff2",
  variable: "--fonts-sans",
  display: "swap",
  style: "normal",
  preload: true,
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-big-shoulders",
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
    "CFM Pulse is the largest Crooze FM Fan Base. Home of Fans of Western Uganda's Biggest Radio Station. By CFM Fans, for CFM Diehards.",
  keywords:
    "CFM Pulse, 91.2 Crooze FM, crooze fm online, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Crooze fm stream live, Western Uganda, Mbarara, Mbarara City, Muti-lane, Ntare Road, Crooze FM Mixtapes, The Morning Addiction, The Lifestyle Show, The Most Wanted Hits, African Countdown, Evening Switch, Hits Selector, Sports Bwino, Fat Friday Mix, Urban Breakfast, Inyaa Clare, Belga MC, Monique Mbabazi, African music, Sports Updates, Bwino, Kafulu wa Bwino, Crooze FM News",
  metadataBase: new URL("https://croozefm.geltaverse.com"),
  applicationName: "CFM Pulse",
  creator: "Gelthem Mucunguzi",
  publisher: "Gelthem Mucunguzi",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: {
      template: "%s | CFM Pulse",
      default: "Hi | CFM Pulse",
    },
    description: "Home of Fans of Western Uganda's Biggest Radio Station",
    url: "https://cfm.geltaverse.com",
    type: "website",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home of Fans of Western Uganda's Biggest Radio Station",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    title: {
      template: "%s | CFM Pulse",
      default: "Hi | CFM Pulse",
    },
    description: "Home of Fans of Western Uganda's Biggest Radio Station",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home of Fans of Western Uganda's Biggest Radio Station",
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <GoogleAnalytics ga_id={ga_id} />
        <meta
          name="google-site-verification"
          content="OfHaVPKM9Wu-vYzI9izprYBxt9AaQM7LmbovFBXMTDk"
        />
        <meta name="msvalidate.01" content="781D56DEEBBD64612B4741E403DBABE7" />
      </head>
      <body
        className={`${sans.variable} ${bigShoulders.variable} relative antialiased`}
      >
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
