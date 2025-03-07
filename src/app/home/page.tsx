import { Metadata } from "next";
import Head from "next/head";
import Hero from "../components/header-footer/hero";
import OnAir from "../components/stream/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import PopularShows from "../shows/components/popShows";
import PopularProfiles from "../i/team/components/popular";

export const metadata: Metadata = {
  title: "Home of Western Uganda's Biggest Radio Station",
  description:
    "Welcome to Home of Western Uganda's Biggest Radio Station. 91.2 Crooze FM. Great Music, Great Friends. Stream Live Radio. Hit Music. Current News Daily",
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://croozefm.geltaverse.com/home" />
      </Head>
      <main className="w-full max-w-screen-lg mx-auto min-h-screen px-2.5 overflow-hidden">
        <div className="container mx-auto pt-12 text-center min-h-screen">
          <Hero />

          <OnAir />

          <ImmediateRelease viewAll={true} />

          <section className="p-2 mt-8 border-b border-dark/20 dark:border-light/20">
            <div className="flex flex-col justify-between text-left">
              <h2 className="w-fit text-2xl relative mb-2 _912cfm">
                Popular Shows
              </h2>
              <p className="mb-4">Click to view in detail.</p>
            </div>
            <PopularShows />
          </section>

          <section className="p-2 mt-8 border-b border-dark/20 dark:border-light/20">
            <div className="flex flex-col justify-between text-left">
              <h2 className="w-fit text-2xl relative mb-2 _912cfm">
                Meet Our Team
              </h2>
              <p className="mb-4">Swipe, or click to view in detail.</p>
            </div>
            <PopularProfiles />
          </section>
        </div>

        <div className="my-8 p-4 w-full text-center">
          THIS SITE IS UNDER CONSTRUCTION
        </div>
      </main>
    </>
  );
}
