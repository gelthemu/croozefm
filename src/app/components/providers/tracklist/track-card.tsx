"use client";

import Image from "next/image";
import { getTimeAgo } from "./tracklist-data";
import { Track } from "@/types/track";

interface TrackCardProps {
  track: Track;
  isCurrent?: boolean;
  index?: number;
  className?: string;
}

export default function TrackCard({
  track,
  isCurrent = false,
  index,
  className = "",
}: TrackCardProps) {
  const imageSize = isCurrent ? "w-20 h-20" : "w-16 h-16";
  const titleClass = isCurrent ? "font-semibold" : "font-medium";

  return (
    <div
      key={index}
      className={`bg-gray/10 dark:bg-gray/40 rounded-md p-1.5 flex-shrink-0 flex items-end ${className}`}
    >
      <div
        className={`flex-shrink-0 ${imageSize} relative profile-image aspect-square rounded-sm overflow-hidden`}
      >
        {track.track_image ? (
          <Image
            src={track.track_image}
            alt={`${track.track_title} cover`}
            width={500}
            height={500}
            className="w-full h-full object-cover aspect-square _img_"
          />
        ) : (
          <div
            className={`bg-dark/${
              isCurrent ? "20" : "40"
            } ${imageSize} flex items-center justify-center`}
          >
            <Image
              src="/cfm-logo.png"
              alt="CroozeFM Logo"
              width={4096}
              height={1652}
              className={`${
                isCurrent ? "w-14" : "w-10"
              } aspect-[4096/1652] _img_`}
            />
          </div>
        )}
      </div>
      <div className="flex-grow ml-2 mr-1">
        <h4 className={`${titleClass} line-clamp-1`}>{track.track_title}</h4>
        <div className="flex items-center justify-between">
          <p className="text-sm line-clamp-1 opacity-80">
            {track.track_artist}
          </p>
          <p className="ml-2 text-xs flex-shrink-0 opacity-50">
            {getTimeAgo(track.track_played)}
          </p>
        </div>
      </div>
    </div>
  );
}
