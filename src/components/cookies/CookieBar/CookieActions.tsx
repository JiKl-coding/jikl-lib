interface Props {
  onAccept: () => void;
  onDeny: () => void;
  wrapperClassName?: string;
  acceptLabel?: string;
  denyLabel?: string;
  acceptButtonClassName?: string;
  denyButtonClassName?: string;
}

export function CookieActions({
  onAccept,
  onDeny,
  wrapperClassName,
  acceptLabel,
  denyLabel,
  acceptButtonClassName,
  denyButtonClassName,
}: Props) {
  return (
    <div className={`flex justify-center items-center flex-wrap ${wrapperClassName ?? ""}`}>
      <button
        onClick={onAccept}
        className={`cursor-pointer ${acceptButtonClassName ?? ""}`}
      >
        {acceptLabel}
      </button>
      <button
        onClick={onDeny}
        className={`cursor-pointer ${denyButtonClassName ?? ""}`}
      >
        {denyLabel}
      </button>
    </div>
  );
}
