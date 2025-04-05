import shows from "./shows";

export type ScheduleDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ScheduleShow {
  id: string;
  name: string;
  imgUrl: string;
  start: number;
  end: number;
}

export const dayMap: Record<number, ScheduleDay> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

const scheduleMap: Record<ScheduleDay, string[]> = {
  monday: [
    "the-inspiration",
    "morning-addiction",
    "coffee-break",
    "lifestyle",
    "slowdown-hour",
    "most-wanted-hits",
    "african-countdown",
    "evening-switch",
    "hot-6-at-6",
    "eihanga-ryeitu",
    "hits-selector",
    "sports-bwino",
  ],
  tuesday: [
    "the-inspiration",
    "morning-addiction",
    "coffee-break",
    "lifestyle",
    "slowdown-hour",
    "most-wanted-hits",
    "african-countdown",
    "evening-switch",
    "hot-6-at-6",
    "eihanga-ryeitu",
    "hits-selector",
    "sports-bwino",
  ],
  wednesday: [
    "the-inspiration",
    "morning-addiction",
    "coffee-break",
    "lifestyle",
    "slowdown-hour",
    "most-wanted-hits",
    "african-countdown",
    "evening-switch",
    "hot-6-at-6",
    "crooze-farmer",
    "hits-selector",
    "sports-bwino",
  ],
  thursday: [
    "the-inspiration",
    "morning-addiction",
    "coffee-break",
    "lifestyle",
    "slowdown-hour",
    "most-wanted-hits",
    "african-countdown",
    "evening-switch",
    "hot-6-at-6",
    "crooze-doctor",
    "hits-selector",
    "sports-bwino",
  ],
  friday: [
    "the-inspiration",
    "tgif-morning-addiction",
    "tgif-lifestyle",
    "tgif-most-wanted-extra",
    "tgif-evening-switch",
    "fat-friday-mix",
  ],
  saturday: [
    "the-inspiration",
    "urban-breakfast",
    "big-seat",
    "certified-countdown",
    "sports-roundup",
    "ekisaawe-live",
    "african-rhythms",
    "saturday-night",
  ],
  sunday: [
    "the-inspiration",
    "sunday-inspiration",
    "sunday-love",
    "enyangyi",
    "sunday-lounge",
    "total-country-show",
  ],
};

export const getShowsForDay = (day: ScheduleDay): ScheduleShow[] => {
  const relevantShowIds = scheduleMap[day];

  return shows
    .filter((show) => relevantShowIds.includes(show.id))
    .map((show) => ({
      id: show.id,
      name: show.name,
      imgUrl: `https://croozefm.blob.core.windows.net/images/${show.id}.png`,
      start: show.time.start,
      end: show.time.end,
    }))
    .sort((a, b) => a.start - b.start);
};

export const getCurrentlyPlayingShow = (
  currentDay: ScheduleDay,
  currentHour: number
) => {
  const shows = getShowsForDay(currentDay);
  return shows.find((show) => {
    if (show.end < show.start) {
      return currentHour >= show.start || currentHour < show.end;
    }
    return currentHour >= show.start && currentHour < show.end;
  });
};
