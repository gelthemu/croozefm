import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Show {
  img: string;
  start: number;
  end: number;
}

export const Schedule = () => {
  const [currentShow, setCurrentShow] = useState<string>(
    "/assets/shows/default.png"
  );

  const getUgandaTime = (): Date => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", { timeZone: "Africa/Kampala" })
    );
  };

  const schedules: Record<string, Show[]> = {
    regular: [
      { img: "/assets/shows/the-inspiration.png", start: 5, end: 6 },
      { img: "/assets/shows/morning-addiction.png", start: 6, end: 10 },
      { img: "/assets/shows/coffee-break.png", start: 10, end: 11 },
      { img: "/assets/shows/lifestyle.png", start: 11, end: 13 },
      { img: "/assets/shows/slowdown-hour.png", start: 13, end: 14 },
      { img: "/assets/shows/most-wanted-hits.png", start: 14, end: 16 },
      { img: "/assets/shows/african-countdown.png", start: 16, end: 17 },
      { img: "/assets/shows/evening-switch.png", start: 17, end: 18 },
      { img: "/assets/shows/hot-6-at-6.png", start: 18, end: 19 },
      { img: "/assets/shows/hits-selector.png", start: 20, end: 22 },
      { img: "/assets/shows/sports-bwino.png", start: 22, end: 24 },
    ],
    friday: [
      { img: "/assets/shows/tgif-morning-addiction.png", start: 6, end: 10 },
      { img: "/assets/shows/tgif-lifestyle.png", start: 11, end: 14 },
      { img: "/assets/shows/tgif-most-wanted-extra.png", start: 14, end: 17 },
      { img: "/assets/shows/tgif-evening-switch.png", start: 17, end: 20 },
      { img: "/assets/shows/fat-friday-mix.png", start: 20, end: 24 },
    ],
    saturday: [
      { img: "/assets/shows/urban-breakfast.png", start: 6, end: 9 },
      { img: "/assets/shows/big-seat.png", start: 9, end: 11 },
      { img: "/assets/shows/sports-roundup.png", start: 12, end: 14 },
      { img: "/assets/shows/african-rhythms.png", start: 17, end: 20 },
      { img: "/assets/shows/saturday-night.png", start: 20, end: 24 },
    ],
    sunday: [
      { img: "/assets/shows/sunday-inspiration.png", start: 6, end: 9 },
      { img: "/assets/shows/sunday-love.png", start: 9, end: 12 },
      { img: "/assets/shows/enyangyi.png", start: 12, end: 14 },
    ],
  };

  const getCurrentShow = (): string => {
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
            ? "/assets/shows/crooze-farmer.png"
            : "/assets/shows/crooze-doctor.png";
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

    return "/assets/shows/default.png";
  };

  useEffect(() => {
    setCurrentShow(getCurrentShow());

    const interval = setInterval(() => {
      setCurrentShow(getCurrentShow());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <Image
        src={currentShow}
        alt="91.2 Crooze FM"
        width={1484}
        height={813}
        priority={true}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Schedule;
