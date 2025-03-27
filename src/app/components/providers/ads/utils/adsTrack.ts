import { database } from "@/lib/firebase";
import { ref, update, increment as firebaseIncrement } from "firebase/database";

const trackAd = () => {
  return process.env.NODE_ENV === "production";
};

export const trackAdImpression = (adId: string) => {
  if (!trackAd()) {
    return;
  }

  try {
    const adStatsRef = ref(database, `adStats/${adId}`);
    update(adStatsRef, {
      impressions: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking ad impression:", error);
  }
};

export const trackAdClick = async (adId: string) => {
  if (!trackAd()) {
    return;
  }

  try {
    const adStatsRef = ref(database, `adStats/${adId}`);
    await update(adStatsRef, {
      clicks: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking ad click:", error);
  }
};
