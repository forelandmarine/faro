/**
 * Specification tables for the study documents. RGB values and contrast ratios
 * are computed from the hex at render time, so the figures cannot drift from
 * the palette they describe.
 */

import type {
  ContrastPair,
  Measure,
  MotionRow,
  Swatch,
  TypeFamily,
  TypeScaleRow,
} from "@/content/studies/types";
import { contrastGrade, contrastRatio, rgbString } from "@/lib/colour";

/* ── Colour ─────────────────────────────────────────────────────────── */

export function ColourTable({
  swatches,
  contrast,
}: {
  swatches: Swatch[];
  contrast?: ContrastPair[];
}) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
        {swatches.map((s) => (
          <div key={s.hex + s.name}>
            <div
              className="h-24 rounded-lg border border-foreground/10"
              style={{ backgroundColor: s.hex }}
            />
            <p className="mt-3 text-sm font-semibold leading-tight">{s.name}</p>
            <p className="text-xs text-foreground/60 font-mono uppercase mt-1">{s.hex}</p>
            <p className="text-xs text-foreground/50 font-mono mt-0.5">
              {rgbString(s.hex)}
            </p>
            <p className="text-xs text-foreground/65 mt-1.5 leading-snug">{s.role}</p>
            {s.reference && (
              <p className="text-xs text-foreground/50 mt-1 leading-snug italic">
                {s.reference}
              </p>
            )}
          </div>
        ))}
      </div>

      {contrast && contrast.length > 0 && (
        <div className="mt-12">
          <p className="type-eyebrow mb-4">Measured contrast</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[34rem]">
              <thead>
                <tr className="border-b border-foreground/15 text-left">
                  <Th>Pair</Th>
                  <Th>Sample</Th>
                  <Th align="right">Ratio</Th>
                  <Th align="right">WCAG 2.1</Th>
                </tr>
              </thead>
              <tbody>
                {contrast.map((c) => {
                  const ratio = contrastRatio(c.textHex, c.surfaceHex);
                  return (
                    <tr
                      key={`${c.text}-${c.surface}`}
                      className="border-b border-foreground/8"
                    >
                      <Td>
                        {c.text} on {c.surface}
                      </Td>
                      <Td>
                        <span
                          className="inline-block px-3 py-1 rounded text-xs"
                          style={{ backgroundColor: c.surfaceHex, color: c.textHex }}
                        >
                          Sample text
                        </span>
                      </Td>
                      <Td align="right" mono>
                        {ratio.toFixed(1)}:1
                      </Td>
                      <Td align="right" mono>
                        {contrastGrade(ratio)}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-foreground/55 mt-3">
            Ratios are computed from the hex values on this page under WCAG 2.1, not
            quoted from the brand document.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Type ───────────────────────────────────────────────────────────── */

export function TypeFamilies({ families }: { families: TypeFamily[] }) {
  return (
    <div className="mt-8">
      {families.map((t) => (
        <div
          key={`${t.family}-${t.role}`}
          className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 border-t border-foreground/10 py-7"
        >
          <span
            aria-hidden
            className="text-6xl leading-none shrink-0 w-24"
            style={{ fontFamily: t.css, fontWeight: t.weight ?? 400 }}
          >
            Aa
          </span>
          <div className="min-w-0">
            <p
              className="text-2xl leading-tight"
              style={{ fontFamily: t.css, fontWeight: t.weight ?? 400 }}
            >
              {t.family}
            </p>
            <p className="type-eyebrow mt-1.5">{t.role}</p>
            {t.weights && (
              <p className="text-xs text-foreground/55 font-mono mt-1.5">{t.weights}</p>
            )}
            {t.note && (
              <p className="text-sm text-foreground/70 mt-2 max-w-xl leading-relaxed">
                {t.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpecimenSheet({
  css,
  weight,
  label,
  sample,
}: {
  css: string;
  weight?: number;
  label: string;
  sample?: string;
}) {
  return (
    <figure className="mt-8 rounded-xl border border-foreground/10 bg-white/45 px-6 py-8 md:px-10">
      <div style={{ fontFamily: css, fontWeight: weight ?? 400 }}>
        <p className="text-[clamp(1.5rem,4vw,2.75rem)] leading-tight break-words">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </p>
        <p className="text-[clamp(1.5rem,4vw,2.75rem)] leading-tight break-words mt-1">
          abcdefghijklmnopqrstuvwxyz
        </p>
        <p className="text-[clamp(1.5rem,4vw,2.75rem)] leading-tight break-words mt-1">
          0123456789 &amp; £ € , . ; : ( ) &ldquo; &rdquo;
        </p>
        {sample && (
          <p className="text-lg md:text-xl leading-relaxed mt-7 max-w-2xl text-foreground/80">
            {sample}
          </p>
        )}
      </div>
      <figcaption className="type-eyebrow mt-7">{label}</figcaption>
    </figure>
  );
}

export function TypeScaleTable({ rows }: { rows: TypeScaleRow[] }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[46rem]">
        <thead>
          <tr className="border-b border-foreground/15 text-left">
            {rows[0]?.step && <Th>Step</Th>}
            <Th>Size</Th>
            <Th>Role</Th>
            <Th>Family</Th>
            <Th align="right">Weight</Th>
            <Th align="right">Line height</Th>
            <Th align="right">Tracking</Th>
            <Th>Set</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.step ?? ""}${r.size}${r.role}`} className="border-b border-foreground/8">
              {r.step && <Td mono>{r.step}</Td>}
              <Td mono>{r.size}</Td>
              <Td>{r.role}</Td>
              <Td>{r.family}</Td>
              <Td align="right" mono>
                {r.weight ?? "—"}
              </Td>
              <Td align="right" mono>
                {r.lineHeight ?? "—"}
              </Td>
              <Td align="right" mono>
                {r.tracking ?? "—"}
              </Td>
              <Td>
                <span
                  className="block leading-none whitespace-nowrap"
                  style={{
                    fontFamily: r.css,
                    fontSize: r.previewPx,
                    fontWeight: r.previewWeight ?? 400,
                    letterSpacing: r.tracking?.endsWith("em") ? r.tracking : undefined,
                  }}
                >
                  Aa
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Motion ─────────────────────────────────────────────────────────── */

export function MotionTable({ rows, note }: { rows: MotionRow[]; note?: string }) {
  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[36rem]">
          <thead>
            <tr className="border-b border-foreground/15 text-left">
              <Th>Name</Th>
              <Th>Effect</Th>
              <Th align="right">Duration</Th>
              <Th align="right">Easing</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-foreground/8">
                <Td mono>{r.name}</Td>
                <Td>{r.effect}</Td>
                <Td align="right" mono>
                  {r.duration ?? "—"}
                </Td>
                <Td align="right" mono>
                  {r.easing ?? "—"}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="text-xs text-foreground/60 mt-3 max-w-2xl">{note}</p>}
    </div>
  );
}

/* ── Grouped specifications ─────────────────────────────────────────── */

export function SpecGroups({
  groups,
}: {
  groups: { title: string; measures: Measure[] }[];
}) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="type-eyebrow mb-4">{g.title}</p>
          <dl className="divide-y divide-foreground/10">
            {g.measures.map((m) => (
              <div key={m.label} className="py-2.5 flex items-baseline gap-4">
                <dt className="text-sm text-foreground/70 flex-1 min-w-0">{m.label}</dt>
                <dd className="text-sm font-mono text-right shrink-0">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/* ── Table primitives ───────────────────────────────────────────────── */

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`py-2.5 pr-4 text-[10px] tracking-[0.14em] uppercase font-semibold text-foreground/50 ${
        align === "right" ? "text-right pr-0 pl-4" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  mono = false,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  mono?: boolean;
}) {
  return (
    <td
      className={`py-3 pr-4 align-middle ${align === "right" ? "text-right pr-0 pl-4" : ""} ${
        mono ? "font-mono text-xs" : "text-foreground/80"
      }`}
    >
      {children}
    </td>
  );
}
