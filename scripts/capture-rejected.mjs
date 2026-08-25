#!/usr/bin/env node
/*
  Rasterise the rejected identity work.

  These files set their wordmarks as live <text> in a webfont. An SVG placed in
  an <img> is an isolated document and never sees the page's fonts, so the
  sketches have to be rendered in a browser with the right faces loaded and
  captured as images. That is all this script does.

  The sources are kept alongside the output so the plates can be rebuilt.

  Run with:
    node scripts/capture-rejected.mjs

  Requires puppeteer and cwebp.
*/

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STUDY = path.join(ROOT, "public/portfolio/study");

const FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=Cormorant+Garamond:wght@300;400" +
  "&family=DM+Sans:wght@400;500" +
  "&family=Spectral:wght@400;500" +
  "&family=Hanken+Grotesk:wght@400;500" +
  "&display=block";

const GROUPS = [
  { slug: "nimara-pilates", ground: "#EFE6D8", width: 900 },
  { slug: "birdham-carpentry", ground: "#F3EDDF", width: 900 },
];

async function render(browser, slug, file, ground, width) {
  const dir = path.join(STUDY, slug, "rejected");
  const svg = fs.readFileSync(path.join(dir, file), "utf8");
  const name = file.replace(/\.svg$/, "");

  const page = await browser.newPage();
  await page.setViewport({ width, height: 400, deviceScaleFactor: 2 });

  // The SVG is inlined into the document, so it inherits the loaded webfonts.
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8">
     <link rel="stylesheet" href="${FONTS}">
     <style>
       html,body{margin:0;padding:0;background:${ground}}
       #plate{display:inline-block;padding:28px 36px;background:${ground}}
       #plate svg{display:block;width:100%;height:auto;max-width:${width - 72}px}
     </style></head>
     <body><div id="plate">${svg}</div></body></html>`,
    { waitUntil: "networkidle0" }
  );
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));

  const el = await page.$("#plate");
  const png = path.join(dir, `${name}.png`);
  await el.screenshot({ path: png, omitBackground: false });

  const webp = png.replace(/\.png$/, ".webp");
  execFileSync("cwebp", ["-q", "88", "-quiet", png, "-o", webp]);
  const box = await el.boundingBox();
  fs.unlinkSync(png);
  await page.close();

  console.log(
    `  ok  ${slug}/rejected/${name}.webp  ${Math.round(box.width)}x${Math.round(box.height)}  ` +
      `${Math.round(fs.statSync(webp).size / 1024)}KB`
  );
  return {
    slug,
    name,
    w: Math.round(box.width * 2),
    h: Math.round(box.height * 2),
  };
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

const manifest = [];
for (const { slug, ground, width } of GROUPS) {
  const dir = path.join(STUDY, slug, "rejected");
  if (!fs.existsSync(dir)) continue;
  console.log(slug);
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".svg"))
    .sort();
  for (const file of files) {
    manifest.push(await render(browser, slug, file, ground, width));
  }
}

await browser.close();
fs.writeFileSync(
  path.join(STUDY, "rejected-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
console.log(`\n${manifest.length} plates rendered`);
