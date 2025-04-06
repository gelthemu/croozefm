import React from "react";
import ShowCard from "./show/showcard";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { shows } from "@/data/shows/shows";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";

export const PopularShows = () => {
  const featuredShows = shows.filter((show) => show.isFt);
  const popShows = featuredShows
    .sort((a, b) => (b.isPop ? 1 : 0) - (a.isPop ? 1 : 0))
    .slice(0, 16);
  const seed = new Date().toDateString();
  const popularShows = useShuffledArray(popShows, seed);

  return (
    <div className="py-1">
      <div className="text-left">
        <H2Title title="Popular Shows" />
        <p className="mb-3">Click to view in detail.</p>
      </div>
      <div className="flex flex-col overflow-x-auto scrollbar-hide scroll-smooth w-full">
        {/* First row */}
        <div className="flex items-start space-x-2 m-1">
          {popularShows
            .slice(0, Math.ceil(popularShows.length / 2))
            .map((show) => (
              <div key={show.id}>
                <ShowCard show={show} srOnly={true} />
              </div>
            ))}
        </div>

        {/* Second row */}
        <div className="flex items-start space-x-2 m-1">
          {popularShows
            .slice(Math.ceil(popularShows.length / 2))
            .map((show) => (
              <div key={show.id}>
                <ShowCard show={show} srOnly={true} />
              </div>
            ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center">
        {popularShows.map((show) => (
          <ShowCard key={show.id} show={show} srOnly={true} />
        ))}
      </div> */}
      <div className="flex items-center justify-end mx-auto mt-5">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
    </div>
  );
};

export default PopularShows;
