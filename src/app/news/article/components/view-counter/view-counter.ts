import { database } from "@/lib/firebase";
import {
  ref,
  increment as firebaseIncrement,
  update,
  onValue,
  get,
} from "firebase/database";
import Cookies from "js-cookie";

const trackView = () => {
  return process.env.NODE_ENV === "production";
};

export interface ViewTrackingOptions {
  slug: string;
  cookieExpiration?: number;
}

const getViewCookieName = (slug: string) => `cookie_${slug}`;

export async function trackArticleView({
  slug,
  cookieExpiration = 5,
}: ViewTrackingOptions): Promise<boolean> {
  const cookieName = getViewCookieName(slug);
  const hasRecentView = Cookies.get(cookieName);

  if (hasRecentView) {
    return false;
  }

  if (!trackView()) {
    return false;
  }

  try {
    const viewCountRef = ref(database, `article_views/${slug}`);
    await update(viewCountRef, { views: firebaseIncrement(1) });

    const expiresInDays = cookieExpiration / (24 * 60);
    Cookies.set(cookieName, "true", {
      expires: expiresInDays,
      path: "/",
    });

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function getArticleViewCount(slug: string): Promise<number> {
  try {
    const viewCountRef = ref(database, `article_views/${slug}/views`);
    const snapshot = await get(viewCountRef);
    return snapshot.exists() ? snapshot.val() || 0 : 0;
  } catch (error) {
    console.error("Error fetching article view count:", error);
    return 0;
  }
}

export function subscribeToViewCount(
  slug: string,
  callback: (count: number) => void
) {
  const viewCountRef = ref(database, `article_views/${slug}/views`);
  const unsubscribe = onValue(
    viewCountRef,
    (snapshot) => {
      const count = snapshot.exists() ? snapshot.val() || 0 : 0;
      callback(count);
    },
    (error) => {
      console.error("Error subscribing to view count:", error);
      callback(0);
    }
  );
  return unsubscribe;
}
