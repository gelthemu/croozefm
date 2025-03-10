"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  onLogoClick?: () => void;
}

export const Logo = ({ onLogoClick }: LogoProps) => (
  <Link
    href="/home"
    onClick={onLogoClick}
    className="flex items-center w-24 md:w-28"
  >
    <Image
      src="/cfm-logo.png"
      alt="CroozeFM Logo"
      width={8192}
      height={3304}
      priority={true}
      className="w-full aspect-[1024/413] _img_"
    />
  </Link>
);
