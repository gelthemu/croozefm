import React from "react";
import ShowCard from "./show/showcard";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { shows } from "@/data/shows/shows";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";

export const PopularShows = () => {
  const popShows = shows.filter((show) => show.isPop);
  const seed = new Date().toDateString();
  const popularShows = useShuffledArray(popShows, seed).slice(0, 6);

  return (
    <div className="py-1">
      <div className="text-left">
        <H2Title title="Popular Shows" />
        <p className="mb-3">Click to view in detail.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center">
        {popularShows.map((show) => (
          <ShowCard key={show.id} show={show} srOnly={true} />
        ))}
      </div>
      <div className="flex items-center justify-end mx-auto mt-5">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
    </div>
  );
};

export default PopularShows;
