import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MixtapeBtn } from "../stream/stream-btn";
import MixtapeDownloadBtn from "../stream/download-btn";

export default function ImmediateRelease() {
  return (
    <>
      <section className="p-2 pb-10 mt-8 border-b border-dark/20 dark:border-light/20">
        <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-5 lg:gap-4">
          <div className="w-full flex flex-col justify-start items-start lg:self-start">
            <div className="text-left">
              <span className="-mb-1 font-light text-sm uppercase opacity-80 dark:opacity-60">
                Latest Release
              </span>
              <h2 className="w-fit text-2xl relative mb-2 _912cfm">
                CFM Weekly Mixtape
              </h2>
              <p className="mb-3">
                Brace yourself for uplifting vibes and awesome tunes! Western
                Uganda&apos;s Biggest Radio Station brings you the Crooze FM
                Weekly Mixtape every Wednesday, starting strong with the
                incredible Married Dj, Deejay Emma.{" "}
                <Link
                  href="https://x.com/hashtag/CFMWeeklyMixtapes?src=hashtag_click&f=live"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Search #CFMWeeklyMixtapes on X/Twitter"
                  className="hover:underline"
                  style={{ color: "#3eac75" }}
                >
                  #CFMWeeklyMixtapes
                </Link>
              </p>
            </div>
            <div className="flex flex-row space-x-3">
              <MixtapeBtn />
              <MixtapeDownloadBtn />
            </div>
          </div>
          <div className="w-full md:w-[75%] lg:w-[80%] h-full lg:self-end overflow-hidden">
            <Image
              src="https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
              alt="Crooze FM Weekly Mixtape"
              width={2968}
              height={1626}
              priority={true}
              className="w-full h-full object-cover aspect-[1484/813] border-2 border-gray/60 rounded-sm _img_"
            />
          </div>
        </div>
      </section>
    </>
  );
}
