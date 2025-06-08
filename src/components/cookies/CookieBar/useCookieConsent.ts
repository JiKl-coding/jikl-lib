import { useEffect, useState } from "react";
import { initGtag } from "../../../lib/analytics/gtag";

const COOKIE_KEY = "cookie_consent";

export function useCookieConsent(gtagId: string) {
  const [isVisible, setIsVisible] = useState(false);

  const hasConsent =
    typeof window !== "undefined" && localStorage.getItem(COOKIE_KEY) === "true";

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

    // až po inicializaci gtag
    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  };

  return { isVisible, accept, hasConsent };
}
