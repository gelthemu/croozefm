"use client";

import React from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF size={15} />,
      url: "https://www.facebook.com/91.2croozefm",
      label: "Like our Facebook Page",
    },
    {
      icon: <FaXTwitter size={15} />,
      url: "https://www.x.com/912CroozeFM",
      label: "Follow us on X/Twitter",
    },
    {
      icon: <FaInstagram size={15} />,
      url: "https://www.instagram.com/91.2croozefm/",
      label: "Follow us on Instagram",
    },
    {
      icon: <FaWhatsapp size={15} />,
      url: "https://whatsapp.com/channel/0029Vb8mMX78aKvKCmxMsj1y",
      label: "Join this WhatsApp Channel",
    },
    {
      icon: <FaYoutube size={15} />,
      url: "https://www.youtube.com/@croozetv-madetoentertain8796/streams",
      label: "Subscribe to us on YouTube",
    },
  ];

  return (
    <>
      <div className="text-light/80 flex flex-col">
        <p className="text-sm mb-2.5">Follow us for a cookie!</p>
        <div className="relative flex items-center space-x-1 text-khaki/80">
          {socialLinks.map((social, index) => (
            <div key={index} className="flex justify-center items-center">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none rounded-md bg-light/10 hover:bg-red/10 transition-colors duration-300"
                aria-label={social.label}
              >
                <div className="p-2 cursor-pointer text-light/80 hover:text-light/100 transition-colors duration-300">
                  {social.icon}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialLinks;
