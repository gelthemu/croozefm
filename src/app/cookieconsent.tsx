"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookie_consent");
    if (!cookieConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      className="fixed bottom-1.5 right-1.5 bg-gray border border-light/20 rounded-sm text-white p-4 z-50 flex flex-row justify-between items-start max-w-xs"
      role="dialog"
      aria-labelledby="cookie-consent-title"
    >
      <div className="py-1 pr-2" aria-hidden="true">
        <Cookie className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm mb-2" id="cookie-consent-title">
          <span className="block">We use cookies to feed the beast.</span>
          <span className="block">You should know that...</span>
        </p>
        <div className="flex">
          <button
            onClick={handleAccept}
            className="bg-red/50 text-light text-sm font-medium py-1 px-3 rounded hover:bg-red/80"
            aria-label="Accept cookies"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
