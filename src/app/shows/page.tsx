import React from "react";
import ShowsFullList from "./components/shows-full-list";

export const metadata = {
  title: "Shows / Crooze FM",
  description:
    "Discover our shows on 91.2 Crooze FM. We are Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
  keywords:
    "CroozeFM, 91.2 FM, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Western Uganda, News, Crooze FM shows, Crooze FM radio, Crooze FM schedule, Crooze FM programs, Crooze FM live, Crooze FM podcast, Crooze FM music shows, Crooze FM hosts, Crooze FM streaming, Crooze FM online radio",
};

export default function ShowsPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="mb-8 flex flex-col items-center justify-center pb-4 border-b border-dark/40 dark:border-light/20">
        <h1 className="text-3xl relative mb-4 _912cfm">Shows</h1>
        <p className="text-sm">
          Click to view in detail. Some shows have ad-free recordings you might
          enjoy.
        </p>
      </div>
      <ShowsFullList />
    </div>
  );
}
