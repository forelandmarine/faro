"use client";

interface LighthouseProps {
  className?: string;
  size?: number;
  color?: string;
  beam?: boolean;
}

export default function Lighthouse({
  className = "",
  size = 48,
  color = "#0070F3",
  beam = false,
}: LighthouseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Light beam */}
      {beam && (
        <g opacity="0.15">
          <path
            d="M32 16L8 2L32 8Z"
            fill={color}
          />
          <path
            d="M32 16L56 2L32 8Z"
            fill={color}
          />
          <path
            d="M32 14L4 6L32 10Z"
            fill={color}
            opacity="0.5"
          />
          <path
            d="M32 14L60 6L32 10Z"
            fill={color}
            opacity="0.5"
          />
        </g>
      )}

      {/* Lamp housing */}
      <rect x="26" y="14" width="12" height="8" rx="1" fill={color} />
      <rect x="28" y="15" width="8" height="6" rx="0.5" fill="#0A0A0A" opacity="0.4" />

      {/* Light glow */}
      <circle cx="32" cy="18" r="2" fill={color} opacity="0.9" />

      {/* Cap / dome */}
      <path
        d="M27 14L32 8L37 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="32" y1="8" x2="32" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Gallery rail */}
      <line x1="24" y1="14" x2="40" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Tower body - tapered */}
      <path
        d="M26 22L24 54H40L38 22Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Horizontal stripes */}
      <line x1="25.4" y1="30" x2="38.6" y2="30" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="24.8" y1="38" x2="39.2" y2="38" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="24.4" y1="46" x2="39.6" y2="46" stroke={color} strokeWidth="1" opacity="0.5" />

      {/* Window */}
      <rect x="30" y="32" width="4" height="5" rx="2" fill={color} opacity="0.3" />
      <rect x="30" y="40" width="4" height="5" rx="2" fill={color} opacity="0.3" />

      {/* Base */}
      <line x1="20" y1="54" x2="44" y2="54" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="58" x2="42" y2="58" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
