"use client";

import React, { useState, useEffect } from "react";
import { useCurrentShow } from "./current-show";
import Link from "next/link";
import Image from "next/image";
import { FaLink } from "react-icons/fa6";
import { shows } from "@/data/shows";

const getShowUrl = (imgPath: string) => {
  const imgFileName = imgPath.split("/").pop()?.split(".")?.[0]?.trim();

  if (!imgFileName) return "/c/shows";

  const matchingShow = shows.find((show) => {
    const showImgFileName = show.image
      .split("/")
      .pop()
      ?.split(".")?.[0]
      ?.trim();
    return showImgFileName === imgFileName;
  });

  return matchingShow ? `/c/shows/${imgFileName}` : "/c/shows";
};

const Schedule = () => {
  const currentShow = useCurrentShow();
  const showUrl = getShowUrl(currentShow.img);

  return (
    <div className="relative w-full aspect-[1484/813] group">
      <Image
        src={currentShow.img}
        alt={currentShow.name}
        width={1484}
        height={813}
        priority={true}
        className="w-full h-full object-cover aspect-[1484/813] border-2 border-gray rounded-sm _img_"
      />
      <Link
        href={showUrl}
        className="absolute bottom-2.5 right-2.5 flex items-center justify-center bg-dark/60 border border-light/60 text-light p-1.5 rounded-sm"
        aria-label="View Details"
      >
        <FaLink
          size={18}
          className="group-hover:rotate-180 transition-transform duration-500"
        />
      </Link>
    </div>
  );
};

const Show = () => {
  const currentShow = useCurrentShow();
  const showUrl = getShowUrl(currentShow.img);

  return (
    <div className="mb-4">
      <Link href={showUrl} className="text-left font-light _912cfm">
        <p className="line-clamp-1">{currentShow.name}</p>
      </Link>
    </div>
  );
};

const UgTime = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Kampala",
        month: "short",
        day: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat(
        "en-US",
        dateOptions
      ).format(now);

      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Kampala",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedTime = new Intl.DateTimeFormat(
        "en-US",
        timeOptions
      ).format(now);

      setDateTime(`${formattedDate} • ${formattedTime.toUpperCase()} (UG)`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-fit px-1.5 py-1 text-sm text-dark/80 dark:text-light/80">
      {dateTime}
    </div>
  );
};

export { Schedule, Show, UgTime };
