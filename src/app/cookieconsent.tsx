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

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-2 right-2 bg-gray border border-light/20 rounded-sm text-white p-4 z-50 flex flex-row justify-between items-start max-w-xs">
      <div className="py-1 pr-2">
        <Cookie className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm mb-2">
          Proceed to accept cookies? They&apos;re not the chewy kind, but
          they&apos;ll stick around longer than your last diet.
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="bg-red/50 text-light text-sm font-medium py-1 px-3 rounded hover:bg-red/80"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="border-2 border-red/50 text-red text-sm font-medium py-1 px-3 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
