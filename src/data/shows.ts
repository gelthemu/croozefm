import { Show } from "@/types/shows";

export const shows: Show[] = [
  {
    id: "morning-addiction",
    title: "The Morning Addiction",
    image:
      "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
    description:
      "The Morning Addiction is your 6 AM wake-up call with humor, great music, and winning opportunities, minus the morning gibberish.",
    isFeatured: true,
    host: "Belga | Monique | Derrick",
  },
  {
    id: "coffee-break",
    title: "The Coffee Break",
    image: "https://croozefm.blob.core.windows.net/images/coffee-break.png",
    description:
      "The Coffee Break is your mid-morning musical escape, playing the latest hits in a serene playlist at 10 AM for a one-hour cool-down from the morning rush.",
  },
  {
    id: "lifestyle",
    title: "The Lifestyle Show",
    image: "https://croozefm.blob.core.windows.net/images/lifestyle.png",
    description:
      "Join Inyaa Clare on The Lifestyle Show for a comforting, soul-soothing experience every weekday at 11am, where life's soundtrack meets its advisor.",
    isFeatured: true,
    host: "Inyaa",
  },
  {
    id: "most-wanted-hits",
    title: "The Most Wanted Hits",
    image: "https://croozefm.blob.core.windows.net/images/most-wanted-hits.png",
    description:
      "Starcent DJ 'the crowd hyper' delivers two hours of non-stop hits with minimal ads, featuring 'Sing for Cash'.",
    host: "Inyaa | Starcent DJ",
  },
  {
    id: "african-countdown",
    title: "The African Count Down",
    image:
      "https://croozefm.blob.core.windows.net/images/african-countdown.png",
    description:
      "The African Countdown on The Evening Switch showcases Africa's top tunes from 10 to 1 in a musical journey at 4pm.",
    recordings: [
      {
        id: "2024-11-18",
        date: "2024-11-18T16:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/the-african-count-down_2024-11-18.mp3",
      },
      {
        id: "2024-11-14",
        date: "2024-11-14T16:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/the-african-count-down_2024-11-14.mp3",
      },
    ],
  },
  {
    id: "evening-switch",
    title: "The Evening Switch",
    image: "https://croozefm.blob.core.windows.net/images/evening-switch.png",
    description:
      "The Evening Switch with Nkuta Michael is your daily evening ritual, blending music and infotainment to ease you from work to home comfort on Western Uganda's Biggest Radio.",
    isFeatured: true,
    host: "Michael | Antoinette",
  },
  {
    id: "hits-selector",
    title: "The Hits Selector Request Show",
    image: "https://croozefm.blob.core.windows.net/images/hits-selector.png",
    description:
      "Join the interactive DJ experience every Monday to Thursday, where your song requests shape the evening playlist; call, tweet, or message to get your music on air.",
    host: "Dosh",
  },
  {
    id: "sports-bwino",
    title: "Sports Bwino",
    image: "https://croozefm.blob.core.windows.net/images/sports-bwino.png",
    description:
      "End your day with 'Soccer Talk' on Western Uganda's airwaves, where Ronald Rosh and his team dive deep into the world of football, covering every detail from local talents to global stars.",
    isFeatured: true,
    host: "Rosh | Abou | James",
    recordings: [
      {
        id: "2024-11-25",
        date: "2024-11-25T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-25_5pm.mp3",
      },
      {
        id: "2024-11-21",
        date: "2024-11-21T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-21_5pm.mp3",
      },
      {
        id: "2024-11-19",
        date: "2024-11-19T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-19_5pm.mp3",
      },
    ],
  },
  {
    id: "tgif-most-wanted-extra",
    title: "T.G.I.F - The Most Wanted Xtra",
    image:
      "https://croozefm.blob.core.windows.net/images/tgif-most-wanted-extra.png",
    description:
      "Friday gets even better with extended hits and fan-favorite tracks.",
    host: "Problem Child | DJ Modern",
  },
  {
    id: "fat-friday-mix",
    title: "The Fat Friday Mix",
    image: "https://croozefm.blob.core.windows.net/images/fat-friday-mix.png",
    description:
      "End your Friday night with a bang! A special mix to keep you dancing into the night.",
    host: "Belga MC | Deejay Emma",
  },
  {
    id: "urban-breakfast",
    title: "Urban Breakfast Show",
    image: "https://croozefm.blob.core.windows.net/images/urban-breakfast.png",
    description:
      "Wake up to the freshest beats and urban vibes every Saturday morning.",
    host: "Dosh | DJ Stinger",
  },
  {
    id: "big-seat",
    title: "The BIG SEAT",
    image: "https://croozefm.blob.core.windows.net/images/big-seat.png",
    description:
      "A Saturday morning talk show with influential guests and insightful conversations.",
    host: "Wesige Banyagi",
  },
  {
    id: "sports-roundup",
    title: "Weekly Sports Roundup",
    image: "https://croozefm.blob.core.windows.net/images/sports-roundup.png",
    description:
      "Your go-to show for all the latest highlights and commentary from the sports world.",
    host: "Abou | Derrick | Nicholas",
  },
  {
    id: "saturday-night",
    title: "Saturday Night Live",
    image: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
    description:
      "Keep the Saturday vibe alive with the best music for your night out or chill time at home.",
    host: "MC Kacheche | Deejay Emma",
  },
  {
    id: "sunday-love",
    title: "Sunday LOVE",
    image: "https://croozefm.blob.core.windows.net/images/sunday-love.png",
    description:
      "Celebrate love with romantic tunes and heartfelt stories to brighten your Sunday.",
    host: "Inyaa",
    recordings: [
      {
        id: "2011-11-01",
        date: "2011-11-01T00:00:00+03:00",
        audio: "https://croozefm.blob.core.windows.net/audio/weekend-love.mp3",
      },
    ],
  },
  {
    id: "enyangyi",
    title: "ENYANGYI",
    image: "https://croozefm.blob.core.windows.net/images/enyangyi.png",
    description:
      "A cultural showcase of traditional music and stories, celebrating heritage every Sunday.",
    host: "John Turinawe",
  },
];

export default shows;
