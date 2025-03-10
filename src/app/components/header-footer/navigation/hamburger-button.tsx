"use client";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => (
  <div
    className="relative p-4 focus:outline-none inline-flex items-center justify-center text-light md:hidden cursor-pointer z-[100]"
    aria-controls="navbar-absolute"
    aria-expanded={isOpen}
    role="button"
    tabIndex={0}
    onClick={onClick}
  >
    <span className="sr-only">{isOpen ? "Close" : "Open"} menu</span>
    <div className="flex flex-col justify-center items-center w-full h-full">
      <span
        className={`block bg-light h-0.5 w-5 absolute transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`block bg-light h-0.5 w-5 absolute transition-all duration-200 ease-in-out ${
          isOpen ? "opacity-[0]" : "opacity-[1]"
        }`}
      />
      <span
        className={`block bg-light h-0.5 w-5 absolute transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45" : "translate-y-2"
        }`}
      />
    </div>
  </div>
);
