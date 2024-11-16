import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Show } from "@/types/shows";

interface ShowCardProps {
  show: Show;
  featured?: boolean;
}

export const ShowCard = ({ show, featured }: ShowCardProps) => {
  return (
    <Link href={`/shows/${show.id}`}>
      <div
        className={`group grid-1 relative overflow-hidden rounded-sm border-2 border-light/10 bg-gray shadow-md transition-all hover:shadow-xl ${
          featured ? "col-span-2 row-span-2" : ""
        }`}
      >
        <div className="w-full h-full overflow-hidden">
          <Image
            src={show.image}
            alt={show.title}
            width={1484}
            height={813}
            priority={true}
            className="h-full w-full object-cover aspect-[1484/813] transition-transform duration-300 group-hover:scale-105 _img_"
          />
        </div>
        <div className="p-3">
          <h3 className="sr-only">{show.title}</h3>
          {show.host && (
            <p className="font-medium md:text-sm text-light/60 overflow-hidden line-clamp-1">
              <span className="sr-only">Hosted by</span>
              <i className="fa-solid fa-microphone-lines mr-1"></i> {show.host}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
