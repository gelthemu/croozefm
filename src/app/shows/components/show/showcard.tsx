"use client";
import React from "react";
import ImgDiv from "@/app/components/providers/divs/image-div";
import { useRouter } from "next/navigation";
import { Show } from "@/types/show";
import { ENDPOINT_URL } from "@/data/endpoint";

interface ShowCardProps {
  show: Show;
  srOnly?: boolean;
}

export const ShowCard = ({ show, srOnly = false }: ShowCardProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/shows/${show.id}`);
  };

  return (
    <div
      onClick={handleOnClick}
      className="group w-[280px] md:w-[200px] p-0.5 rounded-sm border border-dark/20 dark:border-light/10 cursor-pointer"
    >
      <div className="relative flex flex-col">
        <ImgDiv
          url={`${ENDPOINT_URL}/images/${show.id}.png`}
          alt={show.name}
          imgClass="transition-transform duration-300 group-hover:scale-105"
          text={show.name}
        />
        <div
          className={`${
            srOnly ? "sr-only" : ""
          } text-left text-sm m-2.5 overflow-hidden opacity-[0.8]`}
        >
          <div className="font-semibold mb-0.5">{show.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
