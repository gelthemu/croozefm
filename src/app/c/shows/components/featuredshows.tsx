import React from "react";
import ShowCard from "./showcard";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { shows } from "@/data/shows";

export const FeaturedShows = () => {
  const featuredShows = shows.filter((show) => show.isFeatured);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-center">
        {featuredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <div className="flex items-center justify-end mx-auto my-5 md:mt-2.5 p-2">
        <ViewAllBtn href="/c/shows" text="View All Shows" />
      </div>
    </>
  );
};

export default FeaturedShows;
