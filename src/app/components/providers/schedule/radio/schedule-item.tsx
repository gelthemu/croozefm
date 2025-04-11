import shows from "@/data/shows/shows";
import { formatTime } from "@/app/context/use-radio-schedule";

interface ScheduleItemProps {
  showId: string;
  start: number;
  end: number;
  name: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  showId,
  start,
  end,
  name,
}) => {
  const showDetails = shows.find((show) => show.id === showId);

  return (
    <div className="w-full sm:w-fit bg-light dark:bg-gray/10 rounded-sm px-6 py-4 shadow-sm hover:shadow transition-shadow duration-300 border-l-2 border-turquoise/80">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium _912cfm line-clamp-1 mb-2">{name}</h3>

          {showDetails?.host && (
            <p className="text-sm opacity-80 line-clamp-1 mb-2">
              {showDetails.host.map((h, i) => (
                <span key={i}>
                  {h.name}
                  {i < showDetails.host!.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
          <div className="text-sm opacity-60">
            {formatTime(start)} - {formatTime(end)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
