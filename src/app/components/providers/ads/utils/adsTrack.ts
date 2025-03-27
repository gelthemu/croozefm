// src\app\components\providers\ads\utils\adsTrack.ts

import { database } from "@/lib/firebase";
import { ref, update, increment as firebaseIncrement } from "firebase/database";

export const trackAdImpression = (adId: string) => {
  try {
    const adStatsRef = ref(database, `adStats/${adId}`);
    update(adStatsRef, {
      impressions: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking ad impression:", error);
  }
};

export const trackAdClick = (adId: string) => {
  try {
    const adStatsRef = ref(database, `adStats/${adId}`);
    update(adStatsRef, {
      clicks: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking ad click:", error);
  }
};
