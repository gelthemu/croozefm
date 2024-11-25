import { Show } from "@/types/shows";

export const shows: Show[] = [
    {
        id: "the-inspiration",
        title: "The Inspiration",
        image: "https://croozefm.blob.core.windows.net/images/the-inspiration.png",
        description:
            "Start your day with a soulful selection of gospel music and uplifting messages. The perfect way to find your daily motivation.",
    },
    {
        id: "morning-addiction",
        title: "The Morning Addiction",
        image: "https://croozefm.blob.core.windows.net/images/morning-addiction.png",
        description:
            "Set your alarm! No useless Jibba Jabba. It is a special blend of news, best tunes and the most laughs to kickstart your day. Take the front seat as you seal each hour.",
        isFeatured: true,
        host: "Belga | Monique | Derrick",
    },
    {
        id: "coffee-break",
        title: "The Coffee Break",
        image: "https://croozefm.blob.core.windows.net/images/coffee-break.png",
        description:
            "Take a break with smooth music, light-hearted stories, and a quick rundown of the day's top events.",
    },
    {
        id: "lifestyle",
        title: "The Lifestyle Show",
        image: "https://croozefm.blob.core.windows.net/images/lifestyle.png",
        description:
            "Explore the latest in health, fashion, and entertainment. Lifestyle tips to make your everyday life extraordinary.",
        isFeatured: true,
        host: "Inyaa",
    },
    {
        id: "slowdown-hour",
        title: "The Slow Down Hour",
        image: "https://croozefm.blob.core.windows.net/images/slowdown-hour.png",
        description:
            "Relax and unwind with mellow hits and calming vibes to help you recharge for the rest of the day.",
    },
    {
        id: "most-wanted-hits",
        title: "The Most Wanted Hits",
        image: "https://croozefm.blob.core.windows.net/images/most-wanted-hits.png",
        description:
            "The biggest chart-toppers and audience requests. Tune in to hear the songs you love the most.",
        host: "Inyaa | Starcent DJ",
    },
    {
        id: "african-countdown",
        title: "The African Count Down",
        image: "https://croozefm.blob.core.windows.net/images/african-countdown.png",
        description:
            "Celebrate the sounds of Africa with a countdown of the hottest tracks across the continent.",
        recordings: [
            {
                id: "2024-11-18",
                date: "2024-11-18T16:00:00+03:00",
                audio: "https://croozefm.blob.core.windows.net/audio/the-african-count-down_2024-11-18.mp3",
            },
            {
                id: "2024-11-14",
                date: "2024-11-14T16:00:00+03:00",
                audio: "https://croozefm.blob.core.windows.net/audio/the-african-count-down_2024-11-14.mp3",
            },
        ],
    },
    {
        id: "evening-switch",
        title: "The Evening Switch",
        image: "https://croozefm.blob.core.windows.net/images/evening-switch.png",
        description:
            "Ease into the evening with feel-good music and engaging chats with our friendly hosts.",
        isFeatured: true,
        host: "Michael | Antoinette",
    },
    {
        id: "hot-6-at-6",
        title: "The Hot6@6",
        image: "https://croozefm.blob.core.windows.net/images/hot-6-at-6.png",
        description:
            "Your evening fix of the six hottest tracks of the day, handpicked just for you.",
        host: "Michael | DJ Banx",
    },
    {
        id: "hits-selector",
        title: "The Hits Selector Request Show",
        image: "https://croozefm.blob.core.windows.net/images/hits-selector.png",
        description:
            "A curated mix of the best hits, blending old-school classics with today's trending tunes.",
        host: "Dosh",
    },
    {
        id: "sports-bwino",
        title: "Sports Bwino",
        image: "https://croozefm.blob.core.windows.net/images/sports-bwino.png",
        description:
            "Catch up on the latest in sports, from local leagues to global championships, with expert analysis.",
        isFeatured: true,
        host: "Rosh | Abou | James",
        recordings: [
            {
                id: "2024-11-21",
                date: "2024-11-21T17:00:00+03:00",
                audio: "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-21_5pm.mp3",
            },
            {
                id: "2024-11-19",
                date: "2024-11-19T17:00:00+03:00",
                audio: "https://croozefm.blob.core.windows.net/audio/cfm-sports-update-2024-11-19_5pm.mp3",
            },
        ],
    },
    {
        id: "crooze-farmer",
        title: "The Crooze Farmer",
        image: "https://croozefm.blob.core.windows.net/images/crooze-farmer.png",
        description:
            "A special show dedicated to farmers, featuring agricultural tips, market insights, and interviews with experts in the field.",
        host: "Dithan Omuhinda",
    },
    {
        id: "crooze-doctor",
        title: "The Crooze Doctor",
        image: "https://croozefm.blob.core.windows.net/images/crooze-doctor.png",
        description:
            "Your weekly guide to health and wellness. From expert advice to answering listener questions, we've got you covered.",
        host: "Dosh, with Dr. Brian",
    },
    {
        id: "tgif-morning-addiction",
        title: "#TGIF - The Morning Addiction",
        image: "https://croozefm.blob.core.windows.net/images/tgif-morning-addiction.png",
        description:
            "Start your Friday with an electrifying morning packed with energy and upbeat tunes.",
        host: "Belga | Monique | Derrick | DJ Stinger",
    },
    {
        id: "tgif-lifestyle",
        title: "#TGIF - The Lifestyle Show",
        image: "https://croozefm.blob.core.windows.net/images/tgif-lifestyle.png",
        description:
            "Add some flair to your Friday with trends and fun takes on lifestyle topics.",
        host: "Inyaa | Starcent DJ",
    },
    {
        id: "tgif-most-wanted-extra",
        title: "T.G.I.F - The Most Wanted Xtra",
        image: "https://croozefm.blob.core.windows.net/images/tgif-most-wanted-extra.png",
        description:
            "Friday gets even better with extended hits and fan-favorite tracks.",
        host: "Problem Child | DJ Modern",
    },
    {
        id: "tgif-evening-switch",
        title: "#TGIF - The Evening Switch",
        image: "https://croozefm.blob.core.windows.net/images/tgif-evening-switch.png",
        description:
            "Get into the weekend mood with upbeat tracks and special Friday vibes.",
        host: "Michael | DJ Banx ",
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
        id: "african-rhythms",
        title: "The African Rhythms",
        image: "https://croozefm.blob.core.windows.net/images/african-rhythms.png",
        description:
            "Immerse yourself in the vibrant and diverse sounds of African music every Saturday evening.",
        host: "Starcent DJ",
    },
    {
        id: "saturday-night",
        title: "Saturday Night Live",
        image: "https://croozefm.blob.core.windows.net/images/saturday-night.png",
        description:
            "Keep the Saturday vibe alive with the best music for your night out or chill time at home.",
    },
    {
        id: "sunday-inspiration",
        title: "The Sunday Inspiration",
        image: "https://croozefm.blob.core.windows.net/images/sunday-inspiration.png",
        description:
            "Calm your soul with inspirational music and stories every Sunday morning.",
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
        ]
    },
    {
        id: "enyangyi",
        title: "ENYANGYI",
        image: "https://croozefm.blob.core.windows.net/images/enyangyi.png",
        description:
            "A cultural showcase of traditional music and stories, celebrating heritage every Sunday.",
        host: "John Turinawe",
    },
    {
        id: "total-country-show",
        title: "The Total Country Show",
        image: "https://croozefm.blob.core.windows.net/images/total-country-show.png",
        description:
            "A show that celebrates the best of country music from around the world. After a long, busy weekend, relax with the best of country music to recharge. From the old classics to the latest hits, Crooze FM has got you covered. Country music is good for your ears.",
    },
    {
        id: "ekisaawe-live",
        title: "Ekisaawe Live",
        image: "https://croozefm.blob.core.windows.net/images/ekisaawe-live.png",
        description: "For all soccer commentary and analysis. Every Matchday, 90 minutes of non-stop action.",
        host: "Rosh | Abou | James",
    },
];

export default shows;