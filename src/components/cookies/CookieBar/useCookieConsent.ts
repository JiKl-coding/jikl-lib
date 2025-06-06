import { useEffect, useState } from "react";
import { initGtag } from "../../../lib/analytics/gtag"; 

const COOKIE_KEY = "cookie_consent";

export function useCookieConsent(gtagId: string) {
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
  };

  return { isVisible, accept };
}
