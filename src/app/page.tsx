import { Metadata } from "next";
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
        <section className="my-12">
          <div className="p-2">
            <div className="flex flex-col justify-between">
              <h2 className="w-fit text-3xl font-apex relative heading-apex font-variant">
                Signature Shows
              </h2>
              <p className="my-4">Click to view in detail.</p>
            </div>
            <FeaturedShows />
          </div>
        </section>
        <div className="my-8 p-4 w-full border border-dark/20 dark:border-light/10 text-center">
          THIS SITE IS UNDER CONSTRUCTION
        </div>
      </main>
    </>
  );
}
