import React from "react";
import Link from "next/link";

export const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <Link href={href ?? "#"} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  iframe: ({ ...props }) => (
    <div className="relative w-full aspect-[16/9] rounded overflow-hidden flex flex-col">
      <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
  ),
};
