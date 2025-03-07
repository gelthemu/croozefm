"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto min-h-screen">
      <div className="p-2 text-dark dark:text-light text-center">
        <h1 className="text-xl pb-2.5 text-red">Article Not Found</h1>
        <p className="text-sm mb-2.5 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the article you&apos;re looking for. The
          article may have been deleted or the article&apos;s URL might be
          incorrect.
        </p>
        <Link href="/news" className="px-2.5 py-1 underline text-red">
          Browse All Articles
        </Link>
      </div>
    </div>
  );
}
