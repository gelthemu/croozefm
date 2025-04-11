import React from "react";
import { Metadata } from "next";
import NewsHeader from "./components/news-header";
import CategoryFilter from "./components/category-filter";
import NewsList from "./components/news-list";
import { getAllNewsArticles, getAllCategories } from "@/lib/news-parser";
import NewsFooter from "./components/news-footer";
import Divider from "../components/providers/divs/divider";
import WeatherWidget from "../components/providers/weather-widget";
import { SmUnit, MdUnit } from "@/app/components/providers/units/units";
import { RESOURCES } from "@/data/endpoints";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with our latest news and articles from the web. Always remember where you heard it first. Follow the hashtag #CroozeFmNews on all socials.",
  keywords:
    "cfm pulse, western uganda, news, crooze fm news, crooze fm 411, crooze fm headlines, sports updates, politics",
  openGraph: {
    url: "https://cfm.geltaverse.com/i/team",
    images: [
      {
        url: `${RESOURCES}/on-air-2.png`,
        alt: "Western Uganda's Biggest Radio Station",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: `${RESOURCES}/on-air-2.png`,
        alt: "Western Uganda's Biggest Radio Station",
      },
    ],
  },
};

export default function NewsPage() {
  const articles = getAllNewsArticles();
  const categories = getAllCategories();

  return (
    <>
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[740px] text-left">
        <div className=" flex flex-col">
          <NewsHeader title="Latest" />
          <CategoryFilter categories={categories} />
          <WeatherWidget className="mt-6" />
        </div>
        <div className="my-6 flex flex-col">
          <NewsList articles={articles} />
        </div>
      </div>
      <Divider />
      <NewsFooter />
      <div className="pt-6">
        <SmUnit />
        <MdUnit />
      </div>
    </>
  );
}
