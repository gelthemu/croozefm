import { database } from "@/lib/firebase";
import { ref, update, increment as firebaseIncrement } from "firebase/database";

const trackUnit = () => {
  return process.env.NODE_ENV === "production";
};

export const trackUnitImpression = (unitId: string) => {
  if (!trackUnit()) {
    return;
  }

  try {
    const unitStatsRef = ref(database, `unitStats/${unitId}`);
    update(unitStatsRef, {
      impressions: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking unit impression:", error);
  }
};

export const trackUnitClick = async (unitId: string) => {
  if (!trackUnit()) {
    return;
  }

  try {
    const unitStatsRef = ref(database, `unitStats/${unitId}`);
    await update(unitStatsRef, {
      clicks: firebaseIncrement(1),
    });
  } catch (error) {
    console.error("Error tracking unit click:", error);
  }
};
