import React from "react";
import { PageHeading } from "../components/providers/divs/page-heading";
import ShowsFullList from "./components/shows-full-list";
import Divider from "@/app/components/providers/divs/divider";
import PopularProfiles from "../i/team/components/popular";

export const metadata = {
  title: "Shows",
  description:
    "Discover, and browse our popular shows on 91.2 Crooze FM. We are Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
  keywords:
    "91.2 Crooze FM, Western Uganda's Biggest Radio Station, Crooze fm radio, Crooze fm schedule, Crooze fm programs, Crooze fm stream live, Crooze fm shows, Crooze FM mixtapes",
  alternates: {
    canonical: `https://croozefm.geltaverse.com/shows`,
  },
};

export default function ShowsPage() {
  return (
    <>
      <PageHeading
        heading="Shows"
        text="Click to view in detail. Some shows have ad-free recordings you might enjoy."
      />
      <div className="mt-12">
        <ShowsFullList />
      </div>
      <Divider className="my-16" />
      <PopularProfiles />
    </>
  );
}
