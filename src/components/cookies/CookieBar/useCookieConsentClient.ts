"use client";

import { useEffect, useState } from "react";
import { initGtag } from "../../../lib/analytics/gtag";

const COOKIE_KEY = "cookie_consent";

export function useCookieConsentClient(gtagId: string) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent === "true") {
      initGtag(gtagId);
    } else {
      setIsVisible(true);
    }
  }, [gtagId]);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setIsVisible(false);

    initGtag(gtagId);
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  };

  const deny = () => {
    localStorage.setItem(COOKIE_KEY, "false");
    setIsVisible(false);

    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
    });
  };

  return { isVisible, accept, deny };
}
