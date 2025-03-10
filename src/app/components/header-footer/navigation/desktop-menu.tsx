"use client";

import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";

export const DesktopMenu = () => (
  <div className="hidden md:flex md:w-auto md:order-1">
    <ul className="flex flex-row space-x-3 lg:space-x-6 rtl:space-x-reverse p-0 font-medium items-center">
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink link={link} />
        </li>
      ))}
    </ul>
  </div>
);
