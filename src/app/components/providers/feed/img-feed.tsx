"use client";

import React from "react";
import Image from "next/image";

interface ImgFeedProps {
  array: string[];
  width: number;
  height: number;
  alt: string;
  xl?: boolean;
}

const srh1 = [
  "https://pbs.twimg.com/media/GlSDWUoXUAAZk7J?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWTXWgAAzTtU?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWWuWMAAx5Ah?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSDWUhWwAAgNSl?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSCRS_W0AAAzdS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlSCRS6XAAATyoD?format=jpg&name=medium",
];

const api1 = [
  "https://pbs.twimg.com/media/GlMfbl0WEAA6Wce?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlJ52iYW4AA6Lc3?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlDrllFXkAAtSZd?format=jpg&name=large",
  "https://pbs.twimg.com/media/GlDrllGXkAAxN6U?format=jpg&name=large",
];
const api2 = [
  "https://pbs.twimg.com/media/GlPDUpIWQAAB8mi?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDV3lWYAAXwh-?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDXFQXsAAve6b?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GlPDYT3WwAAirJK?format=jpg&name=medium",
];
const cgu1 = [
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Rubia-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Uganda-Batteries.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Uzima-water-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Darling-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Judiciary-Team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Nbs-Sport-team_Corporate-Games.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Betpawa-team.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/ME-Associates.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Nsambya-Hospital.jpg?fit=3841.200222015381%2C1659.9000959396362",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Pride-Micro-Finance-team.jpg",
  "https://i0.wp.com/kawowo.com/wp-content/uploads/2025/03/Ritz-medical-team.jpeg",
];

const tpcsg1 = [
  "https://pbs.twimg.com/media/GmG8fT2XUAA9woC?format=jpg&name=4096x4096",
  "https://pbs.twimg.com/media/Gl9jzSKXYAACkZ8?format=jpg&name=4096x4096",
];

const tpcsg2 = [
  "https://pbs.twimg.com/media/GmGfnrWbcAAiCkN?format=jpg&name=large",
  "https://pbs.twimg.com/media/GljPBQCXUAEG3em?format=jpg&name=large",
];

const ImgFeed: React.FC<ImgFeedProps> = ({
  array,
  width,
  height,
  alt,
  xl = false,
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        xl ? "xl:grid-cols-3" : ""
      } gap-3 my-6`}
    >
      {array.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto object-cover aspect-[${width}/${height}] rounded-t-sm grayscale-[0.5] _img_`}
        />
      ))}
    </div>
  );
};

const Srh1 = () => (
  <ImgFeed
    array={srh1}
    alt="A fire has gutted Sunrise Hotel along Khamis Road in downtown Kampala."
    width={510}
    height={510}
  />
);

const Api1 = () => (
  <ImgFeed
    array={api1}
    alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
    width={510}
    height={382}
  />
);

const Api2 = () => (
  <ImgFeed
    array={api2}
    alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
    width={510}
    height={510}
  />
);

const Cgu1 = () => (
  <ImgFeed
    array={cgu1}
    alt="Companies Registered for this 2025's Corporate Games"
    width={510}
    height={340}
    xl={true}
  />
);

const Tpcsg1 = () => (
  <ImgFeed
    array={tpcsg1}
    alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
    width={644}
    height={429}
  />
);

const Tpcsg2 = () => (
  <ImgFeed
    array={tpcsg2}
    alt="Arnold Palmer Invitational presented by Mastercard - Official PGA TOUR event - March 3-9, 2025"
    width={511}
    height={639}
  />
);

export { Srh1, Api1, Api2, Cgu1, Tpcsg1, Tpcsg2 };
