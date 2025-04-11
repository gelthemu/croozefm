"use client";

import { useEffect } from "react";
import { useRadioSchedule } from "@/app/context/use-radio-schedule";
import { H2Title } from "../../divs/page-heading";
import DayTabs from "./day-tabs";
import ScheduleItem from "./schedule-item";
import { Show } from "@/app/components/providers/schedule/schedule";

const RadioSchedule = () => {
  const { selectedDay, handleDaySelect, getShowsForDay } = useRadioSchedule();

  useEffect(() => {
    console.log("Selected day:", selectedDay);
    console.log("Shows:", getShowsForDay(selectedDay));
  }, [getShowsForDay, selectedDay]);

  return (
    <div className="w-full rounded-sm overflow-hidden">
      <div className="space-y-6">
        <H2Title title="Crooze FM Full Radio Schedule" />
        <Show />
        <div>
          <DayTabs selectedDay={selectedDay} onDaySelect={handleDaySelect} />
          <div className="flex flex-wrap gap-4">
            {getShowsForDay(selectedDay).length > 0 ? (
              getShowsForDay(selectedDay).map((show) => (
                <ScheduleItem
                  key={show.id}
                  showId={show.id}
                  start={show.start}
                  end={show.end}
                  name={show.name}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No shows scheduled for{" "}
                {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioSchedule;
