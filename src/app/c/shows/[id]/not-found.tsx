import Image from "next/image";
import BackBtn from "@/app/components/tiny/backbtn";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-14 text-dark dark:text-light">
      <div className="mb-8">
        <BackBtn />
      </div>

      <div className="mb-12 pt-6 pb-10 border-y border-dark/40 dark:border-light/20">
        <div className="flex flex-col items-center justify-center w-5/6 mx-auto text-center">
          <h1 className="text-3xl py-5 font-oswald text-red">Show Not Found</h1>
          <p>
            The show you&apos;re trying to find isn&apos;t available; it either
            doesn&apos;t exist or has been taken down.
          </p>
        </div>
      </div>

      <div className="relative w-full md:w-4/6 mx-auto aspect-[1484/813] overflow-hidden rounded-sm border-2 border-gray/80 dark:border-light/40">
        <Image
          src="https://croozefm.blob.core.windows.net/images/default.png"
          alt="91.2 Crooze FM"
          width={1484}
          height={813}
          priority={true}
          className="w-full aspect-[1484/813] object-cover _img_"
        />
      </div>
    </div>
  );
}
