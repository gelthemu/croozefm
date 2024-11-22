"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight } from "lucide-react";

const navLinks = [
  { id: "home", name: "Home", href: "/" },
  { id: "shows", name: "Shows", href: "/c/shows" },
  { id: "news-archive", name: "News-Archive", href: "/c/news-archive" },
  { id: "gallery", name: "Gallery", href: "/c/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isMiniPlayerOpen, setIsMiniPlayerOpen } = useMiniPlayer();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return (
        pathname === href ||
        pathname === "/user/login" ||
        pathname === "/user/dashboard"
      );
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

  const handleLogin = () => {
    router.push("/user/login");
  };

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
            {status === "loading" ? (
              <div className="bg-dark/40 rounded-md px-3 py-2">
                <Loader className="w-4 h-4 animate-spin text-light/10" />
              </div>
            ) : session?.user ? (
              <button
                type="button"
                className="text-sm text-red line-clamp-1 font-semibold bg-dark/40 rounded-md px-3 py-2"
                onClick={() => {
                  router.push("/user/dashboard");
                }}
              >
                {session?.user?.username.charAt(0).toUpperCase() +
                  session?.user?.username.slice(1)}
              </button>
            ) : (
              <button
                type="button"
                className="text-sm font-semibold font-variant bg-dark/40 rounded-md px-3 py-2"
                onClick={handleLogin}
              >
                Login
              </button>
            )}

            <button
              data-collapse-toggle="navbar-absolute"
              type="button"
              className="inline-flex items-center p-2 justify-center rounded-md md:hidden"
              aria-controls="navbar-absolute"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
            } absolute top-full left-0 md:static border border-light/10 md:border-0 backdrop-blur-md bg-gray/80 md:bg-transparent rounded-b-md transition-all duration-300`}
            id="navbar-absolute"
          >
            <ul className="w-full max-w-lg mx-auto md:max-w-none md:mx-0 flex flex-col space-y-4 md:divide-y-0 md:space-y-0 md:flex-row md:space-x-4 lg:space-x-6 rtl:space-x-reverse p-4 md:p-0 font-medium">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="border border-light/10 md:border-b-none md:border-transparent rounded-md"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block p-4 md:p-0 md:pb-1.5 px-1 ${
                      isLinkActive(link.href)
                        ? "text-red"
                        : "hover:text-light/50"
                    } text-center font-semibold transition-all duration-300`}
                    aria-current={isLinkActive(link.href) ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="show md:hidden rounded-md">
                <button
                  className={`w-full bg-red/80 hover:bg-red font-semibold p-4 rounded-md flex items-center space-x-1 transition-all duration-300 ${
                    isMiniPlayerOpen ? "opacity-40" : ""
                  } flex justify-center items-center`}
                  onClick={() => {
                    setTimeout(() => {
                      setIsOpen(false);
                      setIsMiniPlayerOpen(true);
                    }, 500);
                  }}
                  disabled={isMiniPlayerOpen}
                >
                  <span>Listen Live</span>{" "}
                  <ArrowDownRight className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
