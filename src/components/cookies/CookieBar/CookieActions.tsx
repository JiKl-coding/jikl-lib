interface Props {
  onAccept: () => void;
  className?: string;
  label?: string;
}

export function CookieActions({ onAccept, className, label = "Přijmout" }: Props) {
  return (
    <button
      onClick={onAccept}
      className={`ml-4 px-4 py-2 rounded text-sm hover:bg-gray-800 cursor-pointer ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
