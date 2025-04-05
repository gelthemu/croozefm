import React from "react";
import { mixtapes } from "@/data/mixtapes";
import MixtapePlayer from "./components/mixtape-player";
import { RectangleAd, SkyscraperAd } from "@/app/components/providers/ads/ads";

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
  const sortedMixtapes = [...mixtapes].sort((a, b) => b.id - a.id);

  return (
    <div className="w-full mx-auto max-w-[820px] p-1">
      <div className={`w-full text-left flex flex-col justify-center p-1`}>
        <h1 className="text-3xl relative mb-4 _912cfm">CFM Weekly Mixtapes</h1>
        <p className="w-full max-w-2xl">
          Get ready for feel-good vibes and epic beats! Western Uganda&apos;s
          Biggest Radio Station presents the Crooze FM Weekly Mixtape every
          Wednesday.
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-4 mt-10">
        <div className="w-full lg:w-[70%] flex-shrink-0 mb-12 sm:mb-0">
          <MixtapePlayer mixtapes={sortedMixtapes} />{" "}
        </div>{" "}
        <RectangleAd />
        <div className="hidden lg:block lg:w-[30%] lg:flex-shrink-0">
          <div className="sticky top-[calc(0.25rem+80px)]">
            <SkyscraperAd />
          </div>
        </div>
      </div>
    </div>
  );
}
