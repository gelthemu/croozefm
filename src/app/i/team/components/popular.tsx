import React from "react";
import Image from "next/image";
import Link from "next/link";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getPopularProfiles } from "@/lib/profiles-parser";
import { Flame } from "lucide-react";
import { fisherYatesShuffle } from "@/app/components/tiny/fisher-yates-shuffle";

export default function PopularProfiles() {
  const profiles = getPopularProfiles();
  const popularProfiles = fisherYatesShuffle(profiles);

  return (
    <>
      <div className="flex items-start gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {popularProfiles.map((profile) => (
          <Link
            href={`/i/${profile.id}`}
            key={profile.id}
            className="relative group snap-start bg-gray/20 dark:bg-gray/50 rounded-sm overflow-hidden flex-shrink-0 w-64 border border-dark/40 dark:border-light/30"
          >
            <div className="w-full profile-image overflow-hidden">
              <Image
                src={profile.imageLink}
                alt={profile.name}
                width={2280}
                height={2784}
                priority={true}
                className="w-full h-full object-cover aspect-[570/696] group-hover:scale-105 transition-transform duration-300 grayscale-[0.75] _img_"
              />
            </div>
            <div className="absolute top-2 right-2 text-light/50">
              <Flame size={16} />
            </div>
            <div className="p-3.5 absolute w-full h-[40%] bottom-0 left-0 text-left bg-gradient-to-t from-dark to-transparent">
              <div className="h-full w-full flex flex-col items-start justify-end">
                <h3 className="text-light font-bold mb-1 line-clamp-1 opacity-80">
                  {profile.name}
                </h3>{" "}
                <p className="text-light/60 text-sm font-light line-clamp-1 opacity-80">
                  {profile.showHosted}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end mx-auto my-5 md:mt-2.5 p-2">
        <ViewAllBtn href="/i/team" text="Meet The Entire Team" />
      </div>
    </>
  );
}
