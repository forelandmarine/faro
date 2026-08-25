import type { MarkGeometry, StudyDoc } from "./types";

/**
 * Sources: foreland-marine-v2/brand-identity-kit.md (version 1.0, April 2026),
 * the shipped SVGs in foreland-marine-v2/public/logos, and the application
 * source. Ink boxes are measured from the path data by curve flattening, not
 * read off the artboard. See docs/study-sources.md.
 */

const NAVY = "#081630";
const DEEP = "#040D1A";
const MUTED = "#7BA8C8";

const lockup: MarkGeometry = {
  src: "/portfolio/expose/marks/foreland-lockup-white.svg",
  viewBox: "96 430 850 145",
  ink: { x: 107, y: 447.32, w: 810, h: 129.36 },
  ground: NAVY,
  rule: MUTED,
};

const icon: MarkGeometry = {
  src: "/portfolio/expose/marks/foreland-icon-white.svg",
  viewBox: "0 0 200 200",
  ink: { x: 64, y: 40, w: 72.01, h: 120 },
  ground: DEEP,
  rule: MUTED,
};

export const forelandMarineStudy: StudyDoc = {
  slug: "foreland-marine",
  title: "Foreland Marine",
  subtitle:
    "How an independent superyacht consultancy was given an identity that never appears on a white page, and a site that carries four services, six tools and a paid subscription product.",
  client: "Foreland Marine",
  sector: "Superyacht consultancy",
  year: "2026",
  scope: [
    "Brand identity kit",
    "Website design",
    "Development",
    "Copy direction",
    "Payments and membership infrastructure",
  ],
  liveUrl: "https://forelandmarine.com",
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap",

  glance: {
    mark: {
      label: "Primary lockup",
      note: "White on navy, the only permitted colourway",
      src: lockup.src,
      bg: NAVY,
      wide: true,
      height: 52,
    },
    palette: [
      { name: "Deep navy", hex: DEEP, role: "Deepest ground, footer" },
      { name: "Navy", hex: NAVY, role: "Primary page background" },
      { name: "Chart blue", hex: "#0C1E42", role: "Cards and raised surfaces" },
      { name: "Ocean", hex: "#5386B6", role: "The accent" },
      { name: "Muted blue", hex: MUTED, role: "Body copy in place of grey" },
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
            "Foreland Marine is an independent consultancy working on sailing and motor yachts between 24 and 60 metres. It runs refit projects, acts as owner's representative on new builds, manages yachts in service and takes technical consultancy work. Its commercial position is that it holds no yard affiliations, takes no broker commissions and accepts no referral fees, so its advice carries no conflict of interest.",
            "That independence is the product. The brief was to build an identity and a site that make it legible without saying it too loudly, and that read like a colleague rather than a brochure.",
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Yacht consultancy sites converge on a single look: a dark page, drone footage, a carousel of superlatives and a contact form. The convergence is so complete that a reader cannot tell two firms apart. Foreland's advantage is editorial, in that it thinks clearly and writes plainly, so the work was to make the identity and the site behave the way the consultancy behaves.",
          ],
        },
        {
          kind: "list",
          heading: "What was delivered",
          items: [
            { label: "Brand identity kit", note: "Version 1.0, April 2026, covering mark, colour, type, iconography, components, motion, photography and voice" },
            { label: "The website", note: "Custom build, no template, no marketing pixels" },
            { label: "A paid subscription product", note: "Technical Support, with Stripe checkout, webhooks and invoicing" },
            { label: "Six self-serve tools", note: "Built as part of the site rather than bolted on" },
            { label: "A gated membership area", note: "Foreland Group, entered by invitation code" },
            { label: "The editorial system", note: "Later became the foundation for The First Owner's Reference" },
          ],
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
            "The company takes its name from the South Foreland Lighthouse in Kent, which has guided vessels into the Thames Estuary since the seventeenth century and later carried the first ship to shore wireless transmission. The mark is that lighthouse, drawn with its signal beam, and the wordmark sits beside it.",
            "The single most consequential decision in the identity is negative: the kit contains no light colourway at all. The mark exists in white and is placed on navy, and there is no approved alternative. That removes an entire class of inconsistency, because there is no decision to make about which version to use, and it puts clear distance between Foreland and competitors still trading on white pages.",
          ],
        },
        {
          kind: "marks",
          tiles: [
            {
              label: "Primary lockup",
              note: "White on navy, the only permitted colourway",
              src: lockup.src,
              bg: NAVY,
              wide: true,
              height: 52,
            },
            {
              label: "The icon mark",
              note: "Favicons, app icons, avatars and small placements",
              src: icon.src,
              bg: DEEP,
            },
            {
              label: "On chart blue",
              note: "Holds on the raised card surface",
              src: icon.src,
              bg: "#0C1E42",
            },
            {
              label: "On ocean",
              note: "Holds against the accent, the lightest ground in the system",
              src: icon.src,
              bg: "#5386B6",
            },
          ],
        },
        {
          kind: "construction",
          geometry: lockup,
          module: {
            value: 77.62,
            label: "The width of the lighthouse",
          },
          caption:
            "The lockup on its 850 by 145 unit artboard, ruled at the width of the lighthouse. The drawn ink measures 810 by 129.36 units, so the whole lockup is 10.44 lighthouse widths across. The wordmark is set as outlines rather than live text, which means the file is a single path and cannot lose its typeface when it travels.",
          notes: [
            { label: "Artboard", value: "850 × 145", note: "viewBox units" },
            { label: "Drawn ink", value: "810 × 129.36" },
            { label: "Lighthouse", value: "77.62 × 129.36", note: "0.600 : 1, full lockup height" },
            { label: "Mark to wordmark", value: "48.67 units", note: "0.63 of the lighthouse width" },
            { label: "Wordmark", value: "683.71 units", note: "8.81 lighthouse widths" },
            { label: "Subpaths", value: "38", note: "One path, no live text" },
          ],
        },
        {
          kind: "anatomy",
          geometry: lockup,
          caption:
            "Three relationships hold the lockup together. The brand document forbids altering any of them.",
          parts: [
            {
              at: 0.048,
              label: "The lighthouse",
              note: "77.62 units wide against a 129.36 unit height, a ratio of 0.600 to 1. The standalone icon measures 0.6001 to 1, which confirms the two are the same drawing rather than two versions of it.",
            },
            {
              at: 0.126,
              label: "The separation",
              note: "48.67 units of air between the mark and the first letter, which is 0.63 of the lighthouse width. This gap is the measurement most likely to be nudged in a hurry, and the one the kit specifically protects.",
            },
            {
              at: 0.578,
              label: "The wordmark",
              note: "683.71 units, or 8.81 lighthouse widths, on a cap height of 68.9 units. It is drawn, not typeset, so it renders identically wherever it is placed.",
            },
          ],
        },
        {
          kind: "clearspace",
          geometry: lockup,
          unitValue: 129.36,
          unitLabel: "the height of the lighthouse",
          multiplier: 1,
          caption:
            "Clear space is a margin equal to the height of the lighthouse on all four sides. Because the lighthouse runs the full height of the lockup, the rule resolves neatly: the exclusion zone is one lockup height deep on every edge, which is easy to judge by eye and hard to get wrong.",
        },
        {
          kind: "sizes",
          src: lockup.src,
          widths: [96, 140, 204, 300, 420],
          minPx: 204,
          minMm: 50,
          bg: NAVY,
          caption:
            "The lockup has a hard floor of 204 pixels on screen and 50 millimetres in print. Below that the wordmark closes up and the lighthouse loses its beam, so the standalone icon takes over instead. The floor is unusually high for a logo, which is a consequence of the wordmark being long and the mark being narrow.",
        },
        {
          kind: "misuse",
          src: lockup.src,
          bg: NAVY,
          ink: "#FFFFFF",
          items: [
            { kind: "lightGround", label: "Never the white mark on a light ground" },
            { kind: "stretch", label: "Never alter the proportions or the mark to wordmark spacing" },
            { kind: "shadow", label: "No drop shadows, gradients or outlines" },
            { kind: "rotate", label: "No rotation or skew" },
          ],
        },
        {
          kind: "note",
          text: "Four of the five documented restrictions are shown. The fifth, that the lockup is never used below 204 pixels or 50 millimetres, is covered by the size ladder above.",
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
            "The palette is four blues and white. Three of them are grounds, running from the deepest navy in the footer up through the page background to the chart blue used for cards and raised surfaces, so depth is built from the palette rather than from shadows. Ocean is the only accent and is reserved for interactive elements.",
            "The rule that does most of the work is that body copy is set in muted blue rather than grey or white. White is held back for headings and emphasis. Because text and background are drawn from the same family of colour, the pages hold together even where the density of information is high.",
          ],
        },
        {
          kind: "colour",
          swatches: [
            { name: "Deep navy", hex: DEEP, role: "Deepest backgrounds and the footer" },
            { name: "Navy", hex: NAVY, role: "Primary page background" },
            { name: "Chart blue", hex: "#0C1E42", role: "Cards and elevated surfaces" },
            { name: "Ocean", hex: "#5386B6", role: "Buttons, links, accent bars" },
            { name: "Muted blue", hex: MUTED, role: "Body copy, descriptions, secondary text" },
            { name: "White", hex: "#FFFFFF", role: "Headings and emphasis only" },
            { name: "Green", hex: "#22C55E", role: "Success states and positive indicators" },
          ],
          contrast: [
            { text: "White", textHex: "#FFFFFF", surface: "navy", surfaceHex: NAVY },
            { text: "Muted blue", textHex: MUTED, surface: "navy", surfaceHex: NAVY },
            { text: "Muted blue", textHex: MUTED, surface: "chart blue", surfaceHex: "#0C1E42" },
            { text: "Ocean", textHex: "#5386B6", surface: "navy", surfaceHex: NAVY },
            { text: "White", textHex: "#FFFFFF", surface: "ocean", surfaceHex: "#5386B6" },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "Depth beyond the three grounds comes from white at fixed opacities rather than from new colours. Five values are defined and nothing outside them is used, which is why borders and dividers stay consistent across sixty-five pages.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "The opacity system",
              measures: [
                { label: "Hover backgrounds", value: "white 5%" },
                { label: "Subtle borders and dividers", value: "white 8%" },
                { label: "Card borders, section dividers", value: "white 10%" },
                { label: "Active borders, outline buttons", value: "white 20%" },
                { label: "Prominent borders", value: "white 30%" },
              ],
            },
            {
              title: "Colour rules",
              measures: [
                { label: "Light page backgrounds", value: "Never" },
                { label: "Accent share of a layout", value: "Sparing" },
                { label: "Body text colour", value: "Muted blue" },
                { label: "Saturated colour outside the palette", value: "Never" },
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
            "One typeface does all of the work. Nunito Sans is a humanist sans with a warm character, and the brand uses four of its weights for four fixed jobs. The distinctive choice is that headings are always set at the light 300 weight, large and unemphasised. Most consultancies reach for bold headings to signal authority; setting them light says the opposite, and says it consistently.",
          ],
        },
        {
          kind: "type",
          families: [
            {
              family: "Nunito Sans",
              role: "The whole site, one family",
              css: '"Nunito Sans", system-ui, sans-serif',
              weight: 300,
              weights: '"Nunito Sans", "Aptos", system-ui, sans-serif',
              note: "Light 300 for all page headings, regular 400 for body, semibold 600 for buttons, labels and section markers, bold 700 reserved for rare strong emphasis. There is no second typeface anywhere in the system.",
            },
          ],
        },
        {
          kind: "specimen",
          css: '"Nunito Sans", system-ui, sans-serif',
          weight: 300,
          label: "Nunito Sans Light 300, the signature weight",
          sample:
            "Independent. No yard affiliations, no broker commissions, no referral fees.",
        },
        {
          kind: "typescale",
          rows: [
            { size: "text-3xl to 5xl", role: "H1, responsive", family: "Nunito Sans", weight: "300", tracking: "normal", css: '"Nunito Sans", sans-serif', previewPx: 34, previewWeight: 300 },
            { size: "text-2xl to 3xl", role: "H2, responsive", family: "Nunito Sans", weight: "300", tracking: "normal", css: '"Nunito Sans", sans-serif', previewPx: 27, previewWeight: 300 },
            { size: "text-base", role: "H3", family: "Nunito Sans", weight: "600", tracking: "normal", css: '"Nunito Sans", sans-serif', previewPx: 17, previewWeight: 600 },
            { size: "text-sm to base", role: "Body", family: "Nunito Sans", weight: "400", lineHeight: "relaxed", css: '"Nunito Sans", sans-serif', previewPx: 16, previewWeight: 400 },
            { size: "text-xs", role: "Section label", family: "Nunito Sans", weight: "600", tracking: "0.15em", css: '"Nunito Sans", sans-serif', previewPx: 13, previewWeight: 600 },
            { size: "text-sm", role: "Button", family: "Nunito Sans", weight: "600", tracking: "normal", css: '"Nunito Sans", sans-serif', previewPx: 15, previewWeight: 600 },
            { size: "text-xs", role: "Caption", family: "Nunito Sans", weight: "400", tracking: "normal", css: '"Nunito Sans", sans-serif', previewPx: 13, previewWeight: 400 },
          ],
        },
        {
          kind: "bullets",
          items: [
            "Page headings are never bold. This is the most distinctive typographic rule in the brand and the one most likely to be broken by a hand that is not familiar with it.",
            "Section labels are uppercase, semibold, tracked to 0.15em, set in ocean, with 12 pixels beneath them.",
            "Body text never runs larger than text-base, however much space is available.",
          ],
        },
      ],
    },

    {
      id: "interface",
      number: "05",
      title: "Interface",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The component set is small and fully specified, which is what allows a site of this size to be extended without a design review each time. Every value below is fixed in the brand document rather than decided per page.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Primary button",
              measures: [
                { label: "Background", value: "#5386B6" },
                { label: "Text", value: "White, semibold, text-sm" },
                { label: "Padding", value: "24px × 12px" },
                { label: "Corner radius", value: "4px" },
                { label: "Hover", value: "Accent at 90%" },
                { label: "Transition", value: "150ms, colours" },
              ],
            },
            {
              title: "Outline button",
              measures: [
                { label: "Border", value: "White 30%" },
                { label: "Text", value: "White, semibold, text-sm" },
                { label: "Padding", value: "24px × 12px" },
                { label: "Corner radius", value: "4px" },
                { label: "Hover", value: "White 10% fill" },
                { label: "Transition", value: "150ms, colours" },
              ],
            },
            {
              title: "Service card",
              measures: [
                { label: "Background", value: "#0C1E42" },
                { label: "Border", value: "White 8%" },
                { label: "Left accent bar", value: "4px, ocean at 70%" },
                { label: "Padding", value: "32px, 36px left" },
                { label: "Hover border", value: "Ocean at 30%" },
              ],
            },
            {
              title: "Header",
              measures: [
                { label: "Behaviour", value: "Sticky" },
                { label: "Height", value: "80px" },
                { label: "Background", value: "#081630 at 95%, blurred" },
                { label: "Bottom border", value: "White 8%" },
                { label: "Mobile", value: "Full-screen overlay, scroll locked" },
              ],
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The mobile menu is rendered outside the header element rather than inside it. That is not a stylistic choice: an element with a backdrop blur establishes a containing block, and a fixed overlay nested inside it is positioned against the header rather than the viewport. Moving the overlay out of the header is the fix.",
            "There is no icon library. Icons are inline SVG at a 1.5 to 1.8 pixel stroke with round caps and joins, sized between 16 and 22 pixels, and coloured with currentColor so they inherit from the text they sit beside.",
          ],
        },
      ],
    },

    {
      id: "motion",
      number: "06",
      title: "Motion",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Motion is restrained and consistent, and no animation library is shipped. Scroll reveals run on an Intersection Observer at a threshold of 0.15 with a root margin of -40 pixels at the bottom, so an element begins to arrive slightly before it is fully in view. Every reveal runs for 0.7 seconds on an ease-out curve and holds its final state.",
          ],
        },
        {
          kind: "motion",
          rows: [
            { name: "fade-up", effect: "Opacity 0 to 1, translateY 32px to 0", duration: "0.7s", easing: "ease-out" },
            { name: "fade-in", effect: "Opacity 0 to 1", duration: "0.7s", easing: "ease-out" },
            { name: "slide-left", effect: "Opacity 0 to 1, translateX 48px to 0", duration: "0.7s", easing: "ease-out" },
            { name: "slide-right", effect: "Opacity 0 to 1, translateX -48px to 0", duration: "0.7s", easing: "ease-out" },
            { name: "scale-in", effect: "Opacity 0 to 1, scale 0.95 to 1", duration: "0.7s", easing: "ease-out" },
            { name: "stagger", effect: "Children animate in sequence", duration: "100ms steps", easing: "ease-out" },
          ],
          note: "Interactive elements transition colours only, at 150 milliseconds. There are no spring or bounce curves anywhere in the system.",
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Hero parallax",
              measures: [
                { label: "Background image", value: "translateY(scrollY × 0.3)" },
                { label: "Foreground text", value: "translateY(scrollY × −0.15)" },
                { label: "Text opacity", value: "max(0, 1 − scrollY ÷ 600)" },
              ],
            },
            {
              title: "Photography treatment",
              measures: [
                { label: "Hero opacity", value: "40 to 50%" },
                { label: "General opacity", value: "15 to 45%" },
                { label: "Gradient", value: "bg0/45 → bg0/25 → bg0" },
                { label: "Saturation", value: "1.15 on heroes" },
                { label: "Parallax overflow", value: "scale 1.10" },
              ],
            },
          ],
        },
        {
          kind: "prose",
          paragraphs: [
            "The imagery is genuine racing and yard photography rather than stock: J Class under sail, welders in dry dock, timber planking, rig work, engine rooms. It is never shown at full brightness. Every image sits beneath a navy gradient at reduced opacity, which is what keeps the text above it legible and keeps the pages looking like one site rather than a gallery.",
          ],
        },
      ],
    },

    {
      id: "site",
      number: "07",
      title: "The site",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The site runs to sixty-five pages and carries a good deal more than the four consultancy services. Alongside them sit a paid technical support product on three subscription tiers, six self-serve tools, a journal, a quarterly newsletter archive and a private membership area entered by invitation code.",
            "Every service page is written in the register of a private memo rather than a sales deck, with plain language, real numbers and named clients where permission allows. Each carries FAQ structured data, so the answers can be quoted accurately by search and by answer engines.",
          ],
        },
        {
          kind: "list",
          heading: "Page inventory",
          items: [
            { label: "Four service pages", note: "Refit, owner's representation, yacht management, technical consultancy" },
            { label: "Technical Support", note: "Three paid tiers with Stripe checkout and invoicing" },
            { label: "Six tools", note: "Sea time tracker, Lightship ISM, running cost calculator, PMS database, weather routing, debrief" },
            { label: "Insights journal", note: "Articles with OpenGraph images generated per article" },
            { label: "Newsletter archive", note: "The Foreland Quarter, issue by issue" },
            { label: "Foreland Group", note: "Membership gated by invitation code, with logged downloads" },
          ],
        },
        {
          kind: "image",
          src: "/portfolio/expose/foreland-mobile.png",
          alt: "Foreland Marine on a phone",
          caption: "The same site at 390 pixels",
          width: 390,
          height: 844,
          frame: "phone",
        },
      ],
    },

    {
      id: "architecture",
      number: "08",
      title: "Architecture",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "There is more infrastructure behind the pages than the front of the site suggests. Stripe handles the support subscriptions through a custom checkout and webhook flow, Resend sends transactional email from branded templates, and Supabase records membership interest, verifies invitation codes and logs gated downloads.",
          ],
        },
        {
          kind: "architecture",
          layers: [
            {
              label: "Front",
              nodes: [
                { name: "Next.js App Router", note: "Sixty-five pages, no marketing pixels" },
                { name: "Tailwind", note: "Tokens mirror the brand kit" },
                { name: "Generated OG images", note: "Per article, at request time" },
              ],
            },
            {
              label: "Server routes",
              nodes: [
                { name: "enquiry", note: "Contact and service enquiries" },
                { name: "stripe", note: "Checkout sessions and webhooks" },
                { name: "technical-support", note: "Subscription tiers" },
                { name: "foreland-group", note: "Invitation codes and gated downloads" },
                { name: "pay", note: "Payment links and invoicing" },
                { name: "reports, banking, i", note: "Client reporting and short links" },
              ],
            },
            {
              label: "Services",
              nodes: [
                { name: "Stripe", note: "Subscriptions, checkout, invoices" },
                { name: "Supabase", note: "Membership, codes, download log" },
                { name: "Resend", note: "Branded transactional email" },
                { name: "Vercel", note: "Hosting and edge delivery" },
              ],
            },
          ],
          caption:
            "Public pages never depend on the database. Everything that reads or writes goes through a server route.",
        },
        {
          kind: "bullets",
          items: [
            "OpenGraph images are generated per article at request time rather than at build, so a new piece never ships without a card.",
            "Two llms.txt files, an index and a full corpus, give AI search systems an accurate source to cite rather than a guess.",
            "Parallax and scroll reveals are written against the browser's own APIs. No animation library is shipped to the visitor.",
            "ProfessionalService, Service, Person and FAQ structured data sit on the relevant pages.",
            "Images are served as AVIF and WebP at responsive sizes, with heroes preloaded and everything else loaded lazily.",
          ],
        },
      ],
    },

    {
      id: "voice",
      number: "09",
      title: "Voice",
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The written rules are part of the identity rather than an afterthought, because on a site with this much copy the writing is more visible than the mark. The register is professional but not stuffy, technical without piling up jargon, and direct about costs, risks and conflicts of interest.",
          ],
        },
        {
          kind: "spec",
          groups: [
            {
              title: "Fixed rules",
              measures: [
                { label: "Spelling", value: "British English" },
                { label: "Em-dashes", value: "Never" },
                { label: "Exclamation marks", value: "Never" },
                { label: "Numbers", value: "One to nine in words, 10 up in figures" },
                { label: "Measurements", value: "Always figures, always metres" },
              ],
            },
            {
              title: "Terms",
              measures: [
                { label: "Vessels over 24m", value: "Yacht, not boat" },
                { label: "International currency", value: "EUR" },
                { label: "UK currency", value: "GBP" },
                { label: "Superlatives", value: "Avoided" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
