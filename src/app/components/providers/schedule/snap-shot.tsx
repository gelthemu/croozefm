"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { RESOURCES } from "@/data/endpoints";

const SnapShot: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { isLoading } = useMiniPlayer();

  const images = [
    { src: `${RESOURCES}/on-air.png`, alt: "First slide" },
    { src: `${RESOURCES}/on-air-2.png`, alt: "Second slide" },
  ];

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex((current) => (current === 0 ? 1 : 0));
        setTransitioning(false);
      }, 600); // Match transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className={`w-full overflow-hidden transition-all duration-[0.6s]`}>
      <div className="relative w-full aspect-[1484/813]">
        {images.map((image, index) => {
          let zIndex = 0;
          let opacity = 0;
          let translateX = "100%"; // Start off-screen to the right

          if (index === activeIndex) {
            zIndex = transitioning ? 10 : 20;
            opacity = transitioning ? 0.5 : 1;
            translateX = "0%"; // Slide to center when active
          } else if (
            (index === 0 && activeIndex === 1) ||
            (index === 1 && activeIndex === 0)
          ) {
            zIndex = transitioning ? 20 : 10;
            opacity = transitioning ? 1 : 0.25;
            translateX = transitioning ? "0%" : "-100%"; // Slide out to left or in from right
          }

          return (
            <div
              key={index}
              style={{
                zIndex,
                opacity,
                transform: `translateX(${translateX})`,
                transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
              }}
              className={`absolute top-0 left-0 w-full h-full`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
                style={{
                  aspectRatio: "1484 / 813",
                  backgroundImage: `url("https://placehold.co/1484x813/transparent/png?text=On-Air")`,
                }}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={1484}
                  height={813}
                  priority={true}
                  className={`w-full object-cover aspect-[1484/813] grayscale-[0.25] rounded-sm _img_`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { SnapShot };