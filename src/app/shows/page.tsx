import React from "react";
import { PageHeading } from "../components/providers/divs/page-heading";
import ShowsFullList from "./components/shows-full-list";
import { SmUnit, MdUnit } from "@/app/components/providers/units/units";
import { RESOURCES } from "@/data/endpoints";

export const metadata = {
  title: "Shows Schedule",
  description:
    "Discover, and browse popular shows on 91.2 Crooze FM. Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
  keywords:
    "cfm pulse, western uganda, crooze fm online, shows schedule, cruz fm, crooze fm stream live, crooze fm shows, crooze fm mixtapes",
  openGraph: {
    url: "https://cfm.geltaverse.com/shows",
    images: [
      {
        url: `${RESOURCES}/on-air-2.png`,
        alt: "Western Uganda's Biggest Radio Station",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: `${RESOURCES}/on-air-2.png`,
        alt: "Western Uganda's Biggest Radio Station",
      },
    ],
  },
};

export default function ShowsPage() {
  return (
    <>
      <PageHeading
        heading="Shows"
        text="Click to view in detail. Some shows have ad-free recordings you might enjoy."
      />
      <div className="my-12">
        <ShowsFullList />
      </div>
      <SmUnit />
      <MdUnit />
    </>
  );
}
