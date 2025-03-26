"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { RiInformation2Line } from "react-icons/ri";

interface GalleryProps {
  gallery: string[];
  name: string;
}

const ProfileGallery: React.FC<GalleryProps> = ({ gallery, name }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const handleInfoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseOverlay = () => {
    setSelectedPhotoIndex(null);
  };

  if (!gallery?.length) return null;

  return (
    <div className="flex-grow p-2 pt-10 border-t border-gray/20 dark:border-light/20 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {gallery.map((photo, index) => (
        <div
          key={index}
          className="relative w-full profile-image rounded-md overflow-hidden"
        >
          <Image
            src={photo}
            width={2280}
            height={2784}
            priority={true}
            alt={`${name} - ${index + 1}`}
            className="w-full h-full object-cover aspect-[570/696] grayscale-[1] _img_"
          />
          {selectedPhotoIndex !== index && (
            <button
              onClick={() => handleInfoClick(index)}
              className="absolute bottom-1 right-1 text-light/80 p-1 bg-dark/90 rounded-sm cursor-pointer focus:outline-hidden"
            >
              <RiInformation2Line size={14} />
            </button>
          )}

          {selectedPhotoIndex === index && (
            <div
              className="w-full h-[30%] absolute bottom-0 left-0 bg-gradient-to-t from-dark to-transparent"
              onClick={handleCloseOverlay}
            >
              <div className="relative w-full h-full flex items-end text-light p-2">
                <button
                  onClick={handleCloseOverlay}
                  className="absolute bottom-1 right-1 text-light/80 p-1 bg-dark/90 rounded-sm cursor-pointer focus:outline-hidden"
                >
                  <IoMdClose size={14} />
                </button>
                <div>
                  <p className="text-sm text-light/80 line-clamp-1">{`${name}'s Photos - ${
                    index + 1
                  }/2`}</p>
                  <p className="text-xs text-light/50 line-clamp-1">
                    <span>Via</span>{" "}
                    <span className="uppercase"> Socials / {`${name}`}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileGallery;
