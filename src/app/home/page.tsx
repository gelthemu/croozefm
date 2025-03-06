import { Metadata } from "next";
import Hero from "../components/header-footer/hero";
import OnAir from "../components/stream/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import FeaturedShows from "../shows/components/featuredshows";
import PopularProfiles from "../i/team/components/popular";

export const metadata: Metadata = {
  title: "Home - 91.2 Crooze FM",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default function Home() {
  return (
    <>
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
            <FeaturedShows />
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
