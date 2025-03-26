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
      className="inline-flex items-center font-medium text-center p-2 text-sm opacity-[0.85] hover:opacity-[0.5] transition-opacity duration-200"
    >
      {text}
      <MoveRight className="ml-2 h-4 w-4" />
    </Link>
  );
}
