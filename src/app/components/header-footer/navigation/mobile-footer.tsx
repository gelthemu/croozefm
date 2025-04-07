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
    <div className="flex flex-row space-x-2 text-sm text-light/70 mt-4 py-4 border-t border-light/10">
      <span>Contact us: </span>
      <span>
        <strong className="font-medium">cfm@geltaverse.com</strong>
      </span>
    </div>
  </div>
);
