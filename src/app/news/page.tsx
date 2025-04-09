import React from "react";
import { Metadata } from "next";
import NewsHeader from "./components/news-header";
import CategoryFilter from "./components/category-filter";
import NewsList from "./components/news-list";
import { getAllNewsArticles, getAllCategories } from "@/lib/news-parser";
import NewsFooter from "./components/news-footer";
import Divider from "../components/providers/divs/divider";
import WeatherWidget from "../components/providers/weather-widget";
import { BannerAd, RectangleAd } from "@/app/components/providers/ads/ads";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with our latest news and articles. Always remember where you heard it first. Follow the hashtag #CroozeFmNews on all socials.",
  keywords:
    "91.2 Crooze Fm, Western Uganda, News, Crooze Fm news, Crooze Fm updates, Crooze Fm latest news, Crooze Fm 411, Crooze Fm Archive, Crooze Fm local news, Crooze Fm headlines, Crooze Fm media",
  alternates: {
    canonical: "https://croozefm.geltaverse.com/news",
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
        <RectangleAd />
        <BannerAd />
      </div>
    </>
  );
}
