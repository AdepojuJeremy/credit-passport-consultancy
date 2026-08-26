type BrandLockupProps = {
  showDescriptor?: boolean;
  inverse?: boolean;
};

export function BrandLockup({ showDescriptor = true, inverse = false }: BrandLockupProps) {
  const textColor = inverse ? "text-white" : "text-[color:var(--foreground)]";

  return (
    <span className={`inline-flex min-h-11 items-center gap-3 ${textColor}`}>
      <svg aria-hidden="true" viewBox="0 0 140 140" className="h-7 w-7 shrink-0">
        <circle cx="70" cy="70" r="50" fill="#0B3B8A" />
        <circle cx="70" cy="70" r="25" fill="#FF7A59" />
      </svg>
      <span className="flex items-baseline gap-2">
        <span className="font-semibold tracking-[-0.035em]">CreditPassport</span>
        {showDescriptor ? (
          <span className={`kicker ${inverse ? "text-white/55" : "text-[color:var(--muted)]"}`}>Consulting</span>
        ) : null}
      </span>
    </span>
  );
}
