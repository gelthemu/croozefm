"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Show } from "@/types/shows";

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps) => {
  return (
    <Link href={`/c/shows/${show.id}`}>
      <motion.div
        initial={{ opacity: 0, x: "10%" }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <div
          className={`group grid-1 relative rounded-sm border-2 border-gray/80 dark:border-light/40
        `}
        >
          <div className="w-full h-full overflow-hidden">
            <Image
              src={show.image}
              alt={show.title}
              width={1484}
              height={813}
              priority={true}
              className="h-full w-full object-cover aspect-[1484/813] transition-transform duration-300 group-hover:scale-105 _img_"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ShowCard;
