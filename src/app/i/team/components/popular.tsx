import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getPopularProfiles } from "@/lib/profiles-parser";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";
import Carousel from "@/app/components/tiny/carousel";
import { PROFILES } from "@/data/endpoints";

export default function PopularProfiles() {
  const profiles = getPopularProfiles();
  const seed = new Date().toDateString();
  const popularProfiles = useShuffledArray(profiles, seed);

  return (
    <div className="py-1">
      <div className="text-left">
        <H2Title title="Popular Presenters" />
        <p className="mb-3">Swipe, or click to view in detail.</p>
      </div>
      <div className="relative overflow-hidden">
        <Carousel
          className="gap-2 snap-x snap-mandatory rounded-md"
          btnClass="text-light/80 bg-dark/60"
          itemWidth={320}
        >
          {popularProfiles.map((profile) => (
            <Link
              href={`/i/${profile.id}`}
              key={profile.id}
              className="relative group snap-center bg-gray/20 dark:bg-gray/50 rounded-sm overflow-hidden flex-shrink-0 w-52 border-2 border-gray/80 dark:border-light/20"
            >
              <div className="w-full aspect-[570/696] profile-image overflow-hidden">
                <div className="relative w-full aspect-[570/696] bg-dark/60">
                  <Image
                    src={`${PROFILES}/${profile.id}.png`}
                    alt={profile.name}
                    width={2280}
                    height={2784}
                    priority={true}
                    className="w-full h-full object-cover aspect-[570/696] group-hover:scale-105 transition-transform duration-300 grayscale-[0.75] _img_"
                  />
                  <div className="absolute top-2 right-2 opacity-50 text-light">
                    <FaWandMagicSparkles size={12} />
                  </div>
                </div>
              </div>
              <div className="p-3 absolute w-full h-[40%] bottom-0 left-0 text-left bg-gradient-to-t from-dark to-transparent">
                <div className="h-full w-full flex flex-col items-start justify-end">
                  <h3 className="text-light font-bold line-clamp-1 opacity-80">
                    {profile.name}
                  </h3>{" "}
                  <p className="text-light/60 text-sm font-light line-clamp-1 opacity-80">
                    {profile.showHosted}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="flex items-center justify-end mx-auto mt-6">
        <ViewAllBtn href="/i/team" text="Meet The Entire Team" />
      </div>
    </div>
  );
}
