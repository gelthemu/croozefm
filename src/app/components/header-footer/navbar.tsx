"use client";

import React, { useState, useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { Logo } from "./navigation/logo";
import { HamburgerButton } from "./navigation/hamburger-button";
import { DesktopMenu } from "./navigation/desktop-menu";
import { MobileMenu } from "./navigation/mobile-menu";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isArticlePage = pathname?.startsWith("/news/article");
  useMiniPlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isArticlePage) return;

    const article = document.querySelector("article");
    if (!article) return;

    const handleScroll = () => {
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition < articleTop) {
        setScrollProgress(0);
        return;
      }

      const scrollDistance = articleHeight - windowHeight;
      const currentScroll = scrollPosition - articleTop;
      const progress = Math.min(currentScroll / scrollDistance, 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isArticlePage, pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="w-full bg-red sticky top-0 z-50">
      <nav className="w-full max-w-screen-xl mx-auto relative">
        <div className="flex flex-wrap items-center justify-between py-5 md:py-0 px-8 sm:px-12 md:px-16">
          <Logo onLogoClick={closeMenu} className="md:py-auto z-[100]" />
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
          <DesktopMenu />
          <MobileMenu isOpen={isOpen} onNavClick={closeMenu} />
        </div>
      </nav>
      {isArticlePage && (
        <div
          className="absolute top-0 left-0 h-[1px] max-w-full transition-[width] duration-[0.5s] ease-linear"
          style={{
            width: `${scrollProgress * 100}%`,
            borderTop: "solid",
            borderWidth: "1px",
            borderImageSlice: 1,
            borderImageSource:
              "linear-gradient(90deg, #fdb913, #f37021 19.27%, #c9234a 40.62%, #645faa 61.46%, #0089cf 81.25%, #0db14b)",
          }}
        />
      )}
    </div>
  );
}
