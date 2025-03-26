import { Show } from "@/types/show";

export const shows: Show[] = [
  {
    id: "the-inspiration",
    name: "The Inspiration",
    time: { start: 5, end: 6 },
  },
  {
    id: "morning-addiction",
    name: "The Morning Addiction",
    summary:
      "Kick off your day with 'The Morning Addiction,' a 6am-10am full breakfast show serving up hot tunes, sizzling chats, and all the energy you need to get hooked on your mornings. It's your daily dose of fun, news, and vibes—impossible to resist!",
    isPop: true,
    isFt: true,
    host: [
      { name: "Belga", link: "/i/belga-mc" },
      { name: "Monique", link: "/i/monique-mbabazi" },
      { name: "Derrick", link: "/i/derrick-ashiimwe" },
    ],
    time: { start: 6, end: 10 },
  },
  {
    id: "coffee-break",
    name: "The Coffee Break",
    summary:
      "The Coffee Break is your mid-morning musical escape, playing the latest hits in a serene playlist at 10 AM for a one-hour cool-down from the morning rush.",
    isFt: true,
    time: { start: 10, end: 11 },
  },
  {
    id: "lifestyle",
    name: "The Lifestyle Show",
    summary:
      "Join Inyaa Clare on The Lifestyle Show from 11am to 2pm for a midday blast of everything you crave—music, tips, and vibes to live your best life. It's your all-in-one package to spice up the day!",
    isPop: true,
    isFt: true,
    host: [{ name: "Inyaa Clare", link: "/i/inyaa-clare" }],
    recs: [
      {
        id: 1741081800,
        url: "411-clare-inyaa-2025-03-04",
        category: "411",
      },
      {
        id: 1740564000,
        url: "slowdown-hour-2025-02-26",
        name: "The Slow Down Hour",
        cover: "slowdown-hour",
      },
      {
        id: 1736762400,
        url: "slowdown-hour-2025-01-13",
        name: "The Slow Down Hour",
        cover: "slowdown-hour",
      },
    ],
    time: { start: 11, end: 13 },
  },
  {
    id: "slowdown-hour",
    name: "The Slow Down Hour on the Lifestyle Show",
    time: { start: 13, end: 14 },
  },
  {
    id: "most-wanted-hits",
    name: "The Most Wanted Hits",
    summary:
      "Turn up the weekday vibes with 'The Most Wanted Hits,' a high-energy radio show spinning the hottest tracks from 2pm to 4pm. It's your daily afternoon party fix, packed with beats to keep you grooving all week long!",
    isFt: true,
    host: [
      { name: "Inyaa Clare", link: "/i/inyaa-clare" },
      { name: "Starcent DJ" },
    ],
    time: { start: 14, end: 16 },
  },
  {
    id: "african-countdown",
    name: "The African Countdown",
    summary:
      "Tune in to 'The African Countdown' at 4pm, where the continent's 10 hottest African songs of the day battle it out, counting down to the ultimate No. 1 hit! Get ready to vibe with the freshest beats straight from Africa's heart!",
    isFt: true,
    recs: [
      {
        id: 1741784400,
        url: "the-african-count-down_2025-03-12",
      },
      {
        id: 1731934800,
        url: "the-african-count-down_2024-11-18",
      },
      {
        id: 1731589200,
        url: "the-african-count-down_2024-11-14",
      },
    ],
    time: { start: 16, end: 17 },
  },
  {
    id: "evening-switch",
    name: "The Evening Switch",
    summary:
      "Hop in and unwind with 'The Evening Switch,' your 5pm soundtrack for the ride home from work, blending chill vibes and upbeat tunes. Traffic's a breeze with this perfect commuter companion!",
    isPop: true,
    isFt: true,
    host: [{ name: "Michael" }],
    recs: [
      {
        id: 1741788000,
        url: "cfm-evening-switch-2025-03-12",
      },
    ],
    time: { start: 17, end: 18 },
  },
  {
    id: "hot-6-at-6",
    name: "The Hot6@6 on the Evening Switch",
    time: { start: 18, end: 19 },
  },
  {
    id: "hits-selector",
    name: "The Hits Selector Request Show",
    summary:
      "Take the reins with 'The Hits Selector,' an 8pm two-hour jam where you call in or tweet to control the playlist with your song requests! Your picks, your vibe—turn up the night your way!",
    isPop: true,
    isFt: true,
    host: [{ name: "Marie Antoinettie" }],
    time: { start: 20, end: 22 },
  },
  {
    id: "sports-bwino",
    name: "Sports Bwino",
    summary:
      "End your day with the ultimate late-night soccer showdown, dishing out fiery talk on local and international matches. It's all goals, all passion—your final whistle for sports!",
    isPop: true,
    isFt: true,
    host: [
      { name: "Rosh" },
      { name: "Abou", link: "/i/abou-champion" },
      { name: "James" },
    ],
    recs: [
      {
        id: 1741788000,
        url: "cfm-sports-update-2025-03-12_5pm",
        category: "sports-updates",
      },
      {
        id: 1732543200,
        url: "cfm-sports-update-2024-11-25_5pm",
        category: "sports-updates",
      },
      {
        id: 1732197600,
        url: "cfm-sports-update-2024-11-21_5pm",
        category: "sports-updates",
      },
      {
        id: 1732024800,
        url: "cfm-sports-update-2024-11-19_5pm",
        category: "sports-updates",
      },
    ],
    time: { start: 22, end: 24 },
  },
  {
    id: "eihanga-ryeitu",
    name: "Eihanga Ryeitu",
    time: { start: 19, end: 20 },
  },
  {
    id: "crooze-farmer",
    name: "The Crooze Farmer",
    time: { start: 19, end: 20 },
  },
  {
    id: "crooze-doctor",
    name: "The Crooze Doctor",
    time: { start: 19, end: 20 },
  },
  {
    id: "tgif-morning-addiction",
    name: "The Morning Addiction - TGIF Edition",
    time: { start: 6, end: 10 },
  },
  {
    id: "tgif-lifestyle",
    name: "The Lifestyle Show - TGIF Edition",
    time: { start: 11, end: 14 },
  },
  {
    id: "tgif-most-wanted-extra",
    name: "T.G.I.F - The Most Wanted Xtra",
    summary:
      "Crank up your Fridays with 'The Most Wanted Hits Extra,' a 2pm three-hour explosion of the week's most requested hits, remixed and ready to roll! It's your playlist takeover, stacked with non-stop bangers and killer mixes!",
    isFt: true,
    host: [
      { name: "Da Problem Child", link: "/i/da-problem-child" },
      { name: "DJ Modern" },
    ],
    time: { start: 14, end: 17 },
  },
  {
    id: "tgif-evening-switch",
    name: "The Evening Switch - TGIF Edition",
    time: { start: 17, end: 20 },
  },
  {
    id: "fat-friday-mix",
    name: "The Fat Friday Mix",
    summary:
      "Get your Friday night pumping with 'The Fat Friday Mix,' kicking off at 8pm and spinning till late, as DJ Emma drops the fattest beats to keep the party blazing! Expect non-stop vibes and killer mixes to carry you into the weekend!",
    isFt: true,
    host: [
      { name: "Belga MC", link: "/i/belga-mc" },
      { name: "Deejay Emma", link: "/i/deejay-emma" },
    ],
    time: { start: 20, end: 24 },
  },
  {
    id: "urban-breakfast",
    name: "Urban Breakfast Show",
    summary:
      "Jumpstart your Saturday with 'The Urban Breakfast,' a lively 6am show serving up the freshest urban beats and bold vibes to fuel your weekend. It's your early morning fix of music, chat, and city swagger!",
    isFt: true,
    host: [{ name: "Deejay Stinger", link: "/i/deejay-stinger" }],
    time: { start: 6, end: 9 },
  },
  {
    id: "big-seat",
    name: "The BIG Seat",
    summary:
      "Tune into 'The BIG Seat' every Saturday at 9am for two hours of gritty, no-holds-barred political talk, where host Wesige Banyagi grills influential guests with bold questions. It's tough, real, and packed with insights that hit hard!",
    isPop: true,
    isFt: true,
    host: [{ name: "Wesige Banyagi", link: "/i/wesige-banyagi" }],
    time: { start: 9, end: 11 },
  },
  {
    id: "certified-countdown",
    name: "The Certified Top 10 Countdown",
    summary:
      "Get hyped every Saturday before noon with 'The Certified Countdown,' where the 10 biggest chart-topping certified bangers blast off from No. 10 to the undisputed No. 1 song in the world! It's your weekly dose of global hits, served hot and unbeatable!",
    isFt: true,
    host: [{ name: "Monique", link: "/i/monique-mbabazi" }],
    time: { start: 11, end: 12 },
  },
  {
    id: "sports-roundup",
    name: "The Weekly Sports RoundUp",
    summary:
      "Get in the game with 'The Weekly Sports RoundUp,' where the boys unpack every jaw-dropping moment from soccer showdowns to Formula One finishes, basketball buzzer-beaters, tennis aces, and beyond! Your one-stop, high-energy breakdown of the sports world's wildest week!",
    isFt: true,
    host: [
      { name: "Abou", link: "/i/abou-champion" },
      { name: "Derrick", link: "/i/derrick-ashiimwe" },
      { name: "Nicholas" },
    ],
    time: { start: 12, end: 14 },
  },
  {
    id: "african-rhythms",
    name: "The African Rhythms",
    time: { start: 17, end: 20 },
  },
  {
    id: "saturday-night",
    name: "Saturday Night Live",
    summary:
      "Turn up your Saturday with 'Saturday Night Live,' where MC Kacheche and DJ Emma ignite your living room with non-stop party vibes from 8pm till the early hours! Expect wild beats, slick rhymes, and a night that never quits!",
    isFt: true,
    host: [
      { name: "MC Kacheche" },
      { name: "Deejay Emma", link: "/i/deejay-emma" },
    ],
    time: { start: 20, end: 24 },
  },
  {
    id: "sunday-inspiration",
    name: "The Sunday Inspiration",
    summary:
      "Escape the chaos with 'The Sunday Inspiration,' a soulful Sunday morning haven of hymns and gospel to lift your spirit and praise God. Tune in weekly for a divine recharge that sets your heart right!",
    isFt: true,
    time: { start: 6, end: 9 },
  },
  {
    id: "sunday-love",
    name: "Sunday LOVE",
    summary:
      "Spread the love with 'Sunday Love,' where every Sunday from 9am to noon, Clare Inyaa spins your heartfelt shoutouts and love song requests. It's three hours of pure romance and good vibes to warm your soul!",
    isFt: true,
    host: [{ name: "Inyaa Clare", link: "/i/inyaa-clare" }],
    recs: [
      {
        id: 1737875100,
        url: "linc-&-veve",
        name: "Linc & Veve",
      },
      {
        id: 1320135071,
        url: "weekend-love",
      },
    ],
    time: { start: 9, end: 12 },
  },
  {
    id: "enyangyi",
    name: "Enyangyi",
    summary:
      "Tune in to hear John Turinawe and his sharp panel slice through local politics in Runyakitara every Sunday at midday. It's your weekly dose of fiery debate and bold solutions for the community's toughest issues!",
    isFt: true,
    host: [{ name: "John Tulinawe" }],
    time: { start: 12, end: 14 },
  },
  {
    id: "sunday-lounge",
    name: "Sunday Lounge - Timeless Classics",
    time: { start: 14, end: 20 },
  },
  {
    id: "total-country-show",
    name: "The Total Country Show",
    summary:
      "Saddle up every Sunday from 8pm till late, spinning timeless country hits from Kenny Rogers and Dolly Parton to Luke Bryan and Carrie Underwood—every generation's twang covered! It's your all-night hoedown with the best in country, old and new!",
    isFt: true,
    recs: [
      {
        id: 1731859200,
        url: "total-country-show-2024-11-17",
      },
    ],
    time: { start: 20, end: 24 },
  },
];

export default shows;
