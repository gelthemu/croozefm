// components/presenters/SocialLinks.tsx
import React from "react";
import { SocialLinks as SocialLinksType } from "@/types/profile";
import { FaXTwitter, FaFacebookF, FaSquareInstagram } from "react-icons/fa6";

interface SocialLinksProps {
  links: SocialLinksType;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, className = "" }) => {
  return (
    <div className={`flex space-x-1 opacity-[0.75] ${className}`}>
      {links.x && (
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X/Twitter"
          className="p-0.5 hover:text-[#000] transition-colors"
        >
          <FaXTwitter size={16} />
        </a>
      )}

      {links.fb && (
        <a
          href={links.fb}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-0.5 hover:text-[#3b5998] transition-colors"
        >
          <FaFacebookF size={15} />
        </a>
      )}

      {links.insta && (
        <a
          href={links.insta}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-0.5 hover:text-[#dd2a7b] transition-colors"
        >
          <FaSquareInstagram size={16} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
