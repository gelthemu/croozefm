"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";

interface ViewAllBtnProps {
  href: string;
  text: string;
}

export default function ViewAllBtn({ href, text }: ViewAllBtnProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center font-medium text-center text-sm hover:text-gray/80 dark:hover:text-light/40 transition-colors duration-200"
    >
      {text}
      <MoveRight className="ml-2 h-4 w-4" />
    </Link>
  );
}
