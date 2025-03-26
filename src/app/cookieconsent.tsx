"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Cookie } from "lucide-react";
import FixedDiv from "./components/providers/divs/fixed-element";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookie_consent");
    if (!cookieConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 120 });
    setShowConsent(false);
  };

  useEffect(() => {
    if (showConsent) {
      const handleUserInteraction = () => {
        handleAccept();
      };

      window.addEventListener("click", handleUserInteraction);

      return () => {
        window.removeEventListener("click", handleUserInteraction);
      };
    }
  }, [showConsent]);

  if (!showConsent) return null;

  return (
    <FixedDiv>
      <div className="p-2 text-sm">
        <Cookie className="w-6 h-6" />
        <p className="my-2.5" id="cookie-consent-title">
          By continuing to use this site, you’re agreeing to let us use cookies
          to keep this beast alive and thriving indefinitely.
        </p>
        <p className="my-2.5" id="cookie-consent-title">
          If you’d rather starve it, you can adjust your settings, but be
          warned—the beast might not be too happy about that! You should know
          that...
        </p>
        <button
          onClick={handleAccept}
          className="bg-red text-light font-medium py-1 px-3 rounded"
          aria-label="Accept cookies"
        >
          Okay
        </button>
      </div>
    </FixedDiv>
  );
}
