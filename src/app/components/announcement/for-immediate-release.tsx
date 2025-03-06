import React from "react";
import Link from "next/link";
import Image from "next/image";
import { mixtapes } from "@/data/mixtapes";
import MixtapeBtn from "./components/mixtape-btn";
import ViewAllBtn from "../tiny/viewallbtn";
import { FormatSimpleDate } from "../tiny/format-date";

interface ImmediateReleaseProps {
  viewAll?: boolean;
}
export default function ImmediateRelease({
  viewAll = false,
}: ImmediateReleaseProps) {
  const sortedMixtapes = [...mixtapes].sort((a, b) => b.id - a.id);

  return (
    <>
      <section
        className="p-2 py-8 mt-4 border-y border-dark/20 dark:border-light/20"
        id="latest-release"
      >
        <div className="w-full flex items-center -mb-0.5 font-light text-sm opacity-80 dark:opacity-60">
          <span className="uppercase">Latest Release</span>
          <span className="mx-1.5 opacity-60">•</span>
          <span>
            <FormatSimpleDate epoch={sortedMixtapes[0].id} />
          </span>
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-5 lg:gap-4">
          <div className="w-full flex flex-col justify-start items-start lg:self-start">
            <div className="text-left">
              <h2 className="w-fit text-2xl relative mb-2 _912cfm">
                CFM Weekly Mixtape
              </h2>
              <p className="mb-3">
                Another mixtape to keep you moving! Western Uganda&apos;s
                Biggest Radio Station brings you the Crooze FM Weekly Mixtape
                every Wednesday.{" "}
                <Link
                  href="/c/mixtapes"
                  aria-label="View All Mixtapes"
                  className="hover:underline"
                  style={{ color: "#3eac75" }}
                >
                  #CFMWeeklyMixtapes
                </Link>
              </p>
              <p className="mb-2.5 flex items-center">
                <span>{sortedMixtapes[0].title}</span>
                <span className="ml-1">{"😎🔥🎶"}</span>
              </p>
            </div>
            <div className="flex flex-row space-x-3">
              <MixtapeBtn mixtape={sortedMixtapes[0]} />
            </div>
          </div>
          <div className="relative w-full md:w-[75%] lg:w-[80%] h-full lg:self-end overflow-hidden">
            <Image
              src="https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
              alt="Crooze FM Weekly Mixtape"
              width={2968}
              height={1626}
              priority={true}
              className="w-full h-full object-cover aspect-[1484/813] border-2 border-gray/60 rounded-sm _img_"
            />
            <div className="absolute bottom-3 right-3">
              <Link
                href={
                  sortedMixtapes[0].dj?.link
                    ? sortedMixtapes[0].dj?.link
                    : `/i/${sortedMixtapes[0].dj?.name
                        ?.toLowerCase()
                        .replace(/ /g, "-")}`
                }
                aria-label={`${sortedMixtapes[0].dj?.name}'s Profile`}
                className="text-xs font-semibold px-2 py-1 rounded-sm hover:bg-dark/40 transition-all duration-300"
                style={{ color: "#fff" }}
              >
                <span>{sortedMixtapes[0].dj?.name}</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-end mx-auto mt-5 mb-0 ${
            viewAll ? "" : "hidden"
          }`}
        >
          <ViewAllBtn href="/c/mixtapes" text="View All Mixtapes" />
        </div>
      </section>
    </>
  );
}
