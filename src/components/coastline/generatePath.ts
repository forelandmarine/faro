/**
 * Procedural coastline path generation using sine waves + Perlin noise.
 * Produces an organic, storytelling coastline across 8 panels.
 */

// ── Perlin noise (1D) ──────────────────────────────────────────────

const PERM = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Deterministic shuffle (seed = 42)
  let seed = 42;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad1D(hash: number, x: number): number {
  return hash & 1 ? x : -x;
}

export function perlin1D(x: number): number {
  const xi = Math.floor(x) & 255;
  const xf = x - Math.floor(x);
  const u = fade(xf);
  return lerp(
    grad1D(PERM[xi], xf),
    grad1D(PERM[xi + 1], xf - 1),
    u
  );
}

// ── Coastline generation ────────────────────────────────────────────

interface CoastlineConfig {
  /** Total width in px (e.g. 8 * window.innerWidth) */
  totalWidth: number;
  /** Base Y position (from top of the SVG viewBox) */
  baseY: number;
  /** Overall amplitude */
  amplitude: number;
}

/**
 * Section modifiers — shape the coastline character per panel.
 * Returns a multiplier 0-1 for noise amplitude.
 */
function getSectionCharacter(
  x: number,
  totalWidth: number
): { amplitude: number; baseOffset: number } {
  const t = x / totalWidth; // 0→1 across whole scene

  // 8 panels, each ~12.5% of total width
  if (t < 0.125) {
    // Panel 1 — Hero: calm harbor
    return { amplitude: 0.4, baseOffset: 5 };
  } else if (t < 0.25) {
    // Panel 2 — Services: open coast
    return { amplitude: 0.8, baseOffset: 0 };
  } else if (t < 0.375) {
    // Panel 3 — Portfolio 1: rocky cove (dip down)
    const local = (t - 0.25) / 0.125;
    const cove = Math.sin(local * Math.PI) * 15;
    return { amplitude: 1.0, baseOffset: cove };
  } else if (t < 0.5) {
    // Panel 4 — Portfolio 2: gentle coast
    return { amplitude: 0.6, baseOffset: -3 };
  } else if (t < 0.625) {
    // Panel 5 — Process: gentle beach
    return { amplitude: 0.3, baseOffset: 8 };
  } else if (t < 0.75) {
    // Panel 6 — About: small bay
    const local = (t - 0.625) / 0.125;
    const bay = Math.sin(local * Math.PI) * 10;
    return { amplitude: 0.5, baseOffset: bay };
  } else if (t < 0.875) {
    // Panel 7 — Philosophy: cliffs (higher)
    return { amplitude: 1.2, baseOffset: -12 };
  } else {
    // Panel 8 — Contact: harbor return
    return { amplitude: 0.4, baseOffset: 3 };
  }
}

export function generateCoastlinePath(config: CoastlineConfig): string {
  const { totalWidth, baseY, amplitude } = config;
  const step = 4; // sample every 4px for perf
  const points: string[] = [];

  for (let x = 0; x <= totalWidth; x += step) {
    const section = getSectionCharacter(x, totalWidth);

    // Base sine wave
    const wave = Math.sin(x * 0.008) * 8;

    // Perlin noise octaves
    const noise1 = perlin1D(x * 0.002) * 25; // major features (bays, headlands)
    const noise2 = perlin1D(x * 0.01) * 10; // medium detail
    const noise3 = perlin1D(x * 0.04) * 3; // fine rocky texture

    const y =
      baseY +
      section.baseOffset +
      (wave + noise1 + noise2 + noise3) * section.amplitude * (amplitude / 30);

    if (x === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }

  // Close path: go to bottom-right, bottom-left, back to start
  points.push(`L ${totalWidth} ${baseY + 60}`);
  points.push(`L 0 ${baseY + 60}`);
  points.push("Z");

  return points.join(" ");
}

/**
 * Generate a wave path (no fill closure) for decorative wave lines.
 */
export function generateWavePath(
  totalWidth: number,
  baseY: number,
  frequency: number,
  amplitude: number,
  phase: number
): string {
  const step = 6;
  const points: string[] = [];

  for (let x = 0; x <= totalWidth; x += step) {
    const y =
      baseY +
      Math.sin(x * frequency + phase) * amplitude +
      perlin1D(x * 0.005 + phase * 10) * amplitude * 0.4;

    if (x === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }

  return points.join(" ");
}

/**
 * Generate cliff/hill silhouette path for background mountains.
 */
export function generateHillPath(
  totalWidth: number,
  baseY: number,
  scale: number,
  seed: number
): string {
  const step = 8;
  const points: string[] = [];

  for (let x = 0; x <= totalWidth; x += step) {
    const hill =
      perlin1D(x * 0.001 + seed) * 30 * scale +
      perlin1D(x * 0.004 + seed * 2) * 15 * scale +
      perlin1D(x * 0.015 + seed * 3) * 5 * scale;

    const y = baseY + hill;

    if (x === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }

  // Close at bottom
  points.push(`L ${totalWidth} ${baseY + 80}`);
  points.push(`L 0 ${baseY + 80}`);
  points.push("Z");

  return points.join(" ");
}
