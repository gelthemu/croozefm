"use client";

import { shows } from "@/data/shows/shows";
import { useRouter } from "next/navigation";
import RadioSchedule from "@/app/components/providers/schedule/radio/radio-schedule";
import Divider from "@/app/components/providers/divs/divider";

export default function ShowsFullList() {
  const ftShows = shows.filter((show) => show.isFt);

  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {ftShows.map((show) => (
          <div
            key={show.name}
            onClick={() => {
              router.push(`/shows/${show.id}`);
            }}
            className="w-full p-4 rounded-sm hover:bg-dark/10 dark:hover:bg-light/10 border border-dark/20 dark:border-light/10 cursor-pointer transition-all duration-500"
          >
            <div className="font-medium">{show.name}</div>
          </div>
        ))}
      </div>
      <Divider />
      <RadioSchedule />
    </>
  );
}
