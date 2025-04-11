import React from "react";
import { mixtapes } from "@/data/mixtapes";
import MixtapePlayer from "./components/mixtape-player";
import { SmUnit, MdUnit, LgUnit } from "@/app/components/providers/units/units";
import { RESOURCES } from "@/data/endpoints";

export const metadata = {
  title: "CFM Weekly Mixtapes",
  description:
    "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
  keywords:
    "cfm weekly mixtape, crooze fm mixtapes, dj nati j, starcent dj, dj emma, dj banx, dj stinger, dj modern, cruz fm, cfm pulse, 91.2 crooze fm, crooze fm online, western uganda, crooze fm stream live, mbarara city, crooze fm mixtapes, african music",
  openGraph: {
    url: "https://cfm.geltaverse.com/c/mixtapes",
    images: [
      {
        url: `${RESOURCES}/cfm-weekly-mixtape.png`,
        alt: "Crooze FM brings you the CFM Weekly Mixtape every Wednesday.",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: `${RESOURCES}/cfm-weekly-mixtape.png`,
        alt: "Crooze FM brings you the CFM Weekly Mixtape every Wednesday.",
      },
    ],
  },
};

export default function MixtapesPage() {
  const sortedMixtapes = [...mixtapes].sort((a, b) => b.id - a.id);

  return (
    <div className="w-full mx-auto max-w-[820px] p-1">
      <div className={`w-full text-left flex flex-col justify-center p-1`}>
        <h1 className="text-3xl relative mb-4 _912cfm">CFM Weekly Mixtapes</h1>
        <p className="w-full max-w-2xl mb-2">
          Western Uganda&apos;s Biggest Radio Station rolls out the Crooze FM
          Weekly Mixtape every Wednesday.
        </p>
        <p className="w-full max-w-2xl mb-2">
          All the midweek musical vibes are now packed in one place, with pure
          energy and rhythm—guaranteed to keep your head nodding all week long!
        </p>
        <p className="w-full max-w-2xl">
          Rewind it! Blast it! OWN IT! {"🔥🎶"}
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:space-x-4 mt-10">
        <div className="w-full lg:w-[70%] flex-shrink-0 mb-12 lg:mb-0">
          <MixtapePlayer mixtapes={sortedMixtapes} />{" "}
        </div>{" "}
        <SmUnit />
        <div className="lg:hidden">
          <MdUnit />
        </div>
        <div className="hidden lg:block lg:w-[30%] lg:flex-shrink-0">
          <div className="sticky top-[calc(0.25rem+80px)]">
            <LgUnit />
          </div>
        </div>
      </div>
    </div>
  );
}
