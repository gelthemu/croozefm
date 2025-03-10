import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

export default function MapSection() {
  return (
    <div className="w-full h-[460px] md:h-full relative rounded-md border border-gray/50 dark:border-light/50 overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.595168648037!2d30.649933873296817!3d-0.6059868352574898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d91b2ebfb77155%3A0x60c66ca5a7e436ea!2s91.2%20Crooze%20FM%20-%20Mbarara!5e0!3m2!1sen!2sug!4v1741553307241!5m2!1sen!2sug"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="91.2 Crooze Fm Location"
      ></iframe>
      <div className="p-4 text-sm text-gray bg-light w-[70%] absolute bottom-6 left-3 rounded-sm shadow-lg shadow-gray/60">
        <div className="flex space-x-2 font-medium">
          <div className="mt-1">
            <FaMapLocationDot size={20} />
          </div>
          <div>
            <p className="font-semibold">Crooze FM Studios</p>
            <p>P.O Box 22764,</p>
            <p>Muti Lane - Ntare Rd, Mbarara</p>
          </div>
        </div>
      </div>
    </div>
  );
}
