import type { MarkGeometry, StudyDoc } from "./types";
import { measuredBlocks } from "./measured";

/**
 * Sources: birdham-carpentry/lib/brand.ts, tailwind.config.ts, lib/pricing.ts,
 * lib/site.ts, components/Logo.tsx, public/brand and the admin source. Ink boxes
 * are measured from the path data. See docs/study-sources.md.
 */

const INK = "#363C3C";
const BANCHA = "#676A49";
const CARDROOM = "#73806E";
const PAPER = "#F3EDDF";
const SURFACE = "#FAF7EF";
const OAK = "#B98A50";
const STONE = "#726A5A";

const SPECTRAL = '"Spectral", serif';
const HANKEN = '"Hanken Grotesk", sans-serif';

const gull: MarkGeometry = {
  src: "/portfolio/expose/marks/birdham-gull-ink.svg",
  viewBox: "0 0 376.9 172.3",
  ink: { x: 0.59, y: 0, w: 376.3, h: 170.51 },
  ground: PAPER,
  rule: INK,
};

export const birdhamCarpentryStudy: StudyDoc = {
  slug: "birdham-carpentry",
  title: "Birdham Carpentry & Building",
  subtitle:
    "A name, a mark drawn from the founder's own sketch, a website, and the quoting, invoicing and payments system that runs the firm behind it.",
  client: "Birdham Carpentry & Building",
  sector: "Building and joinery",
  year: "2026",
  scope: [
    "Naming",
    "Brand identity",
    "Website design",
    "Development",
    "Estimating engine",
    "Operations backend",
  ],
  liveUrl: "https://birdhamcarpentry.co.uk",
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600&display=swap",

  glance: {
    mark: {
      label: "The mark",
      note: "Ink on paper, the default colourway",
      src: gull.src,
      bg: PAPER,
      wide: true,
      height: 64,
    },
    palette: [
      { name: "Ink", hex: INK, role: "Type, headers and the mark", reference: "Farrow & Ball Studio Green No.93" },
      { name: "Bancha", hex: BANCHA, role: "The working accent", reference: "Farrow & Ball Bancha No.298" },
      { name: "Card Room", hex: CARDROOM, role: "Softer secondary green", reference: "Farrow & Ball Card Room Green No.79" },
      { name: "Paper", hex: PAPER, role: "Warm ground, never pure white" },
      { name: "Oak", hex: OAK, role: "Sparing warm accent, decoration only" },
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
            "Birdham Carpentry & Building is a new firm working across Chichester and the South Downs on listed and period building restoration, fine joinery, bespoke kitchens and sympathetic building work. The commission covered everything a trade business needs on the day it opens: a name, a mark, a website, and the system behind the website that runs quotes, jobs and invoices.",
            "Trade websites divide into two kinds. There is the phone number on a template, and there is the lead portal that sells the same enquiry to three other builders. In a catchment full of listed and period property, nobody was presenting craft properly and nobody was quoting online. The brief was to look like the most careful firm in the county from the first day of trading, and to have the operational machinery to back that up.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The whole thing was built in a single day. The commit history runs from 11:25 to 22:53 on 22 July 2026, fifty-seven commits, and it covers the naming, the mark, the website, the estimating engine, the quote and invoice PDFs, the payments and the operations backend. That is not a claim about heroics. It is a claim about what a small studio can do when the decisions are made in the right order and there is nobody to hand work between.",
          ],
        },
        {
          kind: "timeline",
          entries: [
            {
              date: "11:25",
              label: "Initial build, as Halnaker Construction",
              note: "Brand, site and quote system, under the first name",
            },
            {
              date: "11:43",
              label: "The Mill Mark refined",
              note: "Sails-forward windmill, plus a seal variant and favicon",
            },
            {
              date: "12:11",
              label: "Operations connected to Supabase",
              note: "The same commit moved the reading face from Libre Caslon Text to Spectral",
            },
            {
              date: "13:04",
              label: "Repositioned to lead with restoration",
              note: "Oak receded from the front of the offer, which is what made the name a problem",
              pivot: true,
            },
            {
              date: "13:16",
              label: "Renamed to Birdham Carpentry & Building",
              note: "The windmill went with the name. The seabird replaced it",
              pivot: true,
            },
            {
              date: "14:17",
              label: "Quote and invoice PDFs branded",
              note: "The new mark carried into the documents",
            },
            {
              date: "17:11",
              label: "The gull identity wired through",
              note: "Site and PDF generators on one mark",
            },
            {
              date: "17:52",
              label: "Lockup balanced",
              note: "The mark sized against the nav and the wordmark lines aligned on both edges",
            },
            {
              date: "22:53",
              label: "Invoices rendered from the real page",
              note: "The last commit of the day, matching the quote pipeline",
            },
          ],
          summary: [
            { label: "Commits", value: "57" },
            { label: "Elapsed", value: "11h 28m" },
            { label: "Names", value: "2" },
            { label: "Marks", value: "2" },
          ],
          source:
            "Taken from the project's commit history, which is why the times are to the minute. Only the commits that changed a decision are listed.",
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
            "The firm was not called Birdham first. It opened as Halnaker Construction, named after the village and its windmill on the Downs north of Chichester, and it traded under a complete identity: a latticed windmill mark, a Spectral wordmark, and the sub-line Oak Carpentry & Building. The site, the quote flow and the operations backend were all built under that name.",
            "Two things were wrong with it, and they were connected. The sub-line led with oak, which narrowed the firm to one material at exactly the moment the offer was being widened to restoration and general building. And Halnaker sits inland, on the wrong side of the catchment from the harbour villages where much of the work is.",
            "The rename fixed both. Birdham is a village on Chichester Harbour whose name derives from the Old English for settlement of the birds, so it gave the firm a name rooted in the right part of the catchment and, directly, its mark. A name that produces its own symbol without a second creative step is worth more than a cleverer one that does not.",
          ],
        },
        {
          kind: "rejected",
          bg: PAPER,
          columns: 2,
          plates: [
            {
              src: "/portfolio/study/birdham-carpentry/rejected/halnaker-lockup.webp",
              label: "Halnaker Construction, the replaced lockup",
              note: "The windmill mark with the wordmark in Spectral and Oak Carpentry & Building beneath",
              width: 1184,
              height: 392,
              carries: ["Superseded name", "Oak-led", "Windmill mark"],
            },
            {
              src: "/portfolio/study/birdham-carpentry/rejected/halnaker-mill-mark.webp",
              label: "The Mill Mark",
              note: "Halnaker Windmill with latticed common sails, drawn as a single-colour silhouette",
              width: 624,
              height: 592,
              carries: ["Superseded"],
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The windmill was a good mark and it went anyway. It is worth being clear why, because it is the kind of decision that gets described as taste and is usually not. The gull that replaced it holds the same qualities, a single flat silhouette that embroiders and reduces cleanly, while belonging to the harbour rather than to a hill eight miles inland. When the name stopped being defensible the mark went with it, because a mark that illustrates the wrong name is a mark with a job it cannot do.",
          ],
        },
      ],
    },

    {
      id: "mark",
      number: "03",
      title: "The mark",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The mark is a gull in flight, vectorised from the founder's own drawing and then refined until the wings balanced, the larger wing carried a proper curve, the body was slimmed and the beak came to a point.",
            "One constraint shaped everything about how it was drawn. A trade mark spends most of its working life on jackets, polo shirts and van doors, and embroidery is unforgiving: a shape with an internal stroke, a counter or a second colour becomes a thread change, a registration problem and a cost. So the gull is one solid filled path with no stroke at all. Measured from the file, it is a single subpath. It takes one fill, reverses on ink or on Bancha without redrawing, and stitches as a single thread.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "The mark",
              note: "Ink on paper, the default",
              src: gull.src,
              bg: PAPER,
            },
            {
              label: "Reversed",
              note: "Paper on ink, for dark grounds",
              src: "/portfolio/expose/marks/birdham-gull-paper.svg",
              bg: INK,
            },
            {
              label: "On Bancha",
              note: "Workwear, site boards and van livery",
              src: "/portfolio/expose/marks/birdham-gull-paper.svg",
              bg: BANCHA,
            },
            {
              label: "Horizontal lockup",
              note: "The gull with BIRDHAM in letter-spaced Spectral and the sub-line beneath",
              src: gull.src,
              bg: PAPER,
              wide: true,
              height: 44,
              wordmark: {
                text: "BIRDHAM",
                sub: "CARPENTRY & BUILDING",
                css: SPECTRAL,
                subCss: HANKEN,
                color: INK,
                subColor: "rgba(54,60,60,0.7)",
                weight: 500,
                tracking: "0.2em",
                subTracking: "0.33em",
              },
            },
          ],
        },
        {
          kind: "construction",
          geometry: gull,
          module: { value: 42.63, label: "A quarter of the drawn height" },
          caption:
            "The gull on its 376.9 by 172.3 unit artboard. The drawn ink measures 376.30 by 170.51 units, a ratio of 2.207 to 1, against an artboard ratio of 2.187 to 1. The difference matters in practice: the artwork very nearly fills its box, so there is no built-in clear space and the mark must be given room by whatever places it. Because it is wide and shallow, it is always sized by height and never by width.",
          notes: [
            { label: "Artboard", value: "376.9 × 172.3", note: "viewBox units" },
            { label: "Drawn ink", value: "376.30 × 170.51" },
            { label: "Ink ratio", value: "2.207 : 1" },
            { label: "Artboard ratio", value: "2.187 : 1" },
            { label: "Subpaths", value: "1", note: "One closed shape, single fill" },
            { label: "Stroke", value: "None", note: "An embroidery constraint" },
          ],
        },
        {
          kind: "anatomy",
          geometry: gull,
          caption:
            "The same path is placed at three sizes across the identity, always scaled by a single factor so the drawing is never redrawn for a context.",
          parts: [
            {
              at: 0.12,
              label: "Web header",
              note: "Rendered at a 24 pixel height, rising to 28 at desktop. The mark is the only element in the header that is not type.",
            },
            {
              at: 0.5,
              label: "Horizontal lockup",
              note: "Placed at 0.255 scale on a 520 by 140 artboard, which puts the gull at 96.1 by 43.9 units with 18 units of margin to the left edge.",
            },
            {
              at: 0.86,
              label: "The seal",
              note: "Placed at 0.207 scale inside a double roundel of 60 and 53 unit radii on a 140 unit square, with BIRDHAM arced beneath on a 36 unit radius at 4.5 units of tracking.",
            },
          ],
        },
        {
          kind: "sizes",
          src: gull.src,
          widths: [18, 24, 32, 48, 96, 200],
          bg: PAPER,
          caption:
            "The mark tested at working sizes. Because it is a filled silhouette with no internal detail, it survives to the favicon without a simplified cut, which is the practical payoff of the single-path constraint. The website header uses the 24 pixel height, so the second tile is what most visitors actually see.",
        },
        {
          kind: "prose",
          paragraphs: [
            "The lockup sets BIRDHAM in Spectral capitals at a 0.2em letter-space, with Carpentry & building beneath it in Hanken Grotesk at 0.33em. The sub-line's tracking is not a stylistic pick: it is set so that the second line spans exactly the width of the first, which aligns both lines on each edge and gives the lockup a flush left and right margin. Change the words in the sub-line and the tracking has to be reset.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Lockup",
              measures: [
                { label: "Mark height", value: "24px, 28px at desktop" },
                { label: "Wordmark", value: "Spectral 500, uppercase" },
                { label: "Wordmark size", value: "1.35rem, 1.5rem at desktop" },
                { label: "Wordmark tracking", value: "0.2em" },
                { label: "Mark to wordmark gap", value: "14px" },
                { label: "Wordmark to sub-line", value: "8px" },
              ],
            },
            {
              title: "Sub-line and seal",
              measures: [
                { label: "Sub-line", value: "Hanken Grotesk 500, uppercase" },
                { label: "Sub-line size", value: "0.5rem, 0.55rem at desktop" },
                { label: "Sub-line tracking", value: "0.33em", note: "Set to span the wordmark width" },
                { label: "Seal roundels", value: "r60 at 2, r53 at 1" },
                { label: "Seal arc", value: "r36, text 9pt" },
                { label: "Seal arc tracking", value: "4.5" },
              ],
            },
          ],
        },
        {
          kind: "misuse",
          src: gull.src,
          bg: PAPER,
          ink: INK,
          items: [
            { kind: "stretch", label: "Never scaled on one axis. The mark is sized by height" },
            { kind: "squash", label: "The 2.207 to 1 ratio is fixed" },
            { kind: "shadow", label: "One flat fill. No shadows, gradients or outlines" },
            { kind: "recolour", label: "Ink, paper or Bancha only" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/birdham-carpentry/home-hero.webp",
          alt: "The Birdham Carpentry homepage, with the gull lockup in the header",
          caption:
            "The lockup in service. The sub-line is tracked so that Carpentry & building spans exactly the width of BIRDHAM, which is why both lines align on each edge",
          width: 2880,
          height: 2000,
        },
        {
          kind: "note",
          text: "Birdham has no written brand manual. These constraints are the ones recorded in the source of the mark itself and enforced by the components that place it, which is why they are stated here as they are implemented rather than dressed up as a rules page that does not exist.",
        },
      ],
    },

    {
      id: "colour",
      number: "04",
      title: "Colour",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The palette is drawn from heritage paint colours rather than the bright green and gold that trade businesses tend to reach for. The three greens are real Farrow & Ball references, locked on 22 July 2026: Studio Green as the ink, Bancha as the working accent and Card Room Green as the softer secondary. The ground is a warm paper white and never pure white.",
            "The reason is contextual rather than decorative. Most of the firm's work happens against lime render, old brick and weathered oak, and a palette taken from the paints those buildings are actually finished in sits comfortably in a photograph of the finished job.",
          ],
        },
        {
          kind: "colour",
          swatches: [
            { name: "Ink", hex: INK, role: "Type, headers and the mark", reference: "Studio Green No.93" },
            { name: "Bancha", hex: BANCHA, role: "The primary brand green", reference: "Bancha No.298" },
            { name: "Card Room", hex: CARDROOM, role: "Softer secondary green", reference: "Card Room Green No.79" },
            { name: "Paper", hex: PAPER, role: "Warm ground, never pure white" },
            { name: "Surface", hex: SURFACE, role: "Slightly brighter warm surface" },
            { name: "Stone", hex: STONE, role: "Captions and labels", reference: "Darkened to meet WCAG AA on paper" },
            { name: "Oak", hex: OAK, role: "Decoration only. Never body text" },
          ],
          contrast: [
            { text: "Ink", textHex: INK, surface: "paper", surfaceHex: PAPER },
            { text: "Stone", textHex: STONE, surface: "paper", surfaceHex: PAPER },
            { text: "Bancha", textHex: BANCHA, surface: "paper", surfaceHex: PAPER },
            { text: "Card Room", textHex: CARDROOM, surface: "paper", surfaceHex: PAPER },
            { text: "Oak", textHex: OAK, surface: "paper", surfaceHex: PAPER },
            { text: "Paper", textHex: PAPER, surface: "ink", surfaceHex: INK },
            { text: "Paper", textHex: PAPER, surface: "Bancha", surfaceHex: BANCHA },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The contrast table above is the reason two of these colours carry usage restrictions rather than preferences. Stone was darkened during the build until it cleared the AA threshold on paper, because it sets captions and labels. Oak was left where it is and confined to rules, borders and ornament, because at its measured ratio it cannot carry text at any size. Card Room clears the large-text threshold only, so it is used for headings and panels rather than paragraphs.",
          ],
        },
      ],
    },

    {
      id: "typography",
      number: "05",
      title: "Typography",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The reading face changed during the build. The site opened on Libre Caslon Text and moved to Spectral, and the project README still records the older choice in one line while naming Spectral in another. Spectral sets the wordmark, the headings and the body, which is unusual for a trade site, where the convention is a workhorse sans throughout. A serif reads as considered and slightly old, which is the correct register for a firm whose lead service is listed and period restoration.",
            "Hanken Grotesk handles the working parts: navigation, tracked-caps eyebrows, form labels and the quote flow. The division is functional. If a visitor is reading, it is Spectral. If a visitor is operating something, it is Hanken.",
          ],
        },
        {
          kind: "type",
          families: [
            {
              family: "Spectral",
              role: "Wordmark, headings and body",
              css: SPECTRAL,
              weight: 500,
              weights: "400, 500, 600",
              note: "Letter-spaced capitals at 0.2em in the lockup, roman for headings and copy. It replaced Libre Caslon Text partway through the build.",
            },
            {
              family: "Hanken Grotesk",
              role: "Interface and labels",
              css: HANKEN,
              weights: "400, 500, 600",
              note: "Navigation, tracked-caps eyebrows, the sub-line of the lockup and every working part of the quote flow.",
            },
          ],
        },
        {
          kind: "specimen",
          css: SPECTRAL,
          weight: 400,
          label: "Spectral, the reading face",
          sample:
            "Old buildings ask to be repaired the way they were built.",
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Typographic tokens",
              measures: [
                { label: "Wordmark tracking", value: "0.28em" },
                { label: "Eyebrow tracking", value: "0.18em" },
                { label: "Lockup tracking", value: "0.2em" },
                { label: "Sub-line tracking", value: "0.33em" },
                { label: "Prose measure", value: "68ch" },
                { label: "Soft shadow", value: "0 10px 34px −18px, ink at 35%" },
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
            "Four services lead the offer with listed and period restoration in front, and eight area pages cover the catchment from the harbour villages up to the Downs. Each area page is written individually rather than generated from a template with the place name substituted, because thin duplicate location pages are penalised and, more to the point, read as thin.",
            "The centrepiece is the quote flow. A visitor sizes the job, chooses a standard, premium or heritage specification, and receives an indicative range on the spot, in under a minute, without speaking to anyone.",
          ],
        },
        {
          kind: "list",
          heading: "Page inventory",
          items: [
            { label: "Four service pages", note: "Restoration, carpentry and joinery, kitchens, extensions and building" },
            { label: "Eight area pages", note: "Chichester, Goodwood, Midhurst, Petworth, Arundel, Bosham, West Wittering, Emsworth" },
            { label: "Quote flow", note: "Sized, specified and priced to an indicative range" },
            { label: "Shareable quotes", note: "A tokenised link, no login, PDF download and card deposit" },
            { label: "Work, about, reviews", note: "The public pages, written in the firm's own voice" },
            { label: "Operations admin", note: "Enquiries, clients, quotes, jobs, calendar, invoices, payments" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/study/birdham-carpentry/quote-flow.webp",
          alt: "The first step of the Birdham quote flow, choosing a job type",
          caption:
            "Step one of three. The flow states plainly that the figure is a guide worked out from current material prices, with a firm quote to follow a site visit",
          width: 2880,
          height: 2200,
        },
        {
          kind: "image",
          src: "/portfolio/study/birdham-carpentry/service.webp",
          alt: "The listed and period building restoration service page",
          caption:
            "The lead service page. Spectral for reading, Hanken for the working parts, and a palette that sits against lime render and old brick",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/study/birdham-carpentry/areas.webp",
          alt: "The Chichester area page",
          caption:
            "One of eight area pages, each written individually rather than generated from a template with the place name swapped",
          width: 2880,
          height: 2000,
        },
        {
          kind: "image",
          src: "/portfolio/expose/birdham-mobile.png",
          alt: "Birdham Carpentry on a phone",
          caption: "The same site at 390 pixels",
          width: 390,
          height: 844,
          frame: "phone",
        },
      ],
    },

    {
      id: "estimating",
      number: "07",
      title: "The estimating engine",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The quote figure is computed rather than guessed. Each service carries a bill of materials expressed as a quantity per unit of size, priced against a maintained supplier list. Labour is added at a rate per unit. A specification multiplier is applied, then a margin, and the result is presented as a band rather than a single number.",
            "The engine always returns a range and never a fixed price, and the interface says so plainly, with a firm quote to follow a site visit. That is a commercial decision as much as a technical one. An online figure presented as final is a figure the firm has to honour or retract, and retracting it is worse than never having given it.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "The calculation",
              measures: [
                { label: "Materials", value: "Bill of materials per unit of size" },
                { label: "Material prices", value: "Maintained supplier list" },
                { label: "Labour", value: "Rate per unit of size" },
                { label: "Margin", value: "18%" },
                { label: "Indicative band", value: "±15%" },
              ],
            },
            {
              title: "Specification multiplier",
              measures: [
                { label: "Standard", value: "1.00" },
                { label: "Premium", value: "1.25" },
                { label: "Heritage", value: "1.45" },
                { label: "Units", value: "m² or linear metres" },
                { label: "Output", value: "A range, never a fixed price" },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "operations",
      number: "08",
      title: "Operations",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The public site is the smaller half of the build. Behind the same domain sits a role-gated admin where enquiries convert to clients, quotes convert to jobs, jobs carry stages and calendar bookings, and invoices track payments as they land. The firm runs from it rather than from a spreadsheet and a shoebox.",
            "Quote and invoice PDFs are rendered server-side from the same React components as the on-screen versions. That is the detail that keeps the documents honest: there is no separate PDF template to fall out of step with the site, because there is only one description of what a quote looks like.",
          ],
        },
        {
          kind: "image",
          src: "/portfolio/expose/birdham-admin.png",
          alt: "The Birdham Operations admin showing an invoice with client link and card payment",
          caption:
            "Birdham Operations: an invoice with its client link, PDF and payment options",
          width: 1580,
          height: 1114,
        },
        {
          kind: "architecture",
          layers: [
            {
              label: "Public",
              nodes: [
                { name: "Marketing site", note: "Static. Never reads from the database" },
                { name: "Quote flow", note: "Sizes, specifies and prices the job" },
                { name: "Tokenised quote link", note: "Opened without a login, served through a security-definer function" },
              ],
            },
            {
              label: "Operations",
              nodes: [
                { name: "Admin", note: "Enquiries, clients, quotes, jobs, calendar, invoices" },
                { name: "Row-level security", note: "Owner, staff and bookkeeper roles separated" },
                { name: "PDF renderer", note: "Quotes and invoices from the same components as the screen" },
              ],
            },
            {
              label: "Money",
              nodes: [
                { name: "Stripe", note: "Deposits and payments" },
                { name: "Idempotent webhook", note: "Status accurate through payment, expiry and refund" },
                { name: "Deposit", note: "Published as 10 to 15%, defaulting to 12.5%" },
              ],
            },
          ],
          caption:
            "The public pages never touch the operational database. Everything that reads or writes goes through a server action or a security-definer function.",
        },
        {
          kind: "bullets",
          items: [
            "Quote links are minted as unguessable tokens, so a client opens a quote without an account and cannot reach anyone else's.",
            "Deposits are published to clients as 10 to 15 percent of the job. The admin defaults to 12.5, the middle of that band, and it is adjustable on each quote rather than fixed in code, so the firm can hold to what the site promises without a developer.",
            "The webhook is idempotent, so a Stripe retry cannot double-count a payment or overwrite a refund.",
            "LocalBusiness, Service, FAQ and breadcrumb structured data are built from confirmed details only, with nothing invented to fill a required field.",
          ],
        },
        ...measuredBlocks("birdham-carpentry", "the homepage"),
        {
          kind: "note",
          text: "One inconsistency is worth recording. The stone tone appears at two values in the source: the darkened, accessible value used by the site, and an older, lighter value still sitting in the mark's own file. The site ships the darkened one. Anyone picking up the older file for print work should take the value from the site tokens instead.",
        },
      ],
    },
  ],
};
