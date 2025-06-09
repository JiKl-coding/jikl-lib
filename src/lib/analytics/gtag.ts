type GtagFunction = (
  command: "config" | "set" | "js" | "event" | "consent",
  targetIdOrParams: string | Record<string, unknown>,
  config?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __gtag_initialized__?: boolean;
  }
}

export function initGtagLoader(trackingId: string) {
  if (typeof window === "undefined") return;

  const w = window;

  if (!w.gtag) {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    w.dataLayer = w.dataLayer || [];
    w.gtag = (...args) => {
      w.dataLayer!.push(args);
    };
  }

  w.gtag("js", new Date().toString());

  w.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });
}

export function enableAnalytics(trackingId: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
  });

  window.gtag?.("config", trackingId);
}
