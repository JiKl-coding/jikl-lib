type GtagFn = (...args: [string, string, Record<string, unknown>?]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export {};
