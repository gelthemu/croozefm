import React from "react";
import Link from "next/link";
import Image from "next/image";
import ImmediateRelease from "@/app/components/announcement/for-immediate-release";
import {
  MaxxCrosbyTweet,
  MaxxCrosbyVideo,
  AlissonElliotVideo,
  TomasMachacVideo,
  TomasMachacTweet,
  AwakeningMbraCity,
  Tweet1897364097542578217,
  Tweet1898834551826227249,
} from "@/app/components/providers/twitter-feed";

interface CustomSectionProps {
  className?: string;
  children?: React.ReactNode;
}

const sunriseHotelImages = [
  "https://pbs.twimg.com/media/GlSDWUoXUAAZk7J?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWTXWgAAzTtU?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWWuWMAAx5Ah?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWUhWwAAgNSl?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSCRS_W0AAAzdS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSCRS6XAAATyoD?format=jpg&name=medium",
];

const apInvCoursePhotos = [
  "https://pbs.twimg.com/media/GlMfbl0WEAA6Wce?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlJ52iYW4AA6Lc3?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlDrllFXkAAtSZd?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlDrllGXkAAxN6U?format=jpg&name=large",
];
const apInvTeeTimes = [
  "https://pbs.twimg.com/media/GlPDUpIWQAAB8mi?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDV3lWYAAXwh-?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDXFQXsAAve6b?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDYT3WwAAirJK?format=jpg&name=medium",
];
const corporateGamesUganda2025 = [
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Rubia-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Uganda-Batteries.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Uzima-water-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Darling-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Judiciary-Team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Nbs-Sport-team_Corporate-Games.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Betpawa-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/ME-Associates.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Nsambya-Hospital.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Pride-Micro-Finance-team.jpg",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Ritz-medical-team.jpeg",
];

const componentMap: Record<string, React.FC<CustomSectionProps>> = {
  "latest-release": () => (
    <div className="py-6 mb-6 border-y border-dark/10 dark:border-light/10">
      <ImmediateRelease />
    </div>
  ),

  "sunrise-hotel-photos": () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {sunriseHotelImages.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="A fire has gutted Sunrise Hotel along Khamis Road in downtown Kampala."
          width={510}
          height={510}
          className="w-full h-auto object-cover aspect-[1/1] rounded-t-sm grayscale-[0.5] _img_"
        />
      ))}
    </div>
  ),

  "ap-inv-course-photos": () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {apInvCoursePhotos.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
          width={510}
          height={382}
          className="w-full h-auto object-cover aspect-[255/191] rounded-t-sm grayscale-[0.5] _img_"
        />
      ))}
    </div>
  ),

  "ap-inv-tee-times": () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {apInvTeeTimes.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
          width={510}
          height={510}
          className="w-full h-auto object-cover aspect-[1/1] rounded-t-sm grayscale-[0.5] _img_"
        />
      ))}
    </div>
  ),

  "corporate-games-uganda-2025": () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {corporateGamesUganda2025.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="Companies Registered for this 2025's Corporate Games"
          width={510}
          height={340}
          className="w-full h-auto object-cover aspect-[3/2] rounded-t-sm grayscale-[0.5] _img_"
        />
      ))}
    </div>
  ),

  "maxx-crosby-tweets": () => <MaxxCrosbyTweet />,
  "maxx-crosby-video": () => <MaxxCrosbyVideo />,
  "alisson-elliot-video": () => <AlissonElliotVideo />,
  "tomas-machac-video": () => <TomasMachacVideo />,
  "tomas-machac-tweet": () => <TomasMachacTweet />,
  "awakening-mbra-city": () => <AwakeningMbraCity />,
  tweet1897364097542578217: () => <Tweet1897364097542578217 />,
  tweet1898834551826227249: () => <Tweet1898834551826227249 />,
};

const CustomSection: React.FC<CustomSectionProps> = ({
  className,
  children,
}) => {
  if (className && componentMap[className]) {
    const Component = componentMap[className];
    return <Component />;
  }

  return <section className={className}>{children}</section>;
};

export const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <Link href={href ?? "#"} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  section: CustomSection,
};
