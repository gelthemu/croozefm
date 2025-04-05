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
      className={`bg-gray/10 dark:bg-gray/40 rounded-sm p-1.5 flex-shrink-0 flex items-end ${className}`}
    >
      <div
        className={`flex-shrink-0 ${imageSize} relative aspect-square rounded-sm overflow-hidden`}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
          style={{
            aspectRatio: "1/1",
            backgroundImage: `url("/assets/cfm-pulse-official-logo-dark.png")`,
          }}
        >
          {track.track_image ? (
            <Image
              src={track.track_image}
              alt={`${track.track_title} cover`}
              width={512}
              height={512}
              className="w-full h-full object-cover aspect-square _img_"
            />
          ) : null}
        </div>
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
