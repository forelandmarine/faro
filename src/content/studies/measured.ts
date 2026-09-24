import measurements from "./measurements.json";
import type { Block, Measure } from "./types";

/**
 * Load figures for the study documents, read from the file that
 * scripts/measure-sites.mjs writes rather than typed in by hand. Re-running the
 * script updates every page that uses this.
 */

type Measurement = {
  url: string;
  domContentLoaded: number;
  load: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  domNodes: number;
  transferKB: number;
  requests: number;
};

const DATA = measurements as Record<string, Measurement>;

/** The date the current measurement run was taken. */
export const MEASURED_ON = "24 September 2026";

function weight(m: Measurement): Measure[] {
  return [
    {
      label: "Transferred",
      value:
        m.transferKB >= 1024
          ? `${(m.transferKB / 1024).toFixed(1)}MB`
          : `${m.transferKB}KB`,
    },
    { label: "Requests", value: String(m.requests) },
    { label: "DOM nodes", value: String(m.domNodes) },
  ];
}

function timing(m: Measurement): Measure[] {
  return [
    { label: "First contentful paint", value: `${m.firstContentfulPaint}ms` },
    { label: "Largest contentful paint", value: `${m.largestContentfulPaint}ms` },
    { label: "Load complete", value: `${m.load}ms` },
  ];
}

/**
 * A measured-performance block for a study document. The caption states the
 * method, because a number without one is not much better than an adjective.
 */
export function measuredBlocks(slug: string, pageDescription: string): Block[] {
  const m = DATA[slug];
  if (!m) return [];
  return [
    {
      kind: "spec",
      groups: [
        {
          title: `What ${pageDescription} weighs`,
          measures: weight(m),
        },
        {
          title: "When it paints",
          measures: timing(m),
        },
      ],
    },
    {
      kind: "note",
      text:
        `Measured on ${MEASURED_ON} by loading ${m.url.replace(/^https?:\/\//, "")} ` +
        "twice in headless Chrome at 1440 pixels with the cache disabled, and keeping " +
        "the better run. This is a desktop connection on a fast line, so the paint " +
        "figures are a floor rather than a field measurement. The transfer weight and " +
        "request count are the numbers worth comparing, because they do not change " +
        "with the connection.",
    },
  ];
}
