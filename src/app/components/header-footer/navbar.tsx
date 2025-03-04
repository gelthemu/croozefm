"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { usePathname } from "next/navigation";
import SocialLinks from "../tiny/socials";
import { NavStreamBtn } from "../stream/stream-btn";

const navLinks = [
  { id: "home", name: "Home", href: "/home" },
  { id: "shows", name: "Shows", href: "/shows" },
  { id: "presenters", name: "Presenters", href: "/i/team" },
  { id: "news-archive", name: "News", href: "/news/" },
  { id: "gallery", name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useMiniPlayer();

  const isLinkActive = (href: string) => {
    if (href === "/i/team" && pathname.startsWith("/i/")) {
      return true;
    }
    if (href === "/news/" && pathname.startsWith("/news")) {
      return true;
    }
    if (href === "/home") {
      const matchesOtherPaths = navLinks
        .filter((link) => link.href !== "/home")
        .some((link) => {
          if (pathname.startsWith("/i/") && link.href === "/i/team") {
            return true;
          }
          if (link.href === "/news/" && pathname.startsWith("/news")) {
            return true;
          }
          return pathname.startsWith(link.href);
        });
      return pathname === "/home" || !matchesOtherPaths;
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
          <Link href="/home" className="flex items-center w-24 md:w-28">
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
            <NavStreamBtn setIsOpen={setIsOpen} />
            <div
              className="relative w-6 h-6 focus:outline-none inline-flex items-center justify-center text-light p-1 md:hidden cursor-pointer"
              aria-controls="navbar-absolute"
              aria-expanded={isOpen}
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
              <div className="flex flex-col justify-center items-center w-full h-full">
                <span
                  className={`block bg-light h-0.5 w-6 absolute transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block bg-light h-0.5 w-6 absolute transition-all duration-200 ease-in-out ${
                    isOpen ? "opacity-[0]" : "opacity-[1]"
                  }`}
                />
                <span
                  className={`block bg-light h-0.5 w-6 absolute transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                />
              </div>
            </div>
          </div>
          <div
            className={`items-center justify-between w-full  md:flex md:w-auto md:order-1 ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
            } absolute top-full left-0 md:static backdrop-blur-sm transition-all duration-300`}
            id="navbar-absolute"
          >
            <ul className="bg-dark/95 md:bg-transparent w-[80%] min-h-screen md:min-h-0 md:w-full md:max-w-none md:mx-0 flex flex-col divide-y divide-light/30 md:divide-y-0 md:space-y-0 md:flex-row md:space-x-3 lg:space-x-6 rtl:space-x-reverse p-4 md:p-0 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block p-4 md:p-0 px-1 ${
                      isLinkActive(link.href)
                        ? "font-bold text-light"
                        : "font-semibold text-light/60 hover:text-light/60"
                    } text-left transition-all duration-300`}
                    aria-current={isLinkActive(link.href) ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex flex-col pt-6 md:hidden">
                <span onClick={() => setIsOpen(false)}>
                  <SocialLinks />
                </span>
                <div className="flex flex-col text-sm text-light mt-4 py-2 border-y border-light/5">
                  <span>Call Us: </span>
                  <span>
                    <strong className="font-medium">
                      0752-912912{" • "}0780-912910
                    </strong>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
