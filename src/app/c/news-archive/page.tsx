import NewsArchive from "./components/news-archive";
import XNewsButton from "./components/news-btn";
import Image from "next/image";

export const metadata = {
  title: "News Archive - 91.2 Crooze FM",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
};

export default function NewsArchivePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center text-dark dark:text-light min-h-screen overflow-hidden">
      <div className="mb-12 flex flex-col items-center justify-center p-4 border-b border-dark/20 dark:border-light/20">
        <h1 className="text-3xl font-apex relative mb-4 _912cfm">News Archive</h1>
        <p className="max-w-lg mx-auto mb-4">
          We don&apos;t just break stories, we tell real stories. Stay abreast
          of the latest developments in the world of news and information.
        </p>
        <div className="flex justify-center mb-4">
          <XNewsButton />
        </div>
        <p className="font-semibold text-sm text-red italic mb-4">
          &quot;Always remember where you heard it first.&quot;
        </p>
      </div>

      <NewsArchive />

      <div className="mt-12 w-full border-y border-dark/40 dark:border-light/20 py-4">
        <Image
          src="/assets/news-archive-banner.png"
          alt="News Archive Banner"
          width={1200}
          height={300}
          className="w-full max-w-lg mx-auto object-contain aspect-[1200/300] _img_"
        />
      </div>
    </div>
  );
}
