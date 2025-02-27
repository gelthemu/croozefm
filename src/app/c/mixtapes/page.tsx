import Image from "next/image";
import { mixtapes } from "@/data/mixtapes";
import MixtapePlayer from "./components/mixtape-player";

export const metadata = {
  title: "CFM Weekly Mixtapes - 91.2 Crooze FM",
  description:
    "Brace yourself for uplifting vibes and awesome tunes! Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday. Great Music, Great Friends.",
};

export default function MixtapesPage() {
  const sortedMixtapes = [...mixtapes].sort((a, b) => b.id - a.id);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen overflow-hidden">
      <div className="text-center pb-8 flex flex-col items-center justify-center border-b border-dark/40 dark:border-light/20">
        <h1 className="text-3xl relative mb-4 _912cfm">CFM Weekly Mixtapes</h1>
        <p className="w-full max-w-xl mx-auto text-sm">
          Get ready for feel-good vibes and epic beats! Western Uganda&apos;s
          Biggest Radio Station presents the Crooze FM Weekly Mixtape every
          Wednesday.
        </p>
      </div>

      <div className="my-12 relative w-full md:w-4/6 mx-auto aspect-[1484/813] overflow-hidden rounded-sm border-2 border-gray/80 dark:border-light/40">
        <Image
          src="https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
          alt="Crooze FM Weekly Mixtape"
          width={2968}
          height={1626}
          priority={true}
          className="w-full h-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      <MixtapePlayer mixtapes={sortedMixtapes} />
    </div>
  );
}
