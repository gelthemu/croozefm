import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  update,
  increment as firebaseIncrement,
} from "firebase/database";

// Your Firebase configuration (typically from .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Utility function to track ad impressions
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

// Utility function to track ad clicks
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
