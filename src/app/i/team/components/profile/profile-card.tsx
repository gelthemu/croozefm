"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PresenterProfile } from "@/types/profile";
import { PROFILES } from "@/data/endpoints";

interface PresenterCardProps {
  profile: PresenterProfile;
}

const PresenterCard: React.FC<PresenterCardProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <>
      <div className="group rounded-sm overflow-hidden border-2 border-gray/80 dark:border-light/20">
        <Link
          href={`/i/${profile.id}`}
          className="relative flex flex-col h-full"
        >
          <div className="h-80 max-h-[500px] w-full profile-image overflow-hidden">
            <Image
              src={`${PROFILES}/${profile.id}.webp`}
              alt={profile.name}
              width={2280}
              height={2784}
              priority={true}
              className="w-full object-center-top aspect-[570/696] group-hover:scale-105 transition-transform duration-200 grayscale-[0.8] _img_"
            />
          </div>
          <div className="p-3.5 absolute w-full h-[35%] bottom-0 left-0 text-left bg-gradient-to-t from-dark to-transparent">
            <div className="h-full w-full flex flex-col items-start justify-end">
              <div className="w-full flex flex-col pl-2.5 border-l-2 border-light/10">
                <h3 className="text-light font-bold mb-1 line-clamp-1 opacity-80">
                  {profile.name}
                </h3>{" "}
                <p className="text-light/60 text-sm font-light line-clamp-1 opacity-80">
                  {profile.showHosted}
                </p>
              </div>
            </div>{" "}
          </div>
        </Link>
      </div>
    </>
  );
};

export default PresenterCard;
