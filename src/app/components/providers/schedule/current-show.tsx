import { useState, useEffect } from "react";
import {
  dayMap,
  getCurrentlyPlayingShow,
  ScheduleDay,
} from "@/data/shows/schedule";

export interface CurrentShow {
  id: string;
  name: string;
}

export const getUgandaTime = (): Date => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Africa/Kampala" }));
};

export const getCurrentShow = (): CurrentShow => {
  const ugandaTime = getUgandaTime();
  const day = ugandaTime.getDay();
  const currentHour = ugandaTime.getHours();

  const currentDay = dayMap[day] as ScheduleDay;

  const currentShow = getCurrentlyPlayingShow(currentDay, currentHour);

  if (currentShow) {
    return {
      id: currentShow.id,
      name: currentShow.name,
    };
  }

  return {
    id: "",
    name: "Great Music, for Great Friends",
  };
};

export const useCurrentShow = () => {
  const [currentShow, setCurrentShow] = useState<CurrentShow>({
    id: "",
    name: "Great Music, for Great Friends",
  });

  useEffect(() => {
    const updateShow = () => {
      const newShow = getCurrentShow();
      setCurrentShow((prev) => {
        if (prev.name !== newShow.name) {
          return newShow;
        }
        return prev;
      });
    };

    updateShow();

    const interval = setInterval(updateShow, 5000);

    return () => clearInterval(interval);
  }, []);

  return currentShow;
};
