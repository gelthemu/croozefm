import {
  Schedule,
  Show,
  UgTime,
} from "@/app/components/providers/schedule/schedule";
import Tracklist from "@/app/components/providers/tracklist/tracklist";

export default function OnAir() {
  return (
    <div className="w-full flex flex-col space-y-4 text-left py-1">
      <div className="flex items-center justify-between text-sm">
        <p className="px-2 py-1 text-light font-semibold bg-red rounded-md _912cfm">
          On-Air:
        </p>
        <UgTime />
      </div>
      <div>
        <Show />
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-start md:space-x-4">
        <div className="w-full md:w-[42%]">
          <Schedule />
        </div>
        <div className="w-full md:w-[58%]">
          <Tracklist />
        </div>
      </div>
      <div className="w-full"></div>
    </div>
  );
}
