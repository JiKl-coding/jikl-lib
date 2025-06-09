import { useCookieConsentClient } from "./useCookieConsentClient";

const COOKIE_KEY = "cookie_consent";

// 💡 Tady definuješ přesný návratový typ
type CookieConsentHook = {
  isVisible: boolean;
  accept: () => void;
  deny: () => void;
  hasConsent: boolean;
};

export function useCookieConsent(gtagId: string): CookieConsentHook {
  const hasConsent =
    typeof window !== "undefined" &&
    localStorage.getItem(COOKIE_KEY) === "true";

  if (typeof window === "undefined") {
    return {
      isVisible: false,
      accept: () => {},
      deny: () => {},
      hasConsent,
    };
  }

  return {
    ...useCookieConsentClient(gtagId),
    hasConsent,
  };
}
