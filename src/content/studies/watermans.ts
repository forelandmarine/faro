import type { MarkGeometry, StudyDoc } from "./types";
import { measuredBlocks } from "./measured";

/**
 * Sources: watermans/src/app/globals.css, src/app/layout.tsx,
 * src/components/Mark.tsx, Header.tsx, Port.tsx, Part.tsx, ui.tsx,
 * src/lib/arrival.ts, lifts.ts, tide.ts, site.ts and the commit history.
 * The flag's ink box is computed from the stroke geometry in Mark.tsx. See
 * docs/study-sources.md.
 */

const CHART = "#FFFFFF";
const INK = "#0F1A2B";
const SOUNDINGS = "#47566C";
const SHOAL = "#637082";
const DATUM = "#D5DDE6";
const FIELD = "#7D8B9F";
const PILOT = "#2F6096";
const SLACK = "#F2F6FA";
const NIGHT = "#08182F";
const SIGNAL = "#C8102E";

const ARCHIVO = '"Archivo", sans-serif';

const flag: MarkGeometry = {
  src: "/portfolio/expose/marks/watermans-flag-ink.svg",
  viewBox: "0 0 40 48",
  ink: { x: 2.7, y: 0.7, w: 36.5, h: 46.6 },
  ground: CHART,
  rule: INK,
};

