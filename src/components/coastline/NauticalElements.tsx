/**
 * SVG nautical elements: sailboat, lighthouse, buoy, seagull, star.
 * Defined as <symbol> in <defs> and placed with <use>.
 */

export function NauticalDefs() {
  return (
    <defs>
      {/* ── Sailboat ── */}
      <symbol id="sailboat" viewBox="0 0 40 50" overflow="visible">
        {/* Hull */}
        <path
          d="M5 38 Q8 44 20 44 Q32 44 35 38 L33 35 H7 Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* Mast */}
        <line x1="20" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        {/* Main sail */}
        <path
          d="M20 12 L20 35 L8 35 Z"
          fill="currentColor"
          opacity="0.35"
        />
        {/* Jib */}
        <path
          d="M20 14 L20 30 L28 30 Z"
          fill="currentColor"
          opacity="0.25"
        />
      </symbol>

      {/* ── Small boat (rowboat) ── */}
      <symbol id="rowboat" viewBox="0 0 30 20" overflow="visible">
        <path
          d="M3 14 Q5 18 15 18 Q25 18 27 14 L25 12 H5 Z"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Oars */}
        <line x1="10" y1="8" x2="4" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="8" x2="26" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </symbol>

      {/* ── Coast lighthouse ── */}
      <symbol id="coast-lighthouse" viewBox="0 0 30 60" overflow="visible">
        {/* Tower */}
        <path
          d="M11 55 L13 20 H17 L19 55 Z"
          fill="currentColor"
          opacity="0.85"
        />
        {/* Lamp room */}
        <rect x="12" y="16" width="6" height="5" rx="1" fill="currentColor" opacity="0.95" />
        {/* Cap */}
        <path d="M12 16 L15 10 L18 16" fill="currentColor" opacity="0.75" />
        {/* Spire */}
        <line x1="15" y1="10" x2="15" y2="6" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {/* Blue stripes */}
        <rect x="12.8" y="26" width="4.4" height="5" fill="#4A8C86" opacity="0.7" />
        <rect x="12.2" y="36" width="5.6" height="5" fill="#4A8C86" opacity="0.7" />
        <rect x="11.6" y="46" width="6.8" height="5" fill="#4A8C86" opacity="0.7" />
        {/* Base */}
        <rect x="9" y="53" width="12" height="3" rx="1" fill="currentColor" opacity="0.7" />
        {/* Light glow */}
        <circle cx="15" cy="18.5" r="1.5" fill="currentColor" opacity="1" />
      </symbol>

      {/* ── Beam (separate so we can animate rotation) ── */}
      <symbol id="lighthouse-beam" viewBox="0 0 200 10" overflow="visible">
        <polygon
          points="0,3 200,0 200,10 0,7"
          fill="currentColor"
          opacity="0.25"
        />
      </symbol>

      {/* ── Buoy ── */}
      <symbol id="buoy" viewBox="0 0 12 20" overflow="visible">
        <circle cx="6" cy="10" r="4" fill="currentColor" opacity="0.6" />
        <line x1="6" y1="6" x2="6" y2="2" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="6" cy="1.5" r="1.5" fill="currentColor" opacity="0.85" />
      </symbol>

      {/* ── Seagull ── */}
      <symbol id="seagull" viewBox="0 0 24 10" overflow="visible">
        <path
          d="M0 5 Q4 0 8 3 Q10 4 12 4 Q14 4 16 3 Q20 0 24 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </symbol>

      {/* ── Anchor ── */}
      <symbol id="anchor" viewBox="0 0 20 24" overflow="visible">
        <circle cx="10" cy="4" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <line x1="10" y1="6.5" x2="10" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <path d="M4 17 Q10 24 16 17" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <line x1="6" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      </symbol>

      {/* ── Compass rose ── */}
      <symbol id="compass" viewBox="0 0 30 30" overflow="visible">
        <circle cx="15" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.04" />
        {/* Cardinal points */}
        <line x1="15" y1="3" x2="15" y2="27" stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
        <line x1="3" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="0.4" opacity="0.05" />
        {/* Diagonal */}
        <line x1="6" y1="6" x2="24" y2="24" stroke="currentColor" strokeWidth="0.3" opacity="0.03" />
        <line x1="24" y1="6" x2="6" y2="24" stroke="currentColor" strokeWidth="0.3" opacity="0.03" />
      </symbol>

      {/* ── Island with palm tree ── */}
      <symbol id="island" viewBox="0 0 80 60" overflow="visible">
        {/* Sand mound */}
        <ellipse cx="40" cy="52" rx="38" ry="10" fill="currentColor" opacity="0.12" />
        <ellipse cx="40" cy="52" rx="30" ry="7" fill="currentColor" opacity="0.08" />
        {/* Palm trunk — curved */}
        <path
          d="M38 50 Q36 35 32 22 Q30 16 28 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Palm fronds */}
        <path d="M28 12 Q18 8 8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
        <path d="M28 12 Q22 4 12 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
        <path d="M28 12 Q30 4 38 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
        <path d="M28 12 Q34 6 44 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
        <path d="M28 12 Q36 10 46 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.15" />
        {/* Coconuts */}
        <circle cx="29" cy="14" r="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="27" cy="13" r="1.2" fill="currentColor" opacity="0.12" />
        {/* Water reflection */}
        <ellipse cx="40" cy="58" rx="25" ry="3" fill="currentColor" opacity="0.03" />
      </symbol>

      {/* ── Double palm island (larger) ── */}
      <symbol id="island-double" viewBox="0 0 120 70" overflow="visible">
        {/* Larger sand mound */}
        <ellipse cx="60" cy="60" rx="55" ry="12" fill="currentColor" opacity="0.12" />
        <ellipse cx="60" cy="60" rx="42" ry="8" fill="currentColor" opacity="0.07" />
        {/* Left palm trunk */}
        <path
          d="M45 58 Q42 40 36 26 Q34 20 30 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.22"
        />
        {/* Left palm fronds */}
        <path d="M30 14 Q20 10 10 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
        <path d="M30 14 Q24 4 14 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.16" />
        <path d="M30 14 Q34 6 42 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
        <path d="M30 14 Q38 10 46 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.14" />
        {/* Right palm trunk — taller, leaning right */}
        <path
          d="M70 58 Q72 38 78 22 Q80 16 84 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.2"
        />
        {/* Right palm fronds */}
        <path d="M84 10 Q92 6 102 10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.16" />
        <path d="M84 10 Q90 2 100 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.14" />
        <path d="M84 10 Q78 4 72 2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.16" />
        <path d="M84 10 Q76 8 68 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
        {/* Coconuts */}
        <circle cx="31" cy="16" r="1.5" fill="currentColor" opacity="0.13" />
        <circle cx="83" cy="12" r="1.3" fill="currentColor" opacity="0.11" />
        {/* Small rock */}
        <ellipse cx="85" cy="58" rx="6" ry="4" fill="currentColor" opacity="0.06" />
        {/* Water reflection */}
        <ellipse cx="60" cy="68" rx="35" ry="3" fill="currentColor" opacity="0.03" />
      </symbol>

      {/* ── Gradients — white/mint/ice for light scene ── */}
      <linearGradient id="water-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#D6E9E4" stopOpacity="0.05" />
      </linearGradient>

      <linearGradient id="coast-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A8CCCA" stopOpacity="1" />
        <stop offset="40%" stopColor="#4A8C86" stopOpacity="1" />
        <stop offset="100%" stopColor="#4A8C86" stopOpacity="0.95" />
      </linearGradient>

      <linearGradient id="hill-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D6E9E4" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#EEF7FF" stopOpacity="0.03" />
      </linearGradient>

      <linearGradient id="water-surface" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#D6E9E4" stopOpacity="0.03" />
      </linearGradient>

      <radialGradient id="beam-glow" cx="0" cy="0.5" r="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
