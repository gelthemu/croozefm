// @/app/shows/[id]/page.tsx
import { shows } from "@/data/shows";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
// import { Show } from "@/types/shows";

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
    title: `${show.title} | Crooze FM`,
    description: show.description,
    openGraph: {
      title: show.title,
      description: show.description,
      images: [show.image],
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
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={show.image}
            alt={show.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-apex">{show.title}</h1>

          {show.host && (
            <div className="flex items-center gap-2">
              <span className="text-light/60">Hosted by:</span>
              <span className="font-medium">{show.host}</span>
            </div>
          )}

          <p className="text-lg text-light/80">{show.description}</p>

          {show.recordings && show.recordings.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-apex mb-4">Recent Episodes</h2>
              <div className="space-y-4">
                {show.recordings.map((recording) => (
                  <div
                    key={recording.id}
                    className="p-4 bg-light/5 rounded-lg space-y-2"
                  >
                    <h3 className="font-medium">{recording.title}</h3>
                    <audio controls className="w-full" src={recording.audio} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
