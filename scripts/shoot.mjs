#!/usr/bin/env node
/*
  Development helper: screenshot a local page, optionally anchored to a section.

    node scripts/shoot.mjs <path> [anchor] [offset] [out]

  Example:
    node scripts/shoot.mjs work/birdham-carpentry/study name 420 rejected

  Writes a PNG to .shots/, which is gitignored. Not part of the build.
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [, , route = "", anchor, offsetArg = "0", name = "shot"] = process.argv;
const offset = Number(offsetArg);

const dir = path.join(ROOT, ".shots");
fs.mkdirSync(dir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1100, deviceScaleFactor: 2 });
await page.goto(`http://localhost:3000/${route}`, {
  waitUntil: "networkidle2",
  timeout: 45000,
});
await page.evaluate(() => document.fonts.ready);

if (anchor && anchor !== "-") {
  await page.evaluate(
    ([a, o]) => {
      const el = document.getElementById(a) || document.querySelector(a);
      if (el) el.scrollIntoView({ block: "start" });
      window.scrollBy(0, o);
    },
    [anchor, offset]
  );
} else if (offset) {
  await page.evaluate((o) => window.scrollTo(0, o), offset);
}

// Let lazy images in view finish before shooting.
await new Promise((r) => setTimeout(r, 1500));

const out = path.join(dir, `${name}.png`);
await page.screenshot({ path: out });
await browser.close();
console.log(out);
