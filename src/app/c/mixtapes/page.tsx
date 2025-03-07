import Image from "next/image";
import { mixtapes } from "@/data/mixtapes";
import MixtapePlayer from "./components/mixtape-player";

export const metadata = {
  title: "CFM Weekly Mixtapes",
  description:
    "Brace yourself for uplifting vibes and awesome tunes! Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
  keywords:
    "CroozeFM, 91.2 FM, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Western Uganda, News, Crooze FM weekly mixtapes, Crooze FM music, weekly mixtapes 2025, Crooze FM playlist, best weekly mixtapes, Crooze FM radio, free mixtapes online, Crooze FM DJ mixes, latest Crooze FM mixtapes, music mixtapes weekly, Crooze FM streaming, Crooze FM podcast, download Crooze FM mixtapes, Crooze FM new releases, trending mixtapes Crooze FM",
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
    languages: {
      "en-US": "/c/en-US",
    },
  },
};

export default function MixtapesPage() {
  const sortedMixtapes = [...mixtapes].sort((a, b) => b.id - a.id);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen overflow-hiddencontainer mx-auto px-4 py-16 min-h-screen overflow-hidden">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl relative mb-4 _912cfm">CFM Weekly Mixtapes</h1>
        <p className="w-full max-w-xl mx-auto mb-2">
          Get ready for feel-good vibes and epic beats! Western Uganda&apos;s
          Biggest Radio Station presents the Crooze FM Weekly Mixtape every
          Wednesday.
        </p>
      </div>

      <div className="my-12 relative w-full md:w-4/6 mx-auto aspect-[1484/813] overflow-hidden rounded-sm border-2 border-gray/80 dark:border-light/40">
        <Image
          src="https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
          alt="Crooze FM Weekly Mixtape"
          width={2968}
          height={1626}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      <MixtapePlayer mixtapes={sortedMixtapes} />
    </div>
  );
}
