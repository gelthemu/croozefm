"use client";

import SocialLinks from "../../tiny/socials";

interface MobileFooterProps {
  onNavClick: () => void;
}

export const MobileFooter = ({ onNavClick }: MobileFooterProps) => (
  <div className="flex flex-col pt-6 md:hidden">
    <span onClick={onNavClick}>
      <SocialLinks />
    </span>
    <div className="flex flex-col text-sm text-light mt-4 py-2 border-y border-light/10">
      <span>Call Us: </span>
      <span>
        <strong className="font-medium">0752-912912{" • "}0780-912910</strong>
      </span>
    </div>
  </div>
);
