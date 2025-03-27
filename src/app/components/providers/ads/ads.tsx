// src\app\components\providers\ads\ads.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { trackAdImpression, trackAdClick } from "./utils/adsTrack";
import { getRandomAd, Ad } from "./utils/adsData";

const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const BaseAd = ({ size }: { size: Ad["size"] }) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const adRef = useRef<HTMLAnchorElement>(null);
  const impressionTrackedRef = useRef(false);

  useEffect(() => {
    const randomAd = getRandomAd(size);
    setAd(randomAd);
  }, [size]);

  useEffect(() => {
    if (!ad || !adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTrackedRef.current) {
            trackAdImpression(ad.id);
            impressionTrackedRef.current = true;

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    observer.observe(adRef.current);

    return () => {
      observer.disconnect();
    };
  }, [ad]);

  // const handleAdClick = () => {
  //   // Track ad click before redirecting
  //   trackAdClick(ad!.id);

  //   // Open the ad link in a new tab
  //   window.open(ad!.link, "_blank", "noopener,noreferrer");
  // };

  const handleAdClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!ad) return;
    trackAdClick(ad.id);
    const redirectUrl = `/api/click?adId=${encodeURIComponent(ad.id)}&url=${encodeURIComponent(ad.link)}`;
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  if (!ad) return null;

  return (
    <a
      ref={adRef}
      onClick={handleAdClick}
      className={`block p-4 bg-gray/5 dark:bg-gray/20 rounded-sm ad-${size} cursor-pointer`}
    >
      <span className="block text-xs opacity-60 uppercase mb-1">
        Advertisement
      </span>
      <Image
        src={ad.imageUrl}
        alt="Advertisement"
        width={size === "banner" ? 6400 : size === "rectangle" ? 4000 : 1600}
        height={size === "banner" ? 800 : size === "rectangle" ? 1600 : 5600}
        className={`
          w-full
          ${size === "banner" ? "aspect-[8/1]" : ""}
          ${size === "rectangle" ? "aspect-[5/2]" : ""}
          ${size === "skyscraper" ? "aspect-[2/7]" : ""}
          object-cover
        `}
      />
    </a>
  );
};

export const RectangleAd = () => {
  const width = useScreenWidth();

  if (width >= 640) return null;

  return (
    <div className="w-full">
      <BaseAd size="rectangle" />
    </div>
  );
};

export const BannerAd = () => {
  const width = useScreenWidth();

  if (width < 640) return null;

  return (
    <div className="w-full">
      <BaseAd size="banner" />
    </div>
  );
};

export const SkyscraperAd = () => {
  const width = useScreenWidth();

  if (width < 1024) return null;

  return (
    <div className="w-full">
      <BaseAd size="skyscraper" />
    </div>
  );
};

export default BaseAd;
