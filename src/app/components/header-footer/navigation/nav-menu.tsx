"use client";

import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";
import { MobileFooter } from "./mobile-footer";

interface NavMenuProps {
  isOpen: boolean;
  onNavClick: () => void;
}

export const NavMenu = ({ isOpen, onNavClick }: NavMenuProps) => (
  <div
    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
      isOpen
        ? "translate-x-0 opacity-100"
        : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
    } absolute top-full left-0 md:static backdrop-blur-sm transition-all duration-300`}
    id="navbar-absolute"
  >
    <ul className="bg-dark/95 md:bg-transparent w-[80%] min-h-screen md:min-h-0 md:w-full md:max-w-none md:mx-0 flex flex-col divide-y divide-light/30 md:divide-y-0 md:space-y-0 md:flex-row md:space-x-3 lg:space-x-6 rtl:space-x-reverse p-4 md:p-0 font-medium">
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink link={link} onNavClick={onNavClick} />
        </li>
      ))}
      <li>
        <MobileFooter onNavClick={onNavClick} />
      </li>
    </ul>
  </div>
);
