import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

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
        img: "https://croozefm.blob.core.windows.net/images/the-inspiration.png",
        start: 5,
        end: 6,
      },
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
        end: 13,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/slowdown-hour.png",
        start: 13,
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
        end: 18,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/hot-6-at-6.png",
        start: 18,
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
        img: "https://croozefm.blob.core.windows.net/images/tgif-morning-addiction.png",
        start: 6,
        end: 10,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/tgif-lifestyle.png",
        start: 11,
        end: 14,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/tgif-most-wanted-extra.png",
        start: 14,
        end: 17,
      },
      {
        img: "https://croozefm.blob.core.windows.net/images/tgif-evening-switch.png",
        start: 17,
        end: 20,
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
      // {
      //   img: "https://croozefm.blob.core.windows.net/images/african-rhythms.png",
      //   start: 17,
      //   end: 20,
      // },
      // {
      //   img: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
      //   start: 20,
      //   end: 24,
      // },
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
      // {
      //   img: "https://croozefm.blob.core.windows.net/images/total-country-show.png",
      //   start: 19,
      //   end: 24,
      // },
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

    if (day === 3 || day === 4) {
      const croozeShow = currentSchedule.find(
        (show) => show.start === 19 && show.end === 20
      );
      if (croozeShow) {
        croozeShow.img =
          day === 3
            ? "https://croozefm.blob.core.windows.net/images/crooze-farmer.png"
            : "https://croozefm.blob.core.windows.net/images/crooze-doctor.png";
      }
    } else if (day === 6) {
      // Add the shows to the schedule first
      currentSchedule.push(
        {
          img: "https://croozefm.blob.core.windows.net/images/default.png",
          start: 15,
          end: 17,
        },
        {
          img: "https://croozefm.blob.core.windows.net/images/african-rhythms.png",
          start: 17,
          end: 20,
        },
        {
          img: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
          start: 20,
          end: 24,
        }
      );

      const croozeShow0 = currentSchedule.find(
        (show) => show.start === 15 && show.end === 17
      );
      const croozeShow1 = currentSchedule.find(
        (show) => show.start === 17 && show.end === 20
      );
      const croozeShow2 = currentSchedule.find(
        (show) => show.start === 20 && show.end === 24
      );

      if (croozeShow0) {
        const isDefault = false;
        croozeShow0.img = isDefault
          ? "https://croozefm.blob.core.windows.net/images/default.png"
          : "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png";
      }

      if (croozeShow1) {
        const isAfricanRhythms = false;
        croozeShow1.img = isAfricanRhythms
          ? "https://croozefm.blob.core.windows.net/images/african-rhythms.png"
          : "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png";
      }

      if (croozeShow2) {
        const isSaturdayNight = false;
        croozeShow2.img = isSaturdayNight
          ? "https://croozefm.blob.core.windows.net/images/saturday-night.png"
          : "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png";
      }
    } else if (day === 0) {
      // Add the shows to the schedule first
      currentSchedule.push(
        {
          img: "https://croozefm.blob.core.windows.net/images/default.png",
          start: 16,
          end: 19,
        },
        {
          img: "https://croozefm.blob.core.windows.net/images/total-country-show.png",
          start: 19,
          end: 24,
        }
      );

      const croozeShow1 = currentSchedule.find(
        (show) => show.start === 16 && show.end === 19
      );
      const croozeShow2 = currentSchedule.find(
        (show) => show.start === 19 && show.end === 24
      );

      if (croozeShow1) {
        const isDefault = false;
        croozeShow1.img = isDefault
          ? "https://croozefm.blob.core.windows.net/images/default.png"
          : "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png";
      }

      if (croozeShow2) {
        const isTotalCountryShow = false;
        croozeShow2.img = isTotalCountryShow
          ? "https://croozefm.blob.core.windows.net/images/total-country-show.png"
          : "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png";
      }
    }

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
    }, 60000);

    return () => clearInterval(interval);
  }, [getCurrentShow]);

  const handleShare = () => {
    const currentShowName = currentShow
      .split("/")
      .pop()
      ?.split(".")?.[0]
      ?.trim();

    const text = `On-Air 📻🔥🎵\n\nWestern Uganda’s Biggest Radio Station`;

    let url = "" as string;
    if (currentShowName !== "default") {
      url = `https://croozefm.geltaverse.com/c/shows/${currentShowName}`;
    } else {
      url = "https://croozefm.geltaverse.com";
    }

    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

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
      <button
        onClick={handleShare}
        className="absolute bottom-1 right-1 flex items-center bg-dark/80 border border-light/40 text-white py-1.5 px-2 rounded-sm transition-all duration-200 group"
        aria-label="Post on X/Twitter"
      >
        <span className="text-sm overflow-hidden w-0 group-hover:w-fit group-hover:mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap">
          Post on
        </span>
        <FaXTwitter size={16} />
      </button>
    </div>
  );
};

export default Schedule;
