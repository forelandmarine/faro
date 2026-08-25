/**
 * Measured diagrams for the study documents.
 *
 * Every diagram is drawn in the mark's own viewBox coordinate system, with the
 * source SVG placed on the artboard it was drawn on. The ink boxes are measured
 * from the path data, so the dimension lines describe the real artwork rather
 * than a redrawing of it.
 */

import type {
  AnatomyPart,
  GridBreakpoint,
  MarkGeometry,
  Measure,
  Misuse,
  SpacingStep,
} from "@/content/studies/types";

function parseViewBox(vb: string) {
  const [x, y, w, h] = vb.split(/[\s,]+/).map(Number);
  return { x, y, w, h };
}

/** Two decimal places, trailing zeros trimmed. */
function n(value: number) {
  return String(Math.round(value * 100) / 100);
}

/* ── Construction sheet ─────────────────────────────────────────────── */

export function ConstructionSheet({
  geometry,
  module,
  caption,
  notes,
}: {
  geometry: MarkGeometry;
  module?: { value: number; label: string };
  caption: string;
  notes: Measure[];
}) {
  const vb = parseViewBox(geometry.viewBox);
  const { ink } = geometry;
  const pad = Math.max(vb.w, vb.h) * 0.26;
  const outer = { x: vb.x - pad, y: vb.y - pad, w: vb.w + pad * 2, h: vb.h + pad * 2 };
  const s = outer.w;
  const stroke = s / 600;
  const font = s / 42;
  const tick = pad * 0.12;

  // Dimension line offsets, outside the ink box.
  const dimY = ink.y + ink.h + pad * 0.5;
  const dimX = ink.x - pad * 0.5;

  const moduleLines: number[] = [];
  if (module) {
    for (let v = ink.x; v <= ink.x + ink.w + 0.001; v += module.value) {
      moduleLines.push(v);
    }
  }

  return (
    <figure className="mt-8">
      <div
        className="rounded-xl border border-foreground/10 overflow-hidden"
        style={{ backgroundColor: geometry.ground }}
      >
        <svg
          viewBox={`${outer.x} ${outer.y} ${outer.w} ${outer.h}`}
          className="w-full h-auto block"
          role="img"
          aria-label={caption}
        >
          {/* Module rules, read across the ink box */}
          {module &&
            moduleLines.map((x, i) => (
              <line
                key={`m${i}`}
                x1={x}
                y1={ink.y - pad * 0.18}
                x2={x}
                y2={ink.y + ink.h + pad * 0.18}
                stroke={geometry.rule}
                strokeWidth={stroke * 0.7}
                strokeOpacity={0.28}
              />
            ))}
          {module &&
            [0, 0.25, 0.5, 0.75, 1].map((f, i) => (
              <line
                key={`h${i}`}
                x1={ink.x - pad * 0.18}
                y1={ink.y + ink.h * f}
                x2={ink.x + ink.w + pad * 0.18}
                y2={ink.y + ink.h * f}
                stroke={geometry.rule}
                strokeWidth={stroke * 0.7}
                strokeOpacity={f === 0.5 ? 0.4 : 0.2}
                strokeDasharray={f === 0.5 ? `${stroke * 6} ${stroke * 4}` : undefined}
              />
            ))}

          {/* The artboard the mark was drawn on */}
          <rect
            x={vb.x}
            y={vb.y}
            width={vb.w}
            height={vb.h}
            fill="none"
            stroke={geometry.rule}
            strokeOpacity={0.35}
            strokeWidth={stroke}
            strokeDasharray={`${stroke * 8} ${stroke * 6}`}
          />

          {/* The mark, placed on its own artboard */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image href={geometry.src} x={vb.x} y={vb.y} width={vb.w} height={vb.h} />

          {/* Measured ink extents */}
          <rect
            x={ink.x}
            y={ink.y}
            width={ink.w}
            height={ink.h}
            fill="none"
            stroke={geometry.rule}
            strokeOpacity={0.75}
            strokeWidth={stroke * 1.2}
          />

          {/* Width dimension */}
          <g stroke={geometry.rule} strokeWidth={stroke} strokeOpacity={0.8}>
            <line x1={ink.x} y1={dimY} x2={ink.x + ink.w} y2={dimY} />
            <line x1={ink.x} y1={dimY - tick} x2={ink.x} y2={dimY + tick} />
            <line
              x1={ink.x + ink.w}
              y1={dimY - tick}
              x2={ink.x + ink.w}
              y2={dimY + tick}
            />
          </g>
          <text
            x={ink.x + ink.w / 2}
            y={dimY + font * 1.5}
            fill={geometry.rule}
            fillOpacity={0.9}
            fontSize={font}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
          >
            {n(ink.w)} units
          </text>

          {/* Height dimension */}
          <g stroke={geometry.rule} strokeWidth={stroke} strokeOpacity={0.8}>
            <line x1={dimX} y1={ink.y} x2={dimX} y2={ink.y + ink.h} />
            <line x1={dimX - tick} y1={ink.y} x2={dimX + tick} y2={ink.y} />
            <line
              x1={dimX - tick}
              y1={ink.y + ink.h}
              x2={dimX + tick}
              y2={ink.y + ink.h}
            />
          </g>
          <text
            x={dimX - font * 0.7}
            y={ink.y + ink.h / 2}
            fill={geometry.rule}
            fillOpacity={0.9}
            fontSize={font}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            transform={`rotate(-90 ${dimX - font * 0.7} ${ink.y + ink.h / 2})`}
          >
            {n(ink.h)} units
          </text>
        </svg>
      </div>

      <figcaption className="mt-4">
        <p className="text-sm text-foreground/75 leading-relaxed max-w-2xl">{caption}</p>
        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
          <SpecItem
            label="Aspect ratio"
            value={`${n(ink.w / ink.h)} : 1`}
            note="Measured from the drawn path"
          />
          {module && (
            <SpecItem
              label="Construction module"
              value={`${n(module.value)} units`}
              note={module.label}
            />
          )}
          {notes.map((m) => (
            <SpecItem key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}

function SpecItem({ label, value, note }: Measure) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.14em] uppercase text-foreground/50">
        {label}
      </dt>
      <dd className="text-sm font-semibold mt-1 font-mono">{value}</dd>
      {note && <dd className="text-xs text-foreground/60 mt-0.5 leading-snug">{note}</dd>}
    </div>
  );
}

/* ── Clear space ────────────────────────────────────────────────────── */

export function ClearSpaceDiagram({
  geometry,
  unitValue,
  unitLabel,
  multiplier,
  caption,
}: {
  geometry: MarkGeometry;
  unitValue: number;
  unitLabel: string;
  multiplier: number;
  caption: string;
}) {
  const vb = parseViewBox(geometry.viewBox);
  const { ink } = geometry;
  const band = unitValue * multiplier;
  const clear = {
    x: ink.x - band,
    y: ink.y - band,
    w: ink.w + band * 2,
    h: ink.h + band * 2,
  };
  const pad = band * 0.55;
  const outer = {
    x: clear.x - pad,
    y: clear.y - pad,
    w: clear.w + pad * 2,
    h: clear.h + pad * 2,
  };
  const s = outer.w;
  const stroke = s / 600;
  const font = Math.min(band * 0.42, s / 40);
  const hatch = `cs-hatch-${Math.round(unitValue * 100)}`;

  return (
    <figure className="mt-8">
      <div
        className="rounded-xl border border-foreground/10 overflow-hidden"
        style={{ backgroundColor: geometry.ground }}
      >
        <svg
          viewBox={`${outer.x} ${outer.y} ${outer.w} ${outer.h}`}
          className="w-full h-auto block"
          role="img"
          aria-label={caption}
        >
          <defs>
            <pattern
              id={hatch}
              width={band * 0.28}
              height={band * 0.28}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={band * 0.28}
                stroke={geometry.rule}
                strokeOpacity={0.28}
                strokeWidth={stroke * 1.2}
              />
            </pattern>
          </defs>

          {/* The exclusion band, between the clear-space box and the ink box */}
          <path
            d={`M${clear.x} ${clear.y} h${clear.w} v${clear.h} h${-clear.w} Z
                M${ink.x} ${ink.y} v${ink.h} h${ink.w} v${-ink.h} Z`}
            fill={`url(#${hatch})`}
            fillRule="evenodd"
          />

          <rect
            x={clear.x}
            y={clear.y}
            width={clear.w}
            height={clear.h}
            fill="none"
            stroke={geometry.rule}
            strokeOpacity={0.55}
            strokeWidth={stroke}
            strokeDasharray={`${stroke * 8} ${stroke * 6}`}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image href={geometry.src} x={vb.x} y={vb.y} width={vb.w} height={vb.h} />

          <rect
            x={ink.x}
            y={ink.y}
            width={ink.w}
            height={ink.h}
            fill="none"
            stroke={geometry.rule}
            strokeOpacity={0.7}
            strokeWidth={stroke}
          />

          {/* The unit, marked on the top and left bands */}
          <g stroke={geometry.rule} strokeWidth={stroke} strokeOpacity={0.85}>
            <line
              x1={ink.x + ink.w / 2}
              y1={clear.y}
              x2={ink.x + ink.w / 2}
              y2={ink.y}
            />
            <line
              x1={clear.x}
              y1={ink.y + ink.h / 2}
              x2={ink.x}
              y2={ink.y + ink.h / 2}
            />
          </g>
          <text
            x={ink.x + ink.w / 2 + font * 0.5}
            y={clear.y + band / 2 + font * 0.35}
            fill={geometry.rule}
            fontSize={font}
            fontFamily="ui-monospace, monospace"
          >
            {multiplier === 1 ? "x" : `${n(multiplier)}x`}
          </text>
          <text
            x={clear.x + band / 2}
            y={ink.y + ink.h / 2 - font * 0.5}
            fill={geometry.rule}
            fontSize={font}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
          >
            {multiplier === 1 ? "x" : `${n(multiplier)}x`}
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 max-w-2xl">
        <p className="text-sm text-foreground/75 leading-relaxed">{caption}</p>
        <p className="text-xs text-foreground/60 mt-2">
          <span className="font-mono">x</span> = {unitLabel}, {n(unitValue)} units on
          the artboard.
        </p>
      </figcaption>
    </figure>
  );
}

/* ── Minimum size ladder ────────────────────────────────────────────── */

export function SizeLadder({
  src,
  widths,
  minPx,
  minMm,
  bg,
  caption,
}: {
  src: string;
  widths: number[];
  minPx?: number;
  minMm?: number;
  bg: string;
  caption: string;
}) {
  return (
    <figure className="mt-8">
      <div
        className="rounded-xl border border-foreground/10 px-6 py-10 md:px-10 overflow-x-auto"
        style={{ backgroundColor: bg }}
      >
        <div className="flex items-end gap-8 md:gap-12 min-w-max">
          {widths.map((w) => {
            const below = minPx !== undefined && w < minPx;
            return (
              <div key={w} className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  style={{ width: w, opacity: below ? 0.42 : 1 }}
                  className="h-auto"
                />
                <span
                  className="text-[10px] font-mono tracking-wider"
                  style={{ color: below ? "rgba(128,128,128,0.9)" : undefined }}
                >
                  {w}px
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-4 max-w-2xl">
        <p className="text-sm text-foreground/75 leading-relaxed">{caption}</p>
        {(minPx || minMm) && (
          <p className="text-xs text-foreground/60 mt-2">
            Documented floor:{" "}
            <span className="font-mono">
              {minPx ? `${minPx}px on screen` : ""}
              {minPx && minMm ? ", " : ""}
              {minMm ? `${minMm}mm in print` : ""}
            </span>
            . Anything below is shown greyed.
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/* ── Lockup anatomy ─────────────────────────────────────────────────── */

export function LockupAnatomy({
  geometry,
  parts,
  caption,
}: {
  geometry: MarkGeometry;
  parts: AnatomyPart[];
  caption: string;
}) {
  const vb = parseViewBox(geometry.viewBox);
  const { ink } = geometry;
  const pad = Math.max(vb.w, vb.h) * 0.2;
  const s = vb.w + pad * 2;
  const stroke = s / 700;
  const r = s / 45;
  const font = r * 1.15;
  const labelY = ink.y + ink.h + pad * 0.62;

  // Assign callouts to a second row where neighbours would collide, then size
  // the artboard to whatever the deepest row needs.
  let prevX = -Infinity;
  let prevRow = 0;
  const placed = parts.map((p) => {
    const x = ink.x + ink.w * p.at;
    const row = x - prevX < r * 2.6 && prevRow === 0 ? 1 : 0;
    prevX = x;
    prevRow = row;
    return { ...p, x, cy: labelY + row * r * 2.6 };
  });
  const deepest = Math.max(...placed.map((p) => p.cy)) + r * 1.8;

  const outer = {
    x: vb.x - pad,
    y: vb.y - pad,
    w: vb.w + pad * 2,
    h: Math.max(vb.y + vb.h + pad, deepest) - (vb.y - pad),
  };

  return (
    <figure className="mt-8">
      <div
        className="rounded-xl border border-foreground/10 overflow-hidden"
        style={{ backgroundColor: geometry.ground }}
      >
        <svg
          viewBox={`${outer.x} ${outer.y} ${outer.w} ${outer.h}`}
          className="w-full h-auto block"
          role="img"
          aria-label={caption}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image href={geometry.src} x={vb.x} y={vb.y} width={vb.w} height={vb.h} />

          {placed.map((p, i) => (
            <g key={p.label}>
              <line
                x1={p.x}
                y1={ink.y + ink.h}
                x2={p.x}
                y2={p.cy - r * 1.3}
                stroke={geometry.rule}
                strokeOpacity={0.5}
                strokeWidth={stroke}
              />
              <circle
                cx={p.x}
                cy={p.cy}
                r={r}
                fill={geometry.ground}
                stroke={geometry.rule}
                strokeOpacity={0.8}
                strokeWidth={stroke * 1.4}
              />
              <text
                x={p.x}
                y={p.cy + font * 0.36}
                fill={geometry.rule}
                fontSize={font}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-4">
        <p className="text-sm text-foreground/75 leading-relaxed max-w-2xl">{caption}</p>
        <ol className="mt-5 space-y-3 max-w-2xl">
          {parts.map((p, i) => (
            <li key={p.label} className="flex gap-4">
              <span className="font-mono text-xs text-accent pt-1 w-5 shrink-0">
                {i + 1}
              </span>
              <span className="text-sm">
                <span className="font-semibold">{p.label}.</span>{" "}
                <span className="text-foreground/75">{p.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

/* ── Misuse ─────────────────────────────────────────────────────────── */

const MISUSE_STYLE: Record<Misuse["kind"], React.CSSProperties> = {
  rotate: { transform: "rotate(-12deg)" },
  stretch: { transform: "scaleX(1.42)" },
  squash: { transform: "scaleY(0.6)" },
  shadow: { filter: "drop-shadow(3px 5px 4px rgba(0,0,0,0.55))" },
  recolour: { filter: "hue-rotate(140deg) saturate(3)" },
  lightGround: {},
  outline: { filter: "blur(0.4px)", opacity: 0.999 },
  crop: { clipPath: "inset(0 22% 0 0)" },
};

export function MisusePanel({
  src,
  bg,
  ink,
  items,
}: {
  src: string;
  bg: string;
  ink: string;
  items: Misuse[];
}) {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((m) => (
        <figure key={m.kind + m.label}>
          <div
            className="relative aspect-[4/3] rounded-lg border border-foreground/10 flex items-center justify-center px-6 overflow-hidden"
            style={{
              backgroundColor: m.kind === "lightGround" ? "#FFFFFF" : bg,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full max-w-[74%] h-auto"
              style={MISUSE_STYLE[m.kind]}
            />
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              <line
                x1="8"
                y1="8"
                x2="92"
                y2="92"
                stroke="#C2453A"
                strokeWidth="1.1"
                vectorEffect="non-scaling-stroke"
                opacity="0.9"
              />
              <line
                x1="92"
                y1="8"
                x2="8"
                y2="92"
                stroke="#C2453A"
                strokeWidth="1.1"
                vectorEffect="non-scaling-stroke"
                opacity="0.9"
              />
            </svg>
          </div>
          <figcaption className="mt-2.5 text-xs text-foreground/70 leading-snug">
            {m.label}
          </figcaption>
        </figure>
      ))}
      <span className="sr-only" style={{ color: ink }} />
    </div>
  );
}

/* ── Grid ───────────────────────────────────────────────────────────── */

export function GridDiagram({
  breakpoints,
  measures,
}: {
  breakpoints: GridBreakpoint[];
  measures: Measure[];
}) {
  return (
    <div className="mt-8">
      <div className="space-y-6">
        {breakpoints.map((b) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-semibold">{b.label}</span>
              <span className="text-xs text-foreground/60 font-mono">
                {b.columns} columns
              </span>
            </div>
            <div
              className="grid gap-1.5 h-10 rounded-md overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${b.columns}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: b.columns }).map((_, i) => (
                <div key={i} className="bg-accent/18 border-x border-accent/30" />
              ))}
            </div>
            {b.note && (
              <p className="text-xs text-foreground/60 mt-2">{b.note}</p>
            )}
          </div>
        ))}
      </div>
      <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        {measures.map((m) => (
          <SpecItem key={m.label} {...m} />
        ))}
      </dl>
    </div>
  );
}

/* ── Spacing scale ──────────────────────────────────────────────────── */

export function SpacingScale({
  steps,
  base,
}: {
  steps: SpacingStep[];
  base: string;
}) {
  const max = Math.max(...steps.map((s) => s.px));
  return (
    <div className="mt-8">
      <p className="text-xs text-foreground/60 mb-5">{base}</p>
      <ul className="space-y-3">
        {steps.map((s) => (
          <li key={s.token} className="flex items-center gap-4">
            <span className="font-mono text-xs text-foreground/60 w-10 shrink-0">
              {s.token}
            </span>
            <span className="font-mono text-xs w-14 shrink-0 text-right">{s.px}px</span>
            <span className="flex-1 min-w-0">
              <span
                className="block h-3 rounded-sm bg-accent/35 border-r-2 border-accent"
                style={{ width: `${(s.px / max) * 100}%` }}
              />
            </span>
            <span className="text-xs text-foreground/65 w-40 md:w-56 shrink-0 leading-snug hidden sm:block">
              {s.use}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
