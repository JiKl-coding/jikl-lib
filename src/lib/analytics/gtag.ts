// lib/analytics/gtag.ts

type GtagFunction = (
  command: "config" | "set" | "js" | "event",
  targetIdOrParams: string | Record<string, unknown>,
  config?: Record<string, unknown>
) => void;

/**
 * Inicializuje Google Analytics pomocí gtag.js
 * @param trackingId - měřicí ID (např. "G-XXXXXXXXXX")
 * @param options - možnost zapnout konzolové warningy
 */
export function initGtag(
  trackingId: string,
  options: { verbose?: boolean } = {}
) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __gtag_initialized__?: boolean;
  };

  if (!trackingId) {
    if (options.verbose) {
      console.warn(
        "%c[GA] Google Analytics není aktivní – chybí GA ID",
        "color: orange; font-weight: bold;"
      );
    }
    return;
  }

  if (w.__gtag_initialized__) return;
  w.__gtag_initialized__ = true;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.async = true;
  document.head.appendChild(script);

  w.dataLayer = w.dataLayer || [];

  w.gtag = (...args) => {
    w.dataLayer!.push(args);
  };

  w.gtag("js", new Date().toString());
  w.gtag("config", trackingId);
}
