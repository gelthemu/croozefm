import { Metadata } from "next";
import Hero from "./components/header-footer/hero";
import FeaturedShows from "./c/shows/components/featuredshows";

export const metadata: Metadata = {
  title: "Home - 91.2 Crooze FM",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default function Home() {
  return (
    <>
      <main className="w-full max-w-screen-lg mx-auto min-h-screen px-1.5 text-dark dark:text-light">
        <Hero />
        <FeaturedShows />

        <div className="my-8 p-4 w-full border text-center">
          THIS SITE IS UNDER CONSTRUCTION
        </div>
      </main>
    </>
  );
}
