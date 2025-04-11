import { Metadata } from "next";
import Divider from "../components/providers/divs/divider";
import Hero from "./components/hero/hero";
import OnAir from "./components/hero/on-air";
import ImmediateRelease from "../components/announcement/for-immediate-release";
import PopularProfiles from "../i/team/components/popular";
import RecentNews from "./components/recent-news";
import { SmUnit, MdUnit } from "@/app/components/providers/units/units";

export const metadata: Metadata = {
  title: "Home",
  openGraph: {
    url: "https://cfm.geltaverse.com/home",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <OnAir />
      <Divider />
      <ImmediateRelease viewAll={true} />
      <Divider />
      <RecentNews />
      <Divider />
      <PopularProfiles />
      <Divider />
      <div className="w-full text-center text-sm font-medium">
        THIS SITE IS UNDER CONSTRUCTION
      </div>
      <Divider className="my-5" opacity="opacity-0" />
      <SmUnit />
      <MdUnit />
    </>
  );
}
