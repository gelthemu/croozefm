"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackAdImpression } from "./utils/firebase";
import { getRandomAd, Ad } from "./utils/adsData";

const BaseAd = ({ size }: { size: Ad["size"] }) => {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const randomAd = getRandomAd(size);
    setAd(randomAd);

    if (randomAd) {
      trackAdImpression(randomAd.id);
    }
  }, [size]);

  if (!ad) return null;

  return (
    <a
      href={`/api/click?ad_id=${encodeURIComponent(
        ad.id
      )}&redirect=${encodeURIComponent(ad.link)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray/5 dark:bg-gray/20 rounded-sm"
    >
      <span className="block text-center text-xs opacity-60 uppercase mb-2">
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

export const BannerAd = () => (
  <div className="w-full">
    <BaseAd size="banner" />
  </div>
);

export const RectangleAd = () => (
  <div className="w-full">
    <BaseAd size="rectangle" />
  </div>
);

export const SkyscraperAd = () => (
  <div className="w-full">
    <BaseAd size="skyscraper" />
  </div>
);
