import React from "react";
import Link from "next/link";
import ShowCard from "./showcard";
import { shows } from "@/data/shows";
import { MoveRight } from "lucide-react";

export const FeaturedShows = () => {
  const featuredShows = shows.filter((show) => show.isFeatured);

  return (
    <section className="my-16">
      <div className="p-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-apex relative heading-apex">
            Signature Shows
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-2 justify-center items-center mb-8 sm:mb-6">
          {featuredShows.map((show) => (
            <ShowCard key={show.id} show={show} featured />
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Link
            href="/shows"
            className="inline-flex items-center font-semibold hover:text-light/50 transition-colors duration-300"
          >
            View All
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedShows;
