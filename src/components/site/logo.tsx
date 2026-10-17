/**
 * The "IA" monogram: an I bar and an open A drawn with the signal gradient.
 * Plain SVG with no hooks, so it renders in client components and in
 * `next/og` image routes alike. Keep in sync with `src/app/icon.svg`.
 */
export const SIGNAL = {
  cyan: "#22d3ee",
  indigo: "#6366f1",
  violet: "#a855f7",
  background: "#05060b",
  surface: "#0b0d16",
  foreground: "#e6e8f2",
  muted: "#8e94ab",
} as const;

export function LogoMark({
  size = 32,
  tile = false,
  gradientId = "ia-signal",
  className,
}: {
  size?: number;
  /** Draw the dark rounded tile behind the monogram (icons, OG cards). */
  tile?: boolean;
  /** Must be unique per page when several marks render together. */
  gradientId?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="6"
          y1="8"
          x2="26"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={SIGNAL.cyan} />
          <stop offset="0.5" stopColor={SIGNAL.indigo} />
          <stop offset="1" stopColor={SIGNAL.violet} />
        </linearGradient>
      </defs>
      {tile ? (
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="8"
          fill={SIGNAL.background}
          stroke="#1b2033"
        />
      ) : null}
      <g
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 10.6V21.4" strokeWidth="3.2" />
        <path d="M12.5 23L18 9L23.5 23" strokeWidth="3.2" />
        <path d="M15.2 18H20.8" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
