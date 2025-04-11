"use client";

import { useState, useEffect } from "react";
import {
  ScheduleDay,
  dayMap,
  getShowsForDay,
  getCurrentlyPlayingShow,
} from "@/data/shows/schedule";
import { Show } from "@/types/show";
import shows from "@/data/shows/shows";

const getCurrentTimeInKampala = () => {
  const now = new Date();
  const kampalaTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    hour: "numeric",
    hour12: false,
  }).format(now);

  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Kampala",
    weekday: "long",
  })
    .format(now)
    .toLowerCase() as ScheduleDay;

  return {
    day: dayOfWeek,
    hour: parseInt(kampalaTime),
  };
};

export const useRadioSchedule = () => {
  const initialDay = getCurrentTimeInKampala().day;
  const [selectedDay, setSelectedDay] = useState<ScheduleDay>(initialDay);
  const [currentShow, setCurrentShow] = useState<Show | null>(null);
  const [nextShow, setNextShow] = useState<Show | null>(null);

  const getNextShow = (currentDay: ScheduleDay, currentHour: number) => {
    const dailyShows = getShowsForDay(currentDay);

    let nextShowId: string | null = null;

    if (currentShow) {
      const currentShowIndex = dailyShows.findIndex(
        (show) => show.id === currentShow.id
      );
      if (currentShowIndex !== -1 && currentShowIndex + 1 < dailyShows.length) {
        nextShowId = dailyShows[currentShowIndex + 1].id;
      } else {
        const nextDayIndex =
          (Object.values(dayMap).indexOf(currentDay) + 1) % 7;
        const nextDay = dayMap[nextDayIndex];
        const nextDayShows = getShowsForDay(nextDay);
        if (nextDayShows.length > 0) {
          nextShowId = nextDayShows[0].id;
        }
      }
    } else {
      const nextShowItem = dailyShows.find((show) => show.start > currentHour);
      if (nextShowItem) {
        nextShowId = nextShowItem.id;
      }
    }

    return nextShowId
      ? shows.find((show) => show.id === nextShowId) || null
      : null;
  };

  useEffect(() => {
    const updateCurrentAndNextShow = () => {
      const { day, hour } = getCurrentTimeInKampala();

      const currentShowId = getCurrentlyPlayingShow(day, hour)?.id;
      const currentShowData = currentShowId
        ? shows.find((show) => show.id === currentShowId) || null
        : null;
      setCurrentShow(currentShowData);

      const nextShowData = getNextShow(day, hour);
      setNextShow(nextShowData);
    };

    updateCurrentAndNextShow();

    const intervalId = setInterval(updateCurrentAndNextShow, 5000);

    return () => clearInterval(intervalId);
  });

  const handleDaySelect = (day: ScheduleDay) => {
    setSelectedDay(day);
  };

  return {
    currentShow,
    nextShow,
    selectedDay,
    handleDaySelect,
    getShowsForDay,
  };
};

export const formatTime = (hour: number) => {
  if (hour === 24) hour = 0;
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
};

export const getShowDetails = (shows: Show[], id: string) => {
  return shows.find((show) => show.id === id);
};
