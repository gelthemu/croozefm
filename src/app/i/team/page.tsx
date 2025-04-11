import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ProfileList from "./components/profile-list";
import Divider from "@/app/components/providers/divs/divider";
import SubmitAnything from "@/app/home/components/submit-anything";
import { SmUnit, MdUnit } from "@/app/components/providers/units/units";
import { RESOURCES } from "@/data/endpoints";

export const metadata = {
  title: "Crooze FM Popular Presenters",
  description:
    "Meet some of your favorite hosts on 91.2 Crooze FM. Get to know them better, and check out their gallery.",
  keywords:
    "crooze fm team, western uganda's biggest radio station, crooze fm presenters, crooze fm djs, crooze fm radio team, cruz fm, cfm pulse, 91.2 crooze fm, crooze fm online, western uganda, crooze fm stream live, mbarara city, crooze fm mixtapes, african music",
  openGraph: {
    url: "https://cfm.geltaverse.com/i/team",
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

export default async function PresentersPage() {
  return (
    <>
      <PageHeading
        heading="Crooze FM Presenters"
        text="Get to know the talented voices and personalities behind your favorite radio shows. Click to view in detail."
      />
      <div className="mt-10">
        <ProfileList />
      </div>
      <div>
        <SubmitAnything
          title="Is Your Top Presenter Not Listed?"
          text={`Noticed your favorite radio host isn’t on this site? Let us know their name here, and we’ll whip up a profile page for them in no time. Go ahead—drop their name, and we’ll dig into what they’re all about!`}
        />
      </div>
      <Divider className="my-16" />
      <div>
        <SmUnit />
        <MdUnit />
      </div>
    </>
  );
}
