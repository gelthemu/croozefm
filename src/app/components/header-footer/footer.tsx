"use client";

import { Logo } from "./navigation/logo";
import Image from "next/image";
import Link from "next/link";
import { StreamBtn } from "../stream/stream-btn";
import SocialLinks from "../tiny/socials";
import { ThemeSwitcher } from "../tiny/theme-toggle";
import ScrollToTop from "../tiny/scroll-to-top";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function Footer() {
  const { isMiniPlayerOpen, isCollapse } = useMiniPlayer();

  const policies = ["Privacy Policy", "Legal Notice", "Cookies Policy"];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray/70 dark:bg-gray text-light/80">
      <div
        className={`w-full max-w-screen-xl mx-auto px-4 lg:px-8 pt-12 sm:pt-16 `}
        style={{
          paddingBottom: `${
            isMiniPlayerOpen ? (isCollapse ? "260px" : "140px") : "60px"
          }`,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end gap-8 text-sm">
          <div className="max-w-2xl">
            <Logo />
            <p className="text-wrap my-4 max-w-lg">
              CFM Pulse is the largest Crooze FM Fan Base. Home to Fans of
              Western Uganda&apos;s Biggest Radio Station, broadcasting from
              Mbarara to the world.
            </p>
            <p className="text-wrap">By CFM Fans, for CFM Diehards</p>
          </div>
          <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 md:flex-shrink-0  md:flex-col md:space-x-0 md:space-y-6 md:items-start">
            <div>
              <SocialLinks />
            </div>
            <div className="w-fit">
              <StreamBtn className="border border-light/40" />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-light/30 pt-8 opacity-[0.75]">
          <div className="flex flex-wrap flex-row space-x-2.5 mb-6">
            {policies.map((policy, index) => (
              <small key={index} className="text-light/80 font-medium">
                <Link
                  href={`/policies/${policy
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {policy}
                </Link>
              </small>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <small className="text-light/80 font-medium flex flex-col space-y-1.5 md:flex-row md:space-y-0">
                <span>© {currentYear} CFM Pulse</span>
                <span className="mx-2 hidden md:inline-flex opacity-[0.5]">
                  {"•"}
                </span>
                <span className="inline-flex items-baseline">
                  <span>Visit</span>
                  <Link
                    href="https://geltaverse.com"
                    target="_blank"
                    className="inline-flex items-baseline hover:underline"
                  >
                    <Image
                      src="https://geltaverse.com/io/favicon.ico"
                      alt="Geltaverse.com"
                      width={60}
                      height={60}
                      className="mx-1 size-4 self-center rounded-sm border border-light/20 aspect-square _img_"
                    />
                    <span>geltaverse.com</span>
                  </Link>
                </span>
              </small>
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
