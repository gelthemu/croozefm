import { useRef, useEffect } from "react";
import { ScheduleDay, dayMap } from "@/data/shows/schedule";

interface DayTabsProps {
  selectedDay: ScheduleDay;
  onDaySelect: (day: ScheduleDay) => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ selectedDay, onDaySelect }) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={tabsContainerRef}
      className="w-full flex overflow-x-auto p-1 scrollbar-hide mb-4 snap-x snap-mandatory scroll-smooth rounded-sm border border-gray/20 dark:border-light/20"
    >
      {Object.values(dayMap).map((day) => (
        <button
          key={day}
          data-day={day}
          onClick={() => onDaySelect(day)}
          className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-sm mr-2 transition-colors snap-center w-full min-w-[100px] text-center ${
            day === selectedDay
              ? "bg-red text-light"
              : "bg-gray/10 dark:bg-gray/50 hover:bg-gray/30 dark:hover:bg-gray/60 transition-all duration-300"
          }`}
        >
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DayTabs;
