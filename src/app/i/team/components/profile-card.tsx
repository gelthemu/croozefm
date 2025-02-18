import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PresenterProfile } from "@/types/profile";

interface PresenterCardProps {
  profile: PresenterProfile;
}

const PresenterCard: React.FC<PresenterCardProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <>
      <div className="group flex flex-col rounded-sm overflow-hidden flex-shrink-0 border-2 border-dark/60 dark:border-light/20">
        <Link href={`/i/${profile.id}`} className="relative">
          <div className="h-80 w-full overflow-hidden">
            <Image
              src={profile.imageLink}
              alt={profile.name}
              width={2280}
              height={2784}
              priority={true}
              className="w-full object-center-top aspect-[570/696] group-hover:scale-105 transition-transform duration-300 _img_"
            />
          </div>
          <div className="p-3 absolute w-full bottom-0 left-0 text-light bg-dark/40">
            <h3 className="font-bold mb-1 line-clamp-1">{profile.name}</h3>{" "}
            <p className="text-sm font-light line-clamp-1">
              {profile.showHosted}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PresenterCard;
