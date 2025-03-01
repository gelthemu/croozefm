import React from "react";
import { getAllProfiles } from "@/lib/profiles-parser";
import PresenterCard from "./components/profile-card";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";

export const metadata = {
  title: "Our Team - 91.2 Crooze FM",
  description:
    "Meet all of our radio presenters and hosts on 91.2 Crooze FM. We are Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default async function PresentersPage() {
  const profiles = await getAllProfiles();
  const seed = new Date().toDateString();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allProfiles = useShuffledArray(profiles, seed);

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="mb-8 flex flex-col items-center justify-center pb-4 border-b border-dark/40 dark:border-light/20">
        <h1 className="text-3xl relative mb-4 _912cfm">Meet Our Team</h1>
        <p className="text-sm">
          Get to know the talented voices and personalities behind your favorite
          radio shows. Click to view in detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {allProfiles.map((profile) => (
          <PresenterCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
