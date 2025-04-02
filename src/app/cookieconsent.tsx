"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
        <h3 className="font-medium text-lg text-red mb-2 _912cfm">
          Guess what? Cookies!
        </h3>
        <p className="my-2.5" id="cookie-consent-title">
          By continuing to use this site, you&apos;re agreeing to let us use
          cookies to keep this beast alive and thriving indefinitely. You should
          know that...
        </p>
        <button
          onClick={handleAccept}
          className="bg-red text-light font-medium py-1 px-3 rounded"
          aria-label="Accept cookies"
        >
          GOT IT
        </button>
      </div>
    </FixedDiv>
  );
}
