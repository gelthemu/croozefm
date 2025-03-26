"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav-config";

interface NavLinkProps {
  link: { id: string; name: string; href: string };
  onNavClick?: () => void;
  isMobile?: boolean;
}

export const NavLink = ({
  link,
  onNavClick,
  isMobile = false,
}: NavLinkProps) => {
  const pathname = usePathname();

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

  return (
    <Link
      href={link.href}
      onClick={onNavClick}
      className={`block ${
        isMobile
          ? "p-4"
          : "h-full flex items-center justify-center py-0 px-1 pt-2 text-md"
      } ${
        isLinkActive(link.href)
          ? `font-extrabold text-light ${
              isMobile
                ? ""
                : "after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[3px]"
            }`
          : "font-semibold text-light/60 hover:text-light/80"
      } relative text-left transition-all duration-300`}
      aria-current={isLinkActive(link.href) ? "page" : undefined}
    >
      {link.name}
    </Link>
  );
};
