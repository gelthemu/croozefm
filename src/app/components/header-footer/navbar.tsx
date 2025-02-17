"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowDownRight } from "lucide-react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { usePathname } from "next/navigation";
import SocialLinks from "../tiny/socials";

const navLinks = [
  { id: "home", name: "Home", href: "/" },
  { id: "shows", name: "Shows", href: "/c/shows" },
  { id: "news-archive", name: "News-Archive", href: "/c/news-archive" },
  { id: "gallery", name: "Gallery", href: "/c/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isMiniPlayerOpen, setIsMiniPlayerOpen } = useMiniPlayer();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      const matchesOtherPaths = navLinks
        .filter((link) => link.href !== "/")
        .some((link) => pathname.startsWith(link.href));
      return pathname === "/" || !matchesOtherPaths;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const navbar = document.getElementById("navbar-absolute");
      const menuButton = document.querySelector(
        "[data-collapse-toggle='navbar-absolute']"
      );

      if (
        isOpen &&
        navbar &&
        !navbar.contains(e.target as Node) &&
        menuButton &&
        !menuButton.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full bg-red sticky top-0 z-20 border-b border-dark/50 dark:border-light/50">
      <nav className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between p-4 md:px-8">
          <Link href="/" className="flex items-center w-24 md:w-28">
            <Image
              src="/cfm-logo-2.png"
              alt="CroozeFM Logo"
              width={8192}
              height={3304}
              priority={true}
              className="w-full aspect-[1024/413] _img_"
            />
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              className={`text-light text-sm font-semibold px-2.5 py-1.5 rounded-md flex items-center space-x-1 transition-all duration-500 ${
                isMiniPlayerOpen || pathname === "/"
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              } border border-light/40 _912cfm`}
              style={{
                backgroundImage:
                  "linear-gradient(to right,rgba(40, 40, 40, 0.15) 0%,rgb(139, 18, 18) 50%, rgba(40, 40, 40, 0.15) 100%)",
              }}
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setIsMiniPlayerOpen(true);
                }, 200);
              }}
              disabled={isMiniPlayerOpen}
            >
              <span>Stream Live</span> <ArrowDownRight className="w-4 h-4" />
            </button>
            <button
              data-collapse-toggle="navbar-absolute"
              type="button"
              className="inline-flex items-center justify-center text-light p-1 md:hidden"
              aria-controls="navbar-absolute"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
            } absolute top-full left-0 md:static border-2 border-dark/20 dark:border-light/10 md:border-0 backdrop-blur-md bg-dark/80 dark:bg-red/40 md:bg-transparent rounded-b-md transition-all duration-300`}
            id="navbar-absolute"
          >
            <ul className="w-full mx-auto md:max-w-none md:mx-0 flex flex-col space-y-4 md:divide-y-0 md:space-y-0 md:flex-row md:space-x-4 lg:space-x-6 rtl:space-x-reverse p-4 md:p-0 font-medium">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="border border-light/10 md:border-b-none md:border-transparent rounded-md"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block p-4 md:p-0 px-1 ${
                      isLinkActive(link.href)
                        ? "font-bold text-light"
                        : "font-semibold text-light/60 hover:text-light/60"
                    } text-center transition-all duration-300`}
                    aria-current={isLinkActive(link.href) ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center justify-center p-4 md:hidden">
                <span onClick={() => setIsOpen(false)}>
                  <SocialLinks />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
