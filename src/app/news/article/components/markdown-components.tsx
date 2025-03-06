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

const componentMap: Record<string, React.FC<CustomSectionProps>> = {
  "latest-release": () => <ImmediateRelease />,

  "sunrise-hotel-photos": () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
      {sunriseHotelImages.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="A fire has gutted Sunrise Hotel along Khamis Road in downtown Kampala."
          width={510}
          height={510}
          className="w-full h-auto object-cover aspect-[1/1] rounded-t-sm grayscale-[0.75] _img_"
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
          className="w-full h-auto object-cover aspect-[255/191] rounded-t-sm grayscale-[0.75] _img_"
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
          className="w-full h-auto object-cover aspect-[1/1] rounded-t-sm grayscale-[0.75] _img_"
        />
      ))}
    </div>
  ),

  "maxx-crosby-tweets": () => <MaxxCrosbyTweet />,
  "maxx-crosby-video": () => <MaxxCrosbyVideo />,
  "alisson-elliot-video": () => <AlissonElliotVideo />,
  "tomas-machac-video": () => <TomasMachacVideo />,
  "tomas-machac-tweet": () => <TomasMachacTweet />,
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
