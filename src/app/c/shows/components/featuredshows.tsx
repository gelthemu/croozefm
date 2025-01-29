import React from "react";
import ShowCard from "./showcard";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { shows } from "@/data/shows";

export const FeaturedShows = () => {
  const featuredShows = shows.filter((show) => show.isFeatured);

  return (
    <section className="my-12">
      <div className="p-2">
        <div className="flex flex-col justify-between">
          <h2 className="w-fit text-3xl font-apex relative heading-apex font-variant">
            Signature Shows
          </h2>
          <p className="my-4">Click to view in detail.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-center">
          {featuredShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
        <div className="flex items-center justify-center md:justify-end mx-auto mt-5 md:mt-2.5 p-2">
          <ViewAllBtn href="/c/shows" text="View All Shows" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedShows;
