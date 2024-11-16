import Image from "next/image";
import { Copyright } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray/20 text-light/80">
      <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24">
            <Image
              src="/cfm-logo-2.png"
              alt="CroozeFM Logo"
              width={4096}
              height={1652}
              className="w-full aspect-[4096/1652] _img_"
            />
          </div>
          <p className="text-sm text-wrap mt-8 font-medium">
            The Station Other Radio Stations Listen To
          </p>
        </div>
        <div className="mt-14 border-t border-light/30 pt-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-xs text-center text-light/40 font-medium">
            <p>Crooze FM is regulated by UCC</p>
            <p className=" flex items-center justify-center gap-1">
              <Copyright className="w-3.5 h-3.5" /> {year} Crooze FM Ltd | All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
