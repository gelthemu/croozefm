import { Metadata } from "next";
import Divider from "../components/providers/divs/divider";
import Hero from "../components/header-footer/hero";
import OnAir from "../components/stream/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import PopularProfiles from "../i/team/components/popular";
import { getRecentNews } from "@/lib/news-parser";
import RecentNews from "../news/components/recent-news";
import { BannerAd, RectangleAd } from "@/app/components/providers/ads/ads";
import { RESOURCES } from "@/data/endpoints";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends. Stream Live Radio with an Improved Miniplayer. Hit Music Always. Current News Daily. Browse your Popular Shows, Presenter Profiles and the Gallery. Cheers!!!",

  openGraph: {
    title: "Home",
    description:
      "CFM Pulse is the largest Crooze FM Fan Base. Home of Fans of Western Uganda's Biggest Radio Station. By CFM Fans, for CFM Diehards.",
    url: "https://croozefm.geltaverse.com/home",
    type: "website",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home of Fans of Western Uganda's Biggest Radio Station",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    title: "Home",
    description:
      "CFM Pulse is the largest Crooze FM Fan Base. Home of Fans of Western Uganda's Biggest Radio Station. By CFM Fans, for CFM Diehards.",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: `${RESOURCES}/default-opengraph.png`,
        alt: "Home of Fans of Western Uganda's Biggest Radio Station",
      },
    ],
  },

  alternates: {
    canonical: `https://croozefm.geltaverse.com/home`,
  },
};

export default function Home() {
  const recentArticles = getRecentNews(10).filter((article) => article.image_url).slice(0, 6);

  return (
    <>
      <Hero />
      <Divider />
      <OnAir />
      <Divider />
      <ImmediateRelease viewAll={true} />
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
      <Divider className="my-5" opacity="opacity-0" />
      <RectangleAd />
      <BannerAd />
    </>
  );
}
