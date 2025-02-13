import { useState, useEffect } from "react";

interface Show {
  name: string;
  img: string;
  start: number;
  end: number;
}

interface CurrentShow {
  img: string;
  name: string;
}

const schedules: Record<string, Show[]> = {
  regular: [
    {
      name: "The Morning Addiction",
      img: "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
      start: 6,
      end: 10,
    },
    {
      name: "The Coffee Break",
      img: "https://croozefm.blob.core.windows.net/images/coffee-break.png",
      start: 10,
      end: 11,
    },
    {
      name: "The Lifestyle Show",
      img: "https://croozefm.blob.core.windows.net/images/lifestyle.png",
      start: 11,
      end: 14,
    },
    {
      name: "The Most Wanted Hits",
      img: "https://croozefm.blob.core.windows.net/images/most-wanted-hits.png",
      start: 14,
      end: 16,
    },
    {
      name: "The African Countdown",
      img: "https://croozefm.blob.core.windows.net/images/african-countdown.png",
      start: 16,
      end: 17,
    },
    {
      name: "The Evening Switch",
      img: "https://croozefm.blob.core.windows.net/images/evening-switch.png",
      start: 17,
      end: 19,
    },
    {
      name: "The Hits Selector",
      img: "https://croozefm.blob.core.windows.net/images/hits-selector.png",
      start: 20,
      end: 22,
    },
    {
      name: "Sports BWINO",
      img: "https://croozefm.blob.core.windows.net/images/sports-bwino.png",
      start: 22,
      end: 24,
    },
  ],
  friday: [
    {
      name: "The Morning Addiction",
      img: "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
      start: 6,
      end: 10,
    },
    {
      name: "The Coffee Break",
      img: "https://croozefm.blob.core.windows.net/images/coffee-break.png",
      start: 10,
      end: 11,
    },
    {
      name: "The Lifestyle Show",
      img: "https://croozefm.blob.core.windows.net/images/lifestyle.png",
      start: 11,
      end: 14,
    },
    {
      name: "The Most Wanted Extra",
      img: "https://croozefm.blob.core.windows.net/images/tgif-most-wanted-extra.png",
      start: 14,
      end: 17,
    },
    {
      name: "The Evening Switch",
      img: "https://croozefm.blob.core.windows.net/images/evening-switch.png",
      start: 17,
      end: 20,
    },
    {
      name: "Fat Friday Mix",
      img: "https://croozefm.blob.core.windows.net/images/fat-friday-mix.png",
      start: 20,
      end: 24,
    },
  ],
  saturday: [
    {
      name: "The Urban Breakfast",
      img: "https://croozefm.blob.core.windows.net/images/urban-breakfast.png",
      start: 6,
      end: 9,
    },
    {
      name: "The BIG Seat",
      img: "https://croozefm.blob.core.windows.net/images/big-seat.png",
      start: 9,
      end: 11,
    },
    {
      name: "The Weekly Sports Roundup Show",
      img: "https://croozefm.blob.core.windows.net/images/sports-roundup.png",
      start: 12,
      end: 14,
    },
    {
      name: "Saturday Night Live",
      img: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
      start: 20,
      end: 24,
    },
  ],
  sunday: [
    {
      name: "The Sunday Inspiration",
      img: "https://croozefm.blob.core.windows.net/images/sunday-inspiration.png",
      start: 6,
      end: 9,
    },
    {
      name: "Sunday LOVE",
      img: "https://croozefm.blob.core.windows.net/images/sunday-love.png",
      start: 9,
      end: 12,
    },
    {
      name: "ENYANGYI",
      img: "https://croozefm.blob.core.windows.net/images/enyangyi.png",
      start: 12,
      end: 14,
    },
  ],
};

export const getUgandaTime = (): Date => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Africa/Kampala" }));
};

export const getCurrentShow = (): CurrentShow => {
  const ugandaTime = getUgandaTime();
  const day = ugandaTime.getDay();
  const hour = ugandaTime.getHours();

  let currentSchedule: Show[];
  if (day === 5) {
    if ((hour >= 14 && hour < 17) || (hour >= 20 && hour < 24)) {
      currentSchedule = schedules.friday;
    } else {
      currentSchedule = schedules.regular;
    }
  } else if (day === 6) {
    currentSchedule = schedules.saturday;
  } else if (day === 0) {
    currentSchedule = schedules.sunday;
  } else {
    currentSchedule = schedules.regular;
  }

  for (const show of currentSchedule) {
    const startTime = new Date(ugandaTime);
    startTime.setHours(show.start, 0, 0);
    const endTime = new Date(ugandaTime);
    endTime.setHours(show.end, 0, 0);

    if (show.end < show.start) {
      if (ugandaTime >= startTime || ugandaTime < endTime) {
        return { img: show.img, name: show.name };
      }
    } else if (ugandaTime >= startTime && ugandaTime < endTime) {
      return { img: show.img, name: show.name };
    }
  }

  return {
    img: "https://croozefm.blob.core.windows.net/images/default.png",
    name: "Great Music. Great Friends.",
  };
};

export const useCurrentShow = () => {
  const [currentShow, setCurrentShow] = useState<CurrentShow>({
    img: "https://croozefm.blob.core.windows.net/images/default.png",
    name: "Great Music. Great Friends.",
  });

  useEffect(() => {
    setCurrentShow(getCurrentShow());

    const interval = setInterval(() => {
      setCurrentShow(getCurrentShow());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return currentShow;
};
