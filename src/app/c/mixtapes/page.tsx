import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ImgDiv from "@/app/components/providers/divs/image-div";
import { mixtapes } from "@/data/mixtapes";
import MixtapePlayer from "./components/mixtape-player";

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
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading
        heading="CFM Weekly Mixtapes"
        text=" Get ready for feel-good vibes and epic beats! Western Uganda's Biggest Radio Station presents the Crooze FM Weekly Mixtape every Wednesday."
      />
      <ImgDiv
        url="https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
        alt="Crooze FM Weekly Mixtape"
        className="w-full md:w-4/6 mx-auto my-12"
        text="CFM Weekly Mixtape"
      />
      <MixtapePlayer mixtapes={sortedMixtapes} />
    </div>
  );
}
