"use client";
import React from "react";
import ImgDiv from "@/app/components/providers/divs/image-div";
import { useRouter } from "next/navigation";
import { Show } from "@/types/show";

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/shows/${show.id}`);
  };

  return (
    <div onClick={handleOnClick} className="cursor-pointer">
      <div className="text-left text-sm mb-2 sr-only">{show.name}</div>
      <div className="group grid-1 relative">
        <ImgDiv
          url={`https://croozefm.blob.core.windows.net/images/${show.id}.png`}
          alt={show.name}
          imgClass="transition-transform duration-300 group-hover:scale-105"
          text={show.name}
        />
      </div>
    </div>
  );
};

export default ShowCard;
