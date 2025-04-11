"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface NotFoundPageProps {
  title: string;
  text: string;
}

export default function NotFoundPage({ title, text }: NotFoundPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pt-24 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 text-center">
        <h2 className="text-2xl text-red">{`${title} Not Found`}</h2>
        <p>{text}</p>
        <Link href="/home" className="underline text-red p-4">
          Go to Home Page
        </Link>
      </div>
    </>
  );
}
