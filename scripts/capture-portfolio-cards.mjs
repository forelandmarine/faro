#!/usr/bin/env node
/*
  Capture the portfolio plates: the wide card and the phone shot.

  The card is the plate that sits in the horizontal scroll on the landing page
  and at the top of each case study. The phone shot is the one the study
  documents set in a phone frame. Both go stale whenever a client site is
  redesigned, so they are shot from the live sites rather than kept by hand.

  Shot at 1600 by 1000 so the sites lay out at desktop width, with a 2x device
  pixel ratio, then reduced to the 1600 by 1000 PNG the pages expect. Shooting
  wide and reducing is what keeps the type crisp without the plate showing a
  phone layout.

  The phone shot is taken at 390 by 844, an iPhone viewport, at the same 2x and
  reduced the same way.

  Run with:
    node scripts/capture-portfolio-cards.mjs           # everything
    node scripts/capture-portfolio-cards.mjs nimara    # one project

  Requires puppeteer and sips, which ships with macOS.
*/

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/portfolio");
const PHONE_OUT = path.join(OUT, "expose");

const CARD = { width: 1600, height: 1000 };
const PHONE = { width: 390, height: 844 };
const DPR = 2;

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
 * Chat widgets, cookie bars and the like belong on the client's site and not
 * in a portfolio plate, so they are hidden for the shot.
 */
const HIDE = [
  "[class*='whatsapp' i]",
  "[aria-label*='WhatsApp' i]",
  "[id*='cookie' i]",
  "[class*='cookie-banner' i]",
];

/**
 * seedStorage writes local storage keys before the first navigation, which is
 * how a site's own "seen it, do not show me again" flags are set. It is the
 * honest way to take a returning visitor's view of a page rather than hiding
 * an element the client deliberately ships.
 */
const CARDS = [
  { out: "foreland", url: "https://forelandmarine.com/", phone: "foreland-mobile" },
  {
    out: "nimara",
    url: "https://nimarapilates.com/",
    phone: "nimara-mobile",
    seedStorage: { "nimara-founding-notice-2026-09": "dismissed" },
  },
  {
    out: "first-owners-reference",
    url: "https://firstownersreference.com/",
    phone: "for-mobile",
  },
  {
    out: "birdham",
    url: "https://birdhamcarpentry.co.uk/",
    phone: "birdham-mobile",
  },
  {
    out: "watermans",
    url: "https://www.watermansagency.com/",
    phone: "watermans-mobile",
    // The layout runs to within 48px of the window edge, so a 16:10 plate
    // loses the lockup to the 4:3 frame. Shot at 4:3 instead.
    card: { width: 1440, height: 1080 },
  },
];

async function shoot(browser, card, { size, dir, name }) {
  const page = await browser.newPage();
  await page.setViewport({ ...size, deviceScaleFactor: DPR });
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${name}.png`);

  try {
    if (card.seedStorage) {
      await page.evaluateOnNewDocument((pairs) => {
        for (const [k, v] of Object.entries(pairs)) {
          try {
            localStorage.setItem(k, v);
          } catch {
            /* storage can be refused; the shot is still worth taking */
          }
        }
      }, card.seedStorage);
    }
    await page.goto(card.url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.addStyleTag({ content: STILL });
    await page.addStyleTag({
      content: `${HIDE.join(", ")} { display: none !important; }`,
    });
    await page.evaluate(() => document.fonts.ready);
    // Preloaders and hero reveals want a moment before the plate is honest.
    await new Promise((r) => setTimeout(r, 4000));
    await page.screenshot({ path: file });
    execFileSync(
      "sips",
      ["-z", String(size.height), String(size.width), file, "--out", file],
      { stdio: "ignore" }
    );
    const kb = Math.round(fs.statSync(file).size / 1024);
    console.log(`  ok  ${name}.png  ${size.width}x${size.height}  ${kb}KB`);
  } catch (err) {
    console.log(`  FAIL ${name}: ${err.message}`);
  } finally {
    await page.close();
  }
}

const filter = process.argv[2];
const browser = await puppeteer.launch({
  headless: true,
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const card of CARDS) {
  if (filter && !card.out.includes(filter)) continue;
  await shoot(browser, card, { size: card.card ?? CARD, dir: OUT, name: card.out });
  if (card.phone) {
    await shoot(browser, card, {
      size: PHONE,
      dir: PHONE_OUT,
      name: card.phone,
    });
  }
}

await browser.close();
