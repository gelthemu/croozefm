"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useCurrentShow } from "@/app/components/providers/schedule/current-show";
import Link from "next/link";
import ImgDiv from "../divs/image-div";
import { FaLink } from "react-icons/fa6";
import { shows } from "@/data/shows/shows";

const ftShows = shows.filter((show) => show.isFt);

const getShowUrl = (imgPath: string) => {
  const imgFileName = imgPath.split("/").pop()?.split(".")?.[0]?.trim();

  if (!imgFileName) return "/shows";

  const matchingShow = ftShows.find((show) => {
    const showImgFileName =
      `https://croozefm.blob.core.windows.net/images/${show.id}.png`
        .split("/")
        .pop()
        ?.split(".")?.[0]
        ?.trim();
    return showImgFileName === imgFileName;
  });

  return matchingShow ? `/shows/${imgFileName}` : "/shows";
};

const Schedule = () => {
  const currentShow = useCurrentShow();
  const showUrl = getShowUrl(currentShow.img);
  const hasValidShowUrl = showUrl !== "/shows";

  return (
    <div className="relative group">
      <ImgDiv url={currentShow.img} alt={currentShow.name} text="On-Air" />
      {hasValidShowUrl ? (
        <Link
          href={showUrl}
          className="absolute bottom-2.5 right-2.5 flex items-center justify-center bg-dark/80 border border-light/50 text-light p-1.5 rounded-md"
          aria-label="View Details"
        >
          <FaLink
            size={16}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
        </Link>
      ) : (
        null
      )}
    </div>
  );
};

const Show = () => {
  const currentShow = useCurrentShow();
  const showUrl = getShowUrl(currentShow.img);
  const hasValidShowUrl = showUrl !== "/shows";

  return hasValidShowUrl ? (
    <Link href={showUrl} className="font-light _912cfm">
      <span>{currentShow.name}</span>
    </Link>
  ) : (
    <div className="font-light _912cfm select-none">
      <span>{currentShow.name}</span>
    </div>
  );
};

const UgTime = () => {
  const [dateTime, setDateTime] = useState("");

  const options = useMemo(
    (): Intl.DateTimeFormatOptions => ({
      timeZone: "Africa/Kampala",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    []
  );

  const formatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", options),
    [options]
  );

  const updateDateTime = useCallback(() => {
    const now = new Date();

    const formattedParts = formatter.formatToParts(now);

    const weekday =
      formattedParts.find((part) => part.type === "weekday")?.value || "";
    const month =
      formattedParts.find((part) => part.type === "month")?.value || "";
    const day = formattedParts.find((part) => part.type === "day")?.value || "";

    const minute =
      formattedParts.find((part) => part.type === "minute")?.value || "";
    const hour =
      formattedParts.find((part) => part.type === "hour")?.value || "";
    const dayPeriod =
      formattedParts
        .find((part) => part.type === "dayPeriod")
        ?.value.toUpperCase() || "";

    const newDateTime = `${weekday}, ${month} ${day} • ${hour}:${minute} ${dayPeriod} (UG)`;

    setDateTime((prevDateTime) => {
      if (prevDateTime !== newDateTime) {
        return newDateTime;
      }
      return prevDateTime;
    });
  }, [formatter]);

  useEffect(() => {
    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [updateDateTime]);

  return useMemo(
    () => <div className="text-sm opacity-[0.75]">{dateTime}</div>,
    [dateTime]
  );
};

const MemoizedUgTime = React.memo(UgTime);

export { Schedule, Show, MemoizedUgTime as UgTime };
