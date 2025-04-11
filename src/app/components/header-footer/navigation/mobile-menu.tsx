"use client";

import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";
import { MobileFooter } from "./mobile-footer";
import { ThemeSwitcher } from "../../tiny/theme-toggle";

interface MobileMenuProps {
  isOpen: boolean;
  onNavClick: () => void;
}

export const MobileMenu = ({ isOpen, onNavClick }: MobileMenuProps) => (
  <div
    className={`w-[100%] fixed top-20 md:top-24 left-0 bottom-0 bg-gray dark:bg-dark z-40 transition-all duration-[0.5s] ease-in-out ${
      isOpen
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-full pointer-events-none"
    } overflow-y-auto shadow-lg shadow-gray/80 dark:shadow-light/20`}
    id="navbar-mobile"
  >
    <div className="min-h-[400px] flex flex-col justify-between w-full h-full bg-gray/50 pt-2">
      <div></div>
      <ul className="w-full max-w-screen-xl mx-auto flex flex-col divide-y divide-light/10 px-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink link={link} onNavClick={onNavClick} isMobile={true} />
          </li>
        ))}
      </ul>
      <div className="w-full max-w-screen-xl mx-auto flex flex-col mb-4 px-4">
        <MobileFooter onNavClick={onNavClick} />
        <div className="flex items-center justify-between">
          <div>
            <small className="text-light/80 font-medium">CFM Pulse</small>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  </div>
);
