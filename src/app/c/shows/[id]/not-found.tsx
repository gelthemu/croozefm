import Link from "next/link";
import Image from "next/image";
import BackBtn from "@/app/components/tiny/backbtn";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-14">
      <div className="mb-8">
        <BackBtn />
      </div>

      <div className="mb-12 pt-6 pb-10 border-y border-light/10">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto text-center">
          <h1 className="text-3xl py-5 font-apex bg-clip-text text-transparent bg-gradient-to-r from-light via-red to-light">
            Show Not Found
          </h1>
          <p className="text-light/80">
            The show you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>

      <div className="relative w-full md:w-4/6 mx-auto aspect-[1484/813] overflow-hidden rounded-lg">
        <Image
          src="https://croozefm.blob.core.windows.net/images/default.png"
          alt="91.2 Crooze FM"
          width={1484}
          height={813}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>

      <div className="flex items-center justify-center text-center mx-auto mt-8 px-6 py-2">
        <Link
          href="/c/shows"
          className="inline-flex items-center font-semibold hover:text-light/50 transition-colors duration-300"
        >
          View All Shows
          <MoveRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
