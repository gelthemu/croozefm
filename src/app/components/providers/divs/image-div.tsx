import React from "react";
import Image from "next/image";
import { RESOURCES } from "@/data/endpoints";

interface ImgDivProps {
  url?: string;
  className?: string;
  imgClass?: string;
  text?: string;
}

const ImgDiv: React.FC<ImgDivProps> = ({
  url,
  className = "",
  imgClass = "",
  text = "CFM Pulse",
}) => {
  return (
    <div
      className={`relative w-full aspect-[1484/813] overflow-hidden rounded-sm border border-gray/80 dark:border-light/20 transition-all duration-500 ${className}`}
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
          src={url ? url : `${RESOURCES}/default.png`}
          alt={text ? text : "CFM Pulse"}
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
