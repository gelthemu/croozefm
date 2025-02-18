"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Show } from "@/types/shows";

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps) => {
  return (
    <Link href={`/c/shows/${show.id}`}>
      <div className="text-left text-sm mb-2 sr-only">{show.title}</div>
      <div
        className={`group grid-1 relative rounded-sm border-2 border-gray/80 dark:border-light/40
        `}
      >
        <div className="w-full h-full overflow-hidden">
          <Image
            src={show.image}
            alt={show.title}
            width={2968}
            height={1626}
            priority={true}
            className="h-full w-full object-cover aspect-[1484/813] transition-transform duration-300 group-hover:scale-105 _img_"
          />
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
