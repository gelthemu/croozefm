import React from "react";
import Link from "next/link";
import { mixtapes } from "@/data/mixtapes";
import { MixtapeBtn } from "@/app/c/mixtapes/components/mixtape-btn";

interface LatestMixtapeFeedProps {
  code: string;
}

export default function LatestMixtapeFeed({ code }: LatestMixtapeFeedProps) {
  const sortedMixtapes = [...mixtapes]
    .filter((mixtape) => mixtape.dj.code === code)
    .sort((a, b) => b.id - a.id);

  return (
    <>
      <section className="p-1">
        <div className="w-full flex -mb-0.5 font-light text-sm opacity-80 dark:opacity-60">
          <span className="uppercase">Missed It?</span>
        </div>
        <div className="w-full flex flex-col">
          <div className="text-left">
            <h3 className="font-medium text-lg text-red capitalize _912cfm">{`${sortedMixtapes[0].dj?.code}'s Latest Mixtape`}</h3>
            <p className="mb-3">
              Crank it now and catch the shockwave you missed!..
            </p>
            <p className="mb-2.5 flex items-center">
              <span>{sortedMixtapes[0].title}</span>
              <span className="ml-1.5">{"🔥🎶"}</span>
            </p>
          </div>
          <div className="flex flex-row mb-3">
            <MixtapeBtn mixtape={sortedMixtapes[0]} />
          </div>
          <div className="flex flex-wrap">
            <p className="mr-1.5">Rewind it! Blast it! OWN IT!</p>
            <Link
              href="/c/mixtapes"
              aria-label="View All Mixtapes"
              className="hover:underline"
              style={{ color: "#3eac75" }}
            >
              #CFMWeeklyMixtape
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
