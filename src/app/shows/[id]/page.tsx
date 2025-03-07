import { shows } from "@/data/shows/shows";
import { notFound } from "next/navigation";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import RecordPlayer from "@/app/shows/components/show/record-player";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ftShows = shows.filter((show) => show.isFt);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const show = ftShows.find((s) => s.id === id);

  if (!show) {
    return {
      title: "Show Not Found",
      description:
        "Welcome to Home of Western Uganda's Biggest Radio Station. 91.2 Crooze FM. Great Music, Great Friends. Stream Live Radio. Hit Music. Current News Daily",
    };
  }

  return {
    title: `${show.name} / Crooze FM`,
    description: show.summary,
    keywords:
      "CroozeFM, 91.2 FM, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Western Uganda, News, radio shows 2025, The Morning Addiction, The Lifestyle Show, The Most Wanted Hits, African Countdown, Evening Switch, Hits Selector, Sports Bwino, Fat Friday Mix, Urban Breakfast, Inyaa Clare, Belga MC, Monique Mbabazi, morning radio, hot tunes, African music, sports talk, Friday party mix, weekend radio, live hosts, Crooze FM shows, Crooze FM radio, Crooze FM schedule, Crooze FM programs, Crooze FM live, Crooze FM podcast, Crooze FM music shows, Crooze FM hosts, Crooze FM streaming, Crooze FM online radio",
    openGraph: {
      title: `${show.name} / Crooze FM`,
      description: show.summary,
      type: "website",
      url: `https://croozefm.geltaverse.com/c/shows/${show.id}`,
      images: [
        {
          url: `https://croozefm.blob.core.windows.net/images/${show.id}.png`,
          alt: `${show.name}, one of the popular shows on 91.2 Crooze FM, Western Uganda's Biggest Radio Station`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: `${show.name} / Crooze FM`,
      description: show.summary,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: [
        {
          url: `https://croozefm.blob.core.windows.net/images/${show.id}.png`,
          alt: `${show.name}, one of the popular shows on 91.2 Crooze FM, Western Uganda's Biggest Radio Station`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/c/shows/${show.id}`,
      languages: {
        "en-US": "/c/en-US",
      },
    },
  };
}

export function generateStaticParams() {
  return ftShows.map((show) => ({
    id: show.id,
  }));
}

export default async function ShowPage({ params }: PageProps) {
  const { id } = await params;
  const show = ftShows.find((s) => s.id === id);

  if (!show) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen overflow-hidden">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl relative mb-4 _912cfm">{show.name}</h1>
        <p className="w-full max-w-xl mx-auto mb-2">{show.summary}</p>
      </div>

      {show.host && (
        <div className="my-10 flex items-center justify-center">
          <div className="w-fit flex flex-row items-center justify-center text-light dark:text-light/60 text-sm font-medium bg-gray/70 dark:bg-gray rounded-md">
            <span className="sr-only">Hosted by</span>
            <i className="fa-solid fa-microphone-lines pl-3 pr-1.5 py-2"></i>
            <div className="flex flex-row divide-x divide-light/40 dark:divide-light/20">
              {show.host.map((h, index) => (
                <Link
                  key={index}
                  href={
                    h.link
                      ? h.link
                      : `/i/${h.name?.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="relative px-3 py-2 text-center after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:border-b-[3px] after:border-dark/40 dark:after:border-light/20"
                >
                  {h.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="my-12 relative w-full md:w-4/6 mx-auto aspect-[1484/813] overflow-hidden rounded-sm border-2 border-gray/80 dark:border-light/40">
        <Image
          src={`https://croozefm.blob.core.windows.net/images/${show.id}.png`}
          alt={show.name}
          width={2968}
          height={1626}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      <div className={`${show.host ? "" : "mt-10"}`}>
        <RecordPlayer show={show} />
      </div>

      <div className="flex items-center justify-center mx-auto mt-10 px-6 py-2">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
    </div>
  );
}
