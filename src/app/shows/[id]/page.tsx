import { shows } from "@/data/shows";
import { notFound } from "next/navigation";
import BackBtn from "@/app/components/tiny/backbtn";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import RecordPlayer from "@/app/shows/components/record-player";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const show = shows.find((s) => s.id === id);

  if (!show) {
    return {
      title: "Show Not Found",
      description: "The requested show could not be found.",
    };
  }

  return {
    title: `${show.title} - 91.2 Crooze FM`,
    description: show.description,
    openGraph: {
      title: `${show.title} - 91.2 Crooze FM`,
      description: show.description,
      type: "website",
      url: `https://croozefm.geltaverse.com/c/shows/${show.id}`,
      images: [show.image],
    },
    twitter: {
      title: `${show.title} - 91.2 Crooze FM`,
      description: show.description,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: [show.image],
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
  return shows.map((show) => ({
    id: show.id,
  }));
}

export default async function ShowPage({ params }: PageProps) {
  const { id } = await params;
  const show = shows.find((s) => s.id === id);

  if (!show) {
    notFound();
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto min-h-screen px-4 py-10 overflow-hidden">
      <div className="mb-8">
        <BackBtn />
      </div>

      <div className="mb-12 pt-6 pb-10 border-y border-gray/40 dark:border-light/10">
        <div className="flex flex-col items-center justify-center w-full md:w-5/6 mx-auto text-center">
          <h1 className="text-3xl py-5 text-red _912cfm">{show.title}</h1>
          <p className="w-full max-w-2xl mx-auto text-sm">{show.description}</p>
        </div>
      </div>

      <div className="relative w-full md:w-5/6 mx-auto aspect-[1484/813] overflow-hidden rounded-sm border-2 border-gray/80 dark:border-light/40">
        <Image
          src={show.image}
          alt={show.title}
          width={2968}
          height={1626}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      {show.hosts && (
        <div className="my-10 flex items-center justify-center">
          <div className="w-fit flex flex-row items-center justify-center text-light dark:text-light/60 text-sm font-medium bg-gray/70 dark:bg-gray rounded-md">
            <span className="sr-only">Hosted by</span>
            <i className="fa-solid fa-microphone-lines pl-3 pr-1.5 py-2"></i>
            <div className="flex flex-row divide-x divide-light/40 dark:divide-light/20">
              {show.hosts.map((host, index) => (
                <Link
                  key={index}
                  href={
                    host.link
                      ? host.link
                      : `/i/${host.name?.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="relative px-3 py-2 after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:border-b-[3px] after:border-dark/40 dark:after:border-light/20"
                >
                  {host.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`${show.hosts ? "" : "mt-10"}`}>
        <RecordPlayer show={show} />
      </div>

      <div className="flex items-center justify-center mx-auto mt-10 px-6 py-2">
        <ViewAllBtn href="/shows" text="View All Shows" />
      </div>
    </div>
  );
}
