import type { MarkGeometry, StudyDoc } from "./types";
import { measuredBlocks } from "./measured";

/**
 * Sources: nimara-pilates/brand-identity-kit (brand-system.md, brand.yaml,
 * competitor-audit.md, the identity-v3 exploration set and the asset library),
 * plus the application source. Ink boxes are measured from the path data.
 * See docs/study-sources.md.
 */

const SAND = "#EFE6D8";
const CREAM = "#F7F3ED";
const INK = "#1A1A1A";
const WARM_BLACK = "#0F0E0C";
const STONE = "#6B6B60";
const SAGE = "#7E9A7A";
const OAK = "#C2A87A";

const CINZEL = '"Cinzel", serif';
const NEWSREADER = '"Newsreader", serif';
const DM_SANS = '"DM Sans", sans-serif';

const leopardess: MarkGeometry = {
  src: "/portfolio/expose/marks/nimara-leopardess-ink.svg",
  viewBox: "0 0 600 360",
  ink: { x: 87.63, y: 36.9, w: 428.54, h: 307.8 },
  ground: SAND,
  rule: INK,
};

export const nimaraPilatesStudy: StudyDoc = {
  slug: "nimara-pilates",
  title: "Nimara",
  subtitle:
    "A reformer pilates brand built to be the one studio in its category that does not look like the others, drawn from a forty brand audit and a thirty-six study exploration.",
  client: "Nimara",
  sector: "Pilates and wellness",
  year: "2026",
  scope: [
    "Competitor audit",
    "Brand identity",
    "Asset library",
    "Website design",
    "Development",
    "Four language localisation",
    "Print artwork",
  ],
  liveUrl: "https://nimarapilates.com",
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Newsreader:ital,wght@0,200;0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600&display=swap",

  glance: {
    mark: {
      label: "The mark, ink on sand",
      note: "The Mallorquin leopardess, default colourway",
      src: leopardess.src,
      bg: SAND,
      wide: true,
      height: 96,
    },
    palette: [
      { name: "Sand", hex: SAND, role: "Primary surface" },
      { name: "Cream", hex: CREAM, role: "Cards and light sections" },
      { name: "Ink", hex: INK, role: "Text and wordmark" },
      { name: "Stone", hex: STONE, role: "Secondary text" },
      { name: "Sage", hex: SAGE, role: "The only accent" },
      { name: "Oak", hex: OAK, role: "Rules and borders only" },
    ],
  },

  sections: [
    {
      id: "audit",
      number: "01",
      title: "The audit",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The work started with a review of more than forty studios across Mallorca, London, Paris, the global aspirational tier and adjacent wellness brands, each recorded by logo, typeface, palette, motif and positioning line. The point was not inspiration. It was to establish, before anything was drawn, exactly which decisions would make Nimara indistinguishable from its competitors.",
            "The audit found a category converging hard. Cream or bone backgrounds with sage or forest green appeared in eighteen of forty studios. Lowercase sans-serif wordmarks appeared in twenty-eight of forty, and at thumbnail size they are not separable from one another. Hand-drawn brushstroke marks appeared in seven, and lotus, leaf or wave motifs in five, both reading as yoga rather than pilates.",
            "One gap was consistent across all three cities. Nobody at the top of the category was using an editorial serif, and nobody was using a figurative mark with any heraldic weight to it. That gap became the brief.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "What the field was doing",
              measures: [
                { label: "Cream or bone with sage green", value: "18 of 40" },
                { label: "Lowercase sans-serif wordmark", value: "28 of 40" },
                { label: "Brushstroke or single ink line", value: "7 of 40" },
                { label: "Lotus, leaf or wave motif", value: "5 of 40" },
                { label: "Editorial serif", value: "None" },
              ],
            },
            {
              title: "What Nimara does instead",
              measures: [
                { label: "Display face", value: "Editorial serif" },
                { label: "Wordmark", value: "Roman capitals" },
                { label: "Mark", value: "Figurative, heraldic" },
                { label: "Greens in the palette", value: "One" },
                { label: "Case for headings", value: "Sentence, never title" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "name",
      number: "02",
      title: "The name",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The studio was not called Nimara first, and the record of that is unusually clear. The site was built and shipped in full under the name Re:Connect Pilates, renamed five days later to BE:LiVE, and renamed again two days after that to Nimara. Three names in eight days, with a complete website rebuilt around each one.",
            "The first two share a fault that the audit had already flagged. Both are constructions rather than words, both use internal punctuation as a device, and both describe a benefit. A studio called Re:Connect is telling you what it will do for you, which is the register of a wellness advert. Nimara does not mean anything, which is the point: it can be given a meaning rather than arriving with one, and it holds a Roman capital setting where a colon cannot.",
            "The macron came later still. NIMĀRA rather than NIMARA gives the eye a reason to slow down on a word it does not recognise, and it fixes the stress on the second syllable. It is the smallest decision in the identity and one of the few that is genuinely non-negotiable.",
          ],
        },
        {
          kind: "timeline",
          entries: [
            {
              date: "2 April 2026",
              label: "Built as Re:Connect Pilates",
              note: "A complete site, shipped under the first name, with a brand identity kit alongside it",
            },
            {
              date: "7 April 2026",
              label: "Renamed to BE:LiVE",
              note: "A second constructed name, carrying the same punctuation device",
            },
            {
              date: "9 April 2026",
              label: "Renamed to Nimara",
              note: "The name that held. The wordmark work starts here",
              pivot: true,
            },
            {
              date: "10 April 2026",
              label: "Domain and project renamed",
              note: "nimarapilates.com, with the hosted assets and signatures following",
            },
            {
              date: "22 August 2026",
              label: "Copy pass across all four languages",
              note: "Fluent British English as the source, with the three translations reworked to match",
            },
            {
              date: "7 September 2026",
              label: "Opening print goes to press",
              note: "The opening flyer, the discovery flyer and the window vinyl, all drawn off the same system",
            },
            {
              date: "11 September 2026",
              label: "The studio opens",
              note: "Booking, retail and the timetable go live on the site, and the pre-launch copy comes off",
              pivot: true,
            },
          ],
          summary: [
            { label: "Commits", value: "402" },
            { label: "First to opening", value: "23 weeks" },
            { label: "Names", value: "3" },
            { label: "Days to settle", value: "8" },
          ],
          source:
            "Dates taken from the project's commit history. The two earlier names are still in it.",
        },
      ],
    },

    {
      id: "exploration",
      number: "03",
      title: "The exploration",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Thirty-six numbered studies were drawn before anything was locked. The first eight set the broad direction: an editorial serif, an architectural monogram, an organic handcrafted route, a modernist geometric route, and four typographic devices. The remaining studies narrowed the figurative mark, working through Mallorquin architectural motifs, the persiana shutter, ironwork, paired arches and stone reveals, before turning to the leopardess.",
            "The leopardess itself was drawn thirteen ways: profile silhouette, line, guardant, engraving, sigil, vignette, passant, eye, rosette, couchant, mask, ridge and cartouche. The engraved, rosette and cartouche versions carry internal detail that fills in the moment the mark is reduced, and they were set aside on that basis. The form that locked is the leopardess mid-stretch, drawn as an open line.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The first eight are worth showing, because they are dated in a way that is easy to verify. Six of the eight set the wordmark in Cormorant Garamond, the face that was later replaced by Newsreader. Three use the mid-sage that the audit had already identified as the colour shared by eighteen of the forty studios, and which was struck out of the palette at the lock. None of them carry the macron: they all read NIMARA rather than NIMĀRA, because the macron was not yet part of the name.",
            "In other words, the sketches still contain three of the decisions the finished brand exists to avoid. That is what an exploration set is for.",
          ],
        },
        {
          kind: "rejected",
          bg: SAND,
          plates: [
            {
              src: "/portfolio/study/nimara-pilates/rejected/01-editorial-serif.webp",
              label: "Editorial serif",
              note: "The direction that eventually won, in its earliest and least resolved form",
              width: 744,
              height: 250,
              carries: ["Cormorant", "Withdrawn sage", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/02-architectural-monogram.webp",
              label: "Architectural monogram",
              note: "A built form rather than a drawn one",
              width: 744,
              height: 250,
              carries: ["Withdrawn sage", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/03-organic-handcrafted.webp",
              label: "Organic handcrafted",
              note: "Set in upper and lower case, the softest of the eight",
              width: 744,
              height: 250,
              carries: ["Cormorant", "Withdrawn sage", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/04-modernist-geometric.webp",
              label: "Modernist geometric",
              note: "The sans-serif route the audit found in twenty-eight of forty studios",
              width: 744,
              height: 250,
              carries: ["No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/05-the-spine.webp",
              label: "The spine",
              note: "A vertical rule carrying the wordmark",
              width: 744,
              height: 312,
              carries: ["Cormorant", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/06-the-bracket.webp",
              label: "The bracket",
              note: "Centred, enclosed, closer to a hotel identity",
              width: 744,
              height: 312,
              carries: ["Cormorant", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/07-the-volume.webp",
              label: "The volume",
              note: "Reversed out of a solid ground",
              width: 744,
              height: 312,
              carries: ["Cormorant", "No macron"],
            },
            {
              src: "/portfolio/study/nimara-pilates/rejected/08-the-masthead.webp",
              label: "The masthead",
              note: "The publication route, which survives in how the site is organised",
              width: 744,
              height: 312,
              carries: ["Cormorant", "No macron"],
            },
          ],
        },
        {
          kind: "note",
          text: "The brand-system document still describes the small mark as a Mallorquin arch, marked to be decided. That entry predates the lock and was never revised. The leopardess is what ships, in the asset library and on the site, so this document is written from the shipped assets rather than from the older text.",
        },
      ],
    },

    {
      id: "mark",
      number: "04",
      title: "The mark",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The mark is a Mallorquin leopardess mid-stretch, drawn as an open line with no ornament and no enclosing shape. It carries the identity from the website header up to a one metre window sticker.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "The mark, ink on sand",
              note: "The default colourway",
              src: leopardess.src,
              bg: SAND,
            },
            {
              label: "Reversed",
              note: "Cream on warm black, for dark and immersive sections",
              src: "/portfolio/expose/marks/nimara-leopardess-cream.svg",
              bg: WARM_BLACK,
            },
            {
              label: "Sage",
              note: "The accent colourway, on cream",
              src: "/portfolio/expose/marks/nimara-leopardess-sage.svg",
              bg: CREAM,
            },
            {
              label: "Primary horizontal lockup",
              note: "Mark, NIMĀRA in Cinzel with the macron, sub-line in tracked DM Sans",
              src: leopardess.src,
              bg: SAND,
              wide: true,
              height: 88,
              wordmark: {
                text: "NIMĀRA",
                sub: "REFORMER PILATES",
                css: CINZEL,
                subCss: DM_SANS,
                color: INK,
                subColor: "rgba(26,26,26,0.62)",
                tracking: "0.269em",
                subTracking: "0.4em",
              },
            },
          ],
        },
        {
          kind: "construction",
          geometry: leopardess,
          module: { value: 76.95, label: "A quarter of the mark height" },
          caption:
            "The leopardess on its 600 by 360 unit artboard. The drawn ink measures 428.54 by 307.80 units, a ratio of 1.392 to 1, and sits off centre on the artboard with more air at the top than the bottom because the raised forepaw needs the room. The mark is always sized by height, never by width, so that ratio is the only proportion that has to be respected.",
          notes: [
            { label: "Artboard", value: "600 × 360", note: "viewBox units" },
            { label: "Drawn ink", value: "428.54 × 307.80" },
            { label: "Artboard air, top", value: "36.90 units" },
            { label: "Artboard air, left", value: "87.63 units" },
            { label: "Default cut", value: "Outlined", note: "Line converted to fill, no stroke" },
            { label: "Stroked cuts", value: "1.3 and 3.0", note: "Fine and heavy, in artboard units" },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The default cut carries no stroke at all. The drawn line has been converted to outlines and filled as an even-odd band, so the file reproduces as a line drawing without depending on how a renderer handles stroke widths. That is what the website and most print work use.",
            "Two stroked cuts sit alongside it. A fine cut at a 1.3 unit stroke is drawn for embroidery and foil blocking, where a line has to be given a thickness the machine can follow. A heavy cut at 3.0 units is drawn for large format, where a fine line disappears at viewing distance.",
            "A line drawing has one genuine weakness, and this one has it: below roughly forty-eight pixels the band closes up and the animal is no longer readable. Rather than pretend otherwise, a fourth cut exists for small sizes. It is a solid silhouette built from the outer contour of the outline mark's own band, so the pose and the grid are identical, measuring the same 428.54 by 307.80 units. It is a single subpath with no fill-rule dependency, which means it renders the same way everywhere, and line weights do not apply to it. This is the cut the favicons and app icons use.",
          ],
        },
        {
          kind: "sizes",
          src: leopardess.src,
          widths: [16, 32, 48, 64, 120, 220],
          bg: SAND,
          caption:
            "The outline cut, run down to favicon sizes. It is comfortable from about sixty-four pixels and gone by sixteen, and this test is the reason the silhouette cut exists. Judging a mark at presentation size and shipping it without this check is the usual mistake.",
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "The silhouette cut",
              note: "Built from the outer contour of the outline band",
              src: "/portfolio/expose/marks/nimara-leopardess-silhouette.svg",
              bg: "#3E5A45",
            },
            {
              label: "At 48 pixels",
              note: "Where the outline cut begins to close up",
              src: "/portfolio/expose/marks/nimara-leopardess-silhouette.svg",
              bg: "#3E5A45",
              height: 29,
            },
            {
              label: "At 32 pixels",
              note: "Still legible as an animal",
              src: "/portfolio/expose/marks/nimara-leopardess-silhouette.svg",
              bg: "#3E5A45",
              height: 19,
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The favicon places that silhouette on a solid tile: the mark in the lighter sage on a deep green ground, inset 22 units on a 360 unit square, so the animal occupies 316 of the 360 and reads as a single shape in a browser tab. Cuts are supplied at 16, 32, 48 and 64 pixels, with an Apple touch icon at 180.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The wordmark is the most controlled element in the system and does not flex. It is set in Cinzel at 400 on the web and Trajan Pro in production print, always in capitals, always with the macron over the second A. The macron is part of the name rather than a decorative flourish, and removing it is not a permitted variation.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Wordmark",
              measures: [
                { label: "Web face", value: "Cinzel 400" },
                { label: "Print face", value: "Trajan Pro Regular" },
                { label: "Setting", value: "NIMĀRA, all capitals" },
                { label: "Tracking", value: "14 / 52 em", note: "Scales proportionally" },
                { label: "Clear space", value: "0.5 × cap height", note: "On every side" },
                { label: "Minimum size", value: "100px, 25mm" },
              ],
            },
            {
              title: "Sub-line",
              measures: [
                { label: "Face", value: "DM Sans 500" },
                { label: "Setting", value: "REFORMER PILATES, caps" },
                { label: "Tracking", value: "0.4em" },
                { label: "Size", value: "10 / 56 of the wordmark" },
                { label: "Colour", value: "Ink at 62%" },
                { label: "Below minimum", value: "Mark alone, no wordmark" },
              ],
            },
          ],
        },
        {
          kind: "note",
          text: "The brand system sets a clear space rule for the wordmark, half its cap height on every side, and none for the mark. That gap is deliberate rather than an oversight: the leopardess is placed at a size and a position by whatever surface it sits on, from a nav bar to a one metre window sticker, and a fixed exclusion zone would be wrong at one end of that range or the other. The wordmark, which is always set at a known size relative to its own cap height, can carry a rule that holds everywhere.",
        },
        {
          kind: "prose",
          paragraphs: [
            "What the mark does have is a short list of things that are not permitted, all of which follow from it being one drawing used at every size rather than a family of drawings.",
          ],
        },
        {
          kind: "misuse",
          src: leopardess.src,
          bg: SAND,
          ink: INK,
          items: [
            { kind: "stretch", label: "Never scaled on one axis. The 1.392 to 1 ratio is fixed" },
            { kind: "rotate", label: "No rotation. The pose is the mark" },
            { kind: "recolour", label: "Ink, cream or sage. No other colourway exists" },
            { kind: "shadow", label: "No shadows, gradients or outlines added to the line" },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "There are three approved wordmark lockups and one small mark. The primary horizontal sets NIMĀRA over the sub-line on a centred axis with the cap heights aligned. The stacked version opens the gap for square formats, avatars and embroidery. The wordmark alone, without the sub-line, is used for editorial contexts and large format signage. The small mark substitutes for the wordmark wherever the wordmark cannot be read, and it is never set alongside the wordmark on the same surface: it replaces, it does not decorate.",
          ],
        },
      ],
    },

    {
      id: "colour",
      number: "05",
      title: "Colour",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The palette holds a single accent. The category's habitual mistake is to carry three sage tones, a deep, a mid and a light, which produces a palette indistinguishable from every other studio's. Nimara carries one. Hover and emphasis states are made with opacity rather than with a second green, which is the discipline that keeps the system tight as it grows.",
            "Four tokens were removed during the lock rather than kept for safety. The mid sage that eighteen of the forty audited studios share went first. A soft mist green went with it, on the grounds that softness should come from alpha. A second warm neutral was collapsed into oak, because two warm neutrals was one too many.",
          ],
        },
        {
          kind: "colour",
          swatches: [
            { name: "Sand", hex: SAND, role: "Primary surface, the default page" },
            { name: "Cream", hex: CREAM, role: "Alternating sections, cards, callouts" },
            { name: "Warm black", hex: WARM_BLACK, role: "Footer and immersive sections. Never a text colour" },
            { name: "Ink", hex: INK, role: "Headings, body, wordmark, mark" },
            { name: "Stone", hex: STONE, role: "Secondary text, captions, metadata" },
            { name: "Sage", hex: SAGE, role: "The single accent. Section labels, links, markers" },
            { name: "Oak", hex: OAK, role: "Rules, borders and ornament only. Never text" },
          ],
          contrast: [
            { text: "Ink", textHex: INK, surface: "sand", surfaceHex: SAND },
            { text: "Ink", textHex: INK, surface: "cream", surfaceHex: CREAM },
            { text: "Stone", textHex: STONE, surface: "sand", surfaceHex: SAND },
            { text: "Stone", textHex: STONE, surface: "cream", surfaceHex: CREAM },
            { text: "Cream", textHex: CREAM, surface: "warm black", surfaceHex: WARM_BLACK },
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Semantic mapping",
              measures: [
                { label: "Surface, primary", value: "Sand" },
                { label: "Surface, secondary", value: "Cream" },
                { label: "Surface, deep", value: "Warm black" },
                { label: "Text, primary", value: "Ink" },
                { label: "Text, secondary", value: "Stone" },
                { label: "Text on dark", value: "Cream at 70 to 90%" },
              ],
            },
            {
              title: "Borders and states",
              measures: [
                { label: "Border, default", value: "Ink at 12%" },
                { label: "Border, emphasis", value: "Ink at 24%" },
                { label: "Hover", value: "Sage at 70%" },
                { label: "Second green", value: "None" },
                { label: "Decoration, warm", value: "Oak" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "typography",
      number: "06",
      title: "Typography",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Three faces divide the work and never cross into one another's territory. Cinzel is Trajan-derived Roman capitals and is reserved for the wordmark, which means it never appears in a heading or a paragraph anywhere on the site. Newsreader carries the editorial voice. DM Sans handles body, navigation, labels and metadata, with a tabular cut for pricing and schedules.",
          ],
        },
        {
          kind: "type",
          families: [
            {
              family: "Cinzel",
              role: "Wordmark only",
              css: CINZEL,
              note: "Trajan-lineage Roman capitals, reserved exclusively for NIMĀRA and the small mark. It is never used for headings or body copy.",
            },
            {
              family: "Newsreader",
              role: "Display and editorial headings",
              css: NEWSREADER,
              weight: 200,
              weights: "200 to 400. Fallbacks: Lyon Display, Tiempos Headline, Georgia",
              note: "Hero, section heads and pull quotes, always in sentence case. The scale is harmonic on a 1.25 ratio rounded to legible values.",
            },
            {
              family: "DM Sans",
              role: "Body and interface",
              css: DM_SANS,
              weights: "300 to 600. Fallbacks: Inter, system-ui",
              note: "Body copy, navigation, labels, captions and metadata. Lining tabular figures are used wherever money or a schedule is set.",
            },
          ],
        },
        {
          kind: "specimen",
          css: NEWSREADER,
          weight: 300,
          label: "Newsreader Light 300, the editorial voice",
          sample: "Move. Breathe. Reconnect.",
        },
        {
          kind: "typescale",
          rows: [
            { step: "t-9", size: "96px / 6rem", role: "Hero display", family: "Newsreader", weight: "200", lineHeight: "1.04", tracking: "-0.018em", css: NEWSREADER, previewPx: 40, previewWeight: 200 },
            { step: "t-8", size: "72px / 4.5rem", role: "Page heading", family: "Newsreader", weight: "200", lineHeight: "1.06", tracking: "-0.014em", css: NEWSREADER, previewPx: 36, previewWeight: 200 },
            { step: "t-7", size: "56px / 3.5rem", role: "Section heading", family: "Newsreader", weight: "300", lineHeight: "1.1", tracking: "-0.012em", css: NEWSREADER, previewPx: 31, previewWeight: 300 },
            { step: "t-6", size: "40px / 2.5rem", role: "Sub-heading", family: "Newsreader", weight: "300", lineHeight: "1.15", tracking: "-0.01em", css: NEWSREADER, previewPx: 26, previewWeight: 300 },
            { step: "t-5", size: "28px / 1.75rem", role: "Editorial lead", family: "Newsreader", weight: "400", lineHeight: "1.3", tracking: "-0.005em", css: NEWSREADER, previewPx: 22, previewWeight: 400 },
            { step: "t-4", size: "20px / 1.25rem", role: "Body large", family: "DM Sans", weight: "400", lineHeight: "1.6", tracking: "0", css: DM_SANS, previewPx: 19, previewWeight: 400 },
            { step: "t-3", size: "16px / 1rem", role: "Body", family: "DM Sans", weight: "400", lineHeight: "1.7", tracking: "0", css: DM_SANS, previewPx: 16, previewWeight: 400 },
            { step: "t-2", size: "14px / 0.875rem", role: "Small", family: "DM Sans", weight: "400", lineHeight: "1.65", tracking: "0", css: DM_SANS, previewPx: 14, previewWeight: 400 },
            { step: "t-1", size: "12px / 0.75rem", role: "Caption", family: "DM Sans", weight: "400", lineHeight: "1.6", tracking: "0.01em", css: DM_SANS, previewPx: 12, previewWeight: 400 },
            { step: "t-0", size: "10px / 0.625rem", role: "Label and eyebrow", family: "DM Sans", weight: "500", lineHeight: "1.4", tracking: "0.22em", css: DM_SANS, previewPx: 11, previewWeight: 500 },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/nimara-pilates/classes.webp",
          alt: "The Nimara classes page, showing the programme",
          caption:
            "Headings in Newsreader, body and metadata in DM Sans, and sentence case everywhere. The only capitals on the page belong to the wordmark and the eyebrow labels",
          width: 2880,
          height: 2000,
        },
        {
          kind: "prose",
          paragraphs: [
            "One rule governs every piece of text on the site: sentence case throughout, for headings, section labels, navigation and body alike. Title case is ruled out on the grounds that it reads as advertising, and the studio is meant to read as a publication. Capitals are reserved for the wordmark, the sub-line and the smallest editorial labels. It is the rule most likely to drift and the one worth enforcing hardest.",
          ],
        },
      ],
    },

    {
      id: "layout",
      number: "07",
      title: "Layout",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Spacing is the least visible discipline in the system and the one that does most for how the brand feels. The scale runs on an eight pixel base with a Fibonacci-influenced step, so the gaps between things grow at a rate the eye reads as deliberate rather than arbitrary.",
          ],
        },
        {
          kind: "spacing",
          base: "Eight pixel base, Fibonacci-influenced step.",
          steps: [
            { token: "s-1", px: 8, use: "Tight pairing, label to value" },
            { token: "s-2", px: 16, use: "Body line separation, inline gap" },
            { token: "s-3", px: 24, use: "Card padding, paragraph rhythm" },
            { token: "s-4", px: 40, use: "Block separation, group margin" },
            { token: "s-5", px: 64, use: "Section internal padding" },
            { token: "s-6", px: 96, use: "Section separation" },
            { token: "s-7", px: 128, use: "Hero clear, major rest" },
            { token: "s-8", px: 192, use: "Editorial breathing room" },
          ],
        },
        {
          kind: "grid",
          breakpoints: [
            { label: "Desktop", columns: 12, note: "Editorial grid, full bleed to 1240 pixels" },
            { label: "Tablet", columns: 6 },
            { label: "Mobile", columns: 4 },
          ],
          measures: [
            { label: "Maximum content width", value: "1240px" },
            { label: "Type column", value: "664px", note: "60 to 70 characters at body size" },
            { label: "Body line height", value: "1.7" },
            { label: "Base size", value: "16px" },
            { label: "Vertical rhythm unit", value: "27.2px", note: "Every vertical gap is a multiple" },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The vertical rhythm follows from the body setting: 16 pixels at a line height of 1.7 gives a unit of 27.2 pixels, and every paragraph, heading, image and section margin is a multiple of it. This is the discipline that produces the sense that a layout breathes, without anyone quite being able to say why.",
          ],
        },
      ],
    },

    {
      id: "motion",
      number: "08",
      title: "Motion",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "There is more motion here than on the other projects in this portfolio, and all of it is slow. A film grain sits across the whole viewport as a fixed layer, generated as fractal noise rather than loaded as an image, desaturated and held at three and a half percent opacity in multiply. It is the single element that does most to stop the photography looking like stock.",
            "Lenis smooths the scroll and GSAP drives the reveals. The whole motion layer stands down for visitors who have asked for reduced motion.",
          ],
        },
        {
          kind: "motion",
          rows: [
            { name: "Film grain", effect: "Fractal noise, 3 octaves, desaturated, 3.5% in multiply", duration: "static", easing: "—" },
            { name: "Smooth scroll", effect: "Lenis scroll smoothing", duration: "1.2s", easing: "Lenis default" },
            { name: "Split text", effect: "Headings arrive by line", duration: "1.0s", easing: "GSAP" },
            { name: "Magnetic button", effect: "Cursor attraction on hover", duration: "0.4s", easing: "GSAP" },
            { name: "Magnetic release", effect: "Return to rest", duration: "0.6s", easing: "elastic.out(1, 0.4)" },
            { name: "Tilt card", effect: "Tilt on pointer, settle on leave", duration: "0.4s / 0.8s", easing: "GSAP" },
          ],
          note: "Film grain is generated with an SVG turbulence filter at a base frequency of 0.65 over three octaves, so nothing is downloaded for it.",
        },
      ],
    },

    {
      id: "site",
      number: "09",
      title: "The site",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The site is organised like a small publication rather than a booking funnel: classes, pricing, the studio, the instructors, a journal, a shop and the policy pages, all written in the same register. The studio itself is one room in Santa Catalina with six Elina Pilates Elite reformers, and classes are capped at six places for sixty minutes, so the site never has to claim intimacy that the room cannot deliver.",
            "Every string exists in English, Spanish, French and German at full parity, held in a translation layer of 1,864 lines. The language switches in place without a reload, and each visitor's choice is remembered.",
            "The studio opened on 11 September 2026. The pre-launch wording came off on the day, and the timetable now shows the week ahead with places remaining against each class, read live rather than kept by hand.",
          ],
        },
        {
          kind: "list",
          heading: "Page inventory",
          items: [
            { label: "Classes", note: "The programme, 60 minutes, six places" },
            { label: "Pricing", note: "Packs, memberships and an introductory offer" },
            { label: "Studio", note: "The Santa Catalina room, hours and location" },
            { label: "Instructors", note: "Profiles of the teaching team" },
            { label: "Journal", note: "Editorial posts, in all four languages" },
            { label: "Shop", note: "Retail, priced from the studio's booking platform" },
            { label: "Careers and partnerships", note: "Hiring and partnership enquiries" },
            { label: "Link in bio", note: "A standalone destination for Instagram, without the site chrome" },
            { label: "Policies", note: "Cancellation, privacy and terms, in all four languages" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/nimara-pilates/home-hero.webp",
          alt: "The Nimara homepage, with the lockup in the header over a photograph of the studio",
          caption:
            "The homepage. The room itself behind the lockup, the wordmark in Cinzel with its sub-line, and a hero heading set in Newsreader in sentence case",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/study/nimara-pilates/timetable.webp",
          alt: "The Nimara timetable, showing the week with places remaining against each class",
          caption:
            "The timetable, read live from the booking platform. Places remaining are the studio's own figures rather than a number kept by hand, and a session that has gone goes grey",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/study/nimara-pilates/pricing.webp",
          alt: "The Nimara pricing page, showing packs and memberships",
          caption:
            "Pricing, read live from the booking platform. Figures are set in DM Sans tabular, and sage does the accent work with no second green anywhere on the page",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/study/nimara-pilates/studio.webp",
          alt: "The Nimara studio page, describing the Santa Catalina room",
          caption:
            "The studio page. One room, six reformers, and the spacing scale doing most of the work",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/expose/nimara-mobile.png",
          alt: "Nimara on a phone",
          caption: "The same site at 390 pixels",
          width: 390,
          height: 844,
          frame: "phone",
        },
      ],
    },

    {
      id: "build",
      number: "10",
      title: "The build",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Content lives in source-controlled TypeScript rather than a content management system, and that is precisely what makes four language parity enforceable. A missing translation is a type error that fails the build, rather than an English string that quietly appears on the German page and is noticed six months later by a customer.",
          ],
        },
        {
          kind: "architecture",
          layers: [
            {
              label: "Content",
              nodes: [
                { name: "Typed translation layer", note: "1,868 lines, four languages, parity enforced at build" },
                { name: "Journal", note: "Editorial posts, translated" },
                { name: "Structured data", note: "Coordinates, hours and the class catalogue" },
              ],
            },
            {
              label: "Application",
              nodes: [
                { name: "Next.js App Router", note: "Static pages, no CMS" },
                { name: "GSAP and Lenis", note: "Reveals and scroll smoothing" },
                { name: "Contact and lead capture", note: "Writes into the studio's booking platform" },
              ],
            },
            {
              label: "Delivery",
              nodes: [
                { name: "Vercel", note: "Hosting and edge delivery" },
                { name: "Booking platform", note: "Schedule, retail and checkout links" },
                { name: "WhatsApp", note: "A primary enquiry channel alongside the form" },
              ],
            },
          ],
        },
        {
          kind: "bullets",
          items: [
            "ExerciseGym and LocalBusiness structured data carry the coordinates, opening hours and class catalogue, so map results and AI answers about pilates in Palma have an accurate source.",
            "Film grain, vignette and parallax are separate layers applied at render, so the photography stays clean at source and can be reused for print and social.",
            "The schedule and retail pages read live from the studio's booking platform, so the site never carries a price the till does not.",
            "WhatsApp sits alongside the contact form, because in this market it is the channel people actually use.",
          ],
        },
        ...measuredBlocks("nimara-pilates", "the homepage"),
      ],
    },

    {
      id: "delivery",
      number: "11",
      title: "Delivery",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The asset library runs to 565 files, of which 523 sit in eight numbered folders so that anyone asked for a logo can find the right one without asking a designer which version to use. Every permitted colourway exists as a finished file, which is the practical reason the identity has not drifted since it was locked.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Asset library",
              measures: [
                { label: "01 Marks", value: "146 files" },
                { label: "02 Wordmarks", value: "64 files" },
                { label: "03 Lockups, horizontal", value: "100 files" },
                { label: "04 Lockups, vertical", value: "104 files" },
                { label: "05 Favicons", value: "12 files" },
                { label: "06 Social", value: "66 files" },
                { label: "07 Print", value: "29 files" },
                { label: "08 App icon", value: "2 files" },
              ],
            },
            {
              title: "Print artwork supplied",
              measures: [
                { label: "Business card", value: "85 × 55mm" },
                { label: "Compliment slip", value: "210 × 99mm" },
                { label: "Envelope, DL", value: "220 × 110mm" },
                { label: "Letterhead", value: "A4" },
                { label: "Window sticker, domain and QR", value: "350 × 70mm" },
                { label: "Window sticker, circular", value: "1 metre" },
                { label: "Window sticker, opening overlay", value: "860 × 90mm" },
                { label: "Opening flyer", value: "A5, 3mm bleed" },
                { label: "Discovery flyer", value: "A5 and A6, 3mm bleed" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
