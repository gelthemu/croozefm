import React from "react";
import { news } from "@/data/news";
import NewsHeader from "../components/news-header";
import NewsArchive from "./components/news-archive";
import Divider from "@/app/components/providers/divs/divider";
import NewsFooter from "../components/news-footer";
import { SkyscraperAd } from "@/app/components/providers/ads/ads";

export const metadata = {
  title: "News Archive",
  description:
    "This is Crooze FM News Archive. Here you can find some recordings of the news that have been broadcasted live on Crooze FM. Recordings are available for download. Always remember where you heard it first.",
  alternates: {
    canonical: "https://croozefm.geltaverse.com/news/news-archive",
  },
};

export default function NewsArchivePage() {
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.aired.date).getTime() - new Date(a.aired.date).getTime()
  );

  return (
    <div className="p-1">
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[820px]">
        <div>
          <NewsHeader title="News Archive" />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-2 my-10">
          <div className="w-full mx-auto">
            <NewsArchive news={sortedNews} data={news} />
          </div>
          <div className="hidden lg:block lg:w-[40%]">
            <div className="sticky top-[calc(0.25rem+80px)]">
              <SkyscraperAd />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <NewsFooter view={false} />
    </div>
  );
}
