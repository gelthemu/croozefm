"use client";

import Image from "next/image";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const { isMiniPlayerOpen, setIsMiniPlayerOpen } = useMiniPlayer();

  return (
    <>
      <div className="w-full">
        <div className="w-full mt-10 p-0">
          <Image
            src="/assets/cfm-hero.png"
            alt="Hero Image"
            width={2295}
            height={675}
            priority={true}
            className="w-full aspect-[2295/675] object-cover _img_"
          />
        </div>
        <div className="w-full my-12">
          <div className="w-full h-full flex justify-center items-center">
            <button
              className={`bg-red/80 hover:bg-red font-semibold px-4 py-2 rounded-md flex items-center space-x-1 transition-all duration-300 ${
                isMiniPlayerOpen ? "opacity-40" : ""
              }`}
              onClick={() => {
                setTimeout(() => {
                  setIsMiniPlayerOpen(true);
                }, 500);
              }}
              disabled={isMiniPlayerOpen}
            >
              <span>Listen Live</span> <ArrowDownRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
