"use client";

import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";
import { MobileFooter } from "./mobile-footer";
import { Logo } from "./logo";
import { ThemeSwitcher } from "../../tiny/theme-toggle";

interface MobileMenuProps {
  isOpen: boolean;
  onNavClick: () => void;
}

export const MobileMenu = ({ isOpen, onNavClick }: MobileMenuProps) => (
  <div
    className={`md:hidden w-[100%] fixed inset-0 bg-gray dark:bg-dark z-40 transition-all duration-[0.5s] ease-in-out ${
      isOpen
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-full pointer-events-none"
    } shadow-lg shadow-gray/80 dark:shadow-light/20`}
    id="navbar-mobile"
  >
    <div className="flex flex-col justify-between w-full h-full bg-gray/50">
      <div className="py-5 px-6 sm:px-12 md:px-16 bg-red border-b border-dark/50 dark:border-light/50">
        <div className="opacity-0">
          {" "}
          <Logo />
        </div>
      </div>
      <ul className="flex flex-col divide-y divide-light/20 px-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink link={link} onNavClick={onNavClick} isMobile={true} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col space-y-6 px-4 pb-8">
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
