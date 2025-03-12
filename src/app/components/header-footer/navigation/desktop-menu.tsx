"use client";

import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";

export const DesktopMenu = () => (
  <div className="hidden md:h-[80px] md:flex md:w-auto md:order-1">
    <ul className="h-full flex flex-row space-x-2 rtl:space-x-reverse p-0 font-medium items-center">
      {navLinks.map((link) => (
        <li key={link.name} className="h-full">
          <NavLink link={link} />
        </li>
      ))}
    </ul>
  </div>
);
