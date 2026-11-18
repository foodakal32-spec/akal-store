/** Small rectangular flags (3:2) for the language switch. */

export function FlagFR({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}

export function FlagMA({ className = "" }: { className?: string }) {
  // Red field with the green pentagram (outline), centered.
  return (
    <svg viewBox="0 0 900 600" className={className} aria-hidden="true">
      <rect width="900" height="600" fill="#C1272D" />
      <path
        d="M450 150 L538.17 421.35 L307.34 253.65 L592.66 253.65 L361.83 421.35 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="24"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
