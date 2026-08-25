/**
 * Plates for the study documents: the logo sheet, the architecture flow and
 * framed screen images.
 *
 * Lockups that carry live text are recomposed here rather than shipped as SVG,
 * because an SVG placed in an <img> loses the page's loaded brand fonts.
 */

import Image from "next/image";
import type {
  ArchLayer,
  MarkTile,
  Measure,
  RejectedPlate,
  TimelineEntry,
} from "@/content/studies/types";

/* ── Timeline ───────────────────────────────────────────────────────── */

/**
 * The project's own chronology, taken from its commit history rather than
 * reconstructed afterwards. Pivots are the moments the work changed direction.
 */
export function Timeline({
  entries,
  summary,
  source,
}: {
  entries: TimelineEntry[];
  summary?: Measure[];
  source?: string;
}) {
  return (
    <div className="mt-8">
      <ol className="relative border-l border-foreground/15 ml-2">
        {entries.map((e) => (
          <li key={e.date + e.label} className="relative pl-7 pb-7 last:pb-0">
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${
                e.pivot
                  ? "bg-accent border-accent"
                  : "bg-background border-foreground/35"
              }`}
              aria-hidden
            />
            <span className="block font-mono text-xs text-foreground/55">
              {e.date}
            </span>
            <span
              className={`block mt-1 ${
                e.pivot ? "text-base font-semibold" : "text-base"
              }`}
            >
              {e.label}
            </span>
            {e.note && (
              <span className="block text-sm text-foreground/65 mt-1 leading-snug max-w-xl">
                {e.note}
              </span>
            )}
          </li>
        ))}
      </ol>

      {summary && summary.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-foreground/10 pt-6">
          {summary.map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] tracking-[0.14em] uppercase text-foreground/50">
                {m.label}
              </dt>
              <dd className="text-sm font-semibold mt-1 font-mono">{m.value}</dd>
              {m.note && (
                <dd className="text-xs text-foreground/60 mt-0.5 leading-snug">
                  {m.note}
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}

      {source && (
        <p className="text-xs text-foreground/55 mt-4 max-w-2xl">{source}</p>
      )}
    </div>
  );
}

/* ── Rejected work ──────────────────────────────────────────────────── */

/**
 * Studies that did not survive, shown as they were drawn at the time. The tags
 * name what each one carries that was later ruled out, which is the whole
 * reason for showing them.
 */
export function RejectedSheet({
  plates,
  bg,
  columns = 2,
}: {
  plates: RejectedPlate[];
  bg: string;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`mt-8 grid grid-cols-1 gap-5 ${
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {plates.map((p) => (
        <figure key={p.src}>
          {/* A uniform plate box, so studies drawn at different sizes still
              sit in a tidy grid. The artwork is contained, never cropped. */}
          <div
            className="rounded-lg border border-foreground/10 overflow-hidden flex items-center justify-center aspect-[5/2] p-5"
            style={{ backgroundColor: bg }}
          >
            <Image
              src={p.src}
              alt={p.label}
              width={p.width}
              height={p.height}
              sizes="(min-width: 640px) 480px, 100vw"
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>
          <figcaption className="mt-3">
            <span className="text-sm font-semibold">{p.label}</span>
            {p.note && (
              <span className="block text-xs text-foreground/60 mt-0.5 leading-snug">
                {p.note}
              </span>
            )}
            {p.carries && p.carries.length > 0 && (
              <span className="mt-2 flex flex-wrap gap-1.5">
                {p.carries.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] tracking-wide uppercase border border-foreground/20 text-foreground/55 rounded-full px-2 py-0.5"
                  >
                    {c}
                  </span>
                ))}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function MarkSheet({ tiles, name }: { tiles: MarkTile[]; name: string }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tiles.map((m) => (
        <figure key={m.label} className={m.wide ? "sm:col-span-3" : ""}>
          <div
            className={`rounded-xl border border-foreground/10 flex items-center justify-center px-8 gap-6 ${
              m.wide ? "py-14 flex-col sm:flex-row" : "aspect-[4/3] flex-col"
            }`}
            style={{ backgroundColor: m.bg }}
          >
            {m.src && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={m.src}
                alt={`${name} ${m.label}`}
                style={{ height: m.height ?? 64 }}
                className="w-auto max-w-full"
              />
            )}
            {m.wordmark && (
              <div className={m.src ? "text-center sm:text-left" : "text-center"}>
                <p
                  className={
                    m.src
                      ? "text-xl md:text-3xl leading-tight"
                      : "text-2xl md:text-4xl leading-tight"
                  }
                  style={{
                    fontFamily: m.wordmark.css,
                    fontWeight: m.wordmark.weight ?? 400,
                    color: m.wordmark.color,
                    letterSpacing: m.wordmark.tracking,
                  }}
                >
                  {m.wordmark.text}
                </p>
                {m.wordmark.sub && (
                  <p
                    className={`mt-1.5 ${
                      m.wordmark.subItalic
                        ? "italic text-base md:text-lg"
                        : "text-[10px] md:text-xs"
                    }`}
                    style={{
                      fontFamily: m.wordmark.subCss ?? m.wordmark.css,
                      color: m.wordmark.subColor ?? m.wordmark.color,
                      letterSpacing: m.wordmark.subTracking,
                    }}
                  >
                    {m.wordmark.sub}
                  </p>
                )}
              </div>
            )}
          </div>
          <figcaption className="mt-3">
            <span className="text-sm font-semibold">{m.label}</span>
            {m.note && (
              <span className="block text-xs text-foreground/60 mt-0.5 leading-snug">
                {m.note}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ── Architecture ───────────────────────────────────────────────────── */

export function ArchitectureDiagram({
  layers,
  caption,
}: {
  layers: ArchLayer[];
  caption?: string;
}) {
  return (
    <figure className="mt-8">
      <div className="rounded-xl border border-foreground/10 bg-white/40 p-6 md:p-8">
        {layers.map((layer, li) => (
          <div key={layer.label}>
            {li > 0 && (
              <div className="flex justify-center py-4" aria-hidden>
                <svg width="12" height="26" viewBox="0 0 12 26" fill="none">
                  <path
                    d="M6 0v20M2 16.5L6 20.5l4-4"
                    stroke="currentColor"
                    className="text-accent"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            <p className="type-eyebrow mb-3">{layer.label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {layer.nodes.map((nd) => (
                <div
                  key={nd.name}
                  className="border border-foreground/15 rounded-lg px-4 py-3 bg-background/60"
                >
                  <p className="text-sm font-semibold leading-tight">{nd.name}</p>
                  {nd.note && (
                    <p className="text-xs text-foreground/60 mt-1 leading-snug">
                      {nd.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="text-xs text-foreground/60 mt-3 max-w-2xl">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Screens ────────────────────────────────────────────────────────── */

export function ImagePlate({
  src,
  alt,
  caption,
  width,
  height,
  frame = "screen",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  frame?: "phone" | "screen";
}) {
  if (frame === "phone") {
    return (
      <figure className="mt-8 flex flex-col items-center">
        <div className="w-[230px] rounded-[2rem] border-4 border-[#1A3640] overflow-hidden shadow-[0_16px_40px_-16px_rgba(26,54,64,0.35)]">
          <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
        </div>
        {caption && (
          <figcaption className="text-xs text-foreground/60 text-center mt-3">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="mt-8">
      <div className="rounded-xl overflow-hidden border-4 border-[#1A3640] shadow-[0_16px_40px_-16px_rgba(26,54,64,0.3)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-foreground/60 mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
