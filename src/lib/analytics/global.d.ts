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

export {};
