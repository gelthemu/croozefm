import SocialLinks from "../tiny/socials";
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
          <div className="flex items-center justify-between mb-2.5 text-sm">
            <p className="w-fit px-1.5 py-1 text-light font-semibold bg-red rounded-sm _912cfm">
              On-Air:
            </p>
            <UgTime />
          </div>
          <Show />
          <div className="p-1 bg-gray/80 dark:bg-gray/100">
            <Schedule />
            <div className="flex items-center justify-end p-2 pr-1.5 pb-1">
              <span className="mr-2 text-sm font-light text-light dark:text-light/80">
                Check our socials:
              </span>
              <span>
                <SocialLinks />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
