import { Show } from "@/types/show";

export const shows: Show[] = [
  {
    id: "morning-addiction",
    title: "The Morning Addiction",
    image:
      "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
    description:
      "The Morning Addiction is your 6 AM wake-up call with humor, great music, and winning opportunities, minus the morning gibberish.",
    isFeatured: true,
    hosts: [
      { name: "Belga", link: "/i/belga-mc" },
      { name: "Monique", link: "/i/monique-mbabazi" },
      { name: "Derrick", link: "/i/derrick-ashiimwe" },
    ],
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
    hosts: [{ name: "Inyaa Clare", link: "/i/inyaa-clare" }],
    recordings: [
      {
        id: "2025-03-04",
        date: "2025-03-04T12:50:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/411-clare-inyaa-2025-03-04.mp3",
          category: "411",
      },
    ],
  },
  {
    id: "most-wanted-hits",
    title: "The Most Wanted Hits",
    image: "https://croozefm.blob.core.windows.net/images/most-wanted-hits.png",
    description:
      "Starcent DJ 'the crowd hyper' delivers two hours of non-stop hits with minimal ads, featuring 'Sing for Cash'.",
    hosts: [
      { name: "Inyaa Clare", link: "/i/inyaa-clare" },
      { name: "Starcent DJ" },
    ],
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
    hosts: [{ name: "Michael" }],
  },
  {
    id: "hits-selector",
    title: "The Hits Selector Request Show",
    image: "https://croozefm.blob.core.windows.net/images/hits-selector.png",
    description:
      "Join the interactive DJ experience every Monday to Thursday, where your song requests shape the evening playlist; call, tweet, or message to get your music on air.",
    isFeatured: true,
    hosts: [{ name: "Marie Antoinettie" }],
  },
  {
    id: "sports-bwino",
    title: "Sports Bwino",
    image: "https://croozefm.blob.core.windows.net/images/sports-bwino.png",
    description:
      "End your day with 'Soccer Talk' on Western Uganda's airwaves, where Ronald Rosh and his team dive deep into the world of football, covering every detail from local talents to global stars.",
    isFeatured: true,
    hosts: [
      { name: "Rosh" },
      { name: "Abou", link: "/i/abou-champion" },
      { name: "James" },
    ],
    recordings: [
      {
        id: "2024-11-25",
        date: "2024-11-25T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-25_5pm.mp3",
          category: "sports-updates",
      },
      {
        id: "2024-11-21",
        date: "2024-11-21T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-21_5pm.mp3",
          category: "sports-updates",
      },
      {
        id: "2024-11-19",
        date: "2024-11-19T17:00:00+03:00",
        audio:
          "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-19_5pm.mp3",
          category: "sports-updates",
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
    hosts: [
      { name: "Da Problem Child", link: "/i/da-problem-child" },
      { name: "DJ Modern" },
    ],
  },
  {
    id: "fat-friday-mix",
    title: "The Fat Friday Mix",
    image: "https://croozefm.blob.core.windows.net/images/fat-friday-mix.png",
    description:
      "End your Friday night with a bang! A special mix to keep you dancing into the night.",
    hosts: [{ name: "Belga MC", link: "/i/belga-mc" }, { name: "Deejay Emma" }],
  },
  {
    id: "urban-breakfast",
    title: "Urban Breakfast Show",
    image: "https://croozefm.blob.core.windows.net/images/urban-breakfast.png",
    description:
      "Wake up to the freshest beats and urban vibes every Saturday morning.",
    hosts: [
      { name: "Dosh", link: "/i/baby-dosh" },
      { name: "Deejay Stinger", link: "/i/deejay-stinger" },
    ],
  },
  {
    id: "big-seat",
    title: "The BIG Seat",
    image: "https://croozefm.blob.core.windows.net/images/big-seat.png",
    description:
      "A Saturday morning talk show with influential guests and insightful conversations.",
    hosts: [{ name: "Wesige Banyagi", link: "/i/wesige-banyagi" }],
  },
  {
    id: "sports-roundup",
    title: "Weekly Sports RoundUp",
    image: "https://croozefm.blob.core.windows.net/images/sports-roundup.png",
    description:
      "Your go-to show for all the latest highlights and commentary from the sports world.",
    hosts: [
      { name: "Abou", link: "/i/abou-champion" },
      { name: "Derrick", link: "/i/derrick-ashiimwe" },
      { name: "Nicholas" },
    ],
  },
  {
    id: "african-rhythms",
    title: "The African Rhythms",
    image: "https://croozefm.blob.core.windows.net/images/african-rhythms.png",
    description:
      "Immerse yourself in the vibrant and diverse sounds of African music every Saturday evening.",
    hosts: [{ name: "Starcent DJ" }],
  },
  {
    id: "saturday-night",
    title: "Saturday Night Live",
    image: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
    description:
      "Keep the Saturday vibe alive with the best music for your night out or chill time at home.",
    hosts: [{ name: "MC Kacheche" }, { name: "Deejay Emma" }],
  },
  {
    id: "sunday-love",
    title: "Sunday LOVE",
    image: "https://croozefm.blob.core.windows.net/images/sunday-love.png",
    description:
      "Celebrate love with romantic tunes and heartfelt stories to brighten your Sunday.",
    hosts: [{ name: "Inyaa Clare", link: "/i/inyaa-clare" }],
    recordings: [
      {
        id: "2025-01-26",
        date: "2025-01-26T10:05:00+03:00",
        audio: "https://croozefm.blob.core.windows.net/audio/linc-&-veve.mp3",
        category: "411",
      },
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
    hosts: [{ name: "John Tulinawe" }],
  },
];

export default shows;
