import { Metadata } from "next";
import Hero from "./components/header-footer/hero";
import FeaturedShows from "./components/shows/featuredshows";

export const metadata: Metadata = {
  title: "Home - 91.2 Crooze FM",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default function Home() {
  return (
    <>
      <main className="w-full max-w-screen-lg mx-auto min-h-screen px-2">
        <Hero />
        <FeaturedShows />

        <div className="p-4 w-full border text-center">
          WEBSITE STILL UNDER CONSTRUCTION
        </div>
      </main>
    </>
  );
}
