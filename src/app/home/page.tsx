import { Metadata } from "next";
import Divider from "../components/providers/divs/divider";
import Hero from "../components/header-footer/hero";
import OnAir from "../components/stream/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import PopularProfiles from "../i/team/components/popular";
import { getRecentNews } from "@/lib/news-parser";
import RecentNews from "../news/components/recent-news";
import { BannerAd, RectangleAd } from "@/app/components/providers/ads/ads";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends. Stream Live Radio with an Improved Miniplayer. Hit Music Always. Current News Daily. Browse your Popular Shows, Presenter Profiles and the Gallery. Cheers!!!",

  openGraph: {
    title: "Home",
    description:
      "Welcome to Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends. Stream Live Radio with an Improved Miniplayer. Hit Music Always. Current News Daily. Browse your Popular Shows, Presenter Profiles and the Gallery. Cheers!!!",
    url: "https://croozefm.geltaverse.com/home",
    type: "website",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/default.png",
        alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    title: "Home",
    description:
      "Welcome to Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends. Stream Live Radio with an Improved Miniplayer. Hit Music Always. Current News Daily. Browse your Popular Shows, Presenter Profiles and the Gallery. Cheers!!!",
    card: "summary_large_image",
    site: "@geltaverse",
    creator: "@geltaverse",
    images: [
      {
        url: "https://croozefm.blob.core.windows.net/images/default.png",
        alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
      },
    ],
  },

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
