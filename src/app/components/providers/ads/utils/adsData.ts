export interface Ad {
  id: string;
  imageUrl: string;
  link: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive";
  size: "banner" | "rectangle" | "skyscraper";
}

export const ads: Ad[] = [
  {
    id: "ad001",
    imageUrl: "https://transaudio.geltaverse.com/ads/transaudio-ad-md.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "banner",
  },
  {
    id: "ad002",
    imageUrl: "https://transaudio.geltaverse.com/ads/transaudio-ad-sm.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "rectangle",
  },
  {
    id: "ad003",
    imageUrl: "https://transaudio.geltaverse.com/ads/transaudio-ad-lg.png",
    link: "https://transaudio.geltaverse.com",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    size: "skyscraper",
  },
];

export const getActiveAds = (size: Ad["size"]): Ad[] => {
  const now = new Date().toISOString();
  return ads.filter(
    (ad) =>
      ad.size === size &&
      ad.status === "active" &&
      now >= ad.startDate &&
      now <= ad.endDate
  );
};

export const getRandomAd = (size: Ad["size"]): Ad | null => {
  const activeAds = getActiveAds(size);
  return activeAds.length > 0
    ? activeAds[Math.floor(Math.random() * activeAds.length)]
    : null;
};
