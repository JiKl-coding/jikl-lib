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
  if (typeof window === "undefined" || window.__gtag_initialized__) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.async = true;
  document.head.appendChild(script);

  window.__gtag_initialized__ = true;
}


export function enableAnalytics(trackingId: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  // 1. Povolit consent
  window.gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
  });

  // 2. Developer mód pro jistotu viditelnosti v debug režimech
window.gtag("set", {
  "developer_id.dZTNiMT": true,
});

  // 3. Aktivuj config (včetně automatického page_view)
  window.gtag("config", trackingId, {
    debug_mode: true,
    send_page_view: true,
    traffic_type: "external",
  });
}
