import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLink } from "react-icons/fa6";

interface Show {
  img: string;
  start: number;
  end: number;
}

export const Schedule = () => {
  const [currentShow, setCurrentShow] = useState<string>(
    "https://croozefm.blob.core.windows.net/images/default.png"
  );

  const getUgandaTime = (): Date => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", { timeZone: "Africa/Kampala" })
    );
  };

  const schedules: Record<string, Show[]> = {
    regular: [
      {
        img: "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
        start: 6,
        end: 10,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/coffee-break.png",
        start: 10,
        end: 11,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/lifestyle.png",
        start: 11,
        end: 14,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/most-wanted-hits.png",
        start: 14,
        end: 16,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/african-countdown.png",
        start: 16,
        end: 17,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/evening-switch.png",
        start: 17,
        end: 19,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/hits-selector.png",
        start: 20,
        end: 22,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/sports-bwino.png",
        start: 22,
        end: 24,
      },
    ],
    friday: [
      {
        img: "https://croozefm.blob.core.windows.net/images/tgif-most-wanted-extra.png",
        start: 14,
        end: 17,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/fat-friday-mix.png",
        start: 20,
        end: 24,
      },
    ],
    saturday: [
      {
        img: "https://croozefm.blob.core.windows.net/images/urban-breakfast.png",
        start: 6,
        end: 9,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/big-seat.png",
        start: 9,
        end: 11,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/sports-roundup.png",
        start: 12,
        end: 14,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
        start: 20,
        end: 24,
      },
    ],
    sunday: [
      {
        img: "https://croozefm.blob.core.windows.net/images/sunday-inspiration.png",
        start: 6,
        end: 9,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/sunday-love.png",
        start: 9,
        end: 12,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/enyangyi.png",
        start: 12,
        end: 14,
      },
    ],
  };

  const getCurrentShow = useCallback((): string => {
    const ugandaTime = getUgandaTime();
    const day = ugandaTime.getDay();

    let currentSchedule: Show[];
    if (day === 5) currentSchedule = schedules.friday;
    else if (day === 6) currentSchedule = schedules.saturday;
    else if (day === 0) currentSchedule = schedules.sunday;
    else currentSchedule = schedules.regular;

    for (const show of currentSchedule) {
      const startTime = new Date(ugandaTime);
      startTime.setHours(show.start, 0, 0);
      const endTime = new Date(ugandaTime);
      endTime.setHours(show.end, 0, 0);

      if (show.end < show.start) {
        if (ugandaTime >= startTime || ugandaTime < endTime) {
          return show.img;
        }
      } else if (ugandaTime >= startTime && ugandaTime < endTime) {
        return show.img;
      }
    }

    return "https://croozefm.blob.core.windows.net/images/default.png";
  }, []);

  useEffect(() => {
    setCurrentShow(getCurrentShow());

    const interval = setInterval(() => {
      setCurrentShow(getCurrentShow());
    }, 30000);

    return () => clearInterval(interval);
  }, [getCurrentShow]);

  return (
    <div className="relative w-full aspect-[1484/813]">
      <Image
        src={currentShow}
        alt="91.2 Crooze FM"
        width={1484}
        height={813}
        priority={true}
        className="w-full h-full object-cover aspect-[1484/813] _img_"
      />
      <Link
        href={
          currentShow.split("/").pop()?.split(".")?.[0]?.trim() !== "default"
            ? `/c/shows/${currentShow
                .split("/")
                .pop()
                ?.split(".")?.[0]
                ?.trim()}`
            : "/c/shows"
        }
        className="absolute bottom-1 right-1 flex items-center justify-center bg-dark/60 border border-light/60 text-light p-1.5 rounded-sm transition-all duration-200"
        aria-label="View Details"
      >
        <FaLink size={14} />
      </Link>
    </div>
  );
};

export default Schedule;
