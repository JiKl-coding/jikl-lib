"use client";
import { useCookieConsent } from "./useCookieConsent";
import { CookieMessage } from "./CookieMessage";
import { CookieActions } from "./CookieActions";

interface CookieBarProps {
  gtagId: string; 
  className?: string;
  messageClassName?: string;
  messageText?: string;
  buttonClassName?: string;
  buttonLabel?: string;
}

export function CookieBar({
  className,
  messageClassName,
  messageText = "Používáme cookies pro analýzu návštěvnosti (Google Analytics).",
  buttonClassName,
  buttonLabel = "Přijmout",
  gtagId = "default-gtag-id", // Default value for gtagId
}: CookieBarProps) {

  if (!gtagId || gtagId === "default-gtag-id") {
    console.warn("⚠️ [CookieBar] gtagId nebyl předán, Google Analytics nebude inicializován.");
  }

  const { isVisible, accept } = useCookieConsent(gtagId);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 shadow-md p-4 z-50 flex items-center justify-between ${className ?? ""}`}
    >
      <CookieMessage className={messageClassName} messageText={messageText}/>
      <CookieActions onAccept={accept} className={buttonClassName} label={buttonLabel} />
    </div>
  );
}
