"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRadioSchedule, formatTime } from "@/app/context/use-radio-schedule";
import Link from "next/link";
import { SnapShot } from "./snap-shot";
import { FaLink } from "react-icons/fa6";
import { shows } from "@/data/shows/shows";

const ftShows = shows.filter((show) => show.isFt);

const getShowUrl = (id: string) => {
  const ft_id = id?.trim();

  if (!ft_id) return "/shows";

  const matchingShow = ftShows.find((show) => {
    return show.id === ft_id;
  });

  return matchingShow ? `/shows/${ft_id}` : "/shows";
};

const Schedule = () => {
  const { currentShow } = useRadioSchedule();
  let hasValidShowUrl = false;
  let showUrl = "/shows";

  if (currentShow) {
    showUrl = getShowUrl(currentShow.id);
    hasValidShowUrl = showUrl !== "/shows";
  }

  return (
    <div className="relative group">
      <SnapShot />
      {hasValidShowUrl ? (
        <Link
          href={showUrl}
          className="absolute bottom-2.5 right-2.5 z-50 flex items-center justify-center bg-dark/80 border border-light/50 text-light p-1.5 rounded-md"
          aria-label="View Details"
        >
          <FaLink
            size={16}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
        </Link>
      ) : null}
    </div>
  );
};

const Show = () => {
  const { currentShow, nextShow } = useRadioSchedule();

  const DEFAULT_MESSAGE = "Great Music, for Great Friends";

  const displayName = currentShow ? currentShow.name : DEFAULT_MESSAGE;
  const showUrl = currentShow ? getShowUrl(currentShow.id) : "/shows";
  const hasValidShowUrl = showUrl !== "/shows";

  return (
    <div className="w-full flex flex-col md:flex-row md:space-x-0">
      <div className="w-full relative font-light p-4 bg-gradient-to-r from-light/60 to-transparent dark:from-gray/20 dark:to-transparent rounded-md shadow shadow-gray/20 dark:shadow-light/10 overflow-hidden select-none">
        <div className="_912cfm line-clamp-1">
          {currentShow && hasValidShowUrl ? (
            <Link href={showUrl}>
              <span>{displayName}</span>
            </Link>
          ) : (
            <div>
              <span>{displayName}</span>
            </div>
          )}
        </div>
        {currentShow && currentShow.host && (
          <p className="text-sm opacity-60 line-clamp-1">
            {currentShow.host.map((h, i) => (
              <span key={i}>
                {h.name}
                {i < currentShow.host!.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}
        <div
          className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-red to-turquoise ${
            currentShow ? "animate-pulse" : ""
          } `}
        ></div>
      </div>
      {nextShow && (
        <div className="w-full font-light p-4 bg-gradient-to-l from-light to-transparent dark:from-gray/10 dark:to-transparent rounded-md overflow-hidden select-none">
          <div className="w-full flex flex-row space-x-2">
            <div>
              <span className="inline-block px-2 py-1 text-xs text-light dark:text-dar bg-gray/70 dark:bg-gray/90 rounded-sm select-none">
                Up Next
              </span>
            </div>
            <div>
              <div className="text-sm _912cfm line-clamp-1">
                <span>{nextShow.name}</span>
              </div>
              <div className="text-sm opacity-60">
                <span>{formatTime(nextShow.time.start)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
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
