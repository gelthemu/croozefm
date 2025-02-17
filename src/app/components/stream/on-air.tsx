import {
  Schedule,
  Show,
  UgTime,
} from "@/app/c/shows/components/schedule/schedule";

export default function OnAir() {
  return (
    <div>
      <div className="my-8 py-10 border-y border-dark/40 dark:border-light/40">
        <div className="text-left md:text-center md:w-7/12 xl:w-6/12 md:mx-auto">
          <div className="flex items-center justify-between text-sm mb-4">
            <p className="w-fit px-1.5 py-1 text-light font-semibold bg-red rounded-sm _912cfm">
              On-Air:
            </p>
            <UgTime />
          </div>
          <Show />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
