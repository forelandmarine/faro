#!/usr/bin/env node
/*
  Measure the four live client sites.

  Numbers on the study pages should be measured rather than asserted, so this
  loads each site cold, with the cache disabled, and records what actually came
  down the wire and when the largest element painted.

  Two runs per URL, the better one kept, to take the edge off network variance.
  The output is written to src/content/studies/measurements.json and read by the
  study documents, so a figure on the page can always be traced to a run.

  Run with:
    node scripts/measure-sites.mjs
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SITES = {
  "foreland-marine": "https://forelandmarine.com/refit",
  "nimara-pilates": "https://nimarapilates.com/",
  "first-owners-reference": "https://firstownersreference.com/01-reality-of-ownership",
  "birdham-carpentry": "https://birdhamcarpentry.co.uk/",
};

async function measure(browser, url) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false);

  let transfer = 0;
  const requests = new Set();
  page.on("response", async (res) => {
    requests.add(res.url());
    try {
      const len = res.headers()["content-length"];
      if (len) transfer += Number(len);
      else {
        const buf = await res.buffer();
        transfer += buf.length;
      }
    } catch {
      /* redirects and aborted bodies have nothing to weigh */
    }
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const vitals = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const nav = performance.getEntriesByType("navigation")[0] || {};
        const paints = {};
        for (const p of performance.getEntriesByType("paint")) {
          paints[p.name] = Math.round(p.startTime);
        }
        let lcp = 0;
        try {
          const po = new PerformanceObserver((list) => {
            for (const e of list.getEntries()) lcp = Math.round(e.startTime);
          });
          po.observe({ type: "largest-contentful-paint", buffered: true });
        } catch {
          /* not supported */
        }
        setTimeout(
          () =>
            resolve({
              domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
              load: Math.round(nav.loadEventEnd || 0),
              firstContentfulPaint: paints["first-contentful-paint"] || 0,
              largestContentfulPaint: lcp,
              domNodes: document.getElementsByTagName("*").length,
            }),
          700
        );
      })
  );

  await page.close();
  return { ...vitals, transferKB: Math.round(transfer / 1024), requests: requests.size };
}

const browser = await puppeteer.launch({ headless: true });
const out = {};

for (const [slug, url] of Object.entries(SITES)) {
  const runs = [];
  for (let i = 0; i < 2; i++) {
    try {
      runs.push(await measure(browser, url));
    } catch (err) {
      console.log(`  ${slug} run ${i + 1} failed: ${err.message}`);
    }
  }
  if (!runs.length) continue;
  // Keep the faster run by largest-contentful-paint.
  const best = runs.sort(
    (a, b) =>
      (a.largestContentfulPaint || a.load) - (b.largestContentfulPaint || b.load)
  )[0];
  out[slug] = { url, ...best };
  console.log(
    `${slug}\n  ${best.transferKB}KB over ${best.requests} requests, ` +
      `FCP ${best.firstContentfulPaint}ms, LCP ${best.largestContentfulPaint}ms, ` +
      `${best.domNodes} DOM nodes`
  );
}

await browser.close();

fs.writeFileSync(
  path.join(ROOT, "src/content/studies/measurements.json"),
  JSON.stringify(out, null, 2) + "\n"
);
console.log("\nwritten to src/content/studies/measurements.json");
