#!/usr/bin/env node
/*
  Capture the screens used in the study documents.

  Shoots the five live client sites at desktop width, plus element-level detail
  crops where a study document makes a claim about typography or a component
  and ought to show it rather than assert it.

  Everything is captured at a 2x device pixel ratio and converted to WebP, so
  the plates stay sharp on a retina display without shipping large PNGs.

  Run with:
    node scripts/capture-study-screens.mjs           # everything
    node scripts/capture-study-screens.mjs nimara    # one project

  Requires puppeteer and cwebp (brew install webp).
*/

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/portfolio/study");

const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

/** Kill motion so a capture settles, and stand down anything scroll-driven. */
const STILL = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }
`;

/**
 * Chat widgets and cookie bars belong on the client's site rather than in a
 * study plate, so they are hidden for the shot.
 */
const HIDE = [
  "[class*='whatsapp' i]",
  "[aria-label*='WhatsApp' i]",
  "[id*='cookie' i]",
  "[class*='cookie-banner' i]",
];

/**
 * Local storage written before the first navigation, per host. This is how a
 * site's own "seen it, do not show me again" flags get set, which is the
 * honest way to take a returning visitor's view of a page rather than hiding
 * a notice the client deliberately ships.
 */
const SEED_STORAGE = {
  "nimarapilates.com": { "nimara-founding-notice-2026-09": "dismissed" },
};

/**
 * shots: { out, url, selector?, viewportHeight?, scrollTo?, before? }
 *   selector       element crop instead of the viewport
 *   viewportHeight taller viewport for a full section
 *   scrollTo       scroll before shooting, so reveals have fired
 *   before         extra page work, as a function body string
 */
const TARGETS = {
  "first-owners-reference": [
    {
      out: "chapter-opening",
      url: "https://firstownersreference.com/01-reality-of-ownership",
      viewportHeight: 1100,
    },
    {
      out: "chapter-measure",
      url: "https://firstownersreference.com/01-reality-of-ownership",
      scrollTo: 900,
      viewportHeight: 1000,
    },
    {
      out: "glossary",
      url: "https://firstownersreference.com/glossary",
      viewportHeight: 1000,
    },
    {
      out: "calculator",
      url: "https://firstownersreference.com/tools/running-cost-calculator",
      viewportHeight: 1100,
    },
  ],

  "foreland-marine": [
    {
      out: "service-hero",
      url: "https://forelandmarine.com/refit",
      viewportHeight: 1000,
    },
    {
      out: "service-cards",
      url: "https://forelandmarine.com/refit",
      scrollTo: 1100,
      viewportHeight: 1000,
    },
    {
      out: "technical-support",
      url: "https://forelandmarine.com/technical-support",
      scrollTo: 700,
      viewportHeight: 1100,
    },
    {
      out: "tools",
      url: "https://forelandmarine.com/tools",
      viewportHeight: 1000,
    },
  ],

  "nimara-pilates": [
    {
      out: "home-hero",
      url: "https://nimarapilates.com/",
      viewportHeight: 1000,
    },
    {
      out: "classes",
      url: "https://nimarapilates.com/classes",
      // The level cards, which carry both faces and the sentence case rule.
      scrollTo: 1700,
      viewportHeight: 1000,
    },
    {
      out: "timetable",
      url: "https://nimarapilates.com/classes",
      // The week grid, read live from the booking platform.
      scrollTo: 250,
      viewportHeight: 1000,
    },
    {
      out: "pricing",
      url: "https://nimarapilates.com/pricing",
      scrollTo: 400,
      viewportHeight: 1000,
    },
    {
      out: "studio",
      url: "https://nimarapilates.com/studio",
      viewportHeight: 1000,
    },
  ],

  "birdham-carpentry": [
    {
      out: "home-hero",
      url: "https://birdhamcarpentry.co.uk/",
      viewportHeight: 1000,
    },
    {
      out: "quote-flow",
      url: "https://birdhamcarpentry.co.uk/quote",
      viewportHeight: 1100,
    },
    {
      out: "service",
      url: "https://birdhamcarpentry.co.uk/services/listed-building-restoration",
      scrollTo: 600,
      viewportHeight: 1000,
    },
    {
      out: "areas",
      url: "https://birdhamcarpentry.co.uk/areas/chichester",
      viewportHeight: 1000,
    },
  ],
  watermans: [
    {
      out: "home-hero",
      url: "https://www.watermansagency.com/",
      viewportHeight: 1000,
    },
    {
      out: "planner",
      url: "https://www.watermansagency.com/plan/",
      viewportHeight: 1100,
    },
    {
      out: "port",
      url: "https://www.watermansagency.com/falmouth/",
      viewportHeight: 1100,
      // The pilot-book template from the pilotage notes into the tide table.
      before: `(() => {
        const h = [...document.querySelectorAll("h2")].find((e) => e.textContent.trim() === "Pilotage");
        if (h) window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 110);
      })()`,
    },
    {
      out: "fees",
      url: "https://www.watermansagency.com/fees/",
      viewportHeight: 1000,
    },
  ],
};

async function shoot(browser, slug, target) {
  const page = await browser.newPage();
  const height = target.viewportHeight ?? VIEWPORT.height;
  await page.setViewport({ ...VIEWPORT, height });

  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const png = path.join(dir, `${target.out}.png`);

  try {
    const seed = SEED_STORAGE[new URL(target.url).hostname.replace(/^www\./, "")];
    if (seed) {
      await page.evaluateOnNewDocument((pairs) => {
        for (const [k, v] of Object.entries(pairs)) {
          try {
            localStorage.setItem(k, v);
          } catch {
            /* storage can be refused; the shot is still worth taking */
          }
        }
      }, seed);
    }

    await page.goto(target.url, {
      waitUntil: "networkidle2",
      timeout: 45000,
    });
    await page.addStyleTag({ content: STILL });
    await page.addStyleTag({
      content: `${HIDE.join(", ")} { display: none !important; }`,
    });

    if (target.scrollTo) {
      await page.evaluate((y) => window.scrollTo(0, y), target.scrollTo);
      // Let scroll-triggered reveals fire and settle.
      await new Promise((r) => setTimeout(r, 1200));
    }
    if (target.before) {
      await page.evaluate(target.before);
      await new Promise((r) => setTimeout(r, 600));
    }

    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 500));

    if (target.selector) {
      const el = await page.$(target.selector);
      if (!el) throw new Error(`selector not found: ${target.selector}`);
      await el.screenshot({ path: png });
    } else {
      await page.screenshot({ path: png });
    }

    const webp = png.replace(/\.png$/, ".webp");
    execFileSync("cwebp", ["-q", "82", "-quiet", png, "-o", webp]);
    const bytes = fs.statSync(webp).size;
    fs.unlinkSync(png);

    const dims = await page.evaluate(() => ({
      w: window.innerWidth,
      h: window.innerHeight,
    }));
    console.log(
      `  ok  ${slug}/${target.out}.webp  ${dims.w}x${dims.h}  ${Math.round(bytes / 1024)}KB`
    );
    return { slug, out: target.out, ...dims, bytes };
  } catch (err) {
    console.log(`  FAIL ${slug}/${target.out}: ${err.message}`);
    return null;
  } finally {
    await page.close();
  }
}

const filter = process.argv[2];
const browser = await puppeteer.launch({
  headless: true,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

const results = [];
for (const [slug, targets] of Object.entries(TARGETS)) {
  if (filter && !slug.includes(filter)) continue;
  console.log(slug);
  for (const target of targets) {
    results.push(await shoot(browser, slug, target));
  }
}

await browser.close();

const ok = results.filter(Boolean);
console.log(
  `\n${ok.length} captured, ${results.length - ok.length} failed, ` +
    `${Math.round(ok.reduce((a, r) => a + r.bytes, 0) / 1024)}KB total`
);
// A filtered run only re-shoots one project, so merge into the manifest
// already on disk rather than writing a file that has lost the other three.
const manifestPath = path.join(OUT, "manifest.json");
const existing = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : [];
const shot = ok.map(({ slug, out, w, h }) => ({ slug, out, w: w * 2, h: h * 2 }));
const merged = [
  ...existing.filter(
    (e) => !shot.some((s) => s.slug === e.slug && s.out === e.out)
  ),
  ...shot,
];
// Keep the file in the order the TARGETS table declares, so a diff stays readable.
const order = Object.entries(TARGETS).flatMap(([slug, targets]) =>
  targets.map((t) => `${slug}/${t.out}`)
);
merged.sort(
  (a, b) => order.indexOf(`${a.slug}/${a.out}`) - order.indexOf(`${b.slug}/${b.out}`)
);
fs.writeFileSync(manifestPath, JSON.stringify(merged, null, 2) + "\n");
