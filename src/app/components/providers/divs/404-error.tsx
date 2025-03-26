"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import ImgDiv from "@/app/components/providers/divs/image-div";

interface NotFoundPageProps {
  title: string;
  text: string;
  link: {
    url: string;
    text: string;
  };
}

export default function NotFoundPage({ title, text, link }: NotFoundPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-8 text-center">
        <h2 className="text-2xl text-red">{`${title} Not Found`}</h2>
        <p>{text}</p>
        <Link href={link.url} className="underline text-red">
          {link.text}
        </Link>
        <ImgDiv
          url="https://croozefm.blob.core.windows.net/images/default.png"
          alt="91.2 Crooze FM"
        />
        <Link href="/home" className="underline text-red">
          Go to Home Page
        </Link>
      </div>
    </>
  );
}
