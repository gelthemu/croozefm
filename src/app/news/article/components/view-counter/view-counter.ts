// lib/view-counter.ts
import { database } from "@/lib/firebase";
import {
  ref,
  increment as firebaseIncrement,
  set,
  get,
} from "firebase/database";
import Cookies from "js-cookie";

// Interface for view tracking
interface ViewTrackingOptions {
  slug: string;
  cookieExpiration?: number; // in hours
}

// Generate a unique view tracking cookie name
const getViewCookieName = (slug: string) => `article_view_${slug}`;

// Track article view in Firebase Realtime Database
export async function trackArticleView({
  slug,
  cookieExpiration = 24,
}: ViewTrackingOptions) {
  // Check if view has been logged recently
  const cookieName = getViewCookieName(slug);
  const hasRecentView = Cookies.get(cookieName);

  if (hasRecentView) {
    return false; // Skip tracking if recently viewed
  }

  try {
    // Use the pre-initialized database from firebase.ts
    const viewCountRef = ref(database, `article_views/${slug}`);

    // Increment view count atomically
    await set(viewCountRef, firebaseIncrement(1));

    // Set cookie to prevent duplicate views
    Cookies.set(cookieName, "true", {
      expires: cookieExpiration / 24, // Convert hours to days
      path: "/",
      sameSite: "strict",
    });

    return true;
  } catch (error) {
    console.error("Error tracking article view:", error);
    return false;
  }
}

// Fetch total view count for an article
export async function getArticleViewCount(slug: string): Promise<number> {
  try {
    const viewCountRef = ref(database, `article_views/${slug}`);

    const snapshot = await get(viewCountRef);
    return snapshot.exists() ? snapshot.val() || 0 : 0;
  } catch (error) {
    console.error("Error fetching article view count:", error);
    return 0;
  }
}
