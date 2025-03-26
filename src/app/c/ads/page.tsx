import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import {
  BannerAd,
  RectangleAd,
  SkyscraperAd,
} from "@/app/components/providers/ads/ads";

export const metadata = {
  title: "CFM Weekly Mixtapes",
  description:
    "Brace yourself for uplifting vibes and awesome tunes! Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
  keywords:
    "Crooze FM Weekly Mixtape, Western Uganda radio, DJ Nati J mixtape, Starcent DJ mixtape, Deejay Emma mixtape, DJ Banx mixtape, Mbarara Uganda music, 91.2 Crooze FM, weekly mixtape, Crooze FM Mbarara, Crooze FM latest release",
  openGraph: {
    title: "CFM Weekly Mixtapes",
    description:
      "Brace yourself for uplifting vibes and awesome tunes! Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
    type: "website",
    url: "https://croozefm.geltaverse.com/c/mixtapes",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
        alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "CFM Weekly Mixtapes",
    description:
      "Brace yourself for uplifting vibes and awesome tunes! Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
        alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
      },
    ],
  },
  alternates: {
    canonical: "https://croozefm.geltaverse.com/c/mixtapes",
  },
};

export default function MixtapesPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading
        heading="ADS"
        text="Western Uganda's Biggest Radio Station"
      />

      {/* Banner Ad at the top */}
      <BannerAd />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* Main content area */}
          <p>Your main page content goes here...</p>
        </div>

        {/* Skyscraper Ad on the side */}
        <div className="hidden md:block">
          <SkyscraperAd />
        </div>
      </div>

      {/* Rectangle Ad in the middle or bottom of the page */}
      <RectangleAd />
    </div>
  );
}
