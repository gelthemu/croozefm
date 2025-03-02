import React from "react";
import ShowsPagination from "./components/pagination";

export const metadata = {
  title: "Shows - 91.2 Crooze FM",
  description:
    "Discover our shows on 91.2 Crooze FM. We are Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
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
      <ShowsPagination />
    </div>
  );
}
