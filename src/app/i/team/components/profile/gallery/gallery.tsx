"use client";

import React from "react";
import Image from "next/image";
import { MdFullscreen } from "react-icons/md";
import { useCarouselContext } from "@/app/context/carousel-context";

interface GalleryProps {
  gallery: string[];
  name: string;
  code: string;
}

const ProfileGallery: React.FC<GalleryProps> = ({ gallery, name, code }) => {
  const { openCarousel } = useCarouselContext();

  if (!gallery?.length) return null;

  return (
    <>
      <h3 className="font-medium text-lg text-red capitalize _912cfm">
        {`${code}'s Gallery`}
      </h3>
      <p className="text-sm mb-4">Click to open in fullscreen mode.</p>
      <div className="flex-grow grid grid-cols-2 gap-2">
        {gallery.map((photo, index) => (
          <div
            role="button"
            tabIndex={0}
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              openCarousel({ gallery, currentIndex: index, name });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                openCarousel({ gallery, currentIndex: index, name });
              }
            }}
            className="relative w-full aspect-[570/696] rounded-md border border-gray/80 dark:border-light/20 overflow-hidden cursor-pointer focus:outline-none"
            aria-label="Click to enter full-screen mode"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
              style={{
                aspectRatio: "570 / 696",
                backgroundImage: `url("https://placehold.co/570x696/transparent/png?text=${encodeURIComponent(
                  `${name} - ${index + 1}`
                )}")`,
              }}
            >
              <Image
                src={photo}
                width={2280}
                height={2784}
                priority={index < 4}
                alt={`${name} - ${index + 1}`}
                className="w-full h-full object-cover aspect-[570/696] filter grayscale-[0.95] transition-all duration-300 _img_"
              />{" "}
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                openCarousel({ gallery, currentIndex: index, name });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  openCarousel({ gallery, currentIndex: index, name });
                }
              }}
              className="absolute bottom-1 right-1 text-light/80 p-1 bg-dark/80 rounded-sm cursor-pointer focus:outline-none"
              aria-label="Click to enter full-screen mode"
            >
              <span className="sr-only">Click to enter full-screen mode</span>
              <MdFullscreen size={14} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileGallery;
