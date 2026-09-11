#!/usr/bin/env node
/*
  Render each study document to a PDF.

  The briefing is written to be forwarded, and a link is easy to lose in an
  inbox. This prints the real page rather than a separate layout, so the
  document and the site cannot drift apart, which is the same discipline the
  Birdham quote PDFs and The First Owner's Reference print edition use.


  Run with the site served locally:
    npm run build && npm start
    node scripts/build-study-pdfs.mjs           # everything
    node scripts/build-study-pdfs.mjs nimara    # one project

  Set BASE to point somewhere else, e.g. BASE=https://faro.is
*/

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.BASE || "http://localhost:3000";

const STUDIES = [
  { slug: "foreland-marine" },
  { slug: "nimara-pilates" },
  { slug: "first-owners-reference" },
  { slug: "birdham-carpentry" },
];

/*
  No running heads or folios.

  Chrome renders header and footer templates in an isolated document and ignores
  width and padding on the template root, so the content lands hard against the
  left edge and stops around 72 percent across, whatever is asked for. Flex,
  tables, percentages, px and mm were all tried and all produced the same
  layout. Rather than ship a misaligned rule on every page, the document does
  without: it opens on a title page, carries its own contents, and every section
  starts on a fresh page, so a reader is never lost. PDF viewers supply page
  numbers themselves.

  If this is revisited, measure the result rather than trusting the template CSS.
*/

const browser = await puppeteer.launch({ headless: true });
let total = 0;

const filter = process.argv[2];
let built = 0;

for (const { slug } of STUDIES) {
  if (filter && !slug.includes(filter)) continue;
  built += 1;
  const page = await browser.newPage();
  const url = `${BASE}/work/${slug}/study`;

  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);

  // Everything is lazily loaded below the fold; walk the page so every plate
  // is decoded before the print, then wait for the images to settle.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images]
        .filter((img) => !img.complete)
        .map((img) => new Promise((res) => {
          img.addEventListener("load", res, { once: true });
          img.addEventListener("error", res, { once: true });
        }))
    );
  });
  await new Promise((r) => setTimeout(r, 800));

  const dir = path.join(ROOT, "public/portfolio/study", slug);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `faro-${slug}-notes.pdf`);
  const raw = path.join(dir, `.${slug}-raw.pdf`);

  await page.pdf({
    path: raw,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: "18mm", right: "17mm", bottom: "18mm", left: "17mm" },
    preferCSSPageSize: false,
  });

  // Chrome embeds every plate at its full capture resolution, which produces a
  // 200MB file nobody can email. Downsample to 200dpi, which is more than a
  // laser printer resolves and leaves the diagrams sharp, since they are vector
  // and pass through untouched.
  const before = Math.round(fs.statSync(raw).size / 1024);

  // Text and the diagrams are vector and pass through untouched, so only the
  // screen plates are affected. 110dpi keeps them legible at reading size and
  // takes the document from something unsendable to something that fits in an
  // email.
  const quality = path.join(dir, ".quality.ps");
  fs.writeFileSync(
    quality,
    "<< /ColorImageDict << /QFactor 1.2 /Blend 1 " +
      "/HSamples [2 1 1 2] /VSamples [2 1 1 2] >>\n" +
      "   /GrayImageDict << /QFactor 1.2 /Blend 1 " +
      "/HSamples [2 1 1 2] /VSamples [2 1 1 2] >> >> setdistillerparams\n"
  );

  execFileSync("gs", [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.7",
    "-dDownsampleColorImages=true",
    "-dColorImageResolution=110",
    "-dDownsampleGrayImages=true",
    "-dGrayImageResolution=110",
    "-dAutoFilterColorImages=false",
    "-dColorImageFilter=/DCTEncode",
    "-dAutoFilterGrayImages=false",
    "-dGrayImageFilter=/DCTEncode",
    "-dDetectDuplicateImages=true",
    "-dNOPAUSE",
    "-dBATCH",
    "-dQUIET",
    `-sOutputFile=${out}`,
    quality,
    raw,
  ]);
  fs.unlinkSync(raw);
  fs.unlinkSync(quality);

  const kb = Math.round(fs.statSync(out).size / 1024);
  total += kb;
  console.log(
    `  ok  ${slug}  ${(kb / 1024).toFixed(1)}MB  (from ${(before / 1024).toFixed(0)}MB)`
  );
  await page.close();
}

await browser.close();
console.log(`\n${built} documents, ${(total / 1024).toFixed(1)}MB total`);