export const watermansStudy: StudyDoc = {
  slug: "watermans",
  title: "Watermans",
  subtitle:
    "A superyacht agency for London, the Solent and the south west, designed as a pilot book: one typeface, the colours of a chart, and every figure a captain needs published and dated.",
  client: "Watermans, part of the Foreland Group",
  sector: "Superyacht agency",
  year: "2026",
  scope: [
    "Brand identity",
    "Website design",
    "Development",
    "Arrival planner",
    "Pilotage content",
    "Search and answer engines",
    "Email signature",
  ],
  liveUrl: "https://www.watermansagency.com",
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..600&display=swap",

  glance: {
    mark: {
      label: "The mark",
      note: "Code flag H on a staff, ink and signal red on chart white",
      src: flag.src,
      bg: CHART,
      height: 64,
    },
    palette: [
      { name: "Ink", hex: INK, role: "Type, rules and the mark" },
      { name: "Pilot", hex: PILOT, role: "Blue, kept for deadlines and links" },
      { name: "Night", hex: NIGHT, role: "Photograph tint and dark bands" },
      { name: "Slack", hex: SLACK, role: "The tinted band" },
      { name: "Signal", hex: SIGNAL, role: "The red half of the flag" },
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
            "Watermans is the UK arrivals arm of Foreland Marine, a superyacht agency for London, the Solent and the south west. It books berths, arranges pilotage and bridge lifts, clears yachts in and out with Border Force, and attends on the quay at arrival and departure. The commission was the identity and the website, written for a captain planning a UK visit from somewhere else.",
            "A captain arriving in an unfamiliar port has a short list of questions: where the yacht can lie, who takes the pilot and where, whether the bridge has to lift, what has to be filed and by when, and what the call will cost. The brief was a site that answers those questions directly, with sources and dates, rather than a brochure that asks the captain to get in touch before learning anything.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The design took more turns than the build. The commit history shows thirteen font families loaded across ten type settings in the first two days, before the site settled on one grotesk and the colours of a chart. Each change was committed and judged on the real pages, which is why the record of what was rejected is complete.",
          ],
        },
        {
          kind: "timeline",
          entries: [
            {
              date: "21 Sep 13:19",
              label: "First build, as Foreland Agency",
              note: "IBM Plex Sans and Mono on warm paper, with code flag G, I require a pilot",
            },
            {
              date: "21 Sep 14:03",
              label: "Renamed Watermans, rebuilt as a chart document",
              note: "Libre Caslon on chart paper, and flag H, I have a pilot on board, in place of G",
              pivot: true,
            },
            {
              date: "21 Sep 16:17",
              label: "Rebuilt in the Foreland Group system",
              note: "Nunito Sans, navy and cinematic photography. The flag was redrawn on a staff at the weight of the Foreland lighthouse",
            },
            {
              date: "21 Sep 17:58",
              label: "Rebuilt around an arrival planner",
              note: "The planner replaced the hero as the first thing on the page",
              pivot: true,
            },
            {
              date: "21 Sep 19:22",
              label: "Monochrome with blue and white",
              note: "The direction that survives, first set in Schibsted Grotesk",
            },
            {
              date: "21 Sep 19:46",
              label: "Archivo arrives",
              note: "Adopted in an interface audit, with the width axis loaded",
            },
            {
              date: "22 Sep 20:39",
              label: "Three type trials in nineteen minutes",
              note: "Caslon with Public Sans, Public Sans alone, then Libre Franklin",
            },
            {
              date: "22 Sep 20:58",
              label: "Returned to Archivo and the original scale",
              pivot: true,
            },
            {
              date: "23 Sep 13:39",
              label: "Ports on one pilot-book template",
              note: "Brief, approach, pilotage, tides, berths, alongside, ashore and events, in that order on every port",
            },
            {
              date: "24 Sep 16:52",
              label: "Live on watermansagency.com",
              note: "With structured data, preview cards and the answer-engine files",
            },
            {
              date: "24 Sep 18:31",
              label: "The mark drawn as vectors, in four options",
              note: "Type outlined from Archivo. Option B, the flag on its staff, went into the email signature",
              pivot: true,
            },
            {
              date: "24 Sep 19:43",
              label: "The homepage hero carries the name and the office line",
              note: "Watermans set over the photograph, with the London telephone and WhatsApp at its foot",
            },
          ],
          summary: [
            { label: "Commits", value: "184" },
            { label: "Elapsed", value: "3d 6h 25m" },
            { label: "Font families", value: "13" },
            { label: "Type settings", value: "10" },
          ],
          source:
            "Taken from the project's commit history. The font family count covers every family loaded at any commit, including monospace and display cuts; a type setting is each change to the set of families loaded. Only the commits that changed a decision are listed.",
        },
      ],
    },

    {
      id: "mark",
      number: "02",
      title: "The mark",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The mark is flag H of the International Code of Signals, flown by a vessel to say that it has a pilot on board. The first build used flag G, I require a pilot, which describes the moment before the agent has done the job. H describes the moment after, and it replaced G in the same commit that gave the firm its name.",
            "Flag H is divided vertically, white at the hoist and red at the fly. It is drawn here as line art on a staff, with the white half left open and the red half filled, at the stroke weight of the Foreland lighthouse so that the two marks sit together on a group page. Signal red appears on the flag and on the rule beside the enquiry form's status message, and nowhere else.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "The mark",
              note: "Ink and signal red on chart white",
              src: flag.src,
              bg: CHART,
            },
            {
              label: "Reversed",
              note: "White on night, for dark bands and the footer",
              src: "/portfolio/expose/marks/watermans-flag-white.svg",
              bg: NIGHT,
            },
            {
              label: "On slack",
              note: "The tinted band, where the planner sits",
              src: flag.src,
              bg: SLACK,
            },
            {
              label: "Header lockup",
              note: "The flag beside Watermans in Archivo 500, with Yacht agents set as a port notice beneath",
              src: flag.src,
              bg: CHART,
              wide: true,
              height: 44,
              wordmark: {
                text: "Watermans",
                sub: "YACHT AGENTS",
                css: ARCHIVO,
                subCss: ARCHIVO,
                color: INK,
                subColor: SHOAL,
                weight: 500,
                tracking: "0",
                subTracking: "0.16em",
              },
            },
          ],
        },
        {
          kind: "construction",
          geometry: flag,
          caption:
            "The flag on its 40 by 48 unit artboard. The staff is a 2.6 unit stroke with round caps from y 2 to y 46; the flag is a 34 by 23 unit rectangle with a 2.4 unit stroke; the red half is a 17 by 23 fill laid over the inner half of that stroke, so a thin line of ink stays around the red. The drawn ink measures 36.5 by 46.6 units.",
          notes: [
            { label: "Artboard", value: "40 × 48", note: "viewBox units" },
            { label: "Drawn ink", value: "36.5 × 46.6" },
            { label: "Staff stroke", value: "2.6", note: "Round caps" },
            { label: "Flag stroke", value: "2.4" },
            { label: "Flag, outer edge", value: "36.4 × 25.4" },
            { label: "Colours", value: "2", note: "Ink or white, and signal red" },
          ],
        },
        {
          kind: "anatomy",
          geometry: flag,
          caption:
            "Three parts, each with a reason. The staff is what makes it a flag flown rather than a coloured rectangle.",
          parts: [
            {
              at: 0.08,
              label: "The staff",
              note: "Runs 44 units with round caps. Its foot sets the baseline the lockup is measured to.",
            },
            {
              at: 0.38,
              label: "The hoist",
              note: "The white half, left open as outline. On a white page the ground shows through, as it would on the flag itself.",
            },
            {
              at: 0.82,
              label: "The fly",
              note: "The red half, filled in signal red, laid over the inner half of the outline.",
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The header lockup is measured in the browser rather than set by hand. On load, the narrower of the two lines is letter-spaced out to the width of the wider, never compressed, and the flag is scaled so that its top edge meets the cap line of Watermans and the foot of the staff meets the baseline of Yacht agents. Both figures are read from the font's own metrics, because letter-spacing and font metrics cannot be known in CSS. The lockup therefore stays square at any size and in any fallback font.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The site's flag is drawn in code, which serves the screen but not print, embroidery or email. On 24 September the mark was redrawn as a vector set by a build script, with every letter of the wordmark converted from Archivo to outlines so the files render identically without the font installed. The script produced four options from one flag geometry: the flag alone, the flag flush to the head of a staff, the staff and flag sheared forward as in a breeze, and the flag reversed out of a night roundel.",
            "Option B was taken forward. The flag is set flush to the head of the staff with a solid ink border all round, 5 units on a 100 unit square, and no rule between the white and red halves, so the flag reads as one piece of bunting. In the lockups WATERMANS is set in Archivo at weight 560 and width 112 with 0.14em tracking, and YACHT AGENTS beneath it at weight 450, tracked at 0.34em in soundings grey.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "Vector mark, option B",
              note: "The flag flush to the head of the staff, bordered all round",
              src: "/portfolio/expose/marks/watermans-mark-staff.svg",
              bg: CHART,
            },
            {
              label: "Stacked lockup",
              note: "The logo on the email signature, with the type outlined from Archivo",
              src: "/portfolio/expose/marks/watermans-stacked.svg",
              bg: CHART,
              wide: true,
              height: 140,
            },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/watermans/mark-options.webp",
          alt: "Four options for the Watermans mark and horizontal lockup, each shown on white and on night",
          caption:
            "The options sheet as the build script drew it. A, the flag alone. B, the flag on its staff, which was taken forward. C, sheared forward. D, reversed out of a roundel",
          width: 2000,
          height: 1311,
        },
        {
          kind: "sizes",
          src: flag.src,
          widths: [12, 16, 24, 32, 48, 96],
          bg: CHART,
          caption:
            "The site's line-art flag at working sizes. The outline carries the white half, so below about 16 pixels the stroke begins to close the hoist and the flag reads as a red square on a staff. The favicon is therefore a separate drawing: the flag on a night square with the white half filled solid and a heavier 3 unit staff, so it holds at 16 pixels.",
        },
        {
          kind: "misuse",
          src: flag.src,
          bg: CHART,
          ink: INK,
          items: [
            { kind: "stretch", label: "Never scaled on one axis" },
            { kind: "rotate", label: "The staff stands upright" },
            { kind: "recolour", label: "Ink or white, with signal red. No other colours" },
            { kind: "shadow", label: "Line art. No shadows or gradients" },
          ],
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
            "The palette is monochrome, with blue and white. The tokens are named after the parts of an Admiralty chart: chart white for the paper, ink for the print, soundings and shoal for the two greys, datum for the rules that everything is measured from, and slack for the tinted band. One blue, pilot, is taken from the Foreland palette so that the two firms read as related.",
            "Blue carries a meaning rather than a mood. It marks a deadline, a link or an action, and nothing else. A label that carries no time limit is set in grey. An earlier version held quiet labels in blue with reduced opacity; it measured 3.7 to 1 and spent the colour on things that did not need it, so it was changed to grey.",
          ],
        },
        {
          kind: "colour",
          swatches: [
            { name: "Chart", hex: CHART, role: "The page" },
            { name: "Ink", hex: INK, role: "Type, heavy rules and the mark" },
            { name: "Soundings", hex: SOUNDINGS, role: "Body copy" },
            { name: "Shoal", hex: SHOAL, role: "Captions and quiet labels" },
            { name: "Datum", hex: DATUM, role: "Hairline rules between sections" },
            { name: "Field", hex: FIELD, role: "Form field boundaries and link underlines" },
            { name: "Pilot", hex: PILOT, role: "Deadlines, links and actions" },
            { name: "Slack", hex: SLACK, role: "The tinted band" },
            { name: "Night", hex: NIGHT, role: "Photograph tint and dark bands" },
            { name: "Signal", hex: SIGNAL, role: "The flag, and the rule beside a form message" },
          ],
          contrast: [
            { text: "Ink", textHex: INK, surface: "chart", surfaceHex: CHART },
            { text: "Soundings", textHex: SOUNDINGS, surface: "chart", surfaceHex: CHART },
            { text: "Shoal", textHex: SHOAL, surface: "chart", surfaceHex: CHART },
            { text: "Pilot", textHex: PILOT, surface: "chart", surfaceHex: CHART },
            { text: "Pilot", textHex: PILOT, surface: "slack", surfaceHex: SLACK },
            { text: "Field", textHex: FIELD, surface: "chart", surfaceHex: CHART },
            { text: "White", textHex: CHART, surface: "night", surfaceHex: NIGHT },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Field is the one colour chosen for a threshold rather than a role. Form fields need a visible edge, and the rule for non-text contrast is 3 to 1, so field was set to clear that on both the white page and the slack band. It never sets text.",
            "Page heroes run as a navy duotone. Each photograph is taken to greyscale with a slight lift in contrast, then night is laid over it in the colour blend mode at 85 percent. Pictures from many photographers, taken in different light, read as one set, and white type can sit on any of them. Photographs set beside prose, and the homepage cards, stay in colour, because there they are showing a place rather than carrying a title.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "The duotone",
              measures: [
                { label: "Filter", value: "grayscale(1) contrast(1.08)" },
                { label: "Overlay", value: "Night, colour blend" },
                { label: "Overlay opacity", value: "0.85" },
                { label: "Hero gradient", value: "Night at 90%, 35%, 45%", note: "Bottom, middle, top" },
              ],
            },
            {
              title: "Where colour appears",
              measures: [
                { label: "Blue", value: "Deadlines, links, actions" },
                { label: "Red", value: "The flag and form messages" },
                { label: "Photographs", value: "Duotone in heroes, colour beside prose" },
                { label: "Focus ring", value: "Pilot, white on night" },
              ],
            },
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
            "The site uses one typeface, Archivo, with its width axis loaded. A ship carries her name across the transom in wide, flat letters because the transom is wide and flat, and a port notice is set narrow because the column is narrow. Archivo can do both from one file, so headings are widened to 112 and labels narrowed to 88, and the site needs no second family.",
            "Getting there took three late trials. On the evening of 22 September the site was set in Caslon with Public Sans, then Public Sans alone at a light display weight, then Libre Franklin, all within nineteen minutes. Each was judged on the live pages against the tables and the planner, and each lost to the original. Archivo was restored with its original scale at 20:58.",
          ],
        },
        {
          kind: "type",
          families: [
            {
              family: "Archivo",
              role: "Display, reading, labels and figures",
              css: ARCHIVO,
              weight: 500,
              weights: "Variable, width 62 to 125",
              note: "Widened to 112 for headings, narrowed to 88 for uppercase labels, and set at 108 with tabular figures for numbers that line up.",
            },
          ],
        },
        {
          kind: "specimen",
          css: ARCHIVO,
          weight: 500,
          label: "Archivo at display weight",
          sample: "Pilotage at Falmouth is by zone.",
        },
        {
          kind: "typescale",
          rows: [
            { step: "Hero", size: "clamp(2.2rem, 5vw, 5.6rem)", role: "Page title on the photograph", family: "Archivo", weight: "500, width 112", lineHeight: "0.96", tracking: "−0.025em", css: ARCHIVO, previewPx: 48, previewWeight: 500 },
            { step: "Statement", size: "clamp(1.5rem, 2.7vw, 3.2rem)", role: "The homepage statement", family: "Archivo", weight: "500", lineHeight: "1.1", tracking: "−0.025em", css: ARCHIVO, previewPx: 34, previewWeight: 500 },
            { step: "Section", size: "clamp(1.5rem, 2.2vw, 2.1rem)", role: "Pilot-book headings", family: "Archivo", weight: "500, width 112", lineHeight: "0.96", tracking: "−0.025em", css: ARCHIVO, previewPx: 28, previewWeight: 500 },
            { step: "Lede", size: "1.25rem", role: "Standfirst, in pilot blue", family: "Archivo", weight: "400", lineHeight: "1.5", css: ARCHIVO, previewPx: 20 },
            { step: "Body", size: "1.125rem", role: "Running text, in soundings", family: "Archivo", weight: "400", lineHeight: "1.6", css: ARCHIVO, previewPx: 18 },
            { step: "Label", size: "0.8125rem", role: "Uppercase port-notice labels", family: "Archivo", weight: "400, width 88", lineHeight: "1.4", tracking: "0.16em", css: ARCHIVO, previewPx: 13 },
            { step: "Caption", size: "0.8125rem", role: "Credits, sources and notes", family: "Archivo", weight: "400", lineHeight: "1.5", css: ARCHIVO, previewPx: 13 },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Above 1600 pixels the layout keeps growing, so the reading sizes grow with it: body to 1.25rem, lede to 1.5rem, captions and labels up a step. Scaling only the headings left the running text looking miniature on a wide display. Links are underlined at 1 pixel with a 0.22em offset rather than bordered, because a border belongs to the box and floats away from the word once the link is padded out to a thumb-sized target.",
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
            "Everything that is not a photograph sits in a 110rem shell. Running text sits in its own centred reading measure inside it, 48rem wide and 55rem above 1600 pixels, because a 60 character column left-aligned in a wide shell leaves two thirds of the page empty and reads as unfinished.",
            "Vertical spacing comes in three densities, and each one means something. Open is for a statement meant to be read slowly, standard is for reference matter, and tight is for lists and tables where the data is the point. Tinted bands and photographs run to the window edge while their contents re-centre on the shell.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Band padding, desktop",
              measures: [
                { label: "Open", value: "5.5rem × 3rem", note: "6.5rem × 4rem above 1600" },
                { label: "Standard", value: "3.5rem × 3rem", note: "4rem × 4rem above 1600" },
                { label: "Tight", value: "2rem × 3rem", note: "2.25rem × 4rem above 1600" },
              ],
            },
            {
              title: "Measures",
              measures: [
                { label: "Shell", value: "110rem" },
                { label: "Reading measure", value: "48rem", note: "55rem above 1600" },
                { label: "Tables", value: "Scroll sideways on a phone", note: "The right edge fades as the cue" },
                { label: "Rules", value: "Datum hairlines, ink under the header" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "site",
      number: "06",
      title: "The site",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The homepage opens on a photograph of a yacht alongside in London. On desktop the name Watermans is set large at the top left of the photograph, and the London office telephone and a WhatsApp button sit at its foot. The arrival bar lies across the bottom edge: port, length overall, air draught and the date alongside. Those four answers are enough to plan the call, so the first thing a captain can do on the site is either ring or start.",
            "Every port page follows one template, taken from the order a pilot book uses: brief, approach, pilotage, tides, berths, alongside, ashore and events. Running notes are short paragraphs, and anything a captain would look up stays a table. Each page carries a vector nautical chart, the next tides at its own station, and the sources the page was written from.",
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/watermans/home-hero.webp",
          alt: "The Watermans homepage, a yacht alongside at West India Dock in navy duotone with the arrival bar beneath",
          caption:
            "The homepage. The name and the office line are set on the navy duotone, and the arrival bar sits across its foot",
          width: 2880,
          height: 2000,
        },
        {
          kind: "list",
          heading: "Page inventory",
          items: [
            { label: "Plan an arrival", note: "Berths, notice deadlines and charges from four inputs" },
            { label: "Nine port pages", note: "London, Southampton, Portsmouth, Cowes, Poole, Dartmouth, Plymouth, Fowey and Falmouth, all on the pilot-book template" },
            { label: "Services, technical, clearance", note: "Prose beside photographs, alternating sides down the page" },
            { label: "Fees", note: "The port call fee by length overall, the further rates and two worked examples" },
            { label: "From the Caribbean, the season", note: "A landfall at Falmouth, and the year in British waters" },
            { label: "Notices and news", note: "Dated rule and port changes, each with its source" },
            { label: "The firm, agents, contact", note: "The directors, a page written to other agents, and the enquiry form" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/watermans/port.webp",
          alt: "The Falmouth port page, showing the pilotage notes and the pilotage zone table",
          caption:
            "Falmouth on the pilot-book template. Notes beside the heading, figures in a table ruled in pilot blue, and the source and its date under the table",
          width: 2880,
          height: 2200,
        },
        {
          kind: "image",
          src: "/portfolio/study/watermans/fees.webp",
          alt: "The Watermans fees page with its duotone hero and the port call fee table",
          caption:
            "The fees page. The fee is stated by length overall and excludes VAT, with the table set in the same style as the pilotage tables",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/expose/watermans-mobile.png",
          alt: "Watermans on a phone",
          caption: "The same site at 390 pixels",
          width: 390,
          height: 844,
          frame: "phone",
        },
      ],
    },

    {
      id: "planner",
      number: "07",
      title: "The arrival planner",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The planner is the reason the site exists in this form. A captain chooses a port and enters the length overall, the air draught, where the pilot boards and the time alongside. The planner returns the berths that can take the yacht, with the ones that cannot struck through and the reason given, every notice deadline as a date and time counted back from arrival, and the charges line by line.",
            "Every figure is published. London pilotage comes from the Port of London Authority's schedules of rates and charges, berth limits from PLA mooring information and the operators, and the notice periods from the port's own rules. All of it lives in one file, which is revised each January when the tariff changes, and nothing else on the site needs touching.",
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/watermans/planner.webp",
          alt: "The Watermans arrival planner for London, showing berths, notice deadlines and charges in three columns",
          caption:
            "A 55 metre yacht with a 30 metre air draught arriving in London. St Katharine Docks is struck through as too long by 13 metres; the deadlines in pilot blue are the ones with a time limit",
          width: 2880,
          height: 2200,
        },
        {
          kind: "spec",
          groups: [
            {
              title: "London rules the planner applies",
              measures: [
                { label: "Pilotage compulsory", value: "Over 40m" },
                { label: "Bridge lift", value: "Air draught of 9m or more" },
                { label: "Tier booking", value: "48 hours before" },
                { label: "Bridge lift request", value: "24 hours before" },
                { label: "Pension fund levy", value: "5%", note: "On pilotage, not boarding" },
              ],
            },
            {
              title: "Live data",
              measures: [
                { label: "Tower Bridge lifts", value: "Published schedule, cached an hour" },
                { label: "Tides", value: "UKHO Admiralty tidal API" },
                { label: "Charts", value: "savvy navvy vector chartlets" },
                { label: "Output", value: "Indicative, and says so" },
              ],
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Both live sources fail quietly. There is no official API for Tower Bridge lifts, so the schedule is parsed from the published page; if that page changes shape the parser returns nothing and the panel disappears rather than showing something wrong. The tide panel carries the Admiralty's statement that the data is for planning and not for navigation, and that line stays.",
            "From the planner, Request this estimate carries the port, length, air draught and time alongside into the enquiry form, so the captain does not type them twice.",
          ],
        },
      ],
    },

    {
      id: "build",
      number: "08",
      title: "The build",
      blocks: [
        {
          kind: "architecture",
          layers: [
            {
              label: "Pages",
              nodes: [
                { name: "Next.js 16 App Router", note: "Static pages, rendered at build" },
                { name: "Pilot-book template", note: "One component for every port" },
                { name: "Tailwind v4 tokens", note: "The chart palette as theme variables" },
              ],
            },
            {
              label: "Data",
              nodes: [
                { name: "arrival.ts", note: "Tariffs, berth limits and notice rules, revised each January" },
                { name: "Tower Bridge lifts", note: "Parsed server side, cached for an hour" },
                { name: "Admiralty tides", note: "Next tides at each port's station" },
              ],
            },
            {
              label: "Reach",
              nodes: [
                { name: "Enquiry form", note: "Built on Resend, prefilled from the planner" },
                { name: "Structured data", note: "Service, Place, FAQ, breadcrumb and news schema" },
                { name: "Answer engines", note: "llms.txt, named crawlers in robots, IndexNow" },
              ],
            },
          ],
          caption:
            "No database and no CMS. Every figure on the site sits in a source file with the date it was checked, so a change is a commit with a history.",
        },
        {
          kind: "bullets",
          items: [
            "Every port page answers the questions a captain asks in a set of FAQs, shown on the page and marked up, so search engines and answer engines quote the page rather than paraphrase it.",
            "Preview cards are generated for each page on the night ground with the wordmark and the page title, so a link shared in a message says what it opens.",
            "Photograph credits and licences are kept with each image in the data and in the repository's credits file, and one setting switches the on-image credits on or off across the site. Commons downloads are opened and decoded before they ship, because a truncated file can pass a size check.",
            "Tables wider than a phone scroll sideways, with the right edge faded as the only cue that there is more.",
          ],
        },
        ...measuredBlocks("watermans", "the homepage"),
        {
          kind: "note",
          text: "The project README still describes the Foreland Group rebuild of 21 September, with Nunito Sans and a navy ground. The site moved on from that within three hours. The tokens in globals.css are the source of truth, and they are what this document records.",
        },
      ],
    },
  ],
};
