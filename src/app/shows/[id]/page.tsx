import { shows } from "@/data/shows";
import Image from "next/image";
import BackBtn from "@/app/components/tiny/backbtn";
import RecordPlayer from "@/app/shows/components/record-player";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return shows.map((show) => ({
    id: show.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const show = shows.find((s) => s.id === params.id);

  if (!show) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${show.title}`,
    description: show.description,
  };
}

export default async function ShowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const show = shows.find((s) => s.id === params.id);

  if (!show) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="mb-8">
        <BackBtn />
      </div>

      <div className="mb-12 pt-6 pb-10 border-y border-light/10">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto text-center">
          <h1 className="text-3xl py-5 font-apex bg-clip-text text-transparent bg-gradient-to-r from-light via-red to-light">
            {show.title}
          </h1>
          <p className="text-light/80">{show.description}</p>
        </div>
      </div>

      <div className="relative w-full md:w-5/6 mx-auto aspect-[1484/813] overflow-hidden rounded-lg">
        <Image
          src={show.image}
          alt={show.title}
          width={1484}
          height={813}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      <div className="mt-10 flex items-center justify-center">
        {show.host && (
          <div className="w-fit text-light/60 font-medium bg-gray px-4 py-2 rounded-md">
            <span>{show.host}</span>
          </div>
        )}
      </div>

      <RecordPlayer show={show} />
    </div>
  );
}
