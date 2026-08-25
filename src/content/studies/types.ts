/**
 * The study document: the long-form design and build briefing that sits at
 * /work/<slug>/study. One document per case study.
 *
 * Every measurement in these documents is taken from the client repository or
 * measured from the shipped asset, never written from memory. Where a figure
 * could not be sourced it is left out rather than estimated. Section sources
 * are recorded in docs/study-sources.md.
 */

/** A labelled figure in a specification list. */
export type Measure = {
  label: string;
  value: string;
  note?: string;
};

/** A colour in the client palette. RGB and contrast are computed at render. */
export type Swatch = {
  name: string;
  hex: string;
  role: string;
  /** Named paint or ink reference where the client brand cites one. */
  reference?: string;
};

/** A measured text-on-surface pair. The ratio is computed, not typed in. */
export type ContrastPair = {
  text: string;
  textHex: string;
  surface: string;
  surfaceHex: string;
};

/** A typeface and the job it does. */
export type TypeFamily = {
  family: string;
  role: string;
  /** CSS stack used to render the live specimen. */
  css: string;
  weight?: number;
  weights?: string;
  note?: string;
};

/** One step on the client's type scale. */
export type TypeScaleRow = {
  step?: string;
  size: string;
  role: string;
  family: string;
  weight?: string;
  lineHeight?: string;
  tracking?: string;
  /** CSS stack for the live preview of this row. */
  css: string;
  /** Rendered preview size in px, capped so the table stays readable. */
  previewPx: number;
  previewWeight?: number;
};

/** One tile on the logo sheet: the mark on a brand ground. */
export type MarkTile = {
  label: string;
  bg: string;
  note?: string;
  wide?: boolean;
  src?: string;
  height?: number;
  wordmark?: Wordmark;
};

export type Wordmark = {
  text: string;
  sub?: string;
  css: string;
  subCss?: string;
  color: string;
  subColor?: string;
  weight?: number;
  tracking?: string;
  subTracking?: string;
  subItalic?: boolean;
};

/**
 * Measured geometry of a mark, in its own viewBox units. The ink box is the
 * bounding box of the drawn path, measured from the file, not the artboard.
 */
export type MarkGeometry = {
  src: string;
  /** viewBox of the source file, verbatim. */
  viewBox: string;
  /** Ink bounding box in viewBox units, measured from the path data. */
  ink: { x: number; y: number; w: number; h: number };
  /** Mark colour, used for the diagram rules. */
  ground: string;
  rule: string;
};

/** A part of a lockup, called out with a leader line. */
export type AnatomyPart = {
  label: string;
  note: string;
  /** Fraction of the diagram width where the leader line lands, 0 to 1. */
  at: number;
};

export type MisuseKind =
  | "rotate"
  | "stretch"
  | "squash"
  | "shadow"
  | "recolour"
  | "lightGround"
  | "outline"
  | "crop";

export type Misuse = {
  kind: MisuseKind;
  label: string;
};

export type GridBreakpoint = {
  label: string;
  columns: number;
  note?: string;
};

export type SpacingStep = {
  token: string;
  px: number;
  use: string;
};

export type MotionRow = {
  name: string;
  effect: string;
  duration?: string;
  easing?: string;
};

export type ArchLayer = {
  label: string;
  nodes: { name: string; note?: string }[];
};

/** The blocks a study section can contain. */
export type Block =
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "list"; items: { label: string; note?: string }[]; heading?: string }
  | { kind: "marks"; tiles: MarkTile[] }
  | {
      kind: "construction";
      geometry: MarkGeometry;
      caption: string;
      /**
       * The construction module, in viewBox units. The sheet is ruled at this
       * interval so the mark's internal proportions can be read off directly.
       */
      module?: { value: number; label: string };
      notes: Measure[];
    }
  | {
      kind: "clearspace";
      geometry: MarkGeometry;
      /** The clear space unit, expressed in viewBox units. */
      unitValue: number;
      unitLabel: string;
      multiplier: number;
      caption: string;
    }
  | {
      kind: "sizes";
      src: string;
      /** Rendered widths in px, smallest first. */
      widths: number[];
      /** The documented floor. */
      minPx?: number;
      minMm?: number;
      bg: string;
      caption: string;
    }
  | {
      kind: "anatomy";
      geometry: MarkGeometry;
      parts: AnatomyPart[];
      caption: string;
    }
  | { kind: "misuse"; src: string; bg: string; ink: string; items: Misuse[] }
  | { kind: "colour"; swatches: Swatch[]; contrast?: ContrastPair[] }
  | { kind: "type"; families: TypeFamily[] }
  | { kind: "typescale"; rows: TypeScaleRow[] }
  | { kind: "specimen"; css: string; weight?: number; label: string; sample?: string }
  | {
      kind: "grid";
      breakpoints: GridBreakpoint[];
      measures: Measure[];
    }
  | { kind: "spacing"; steps: SpacingStep[]; base: string }
  | { kind: "motion"; rows: MotionRow[]; note?: string }
  | { kind: "spec"; groups: { title: string; measures: Measure[] }[] }
  | { kind: "architecture"; layers: ArchLayer[]; caption?: string }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
      frame?: "phone" | "screen";
    }
  | { kind: "note"; text: string };

export type StudySection = {
  /** Anchor id, used by the contents list. */
  id: string;
  /** Document number, e.g. "03". */
  number: string;
  title: string;
  blocks: Block[];
};

export type StudyDoc = {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  sector: string;
  year: string;
  scope: string[];
  liveUrl: string;
  /** Google Fonts stylesheet for the live specimens on this page only. */
  fontsHref?: string;
  /** Shown on the trimmed overview page as the identity strip. */
  glance: {
    mark: MarkTile;
    palette: Swatch[];
  };
  sections: StudySection[];
};
