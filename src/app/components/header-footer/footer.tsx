"use client";

import Image from "next/image";
import SocialLinks from "../tiny/socials";
import { ThemeSwitcher } from "../tiny/theme-toggle";
import ScrollToTop from "../tiny/scroll-to-top";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function Footer() {
  const { isMiniPlayerOpen } = useMiniPlayer();

  return (
    <footer className="w-full bg-gray/80 text-light/80">
      <div
        className={`w-full max-w-screen-xl mx-auto px-6 lg:px-8 pt-12 sm:pt-16 ${
          isMiniPlayerOpen ? "pb-32" : "p-12"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-6 text-sm">
          <div className=" w-full max-w-2xl">
            <div className="w-24 mb-4">
              <Image
                src="/cfm-logo-2.png"
                alt="CroozeFM Logo"
                width={4096}
                height={1652}
                className="w-full aspect-[4096/1652] _img_"
              />
            </div>
            <p>
              91.2 Crooze FM is Western Uganda&apos;s Biggest Radio Station,
              broadcasting from Mbarara to the world. Purely great music, for
              great friends.
            </p>
            <p className="text-wrap mt-2">
              The Station Other Radio Stations Listen To.
            </p>
          </div>
          <div className="flex md:flex-shrink-0">
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
