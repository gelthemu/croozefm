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
    className={`relative flex items-center w-20 ${className}`}
  >
    <Image
      src="/cfm-logo.png"
      alt="CFM Pulse Logo"
      width={5900}
      height={2860}
      priority={true}
      className="w-full aspect-[295/143] _img_"
    />
  </Link>
);
