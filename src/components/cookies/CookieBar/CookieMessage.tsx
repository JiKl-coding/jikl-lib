interface CookieMessageProps {
  className?: string;
  messageText?: string;
}

export function CookieMessage({
  className,
  messageText = "Používáme cookies pro analýzu návštěvnosti (Google Analytics).",
}: CookieMessageProps) {
  return <p className={`text-sm ${className ?? ""}`}>{messageText}</p>;
}
