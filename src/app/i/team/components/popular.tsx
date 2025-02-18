import React from "react";
import Image from "next/image";
import Link from "next/link";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { getPopularProfiles } from "@/lib/profiles";
import { Flame } from "lucide-react";

export default function PopularProfiles() {
  const popularProfiles = getPopularProfiles().sort(() => Math.random() - 0.5);

  return (
    <>
      <div className="flex items-start gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {popularProfiles.map((profile) => (
          <Link
            href={`/i/${profile.id}`}
            key={profile.id}
            className="relative group snap-start flex flex-col bg-gray/20 dark:bg-gray/50 rounded-sm overflow-hidden flex-shrink-0 w-64 border border-dark/40 dark:border-light/30"
          >
            <div className="w-full aspect-[16/9] bg-profile-image bg-cover bg-center">
              <Image
                src={profile.imageLink}
                alt={profile.name}
                width={2280}
                height={2784}
                priority={true}
                className="w-full h-full object-cover aspect-[570/696] group-hover:scale-105 transition-transform duration-300 _img_"
              />
            </div>
            <div className="absolute top-2 right-2 text-light/50">
              <Flame size={16} />
            </div>
            <div className="p-3.5 flex-grow text-left opacity-80">
              <h3 className="font-semibold mb-1">{profile.name}</h3>
              <p className="text-sm font-light">{profile.showHosted}</p>
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
