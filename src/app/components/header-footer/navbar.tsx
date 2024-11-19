"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: "home", name: "Home", href: "/" },
  { id: "shows", name: "Shows", href: "/c/shows" },
  { id: "news-archive", name: "News Archive", href: "/c/news-archive" },
  { id: "gallery", name: "Gallery", href: "/c/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
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
    <div className="w-full bg-gray sticky top-0 z-20 border-b border-light/40">
      <nav className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between p-4 md:px-8">
          <Link href="/" className="flex items-center w-24 md:w-28">
            <Image
              src="/cfm-logo.png"
              alt="CroozeFM Logo"
              width={4096}
              height={1652}
              priority={true}
              className="w-full aspect-[4096/1652] _img_"
            />
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-sm font-semibold font-variant bg-dark/40 rounded-md px-3 py-2"
              disabled
            >
              Login
            </button>
            <button
              data-collapse-toggle="navbar-absolute"
              type="button"
              className="inline-flex items-center p-2 justify-center rounded-md md:hidden"
              aria-controls="navbar-absolute"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen ? "!block" : "hidden"
            } absolute top-full left-0 md:static`}
            id="navbar-absolute"
          >
            <ul className="w-full max-w-lg mx-auto md:max-w-none md:mx-0 flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse p-4 md:p-0 font-medium border border-light/10 md:border-0 backdrop-blur-md bg-gray/80 md:bg-transparent rounded-b-md">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block pb-1.5 px-1 ${
                      isLinkActive(link.href)
                        ? "text-red"
                        : "hover:text-light/50"
                    } text-center font-bold transition-all duration-300`}
                    aria-current={isLinkActive(link.href) ? "page" : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
