import StreamBtn from "./components/stream-btn";
import SocialLinks from "../components/tiny/socials";
import FeaturedShows from "../c/shows/components/featuredshows";
import {
  Schedule,
  Show,
  UgTime,
} from "../c/shows/components/schedule/schedule";

export const metadata = {
  title: "Stream Live - 91.2 Crooze FM",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
};

export default function StreamPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center text-dark dark:text-light min-h-screen overflow-hidden">
      <div className="mb-2 flex flex-col items-center justify-center p-0">
        <h1 className="text-3xl text-red font-apex relative mb-4">
          91.2 Crooze FM Live
        </h1>
        <p>
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
  );
}
