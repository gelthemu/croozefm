import NewsHeader from "../components/news-header";
import NewsArchive from "./components/news-archive";
import XNewsButton from "./components/news-btn";

export const metadata = {
  title: "News Archive - 91.2 Crooze FM",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
};

export default function NewsArchivePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <NewsHeader title="News Archive" />

      <NewsArchive />

      <div className="mt-16 pt-10 flex flex-col items-center justify-center border-t border-dark/10 dark:border-light/10">
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
    </div>
  );
}
