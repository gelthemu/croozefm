import { Metadata } from "next";
import Hero from "./components/header-footer/hero";
import OnAir from "./components/stream/on-air";
import FeaturedShows from "./c/shows/components/featuredshows";

export const metadata: Metadata = {
  title: "Home - 91.2 Crooze FM",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default function Home() {
  return (
    <>
      <main className="w-full max-w-screen-lg mx-auto min-h-screen px-2.5 text-dark dark:text-light">
        <div className="container mx-auto pt-16 text-center text-dark dark:text-light min-h-screen overflow-hidden">
          <Hero />
          <OnAir />
          <section className="p-2">
            <div className="flex flex-col justify-between text-left">
              <h2 className="w-fit text-2xl relative mb-2 _912cfm">
                Popular Shows
              </h2>
              <p className="mb-4">Click to view in detail.</p>
            </div>
            <FeaturedShows />
          </section>
        </div>
        <div className="my-8 p-4 w-full border border-dark/20 dark:border-light/10 text-center">
          THIS SITE IS UNDER CONSTRUCTION
        </div>
      </main>
    </>
  );
}
