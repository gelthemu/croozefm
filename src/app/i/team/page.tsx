import React from "react";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import ProfileList from "./components/profile-list";
import Divider from "@/app/components/providers/divs/divider";

export const metadata = {
  title: "CFM Presenters",
  description:
    "Meet all of our radio presenters and hosts on 91.2 Crooze FM. We are Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
  keywords:
    "91.2 Crooze FM, Crooze fm team, Western Uganda's Biggest Radio Station, Crooze fm radio, Crooze fm presenters, Crooze fm radio hosts, Crooze fm staff, Crooze fm djs, Crooze fm radio team, Crooze fm on-air talent",
  alternates: {
    canonical: "https://croozefm.geltaverse.com/i/team",
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
      <Divider className="my-16" />
    </>
  );
}
