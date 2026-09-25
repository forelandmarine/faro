# Study document sources

The five briefing documents at `/work/<slug>/study` state a lot of measurements.
This file records where each figure came from, so any of them can be checked or
corrected later. The rule applied throughout: every number is either read from
the client repository or measured from the shipped asset. Nothing was written
from memory, and where a figure could not be sourced it was left out rather than
estimated.

## Regenerating the evidence

Four scripts produce everything measured or captured on these pages. Re-run them
rather than editing figures by hand.

| Command | What it does |
|---|---|
| `npm run capture:screens` | Shoots the five live sites at 1440px, converts to WebP |
| `npm run capture:rejected` | Rasterises the rejected identity sketches with their original webfonts |
| `npm run measure` | Loads each live site cold and writes `src/content/studies/measurements.json` |
| `npm run pdf` | Renders each study page to a downloadable A4 PDF |

The PDF and measurement scripts need the site served locally first
(`npm run build && npm start`). The capture scripts need `cwebp`, the PDF script
needs Ghostscript.

## Timelines

Every date on the study pages comes from the client repository's own commit
history, read with `git log`, not reconstructed afterwards. That is what makes
the Birdham times accurate to the minute and the Nimara naming sequence
checkable. Only commits that changed a decision are listed; the summary figures
(commit counts, elapsed spans) are counted across the whole history.

Two naming histories were recovered this way and were not previously recorded
anywhere: Nimara shipped as Re:Connect Pilates on 2 April 2026, became BE:LiVE on
7 April and Nimara on 9 April; Birdham opened as Halnaker Construction with a
windmill mark and was renamed at 13:16 on 22 July 2026. The replaced Halnaker
artwork was recovered from the pre-rename commit and is published on the page.

## Performance

`src/content/studies/measurements.json` is written by the measurement script and
read by `src/content/studies/measured.ts`, so no performance figure is typed into
a content file. Each site is loaded twice in headless Chrome at 1440px with the
cache disabled and the better run kept. The pages state the method, including
that this is a desktop connection and the paint figures are a floor rather than
field data.

## Method

**Ink boxes.** The bounding boxes quoted in the construction sheets are the
extents of the drawn path, not the artboard. They were obtained by parsing each
SVG's path data and flattening every cubic and quadratic segment into line
segments before taking the extents. Using control points directly overestimates
a curve's extent, so that approach was rejected. The pen position is carried
across subpath boundaries, which matters because these files use relative
coordinates throughout.

Two independent cross-checks confirmed the method. The Foreland lighthouse
measures 0.6000 to 1 inside the lockup and 0.6001 to 1 as a standalone file,
which establishes that they are the same drawing. The Birdham gull measures
2.187 to 1 on the artboard, matching the ratio recorded in a comment in the
client's own source.

