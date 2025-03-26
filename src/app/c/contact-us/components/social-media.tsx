"use client";

import React from "react";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import { StreamBtn } from "@/app/components/stream/stream-btn";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

export default function SocialMedia() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/91.2croozefm",
      icon: <FaFacebookF size={24} />,
      color: "bg-[#1877F2]",
    },
    {
      name: "X/Twitter",
      url: "https://www.x.com/912CroozeFM",
      icon: <FaXTwitter size={24} />,
      color: "bg-[#000000]",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/91.2croozefm/",
      icon: <FaInstagram size={24} />,
      color: "bg-[#d62976]",
    },
    {
      name: "WhatsApp",
      url: "https://whatsapp.com/channel/0029Vb8mMX78aKvKCmxMsj1y",
      icon: <FaWhatsapp size={24} />,
      color: "bg-[#25D366]",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@croozetv-madetoentertain8796/streams",
      icon: <FaYoutube size={28} />,
      color: "bg-[#B71C1C]",
    },
  ];

  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-4">
      <H2Title title="Follow Us Today!" />
      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {socialLinks.map((social) => (
          <div
            key={social.name}
            onClick={() => handleClick(social.url)}
            className={`flex flex-col items-center justify-center p-4 rounded-md text-light ${social.color} cursor-pointer hover:opacity-[0.75] transition-opacity duration-300`}
            role="button"
            tabIndex={0}
            aria-label={`Follow us on ${social.name}!`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(social.url);
              }
            }}
          >
            {social.icon}
            <span className="mt-2 text-sm font-medium">{social.name}</span>
          </div>
        ))}
      </div>
      <div className="w-fit">
        <StreamBtn />
      </div>
    </div>
  );
}
