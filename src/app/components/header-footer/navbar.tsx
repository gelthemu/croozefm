"use client";

import React, { useState, useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { Logo } from "./navigation/logo";
import { HamburgerButton } from "./navigation/hamburger-button";
import { DesktopMenu } from "./navigation/desktop-menu";
import { MobileMenu } from "./navigation/mobile-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="w-full bg-red sticky top-0 z-50 border-b border-dark/50 dark:border-light/50">
      <nav className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between py-5 px-8 sm:px-12 md:px-16">
          <Logo />
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
          <DesktopMenu />
          <MobileMenu
            isOpen={isOpen}
            onNavClick={closeMenu}
            onLogoClick={closeMenu}
          />
        </div>
      </nav>
    </div>
  );
}
