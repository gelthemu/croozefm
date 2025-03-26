"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  onLogoClick?: () => void;
  className?: string;
}

export const Logo = ({ onLogoClick, className = "" }: LogoProps) => (
  <Link
    href="/home"
    onClick={onLogoClick}
    className={`relative flex items-center w-24 ${className}`}
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
