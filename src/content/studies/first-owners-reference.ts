import type { MarkGeometry, StudyDoc } from "./types";

/**
 * Sources: firstownersreference/app/globals.css, app/print/print.css,
 * scripts/build-print.mjs, print/README.md, lib/glossary.ts, content/*.json and
 * the shipped brand SVGs. Ink boxes are measured from the path data.
 * See docs/study-sources.md.
 */

const PAPER = "#F5F2EC";
const CHARCOAL = "#1A1A1A";
const MARINE = "#0F3B5C";
const STONE = "#7A756D";
const RULE = "#D8D2C4";

const NEWSREADER = '"Newsreader", serif';
const DM_SANS = '"DM Sans", sans-serif';
const DM_MONO = '"DM Mono", monospace';

const lighthouse: MarkGeometry = {
  src: "/portfolio/expose/marks/for-lighthouse-charcoal.svg",
  viewBox: "0 0 200 200",
  ink: { x: 64, y: 40, w: 72.01, h: 120 },
  ground: PAPER,
  rule: CHARCOAL,
};

export const firstOwnersReferenceStudy: StudyDoc = {
  slug: "first-owners-reference",
  title: "The First Owner's Reference",
  subtitle:
    "An annual publication for first-time superyacht buyers, where one typed content source produces both the website and a 120 page casebound book.",
  client: "The First Owner's Reference",
  sector: "Editorial publishing",
  year: "2026",
  scope: [
    "Editorial system design",
    "Web design",
    "Development",
    "Print typography",
    "Press build pipeline",
  ],
  liveUrl: "https://firstownersreference.com",
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap",

  glance: {
    mark: {
      label: "The masthead",
      note: "Set live in Newsreader Light with the italic strap line",
      bg: PAPER,
      wide: true,
      wordmark: {
        text: "The First Owner’s Reference",
        sub: "A yachting field manual",
        css: NEWSREADER,
        color: CHARCOAL,
        subColor: STONE,
        weight: 300,
        subItalic: true,
      },
    },
    palette: [
      { name: "Paper", hex: PAPER, role: "The page" },
      { name: "Charcoal", hex: CHARCOAL, role: "Editorial text" },
      { name: "Marine", hex: MARINE, role: "Headings, links, drop caps" },
      { name: "Stone", hex: STONE, role: "Metadata and captions" },
      { name: "Rule", hex: RULE, role: "Hairline rules and dividers" },
    ],
  },

  sections: [
    {
      id: "commission",
      number: "01",
      title: "The commission",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "This is a publication rather than a marketing site. The reader is someone approaching a first superyacht purchase and treating it as a private decision, and the work had to serve long reading on screen, accurate citation by other professionals, and a print edition of genuine quality, all from the same material.",
            "Existing yachting media is written for the trade. The tone is breathless, the structure is that of an auction catalogue, and a first-time buyer reading it would learn little and trust less. The Reference was conceived to fill that gap, which meant the design problem was an editorial one before it was a visual one.",
          ],
        },
        {
          kind: "bullets",
          items: [
            "Nine chapters, each a complete piece of editorial rather than a section of a brochure.",
            "One content source producing the website and a press-ready book, with no dual maintenance.",
            "Structured data on every chapter and every defined term, so the content can be quoted correctly.",
            "A publication that takes no advertising, recorded as a position in the colophon.",
          ],
        },
      ],
    },

    {
      id: "masthead",
      number: "02",
      title: "The masthead",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The masthead is the wordmark. It is set in Newsreader at its light 300 weight, with the strap line, A yachting field manual, beneath it in the same face italicised. There is no drawn logo and nothing else identifies the publication.",
            "It is typeset rather than drawn, and appears as live text wherever it is used. That keeps it selectable, searchable and accessible, and it means the masthead cannot drift out of step with the body typography, because it is the body typeface. On the print edition the same wordmark is foil stamped on the case.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "The masthead",
              note: "Newsreader Light 300, strap line italic",
              bg: PAPER,
              wide: true,
              wordmark: {
                text: "The First Owner’s Reference",
                sub: "A yachting field manual",
                css: NEWSREADER,
                color: CHARCOAL,
                subColor: STONE,
                weight: 300,
                subItalic: true,
              },
            },
            {
              label: "Publisher's mark",
              note: "The Foreland lighthouse, charcoal on paper",
              src: lighthouse.src,
              bg: PAPER,
            },
            {
              label: "Reversed",
              note: "Paper on charcoal, for dark grounds",
              src: "/portfolio/expose/marks/for-lighthouse-paper.svg",
              bg: CHARCOAL,
            },
            {
              label: "On marine",
              note: "Paper on the accent",
              src: "/portfolio/expose/marks/for-lighthouse-paper.svg",
              bg: MARINE,
            },
          ],
        },
        {
          kind: "construction",
          geometry: lighthouse,
          module: { value: 24, label: "A fifth of the mark height" },
          caption:
            "The publisher's mark is the Foreland lighthouse. Measured from the path data it is identical to the mark on the parent company's site, 72.01 by 120 units on a 200 unit square, a ratio of 0.600 to 1. That is deliberate: the Reference is published under the Foreland Marine umbrella, and using the same artwork rather than a redrawing is what makes the relationship legible at a glance.",
          notes: [
            { label: "Artboard", value: "200 × 200", note: "viewBox units" },
            { label: "Drawn ink", value: "72.01 × 120" },
            { label: "Air, top and bottom", value: "40 units each" },
            { label: "Air, left and right", value: "64 and 63.99" },
            { label: "Colourways", value: "Charcoal and paper" },
          ],
        },
        {
          kind: "clearspace",
          geometry: lighthouse,
          unitValue: 40,
          unitLabel: "the built-in artboard margin",
          multiplier: 1,
          caption:
            "The mark carries its clear space on the artboard rather than in a written rule. Forty units of air sit above and below the drawing on a 200 unit square, so placing the file at any size and butting other elements to its edge still leaves a third of the mark height as breathing room. Clear space that is drawn into the file is clear space nobody has to remember.",
        },
      ],
    },

    {
      id: "colour",
      number: "03",
      title: "Colour",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The palette treats the screen as paper. The ground is a warm off-white rather than white, text is near black rather than black, and a single marine blue carries headings, links and drop caps. Stone handles metadata and captions, and a warm rule colour draws the hairlines that structure the page.",
            "Each colour has a deeper partner, so contrast can be raised without introducing a new hue. The print edition uses slightly warmer versions of the same tokens, because ink on uncoated stock reads cooler than the same value on a backlit screen.",
          ],
        },
        {
          kind: "colour",
          swatches: [
            { name: "Paper", hex: PAPER, role: "The page" },
            { name: "Paper deep", hex: "#EDE8DF", role: "Alternating bands and callouts" },
            { name: "Charcoal", hex: CHARCOAL, role: "Editorial text" },
            { name: "Charcoal soft", hex: "#2A2A2A", role: "Secondary text on paper" },
            { name: "Marine", hex: MARINE, role: "Headings, links, drop caps" },
            { name: "Marine deep", hex: "#0A2A44", role: "Immersive grounds" },
            { name: "Sail", hex: "#4A7DA9", role: "Links on dark grounds" },
            { name: "Stone", hex: STONE, role: "Metadata and captions" },
            { name: "Rule", hex: RULE, role: "Hairlines and dividers" },
          ],
          contrast: [
            { text: "Charcoal", textHex: CHARCOAL, surface: "paper", surfaceHex: PAPER },
            { text: "Marine", textHex: MARINE, surface: "paper", surfaceHex: PAPER },
            { text: "Stone", textHex: STONE, surface: "paper", surfaceHex: PAPER },
            { text: "Paper", textHex: PAPER, surface: "marine", surfaceHex: MARINE },
            { text: "Sail", textHex: "#4A7DA9", surface: "marine deep", surfaceHex: "#0A2A44" },
          ],
        },
      ],
    },

    {
      id: "typography",
      number: "04",
      title: "Typography",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Three families divide the work. Newsreader carries the masthead and all editorial prose. DM Sans handles signposting, which is to say chapter numerals, navigation and metadata, set in letter-spaced capitals. DM Mono sets the numbers, tabular wherever money is involved, so a column of figures aligns on the decimal without anyone having to think about it.",
          ],
        },
        {
          kind: "type",
          families: [
            {
              family: "Newsreader",
              role: "Masthead and editorial prose",
              css: NEWSREADER,
              weight: 300,
              note: "Light 300 for the masthead, up to 500 in chapter headings, italic for the strap line and pull quotes. It carries old-style figures and standard ligatures throughout.",
            },
            {
              family: "DM Sans",
              role: "Signposting",
              css: DM_SANS,
              note: "Chapter numerals, navigation and metadata in letter-spaced capitals. It never sets a paragraph.",
            },
            {
              family: "DM Mono",
              role: "Numbers",
              css: DM_MONO,
              note: "Tabular numerals for cost tables and the calculators, where alignment matters more than colour on the page.",
            },
          ],
        },
        {
          kind: "specimen",
          css: NEWSREADER,
          weight: 300,
          label: "Newsreader Light 300, the editorial voice",
          sample:
            "The first year of ownership is the year in which the assumptions made during the purchase are tested.",
        },
        {
          kind: "typescale",
          rows: [
            { step: "display", size: "clamp(3rem, 6vw, 6rem)", role: "Display", family: "Newsreader", lineHeight: "1.02", css: NEWSREADER, previewPx: 40, previewWeight: 300 },
            { step: "headline", size: "clamp(2rem, 3.5vw, 3rem)", role: "Headline", family: "Newsreader", lineHeight: "1.1", css: NEWSREADER, previewPx: 32, previewWeight: 400 },
            { step: "title", size: "clamp(1.5rem, 2.2vw, 2rem)", role: "Title", family: "Newsreader", lineHeight: "1.2", css: NEWSREADER, previewPx: 25, previewWeight: 500 },
            { step: "subhead", size: "1.125rem / 18px", role: "Subhead", family: "Newsreader", lineHeight: "1.4", css: NEWSREADER, previewPx: 18, previewWeight: 400 },
            { step: "body", size: "1.125rem / 18px", role: "Body", family: "Newsreader", lineHeight: "1.65", css: NEWSREADER, previewPx: 18, previewWeight: 400 },
            { step: "small", size: "0.875rem / 14px", role: "Small", family: "DM Sans", lineHeight: "1.5", css: DM_SANS, previewPx: 14, previewWeight: 400 },
            { step: "meta", size: "0.75rem / 12px", role: "Metadata", family: "DM Sans", lineHeight: "1.4", css: DM_SANS, previewPx: 12, previewWeight: 500 },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Body type is set at 18 pixels rather than the 16 that most sites use, on a 1.65 line height, because the reader is expected to stay with a chapter for twenty minutes rather than scan it. Paragraphs are hyphenated with limits set so that no word breaks with fewer than four characters on a line, which is a print convention rarely carried across to the web.",
          ],
        },
      ],
    },

    {
      id: "layout",
      number: "05",
      title: "Layout",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The layout serves long reading above everything else. A single column runs at a 38rem measure, which lands between sixty and seventy-five characters a line at body size. A rail of 22rem carries footnotes, sources and figures alongside the text at desktop width and folds beneath it on a phone. The page container stops at 80rem.",
          ],
        },
        {
          kind: "grid",
          breakpoints: [
            { label: "Desktop", columns: 12, note: "Prose column plus a 22rem rail for notes and sources" },
            { label: "Tablet", columns: 6, note: "Rail folds beneath the prose" },
            { label: "Mobile", columns: 4, note: "Single column, notes inline" },
          ],
          measures: [
            { label: "Prose measure", value: "38rem" },
            { label: "Note rail", value: "22rem" },
            { label: "Page container", value: "80rem" },
            { label: "Body size", value: "18px" },
            { label: "Body line height", value: "1.65" },
            { label: "Drop cap", value: "Marine, chapter opener" },
          ],
        },
        {
          kind: "bullets",
          items: [
            "Drop caps are set in marine on the first paragraph of each chapter, matching the print edition.",
            "A scroll progress bar runs across the top of a chapter, because a reader who has committed twenty minutes deserves to know where they are.",
            "Navigation strips between chapters carry the previous and next chapter titles rather than arrows alone.",
            "Every defined term in the glossary is auto-linked on first use in the body, without an editor marking it up.",
          ],
        },
      ],
    },

    {
      id: "publication",
      number: "06",
      title: "The publication",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Nine chapters form the spine, running from the reality of ownership through the market, how the industry works, acquisition, new build against brokerage, refit, operations, motor against sail, and a closing decision framework. Each chapter is a complete piece of editorial in its own right: a lead essay, a data spread, a guest opinion, an anonymised case and a printable checklist.",
            "Around them sit a glossary of fifty defined terms, each with its own page and its own structured data, a search that covers the whole publication, and four working tools built on published industry data.",
          ],
        },
        {
          kind: "list",
          heading: "What was shipped",
          items: [
            { label: "Nine chapters", note: "Essay, data spread, guest opinion, anonymised case and checklist in each" },
            { label: "Glossary", note: "Fifty terms, each with a page and DefinedTerm schema" },
            { label: "Running cost calculator", note: "Built on sourced industry figures" },
            { label: "Captain and crew salary, 2026", note: "Published pay data by role and vessel size" },
            { label: "Order book tracker", note: "The new build market, by yard" },
            { label: "Yacht VAT, 2026", note: "Import and charter positions by jurisdiction" },
            { label: "Search", note: "Compiled at build, runs in the browser, queries never sent anywhere" },
            { label: "Colophon and press kit", note: "How the publication is made, and how to cite it" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/expose/for-mobile.png",
          alt: "The First Owner's Reference on a phone",
          caption: "The same publication at 390 pixels",
          width: 390,
          height: 844,
          frame: "phone",
        },
      ],
    },

    {
      id: "print",
      number: "07",
      title: "The print edition",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The same content renders a second time as a book. There is no separate print file and no page layout application in the chain: the print edition is a route on the website, rendered through a print stylesheet that runs to 2,565 lines, and printed by a headless browser.",
            "The proof as built on 8 August 2026 runs to 120 pages at a 230 by 300 millimetre trim. The sheet is 236 by 306 millimetres, which is the trim plus three millimetres of bleed on each edge, with mirrored margins so the gutter is wider than the fore-edge on both verso and recto.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Page",
              measures: [
                { label: "Trim", value: "230 × 300mm" },
                { label: "Sheet with bleed", value: "236 × 306mm" },
                { label: "Margins, verso", value: "29 / 27 / 29 / 27mm" },
                { label: "Gutter margin", value: "29mm", note: "Mirrored on recto" },
                { label: "Extent", value: "120pp" },
              ],
            },
            {
              title: "Text",
              measures: [
                { label: "Body", value: "12.5 / 17pt" },
                { label: "Columns", value: "Two at 91.5mm" },
                { label: "Column gutter", value: "7mm" },
                { label: "Running heads", value: "7 to 8pt" },
                { label: "Folios", value: "9.5pt" },
                { label: "Head and foot padding", value: "11mm" },
              ],
            },
            {
              title: "Materials",
              measures: [
                { label: "Text stock", value: "Munken Pure 120gsm" },
                { label: "Binding", value: "Smyth-sewn, casebound" },
                { label: "Case boards", value: "Colorplan" },
                { label: "Wordmark", value: "Foil stamped" },
                { label: "Lighthouse", value: "Blind debossed" },
                { label: "Edition", value: "500 hand-numbered" },
              ],
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The build is a two-pass print rather than a single render, because a document with contents folios cannot know its own page numbers until it has been laid out once. The first pass discovers where each chapter falls and writes the real folios and the verso and recto parity spacers back into the project. Later passes verify that the pagination has stopped moving.",
            "Full-bleed pages are handled separately. A full-page image box placed mid-document fragments against the root page master and shows a seam at the join, so the cover, frontispiece, chapter openers and closing page are each printed standalone from their own route and merged over placeholder pages in the flow document. The result is then stamped with TrimBox and BleedBox, converted to CMYK, and padded to a multiple of eight pages to give the printer a clean press block.",
          ],
        },
        {
          kind: "architecture",
          layers: [
            {
              label: "Source",
              nodes: [
                { name: "Typed content", note: "Chapters, essays, glossary and checklists in TypeScript and JSON" },
                { name: "Print stylesheet", note: "2,565 lines of CSS Paged Media" },
                { name: "Image manifest", note: "Curated assignments, resized to 2700px long edge, sRGB" },
              ],
            },
            {
              label: "Render",
              nodes: [
                { name: "Chrome, via Puppeteer", note: "Native paged media, no pagination library" },
                { name: "Pass one", note: "Discovers chapter positions, writes real folios and parity spacers" },
                { name: "Pass two", note: "Verifies pagination has stabilised" },
                { name: "Full-bleed pages", note: "Printed standalone, merged over placeholders" },
              ],
            },
            {
              label: "Press",
              nodes: [
                { name: "TrimBox and BleedBox", note: "Stamped with pypdf" },
                { name: "CMYK conversion", note: "Ghostscript, generic prepress profile" },
                { name: "Press block", note: "Cover dropped, padded to a multiple of eight" },
                { name: "Case artwork", note: "Printed flat from its own route for the binder" },
              ],
            },
          ],
          caption:
            "One command produces the reading proof, the CMYK master, the press block and the case artwork. Nothing in the print folder is edited by hand.",
        },
      ],
    },

    {
      id: "citation",
      number: "08",
      title: "Built to be cited",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "A reference work is only useful if other people can quote it correctly, which is a design problem as much as an editorial one. Twenty distinct schema types are in use across the publication, from Article on each chapter and DefinedTerm on each glossary entry through to Dataset on the data spreads and SoftwareApplication on the tools.",
            "Every numerical claim in the text carries a source, and the structured data carries a suggested citation format, so an answer engine quoting a figure has both the number and where it came from.",
          ],
        },
        {
          kind: "bullets",
          items: [
            "The search index is compiled at build time and shipped with the page, so a query never leaves the reader's browser. For a publication whose readers are researching a purchase they have told nobody about, that is a feature rather than an optimisation.",
            "Each chapter's checklist has its own single-page print layout, intended to be printed and carried into a meeting.",
            "The colophon records how the publication is made and states that it takes no advertising.",
            "A press kit provides the masthead, the mark and the correct citation format, so third parties reproduce it accurately.",
          ],
        },
      ],
    },
  ],
};
