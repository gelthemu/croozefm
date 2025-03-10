import React from "react";
import Image from "next/image";

interface ImgDivProps {
  url: string;
  alt: string;
  className?: string;
  imgClass?: string;
  text?: string;
}

const ImgDiv: React.FC<ImgDivProps> = ({
  url,
  alt,
  className = "",
  imgClass = "",
  text = "91.2 Crooze FM",
}) => {
  return (
    <div
      className={`${className} relative w-full aspect-[1484/813] overflow-hidden rounded-md border-2 border-gray/80 dark:border-light/20 transition-all duration-500`}
    >
      <div
        className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
        style={{
          aspectRatio: "1484 / 813",
          backgroundImage: `url("https://placehold.co/1484x813/transparent/png?text=${encodeURIComponent(
            text
          )}")`,
        }}
      >
        <Image
          src={url}
          alt={alt}
          width={2968}
          height={1626}
          priority={true}
          className={`w-full object-cover aspect-[1484/813] _img_ ${imgClass}`}
        />
      </div>
    </div>
  );
};

export default ImgDiv;
