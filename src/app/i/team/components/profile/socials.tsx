import React from "react";
import Link from "next/link";
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
        <Link
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X/Twitter"
          className="p-0.5 hover:text-[#000] transition-colors"
        >
          <FaXTwitter size={16} />
        </Link>
      )}

      {links.fb && (
        <Link
          href={links.fb}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-0.5 hover:text-[#3b5998] transition-colors"
        >
          <FaFacebookF size={15} />
        </Link>
      )}

      {links.insta && (
        <Link
          href={links.insta}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-0.5 hover:text-[#dd2a7b] transition-colors"
        >
          <FaSquareInstagram size={16} />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
