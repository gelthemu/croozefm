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
      <div className="group appear grid-1 relative overflow-hidden rounded-md border-2 border-light/5 bg-gray shadow-md transition-all hover:shadow-xl">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={show.image}
            alt={show.title}
            width={1484}
            height={813}
            priority={true}
            className="h-full w-full object-cover aspect-[1484/813] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale _img_"
          />
        </div>
        <div className="p-2 font-medium md:text-sm text-light/60 overflow-hidden line-clamp-1">
          <h3>{show.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
