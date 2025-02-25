"use client";

import Image from "next/image";
import SocialLinks from "../tiny/socials";
import { ThemeSwitcher } from "../tiny/theme-toggle";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function Footer() {
  const { isMiniPlayerOpen } = useMiniPlayer();

  return (
    <footer className="w-full bg-gray text-light/80">
      <div
        className={`w-full max-w-screen-xl mx-auto px-6 lg:px-8 pt-12 sm:pt-16 ${
          isMiniPlayerOpen ? "pb-28" : "p-12"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 mb-8">
            <Image
              src="/cfm-logo-2.png"
              alt="CroozeFM Logo"
              width={4096}
              height={1652}
              className="w-full aspect-[4096/1652] _img_"
            />
          </div>
          <SocialLinks />
          <p className="text-sm text-wrap mt-8 font-medium">
            The Station Other Radio Stations Listen To
          </p>
        </div>
        <div className="mt-10 border-t border-light/30 pt-8">
          <div className="flex items-center justify-between">
            <small className="text-light/80 font-medium">Crooze FM Ltd</small>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