**Contrast ratios.** Computed at render time in `src/lib/colour.ts` from the hex
values on the page, under WCAG 2.1. The implementation was validated against
known reference pairs (#000 on #fff at 21.00, #767676 on #fff at 4.54, #595959
on #fff at 7.00, #fff on #00f at 8.59). No ratio in these documents is quoted
from a brand document.

## Foreland Marine

| Section | Source |
|---|---|
| Naming, positioning, taglines | `foreland-marine-v2/brand-identity-kit.md`, version 1.0, April 2026 |
| Naming origin, long form | `foreland-marine-v2/src/app/page.tsx` |
| Minimum size, clear space, the five don'ts | brand kit, Logo section |
| Palette, RGB, opacity system, colour rules | brand kit, Colour Palette section |
| Type scale, weights, font stack, rules | brand kit, Typography section |
| Button, card, header and icon specifications | brand kit, UI Components and Iconography |
| Scroll animation, parallax, transitions | brand kit, Animation section |
| Photography treatment | brand kit, Photography section |
| Voice rules | brand kit, Voice and Tone section |
| Lockup and icon geometry | measured from `public/logos/foreland-marine-white.svg` and `foreland-icon-white.svg` |
| Page count, tools, API routes | directory listing of `src/app` |

Lockup: viewBox `96 430 850 145`, group transform `translate(0 128)`. Ink
`x 107 to 917`, `y 447.32 to 576.68` after the translate, so 810 by 129.36.
Lighthouse cluster `x 107 to 184.62`, giving 77.62 by 129.36 at 0.6000 to 1.
Gap to the first letter 48.67. Wordmark 683.71 wide on a cap height of 68.9.
38 subpaths, one path, no live text.

Note: the drawn ink exceeds the stated viewBox by 1.68 units at the bottom edge.
This is a property of the source file and is reproduced rather than corrected.

## Nimara

| Section | Source |
|---|---|
| Audit figures, category clichés | `nimara-pilates/brand-identity-kit/competitor-audit.md` |
| Palette, withdrawn tokens, semantic mapping | `brand-identity-kit/brand-system.md`, section 2 |
| Type families, scale, wordmark spec | `brand-system.md`, section 3 |
| Spacing scale, grid, vertical rhythm | `brand-system.md`, section 4 |
| Lockups and small mark logic | `brand-system.md`, section 5 |
| Exploration count | file count in `brand-identity-kit/explorations` and `identity-v3` |
| Mark cuts and stroke weights | `asset-library/01-marks/svg`, stroke-width attributes |
| Asset library counts | file counts per folder |
| Print artwork sizes | filenames in `asset-library/07-print` |
| Studio facts, capacity, languages | `brand.yaml`, `src/lib/i18n.ts`, `src/lib/blog.ts` |
| Motion values | `src/components/FilmGrain.tsx`, `SmoothScroll.tsx`, `SplitText.tsx`, `MagneticButton.tsx`, `TiltCard.tsx` |

Leopardess: viewBox `0 0 600 360`, ink `x 87.63 to 516.17`, `y 36.90 to 344.70`,
so 428.54 by 307.80 at 1.3923 to 1. Two subpaths. Default cut is filled with no
stroke; the fine and heavy cuts carry stroke widths of 1.3 and 3.0.

Translation layer measured at 1,868 lines. Asset library measured at 553 files.

### Corrections applied

The brand-system document describes the small mark as a Mallorquin arch, marked
to be decided. That entry predates the identity lock and was never revised; the
leopardess is what ships in the asset library and on the site. The study
document is written from the shipped assets and says so explicitly.

### Open issue, not published

The contrast table in `brand-system.md` section 2 does not survive computation.
Sage on sand is 2.5 to 1, not the 5.7 the document claims, and sage on cream is
2.8, not 6.5. Stone on sand is 4.4 rather than 4.6, marginally below AA. The
document's summary line, that every brand element meets AA or better, is not
correct for sage used as a text colour on the light surfaces, which is where the
semantic mapping directs it.

The study page therefore tables only the pairs actually used for reading text
and does not assert an AA pass for sage. This is raised with the client
separately. Do not add sage to that contrast table until the underlying value is
resolved.

## The First Owner's Reference

| Section | Source |
|---|---|
| Palette and type tokens | `firstownersreference/app/globals.css` |
| Font families | `app/layout.tsx` |
| Prose measure, rail, container | `globals.css`, container tokens |
| Chapter list | `content/sections.json` |
| Glossary count | `lib/glossary.ts`, 50 entries |
| Tools | directory listing of `app/tools` |
| Schema types | grep for `"@type"` across `app`, `lib`, `components`, 20 distinct |
| Page geometry, columns, folios | `app/print/print.css`, `@page` rules |
| Print stylesheet length | 2,565 lines |
| Build pipeline | `scripts/build-print.mjs` header, `print/README.md` |
| Extent and trim | `print/README.md`, proof of 8 August 2026 |
| Materials and edition | `app/colophon/page.tsx`, `app/press/page.tsx` |

Publisher's mark: viewBox `0 0 200 200`, ink 72.01 by 120, identical to the
Foreland icon.

### Correction applied

The case study previously listed Paged.js in the stack and described the book as
paginated by it. Paged.js is not a dependency and does not appear anywhere in
the repository. The pipeline is Chrome's own CSS Paged Media implementation
driven by Puppeteer, with sips, poppler, Ghostscript and pypdf around it. The
stack entry in `work.ts` was corrected to Puppeteer and Ghostscript.

## Birdham Carpentry & Building

| Section | Source |
|---|---|
| Mark path, viewBox, constraints | `birdham-carpentry/lib/brand.ts` |
| Palette and paint references | `tailwind.config.ts`, locked 22 July 2026 |
| Typographic tokens | `tailwind.config.ts`, letterSpacing and maxWidth |
| Fonts and weights | `app/layout.tsx` |
| Lockup and seal geometry | `components/Logo.tsx`, `public/brand/logo-horizontal.svg` |
| Services and areas | `lib/site.ts` |
| Estimating engine | `lib/pricing.ts` |
| Deposit default | `app/admin/settings/actions.ts` |

Gull: viewBox `0 0 376.9 172.3`, ink `x 0.59 to 376.89`, `y 0 to 170.51`, so
376.30 by 170.51 at 2.2069 to 1. One subpath, filled, no stroke.

Multipliers: standard 1.00, premium 1.25, heritage 1.45. Margin 0.18. Band 0.15.

Deposits: the quote page publishes 10 to 15 percent
(`app/(site)/quote/page.tsx`). The admin default is 12.5 percent
(`app/admin/settings/actions.ts`), adjustable per quote. Both figures are
correct and describe different things, so the study document states both.

An earlier revision of this file recorded the 10 to 15 percent figure as an
error in the case study copy. That was wrong: it is the client's own published
band, and it was found by reading the captured screenshot of the live quote
page. Corrected here and on the study page.

### Note on the brand manual

Birdham has no written brand manual. The constraints stated in the study
document are the ones recorded in the source of the mark and enforced by the
components that place it, and the document says so rather than implying a rules
page that does not exist.

### Source inconsistency, noted on the page

The stone tone exists at two values. `lib/brand.ts` carries `#A9A18E`, which
computes to 2.20 to 1 on paper. `tailwind.config.ts` carries `#726A5A` at 4.58,
with a comment recording that it was darkened to meet AA. The site ships the
darkened value, so the study document uses it and flags the discrepancy.

## Watermans

| Section | Source |
|---|---|
| Palette, token names, duotone, band densities, measures | `watermans/src/app/globals.css` |
| Typeface, width axis | `src/app/layout.tsx`, `.display`, `.meta`, `.figure-num` in globals.css |
| Type scale | `globals.css` and the clamp values in `ui.tsx`, `Port.tsx`, `app/page.tsx` |
| Mark geometry | `src/components/Mark.tsx` |
| Lockup measurement | `src/components/Header.tsx`, `useLockup` |
| Favicon | `src/app/icon.svg` |
| Port template order | `src/components/Port.tsx` |
| Planner rules and tariff | `src/lib/arrival.ts`, PLA Rates and Charges 2025, checked 21 September 2026 |
| Live data | `src/lib/lifts.ts`, `src/lib/tide.ts`, `src/components/SavvyChart.tsx` |
| Timeline, fonts and palettes tried | `git log`, and `layout.tsx` and `globals.css` read at each commit |

Flag: viewBox `0 0 40 48`. Staff `x 4, y 2 to 46`, stroke 2.6, round caps, so
ink `x 2.7 to 5.3`, `y 0.7 to 47.3`. Flag rectangle `x 4 to 38, y 4 to 27`,
stroke 2.4, so outer edge `x 2.8 to 39.2, y 2.8 to 28.2`, 36.4 by 25.4. Whole
ink box 36.5 by 46.6. Computed from the stroke geometry rather than parsed path
data, because the mark is drawn from a line and two rectangles. The two SVG
files in `public/portfolio/expose/marks/` reproduce `Mark.tsx` with the CSS
variables resolved to their hex values.

Font families loaded across the history (13): IBM Plex Sans, IBM Plex Mono,
Libre Caslon Text, Libre Caslon Display, Archivo Narrow, Nunito Sans, DM Sans,
DM Mono, Newsreader, Schibsted Grotesk, Archivo, Public Sans, Libre Franklin.
Ten distinct type settings between 21 September 13:19 and 22 September 20:58.

The repository README still describes the 21 September Foreland Group rebuild
(Nunito Sans, navy ground). It is out of date; the study page says so and uses
the tokens in `globals.css`.

Signal red is used in two places: the fly of the flag and the status rule in
`EnquiryForm.tsx`. The study page states both.

Vector set (added 25 September 2026): `watermans/brand/build.py` draws the
marks and lockups with the type shaped by HarfBuzz and outlined from
`brand/fonts/Archivo.ttf`. Option B (`mark-staff.svg`, 100 unit square):
staff `x 12 to 17, y 8 to 92`; flag block `x 16.5 to 91, y 8 to 56`; white
`x 17 to 51.8`, red `x 51.5 to 86`, both `y 13 to 51`, so a 5 unit border on
the top, bottom and fly, and no rule between the halves (commit e39cbb2).
Lockup type: WATERMANS wght 560, wdth 112, tracking 0.14; YACHT AGENTS wght
450, wdth 112, tracking 0.34. The stacked lockup (`stacked-staff.svg`) is the
email signature logo, served as `public/sig/lockup.png`. The three SVGs and
the options sheet on the study page are copied from `brand/` unchanged. The
full signature is not shown because it carries a director's mobile number.

