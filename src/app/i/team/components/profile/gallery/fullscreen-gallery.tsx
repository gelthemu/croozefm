"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCarouselContext } from "@/app/context/carousel-context";

const FullscreenCarousel: React.FC = () => {
  const { isOpen, carouselData, closeCarousel } = useCarouselContext();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (carouselData) {
      setCurrentPhotoIndex(carouselData.currentIndex);
    }
  }, [carouselData]);

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!carouselData) return;

    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === carouselData.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!carouselData) return;

    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.gallery.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleCarouselNavigation = () => {
      if (isOpen) {
        closeCarousel();
      }
    };

    if (isOpen && carouselData) {
      window.history.pushState({ carouselOpen: true }, "");
    }

    window.addEventListener("popstate", handleCarouselNavigation);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !carouselData) return;

      if (e.key === "Escape" || e.key === "Backspace") {
        closeCarousel();
      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === "d" ||
        e.key === "s"
      ) {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === carouselData.gallery.length - 1 ? 0 : prevIndex + 1
        );
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "a" ||
        e.key === "w"
      ) {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === 0 ? carouselData.gallery.length - 1 : prevIndex - 1
        );
      } else if (e.key === "Home") {
        setCurrentPhotoIndex(0);
      } else if (e.key === "End") {
        setCurrentPhotoIndex(carouselData.gallery.length - 1);
      }
    };

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isOpen) return;
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isOpen || !carouselData) return;
      touchEndX = e.changedTouches[0].screenX;

      if (touchEndX - touchStartX > 75) {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === 0 ? carouselData.gallery.length - 1 : prevIndex - 1
        );
      } else if (touchStartX - touchEndX > 75) {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === carouselData.gallery.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("popstate", handleCarouselNavigation);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, carouselData, closeCarousel]);

  if (!isOpen || !carouselData) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-dark flex items-center justify-center">
      <div className="relative w-full h-full bg-gray/50 flex items-center justify-center">
        <div className="absolute top-4 right-4 flex items-center justify-center z-[1001]">
          <div
            role="button"
            tabIndex={0}
            onClick={closeCarousel}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                closeCarousel();
              }
            }}
            className="flex items-center justify-center text-light/80 p-2 bg-dark/80 rounded-md cursor-pointer focus:outline-none"
            aria-label="Close fullscreen view"
          >
            <IoMdClose size={18} />
          </div>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={goToPrevImage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goToPrevImage(e as unknown as React.MouseEvent);
            }
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-light/80 flex items-center justify-center p-2 bg-dark/80 rounded-md cursor-pointer focus:outline-none z-[1001]"
          aria-label="Previous image"
        >
          <IoIosArrowBack size={18} />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={goToNextImage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goToNextImage(e as unknown as React.MouseEvent);
            }
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light/80 flex items-center justify-center p-2 bg-dark/80 rounded-md cursor-pointer focus:outline-none z-[1001]"
          aria-label="Next image"
        >
          <IoIosArrowForward size={18} />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={carouselData.gallery[currentPhotoIndex]}
            alt={`${carouselData.name} - ${currentPhotoIndex + 1}`}
            fill
            sizes="100vw"
            priority
            className="object-contain filter grayscale-[1] _img_"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent h-32 px-6 py-4 text-light/90 flex flex-col justify-end">
          <div className="flex flex-row items-center space-x-2">
            <FaInfoCircle size={16} />
            <div>
              <p className="text-sm">{`${carouselData.name}'s Photos - ${
                currentPhotoIndex + 1
              }/${carouselData.gallery.length}`}</p>
              <p className="text-xs text-light/60">
                <span>Via</span> <span>Socials / {carouselData.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenCarousel;
