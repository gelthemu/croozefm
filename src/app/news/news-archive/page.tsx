import { news } from "@/data/news";
import NewsHeader from "../components/news-header";
import NewsArchive from "./components/news-archive";
import RecentNews from "../components/recent-news";
import { getRecentNews } from "@/lib/news-parser";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import XNewsButton from "./components/news-btn";

export const metadata = {
  title: "News Archive | News - 91.2 Crooze FM",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
};

export default function NewsArchivePage() {
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.aired.date).getTime() - new Date(a.aired.date).getTime()
  );
  const recentArticles = getRecentNews(5);

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <NewsHeader title="News Archive" className="lg:text-left" />
      </div>

      <div className="my-12 flex flex-col lg:flex-row lg:justify-center gap-8 max-w-6xl mx-auto">
        <div className="w-full sm:w-[95%] sm:mx-auto max-w-[640px] lg:mx-0 flex-shrink-0">
          <NewsArchive
            news={sortedNews}
            data={news}
            className="h-[60vh] md:h-[75vh] xl:h-[50vh] overflow-x-hidden overflow-y-scroll"
          />
        </div>
        <div>
          <RecentNews articles={recentArticles} className="mt-4" />
          <div className="flex items-center justify-center mx-auto mt-10 px-6 py-2">
            <ViewAllBtn href="/news" text="See All Articles" />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-10 flex flex-col items-center justify-center border-t border-dark/10 dark:border-light/10">
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
