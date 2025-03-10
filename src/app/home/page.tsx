import { Metadata } from "next";
import Divider from "../components/providers/divs/divider";
import Hero from "../components/header-footer/hero";
import OnAir from "../components/stream/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import PopularShows from "../shows/components/popShows";
import PopularProfiles from "../i/team/components/popular";
import { getRecentNews } from "@/lib/news-parser";
import RecentNews from "../news/components/recent-news";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends. Stream Live Radio with an Improved Miniplayer. Hit Music Always. Current News Daily. Browse your Popular Shows, Presenter Profiles and the Gallery. Cheers!!!",
  alternates: {
    canonical: `https://croozefm.geltaverse.com/home`,
  },
};

export default function Home() {
  const recentArticles = getRecentNews(7).slice(1, 7);

  return (
    <>
      <Hero />
      <Divider />
      <OnAir />
      <Divider />
      <ImmediateRelease viewAll={true} />
      <Divider />
      <PopularShows />
      <Divider />
      <PopularProfiles />
      <Divider />
      <RecentNews
        articles={recentArticles}
        className="md:grid-cols-2 lg:grid-cols-3"
      />
      <Divider />
      <div className="w-full text-center text-sm font-medium">
        THIS SITE IS UNDER CONSTRUCTION
      </div>
    </>
  );
}
