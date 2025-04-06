"use client";

import React from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF size={15} />,
      url: "https://www.facebook.com/cfmpulse",
      label: "CFM Pulse Facebook Page",
      color: "bg-[#1877F2]",
    },
    {
      icon: <FaXTwitter size={15} />,
      url: "https://x.com/cfmpulse",
      label: "CFM Pulse X/Twitter Handle",
      color: "bg-[#000000]",
    },
    {
      icon: <FaInstagram size={15} />,
      url: "https://www.instagram.com/cfmpulse",
      label: "CFM Pulse Instagram Page",
      color: "bg-[#d62976]",
    },
    {
      icon: <FaWhatsapp size={15} />,
      url: "https://whatsapp.com/channel/0029Vb8mMX78aKvKCmxMsj1y",
      label: "CFM Pulse WhatsApp Channel",
      color: "bg-[#25D366]",
    },
  ];

  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="relative flex items-center space-x-1.5 text-light/90">
        {socialLinks.map((social, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={social.label}
            onClick={() => handleClick(social.url)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(social.url);
              }
            }}
            className={`flex justify-center items-center rounded-full border border-light/60 cursor-pointer focus:outline-none hover:opacity-[0.9] transition-opacity duration-300`}
          >
            <div className="p-2">{social.icon}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;
