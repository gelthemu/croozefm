"use client";

import React, { useState, useEffect } from "react";
import { useCurrentShow } from "./current-show";
import Link from "next/link";
import Image from "next/image";
import { FaLink } from "react-icons/fa6";

const Schedule = () => {
  const currentShow = useCurrentShow();

  return (
    <div className="relative w-full aspect-[1484/813] group">
      <Image
        src={currentShow.img}
        alt={currentShow.name}
        width={1484}
        height={813}
        priority={true}
        className="w-full h-full object-cover aspect-[1484/813] _img_"
      />
      <Link
        href={
          currentShow.img.split("/").pop()?.split(".")?.[0]?.trim() !==
          "default"
            ? `/c/shows/${currentShow.img
                .split("/")
                .pop()
                ?.split(".")?.[0]
                ?.trim()}`
            : "/c/shows"
        }
        className="absolute bottom-1.5 right-1.5 flex items-center justify-center bg-dark/60 border border-light/60 text-light p-1.5 rounded-sm"
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

  return (
    <div className="text-left uppercase mb-2.5 font-semibold">
      <p>{currentShow.name}</p>
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
        hour12: true,
      };
      const formattedTime = new Intl.DateTimeFormat(
        "en-US",
        timeOptions
      ).format(now);

      setDateTime(`${formattedDate} • ${formattedTime.toUpperCase()}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 10000);

    return () => clearInterval(interval);
  }, []);

  return <div className="w-fit px-1.5 py-1 text-sm font-light">{dateTime}</div>;
};

export { Schedule, Show, UgTime };
