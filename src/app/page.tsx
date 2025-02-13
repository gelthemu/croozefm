import { Metadata } from "next";
import FeaturedShows from "./c/shows/components/featuredshows";
import StreamBtn from "./components/stream/stream-btn";
import SocialLinks from "./components/tiny/socials";
import { Schedule, Show, UgTime } from "./c/shows/components/schedule/schedule";

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
          <div className="mb-2 flex flex-col items-center justify-center p-0">
            <h1 className="text-3xl text-red relative mb-4">
              91.2 Crooze FM
            </h1>
            <p className="font-sans font-light">
              We are Western Uganda&rsquo;s Biggest Radio Station. Great Music.
              Great Friends.
            </p>
          </div>
          <div className="flex items-center justify-center p-4">
            <StreamBtn />
          </div>
          <div className="my-8 py-10 border-y border-dark/40 dark:border-light/40">
            <div className="text-left md:text-center md:w-7/12 xl:w-6/12 md:mx-auto">
              <div className="flex items-center justify-between mb-2.5 text-sm">
                <p className="w-fit px-1.5 py-1 text-light font-semibold bg-red rounded-sm">
                  ON-AIR:
                </p>
                <UgTime />
              </div>
              <Show />
              <div className="p-1 bg-gray/80 dark:bg-gray/100">
                <Schedule />
                <div className="flex items-center justify-end p-2 pr-1.5 pb-1">
                  <span className="mr-2 text-sm font-light text-light dark:text-light/80">
                    Check our socials:
                  </span>
                  <span>
                    <SocialLinks />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section className="p-2">
            <div className="flex flex-col justify-between text-left">
              <h2 className="w-fit text-2xl font-oswald relative mb-2">
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
