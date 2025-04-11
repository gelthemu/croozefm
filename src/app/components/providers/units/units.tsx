"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { trackUnitImpression } from "./utils/unitsTrack";
import { getRandomUnit, Unit } from "./utils/unitsData";

const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const BaseUnit = ({ size }: { size: Unit["size"] }) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const unitRef = useRef<HTMLAnchorElement>(null);
  const impressionTrackedRef = useRef(false);

  useEffect(() => {
    const randomUnit = getRandomUnit(size);
    setUnit(randomUnit);
  }, [size]);

  useEffect(() => {
    if (!unit || !unitRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTrackedRef.current) {
            trackUnitImpression(unit.id);
            impressionTrackedRef.current = true;

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    observer.observe(unitRef.current);

    return () => {
      observer.disconnect();
    };
  }, [unit]);

  if (!unit) return null;

  return (
    <a
      ref={unitRef}
      href={`/api/unit?unit_id=${encodeURIComponent(
        unit.id
      )}&redirect=${encodeURIComponent(unit.link)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-2 bg-gray/5 dark:bg-gray/20 rounded-sm unit-${size} select-none`}
    >
      <span className="block text-xs opacity-60 uppercase mb-1">Promoted</span>
      <Image
        src={unit.imageUrl}
        alt=""
        width={size === "md" ? 6400 : size === "sm" ? 4000 : 1600}
        height={size === "md" ? 800 : size === "sm" ? 1600 : 5600}
        className={`
          w-full
          ${size === "md" ? "aspect-[8/1]" : ""}
          ${size === "sm" ? "aspect-[5/2]" : ""}
          ${size === "lg" ? "aspect-[2/7]" : ""}
          object-cover
        `}
      />
    </a>
  );
};

export const SmUnit = () => {
  const width = useScreenWidth();

  if (width >= 640) return null;

  return (
    <div className="w-full">
      <BaseUnit size="sm" />
    </div>
  );
};

export const MdUnit = () => {
  const width = useScreenWidth();

  if (width < 640) return null;

  return (
    <div className="w-full">
      <BaseUnit size="md" />
    </div>
  );
};

export const LgUnit = () => {
  const width = useScreenWidth();

  if (width < 1024) return null;

  return (
    <div className="w-full">
      <BaseUnit size="lg" />
    </div>
  );
};

export default BaseUnit;
