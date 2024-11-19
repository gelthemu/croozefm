import { news } from "@/data/news";
import NewsCard from "./components/news-card";
import XNewsButton from "./components/news-btn";

export const metadata = {
  title: "News Archive - 91.2 Crooze FM",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
};

export default function NewsArchivePage() {
  return (
    <div className="container mx-auto px-4 py-16 bg-custom-gradient min-h-screen">
      <div className="mb-10 flex flex-col items-center justify-center p-2 md:p-4">
        <h1 className="text-3xl font-apex relative mb-4">News Archive</h1>
        <p className="text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-red via-light to-red max-w-screen-sm mx-auto mb-2">
          We don&apos;t just break stories, we tell real stories.
        </p>
        <p className="text-light/80 text-center max-w-lg mx-auto mb-8">
          Stay abreast of the latest developments in the world of news and
          information, broadcasting to you live on 91.2 Crooze FM.
        </p>
        <div className="flex justify-center">
          <XNewsButton />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      <div className="mt-16 w-full border-y border-light/20 py-4">
        <p className="text-light/80 text-center text-sm italic">
          &quot;Always remember where you heard it first.&quot;
        </p>
      </div>
    </div>
  );
}
