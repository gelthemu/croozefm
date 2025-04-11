"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRocketchat } from "react-icons/fa";
import { useChat } from "@/app/context/chat-context";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { SNAPSHOTS } from "@/data/endpoints";

interface SnapShotProps {
  url: string;
  className?: string;
}

const SnapShot: React.FC<SnapShotProps> = ({ url, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { isLoading } = useMiniPlayer();

  const images = [
    { src: url, alt: "First slide" },
    { src: `${SNAPSHOTS}/snap-shot-default.png`, alt: "Second slide" },
  ];

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setTransitioning(true);
      setActiveIndex((current) => (current === 0 ? 1 : 0));
      setTransitioning(false);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className={`relative w-full overflow-hidden rounded-sm ${className}`}>
      <div className="relative w-full aspect-[371/100]">
        {images.map((image, index) => {
          let zIndex = 0;
          let opacity = 0;

          if (index === activeIndex) {
            zIndex = transitioning ? 10 : 20;
            opacity = transitioning ? 0.5 : 1;
          } else if (
            (index === 0 && activeIndex === 1) ||
            (index === 1 && activeIndex === 0)
          ) {
            zIndex = transitioning ? 20 : 10;
            opacity = transitioning ? 1 : 0;
          }
          return (
            <div
              key={index}
              style={{
                zIndex,
                opacity,
                transition: "opacity 1s ease-in-out",
              }}
              className={`absolute top-0 left-0 w-full h-full`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
                style={{
                  aspectRatio: "371 / 100",
                  backgroundImage: `url("https://placehold.co/371x100/transparent/png?text=CFM+Pulse")`,
                }}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={2968}
                  height={800}
                  priority={true}
                  className={`w-full object-cover aspect-[371/100] _img_ border border-light/10`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChatBtn = () => {
  const { toggleChatVisibility, users } = useChat();

  return (
    <div className={`w-full mt-auto pr-4`}>
      <div className="w-full flex justify-end bg-transparent rounded-sm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            toggleChatVisibility();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleChatVisibility();
            }
          }}
          className={`relative text-sm bg-gray p-2 text-light rounded-full focus:outline-none`}
        >
          <span className="">
            <FaRocketchat size={18} />
          </span>
          <span className="absolute -top-2 -end-2 translate-x-1/4 text-nowrap px-1 py-0.5 min-w-5 rounded-full text-center text-xs bg-red rounded-full">
            <span className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red/40 w-full h-full"></span>
            {users.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export { SnapShot, ChatBtn };
