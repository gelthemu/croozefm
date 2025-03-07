import React from "react";
import ShowCard from "./show/showcard";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { shows } from "@/data/shows/shows";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";

export const PopularShows = () => {
  const popShows = shows.filter((show) => show.isPop);
  const seed = new Date().toDateString();
  const popularShows = useShuffledArray(popShows, seed).slice(0,6);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center items-center">
        {popularShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <div className="flex items-center justify-end mx-auto my-5 md:mt-2.5 p-2">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
    </>
  );
};

export default PopularShows;
