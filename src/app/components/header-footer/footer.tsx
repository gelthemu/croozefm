"use client";

import { Logo } from "./navigation/logo";
import { StreamBtn } from "../stream/stream-btn";
import SocialLinks from "../tiny/socials";
import { ThemeSwitcher } from "../tiny/theme-toggle";
import ScrollToTop from "../tiny/scroll-to-top";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function Footer() {
  const { isMiniPlayerOpen } = useMiniPlayer();

  return (
    <footer className="w-full bg-gray text-light/80">
      <div
        className={`w-full max-w-screen-xl mx-auto px-4 lg:px-8 pt-12 sm:pt-16 ${
          isMiniPlayerOpen ? "pb-32" : "p-12"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-6 text-sm">
          <div className=" w-full max-w-2xl">
            <Logo />
            <p className="text-wrap my-4">
              91.2 Crooze FM is Western Uganda&apos;s Biggest Radio Station,
              broadcasting from Mbarara to the world. Purely great music, for
              great friends.
            </p>
            <p className="text-wrap">
              The Station Other Radio Stations Listen To.
            </p>
          </div>
          <div className="flex flex-col space-y-4 md:flex-shrink-0">
            <div className="w-fit mb-4">
              <StreamBtn className="border border-light/40" />
            </div>
            <SocialLinks />
          </div>
        </div>
        <div className="mt-8 border-t border-light/30 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <small className="text-light/80 font-medium">Crooze FM Ltd</small>
            </div>
            <div className="flex items-center gap-1">
              <ScrollToTop />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
