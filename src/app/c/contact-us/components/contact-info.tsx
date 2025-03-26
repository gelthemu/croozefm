import React from "react";
import { FaPhone, FaClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function ContactInfo() {
  const contactDetails = [
    {
      title: "Studio Lines",
      items: [
        { icon: "phone", text: "+256 752 912 912" },
        { icon: "phone", text: "+256 780 912 910" },
      ],
    },
    {
      title: "Administration",
      items: [
        { icon: "phone", text: "+256 706 912912" },
        { icon: "email", text: "info@croozefm.com" },
      ],
    },

    {
      title: "Operation Hours",
      items: [
        { icon: "time", text: "24/7 Broadcasting" },
        { icon: "time", text: "Office: Mon-Fri, 8am-5pm" },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <FaPhone size={16} />;
      case "email":
        return <MdEmail size={18} />;
      case "time":
        return <FaClock size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto p-2 opacity-[0.85]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
        {contactDetails.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              {section.title}
            </h3>
            <ul className="space-y-2 pl-2 text-sm">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">{getIcon(item.icon)}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
