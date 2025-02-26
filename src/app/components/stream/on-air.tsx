import {
  Schedule,
  Show,
  UgTime,
} from "@/app/c/shows/components/schedule/schedule";
import Tracklist from "./tracklist";

export default function OnAir() {
  return (
    <div className="my-8 py-10 border-y border-dark/20 dark:border-light/20">
      <div className="text-left w-full">
        <div className="w-full flex items-center justify-between text-sm mb-4">
          <p className="w-fit px-1.5 py-1 text-light font-semibold bg-red rounded-sm _912cfm">
            On-Air:
          </p>
          <UgTime />
        </div>
        <Show />
        <div className="w-full md:flex md:items-end md:space-x-5">
          <div className="w-full md:w-[42%]">
            <Schedule />
          </div>
          <div className="w-full md:w-[58%]">
            <Tracklist />
          </div>
        </div>
      </div>
    </div>
  );
}
