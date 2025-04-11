import { shows } from "@/data/shows/shows";
import { notFound } from "next/navigation";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import RecordPlayer from "@/app/shows/components/show/record-player";
import Link from "next/link";
import { PageHeading } from "@/app/components/providers/divs/page-heading";
import Divider from "@/app/components/providers/divs/divider";
import ImmediateRelease from "@/app/components/announcement/for-immediate-release";
import { Metadata } from "next";
import { RESOURCES } from "@/data/endpoints";

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
    };
  }

  return {
    title: `${show.name}`,
    description: show.summary,
    keywords: `cfm pulse, ${show.name}, western uganda, crooze fm online, shows schedule, cruz fm, crooze fm stream live, crooze fm shows, crooze fm mixtapes`,
    openGraph: {
      url: `https://croozefm.geltaverse.com/shows/${show.id}`,
      images: [
        {
          url: `${RESOURCES}/on-air-2.png`,
          alt: "Western Uganda's Biggest Radio Station",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `${RESOURCES}/on-air-2.png`,
          alt: "Western Uganda's Biggest Radio Station",
        },
      ],
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
    <div className="w-full max-w-4xl mx-auto p-1">
      <PageHeading heading={show.name} text={show.summary} />
      {show.host && (
        <div className="w-fit mx-auto mt-10 flex items-center justify-center text-light dark:text-light/60 text-sm font-medium bg-gray/70 dark:bg-gray transition-all duration-300 rounded-md overflow-hidden">
          <span className="sr-only">Hosted by</span>
          <i className="fa-solid fa-microphone-lines pl-3 pr-1.5 py-2"></i>
          <div className="flex flex-row divide-x divide-light/40 dark:divide-light/20">
            {show.host.map((h, index) =>
              h.link ? (
                <Link
                  key={index}
                  href={h.link}
                  className="relative px-3 py-2 text-center hover:bg-dark/70 dark:hover:bg-light/20 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:border-b-[3px] after:border-dark/40 dark:after:border-light/20"
                >
                  {h.name}
                </Link>
              ) : (
                <div
                  key={index}
                  className="relative px-3 py-2 text-center hover:bg-dark/70 dark:hover:bg-light/20 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:border-b-[3px] after:border-dark/40 dark:after:border-light/20 select-none"
                >
                  {h.name}
                </div>
              )
            )}
          </div>
        </div>
      )}
      <div>
        <RecordPlayer show={show} />
      </div>
      <div className="flex items-center justify-end mx-auto">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
      <Divider />
      <ImmediateRelease viewAll={true} />
    </div>
  );
}
