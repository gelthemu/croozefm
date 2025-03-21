import React from "react";
import { news } from "@/data/news";
import NewsHeader from "../components/news-header";
import NewsArchive from "./components/news-archive";
import Divider from "@/app/components/providers/divs/divider";
import NewsFooter from "../components/news-footer";

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
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[740px]">
        <div>
          <NewsHeader title="News Archive" />
        </div>
        <div className="my-10 flex flex-col">
          <NewsArchive news={sortedNews} data={news} />
        </div>
      </div>
      <Divider />
      <NewsFooter view={false} />
    </div>
  );
}
