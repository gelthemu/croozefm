"use client";

import { useState, useEffect, useRef } from "react";
import {
  ScheduleDay,
  dayMap,
  getShowsForDay,
  getCurrentlyPlayingShow,
} from "@/data/shows/schedule";
import { Show } from "@/types/show";
import shows from "@/data/shows/shows";

const RadioSchedul = () => {
  const [selectedDay, setSelectedDay] = useState<ScheduleDay>("monday");

  const [currentShow, setCurrentShow] = useState<Show | null>(null);
  const [nextShow, setNextShow] = useState<Show | null>(null);

  const tabsContainerRef = useRef<HTMLDivElement>(null);

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

  const formatTime = (hour: number) => {
    if (hour === 24) hour = 0;
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:00 ${period}`;
  };

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
    const updateShows = () => {
      const { day, hour } = getCurrentTimeInKampala();

      setSelectedDay(day);

      const currentShowId = getCurrentlyPlayingShow(day, hour)?.id;
      const currentShowData = currentShowId
        ? shows.find((show) => show.id === currentShowId) || null
        : null;
      setCurrentShow(currentShowData);

      const nextShowData = getNextShow(day, hour);
      setNextShow(nextShowData);
    };

    updateShows();

    const intervalId = setInterval(updateShows, 60000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (tabsContainerRef.current) {
      const tabsContainer = tabsContainerRef.current;
      const selectedTabElement = tabsContainer.querySelector(
        `[data-day="${selectedDay}"]`
      );

      if (selectedTabElement) {
        const containerWidth = tabsContainer.offsetWidth;
        const tabWidth = selectedTabElement.clientWidth;
        const tabOffsetLeft = (selectedTabElement as HTMLElement).offsetLeft;
        const scrollPosition =
          tabOffsetLeft - containerWidth / 2 + tabWidth / 2;

        tabsContainer.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedDay]);

  const getShowDetails = (id: string): Show | undefined => {
    return shows.find((show) => show.id === id);
  };

  const handleDaySelect = (day: ScheduleDay) => {
    setSelectedDay(day);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-dark rounded-lg shadow-lg overflow-hidden">
      {/* Now Playing Section */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-gray/5 to-turquoise/10 dark:from-dark dark:to-turquoise/20">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray dark:text-light">
          Now Playing
        </h2>

        <div className="space-y-6">
          {/* Currently On-Air Show */}
          {currentShow ? (
            <div className="relative bg-white dark:bg-gray rounded-lg p-4 shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-red to-turquoise animate-pulse"></div>
              <div className="ml-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red text-white mb-2">
                      On-Air
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-gray dark:text-light">
                      {currentShow.name}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(currentShow.time.start)} -{" "}
                    {formatTime(currentShow.time.end)}
                  </span>
                </div>

                {currentShow.host && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Host:{" "}
                    {currentShow.host.map((h, i) => (
                      <span key={i}>
                        {h.name}
                        {i < currentShow.host!.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}

                {currentShow.isPop && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-turquoise text-white mt-2">
                    Popular
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray rounded-lg p-4 shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center italic">
                No show currently airing
              </p>
            </div>
          )}

          {/* Next Show */}
          {nextShow && (
            <div className="bg-white dark:bg-gray rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray dark:bg-light text-white dark:text-gray mb-2">
                    Next
                  </span>
                  <h3 className="text-lg font-semibold text-gray dark:text-light">
                    {nextShow.name}
                  </h3>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTime(nextShow.time.start)} -{" "}
                  {formatTime(nextShow.time.end)}
                </span>
              </div>

              {nextShow.host && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Host:{" "}
                  {nextShow.host.map((h, i) => (
                    <span key={i}>
                      {h.name}
                      {i < nextShow.host!.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              )}

              {nextShow.isPop && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-turquoise text-white mt-2">
                  Popular
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Daily Schedule Section */}
      <div className="p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray dark:text-light">
          Daily Schedule
        </h2>

        {/* Day Tabs - Enhanced with snap scrolling */}
        <div
          ref={tabsContainerRef}
          className="flex overflow-x-auto pb-2 scrollbar-hide mb-4 snap-x snap-mandatory scroll-smooth"
        >
          {Object.values(dayMap).map((day) => (
            <button
              key={day}
              data-day={day}
              onClick={() => handleDaySelect(day)}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md mr-2 transition-colors snap-center min-w-[100px] text-center ${
                day === selectedDay
                  ? "bg-turquoise text-white"
                  : "bg-gray-100 dark:bg-gray hover:bg-gray-200 dark:hover:bg-gray/80 text-gray-800 dark:text-gray-200"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {getShowsForDay(selectedDay).map((show) => {
            const showDetails = getShowDetails(show.id);

            return (
              <div
                key={show.id}
                className="bg-white dark:bg-gray/80 rounded-lg p-3 shadow-sm hover:shadow transition-shadow border-l-4 border-turquoise/70"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-light">
                      {show.name}
                    </h3>

                    {showDetails?.host && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        Host:{" "}
                        {showDetails.host.map((h, i) => (
                          <span key={i}>
                            {h.name}
                            {i < showDetails.host!.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    )}

                    {showDetails?.isPop && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-turquoise text-white mt-1">
                        Popular
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {formatTime(show.start)} - {formatTime(show.end)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioSchedul;