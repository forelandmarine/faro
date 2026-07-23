export type PaletteSwatch = {
  name: string;
  hex: string;
  note?: string;
};

export type TypeSpecimen = {
  family: string;
  role: string;
  note?: string;
  /** CSS font-family stack used to render the live specimen */
  css: string;
  weight?: number;
};

/** One tile on the logo sheet: the mark shown on a brand ground. */
export type MarkTile = {
  label: string;
  /** Tile background, a real brand colour */
  bg: string;
  note?: string;
  /** Spans the full sheet width (lockups) */
  wide?: boolean;
  /** SVG asset under /portfolio/expose/marks/ */
  src?: string;
  /** Display height of the mark in pixels */
  height?: number;
  /** Typeset wordmark, optionally beside the mark image, using page-loaded
      brand fonts. SVG lockups with live <text> lose their fonts inside an
      <img>, so lockups are recomposed here instead. */
  wordmark?: {
    text: string;
    sub?: string;
    css: string;
    subCss?: string;
    color: string;
    subColor?: string;
    weight?: number;
    tracking?: string;
    subTracking?: string;
    subItalic?: boolean;
  };
};

/** Full brand-and-site exposé, rendered as the deep sections of a case study. */
export type Expose = {
  /** Google Fonts stylesheet for live type specimens on this page only */
  fontsHref?: string;
  identity: string[];
  marks: MarkTile[];
  palette: PaletteSwatch[];
  type: TypeSpecimen[];
  site: string[];
  pages: { label: string; note?: string }[];
  build: string[];
  buildPoints: string[];
  /** Full-width plate illustrating the build section */
  buildImage?: { src: string; alt: string; caption?: string };
  mobileImage?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  url: string;
  category: string;
  vertical: "marine" | "wellness" | "editorial" | "craft";
  image: string;
  tagline: string;
  brief: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  stack: string[];
  year: number;
  role: string;
  expose?: Expose;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "foreland-marine",
    name: "Foreland Marine",
    url: "https://forelandmarine.com",
    category: "Web, brand, development",
    vertical: "marine",
    image: "/portfolio/foreland.png",
    tagline:
      "Independent superyacht consultancy site, written and designed for owners and captains first.",
    brief:
      "Foreland Marine is an independent consultancy that runs refit projects and acts as owner's representative on new builds. The site needed to read like a colleague rather than a brochure, and to say enough about the work to earn a meeting without giving away the playbook.",
    problem:
      "Yacht consultancies tend to look identical online, with dark backgrounds, drone footage and stock superlatives. Foreland's edge is editorial: clear thinking, plainly written. The site had to look and read the way the consultancy actually works.",
    approach: [
      "Stripped the homepage back to one paragraph and a single contact line, with no carousel and no buzzwords.",
      "Wrote the service pages in the cadence of a private memo rather than a sales deck, with plain language, real numbers and named clients where permitted.",
      "Built custom in Next.js with no marketing pixels, and typography set in Nunito Sans at a light display weight.",
      "Built the editorial system that later became the foundation for The First Owner's Reference.",
    ],
    outcomes: [
      "Inbound enquiries shifted from agencies to direct owner contact.",
      "Enquiry quality rose, with longer briefs, named vessels and named yards.",
      "The site is now cited by other professionals in their own pitches.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe", "Supabase", "Vercel"],
    year: 2026,
    role: "Design, development, copy direction",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600&display=swap",
      identity: [
        "The company is named after the South Foreland Lighthouse in Kent, and the identity follows from that: a white lighthouse mark and wordmark, always set on deep navy. The brand kit contains no light backgrounds at all, which gives the firm an unusually consistent presence and puts clear distance between it and competitors still trading on white pages and drone footage.",
        "A single typeface does all of the work. Headings are set in Nunito Sans at its light 300 weight, large and unemphasised, with the semibold held back for buttons and section labels. Body copy is set in a muted blue drawn from the palette rather than a neutral grey, so text and background always belong to the same family of colour.",
        "The rules in the brand kit are strict. The mark appears in white only, with clear space equal to the height of the lighthouse on all sides, a minimum width of 204 pixels on screen and 50 millimetres in print, and no effects or rotation. A standalone lighthouse icon covers favicons, avatars and other placements too small for the full lockup.",
      ],
      marks: [
        {
          label: "Primary lockup",
          note: "White on navy, the only permitted colourway",
          src: "/portfolio/expose/marks/foreland-lockup-white.svg",
          bg: "#081630",
          wide: true,
          height: 52,
        },
        {
          label: "The icon mark",
          note: "Favicons, avatars and small placements",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#040D1A",
        },
        {
          label: "On chart blue",
          note: "Legible on each of the palette's surface blues",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#0C1E42",
        },
        {
          label: "On ocean",
          note: "Against the accent blue",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#5386B6",
        },
      ],
      palette: [
        { name: "Deep navy", hex: "#040D1A", note: "Deepest ground, footer" },
        { name: "Navy", hex: "#081630", note: "Primary page background" },
        { name: "Chart blue", hex: "#0C1E42", note: "Cards and raised surfaces" },
        { name: "Ocean", hex: "#5386B6", note: "The accent" },
        { name: "Muted blue", hex: "#7BA8C8", note: "Body copy in place of grey" },
      ],
      type: [
        {
          family: "Nunito Sans",
          role: "The whole site, one family",
          css: '"Nunito Sans", system-ui, sans-serif',
          weight: 300,
          note: "Light 300 for headings, regular for body, semibold for labels and buttons. There is no second typeface.",
        },
      ],
      site: [
        "The site carries a good deal more than the four consultancy services. Alongside them sit a paid technical support product with three subscription tiers, six self-serve tools, a journal, a quarterly newsletter archive and a private membership area gated by invitation code. Each service page carries FAQ schema and is written in the same plain register as the rest of the site.",
        "Animation is kept deliberately restrained. Heroes carry a slow two-layer parallax, sections fade in as they enter the viewport, and colour transitions run at 150 milliseconds. The photography is genuine racing and yard imagery, held at reduced opacity beneath navy gradients so that the text above it stays legible.",
      ],
      pages: [
        { label: "Four service pages", note: "Refit, new build, management, technical consultancy" },
        { label: "Technical Support", note: "Three paid tiers with Stripe checkout and invoicing" },
        { label: "Six tools", note: "Sea time tracker, ISM platform, running cost calculator and more" },
        { label: "Insights journal", note: "Articles with per-page generated OG images" },
        { label: "Newsletter archive", note: "The Foreland Quarter, issue by issue" },
        { label: "Foreland Group", note: "Membership gated by invitation code, with logged downloads" },
      ],
      build: [
        "There is a fair amount of infrastructure behind the pages. Stripe handles the support subscriptions through a custom checkout and webhook flow, Resend sends transactional email from branded templates, and Supabase records membership interest, verifies invitation codes and logs gated downloads.",
      ],
      buildPoints: [
        "OpenGraph images are generated per article at request time rather than at build.",
        "Two llms.txt files, an index and a full corpus, give AI search systems an accurate source to cite.",
        "Parallax and scroll reveals are written against the browser's own APIs; no animation library is shipped.",
        "ProfessionalService, Service, Person and FAQ structured data sit on the relevant pages.",
        "Images are served as AVIF and WebP at responsive sizes, with heroes preloaded and the rest loaded lazily.",
      ],
      mobileImage: "/portfolio/expose/foreland-mobile.png",
    },
  },
  {
    slug: "nimara-pilates",
    name: "Nimara Pilates",
    url: "https://nimarapilates.com",
    category: "Web, brand",
    vertical: "wellness",
    image: "/portfolio/nimara.png",
    tagline:
      "Brand identity and launch site for a Mallorca pilates and yoga studio expanding to London and Paris.",
    brief:
      "Nimara is a new pilates and yoga brand launching in Mallorca, with London and Paris to follow in the medium term. The site needed to feel calm and considered, and to hold a premium register without slipping into wellness cliché.",
    problem:
      "Most pilates studios look the same online: terracotta palettes and stock photography of women in athleisure on hardwood floors. Nimara needed to read as a brand that could credibly stand alongside hospitality and beauty houses rather than only other studios.",
    approach: [
      "Defined the typographic system before any layout work, so the brand reads first as letterforms and second as imagery.",
      "Directed photography towards editorial stillness rather than fitness energy.",
      "Structured the site to scale from one studio to three without a rebuild.",
      "Launched with four languages at full parity: English, Spanish, French and German, switched in place.",
    ],
    outcomes: [
      "The brand is visually distinct from every other studio in the local market.",
      "The founders use the site as the primary asset in landlord and investor conversations.",
      "The architecture is ready for the multi-location rollout without redesign.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Lenis", "Vercel"],
    year: 2026,
    role: "Brand identity, design, development",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@400;500&display=swap",
      identity: [
        "The mark is a Mallorquin leopardess mid-stretch, drawn as a single unbroken line without fill or ornament. It survives from a sixteen pixel favicon up to storefront signage, and is cut in three line weights: a light default, a heavier version for large format work, and a fine version for embroidery and foil blocking. The wordmark is NIMĀRA set in Cinzel capitals, and the macron on the second A is part of the name rather than a decoration.",
        "The palette pairs warm sand and cream surfaces with ink text and a single sage green, which does every accent job on the site. Hover states dim through opacity rather than introducing a second colour, and the oak tone is confined to rules and borders. The system allows one typeface per role, one accent and one mark, and nothing has been added to it since it was set.",
        "Headings are set in sentence case throughout. The brand system rules out title case on the grounds that it reads as advertising, and the studio is meant to read as a publication.",
        "The delivered asset library runs to around four hundred files, covering marks, wordmarks, horizontal and vertical lockups, favicons, social crops and print variants in every permitted colourway. Below one hundred pixels wide the wordmark is dropped and the leopardess stands alone.",
      ],
      marks: [
        {
          label: "The mark, ink on sand",
          note: "Default colourway, light line weight",
          src: "/portfolio/expose/marks/nimara-leopardess-ink.svg",
          bg: "#EFE6D8",
        },
        {
          label: "Reversed",
          note: "Cream line for dark and immersive sections",
          src: "/portfolio/expose/marks/nimara-leopardess-cream.svg",
          bg: "#0F0E0C",
        },
        {
          label: "Sage",
          note: "The accent colourway on cream",
          src: "/portfolio/expose/marks/nimara-leopardess-sage.svg",
          bg: "#F7F3ED",
        },
        {
          label: "Horizontal lockup",
          note: "Leopardess, NIMĀRA in Cinzel with the macron, sub-line in tracked DM Sans",
          src: "/portfolio/expose/marks/nimara-leopardess-ink.svg",
          bg: "#EFE6D8",
          wide: true,
          height: 72,
          wordmark: {
            text: "NIMĀRA",
            sub: "REFORMER PILATES",
            css: '"Cinzel", serif',
            subCss: '"DM Sans", sans-serif',
            color: "#1A1A1A",
            subColor: "rgba(26,26,26,0.62)",
            tracking: "0.25em",
            subTracking: "0.3em",
          },
        },
      ],
      palette: [
        { name: "Sand", hex: "#EFE6D8", note: "Primary surface" },
        { name: "Cream", hex: "#F7F3ED", note: "Cards, light sections" },
        { name: "Ink", hex: "#1A1A1A", note: "Text and wordmark" },
        { name: "Stone", hex: "#6B6B60", note: "Secondary text" },
        { name: "Sage", hex: "#7E9A7A", note: "The only accent colour" },
        { name: "Oak", hex: "#C2A87A", note: "Rules and borders only" },
      ],
      type: [
        {
          family: "Cinzel",
          role: "Wordmark only",
          css: '"Cinzel", serif',
          note: "Trajan-lineage capitals, reserved for NIMĀRA and nothing else.",
        },
        {
          family: "Cormorant Garamond",
          role: "Display and headings",
          css: '"Cormorant Garamond", serif',
          weight: 300,
          note: "Light editorial serif on a harmonic 1.25 scale, from caption to 96 pixel display.",
        },
        {
          family: "DM Sans",
          role: "Body and interface",
          css: '"DM Sans", sans-serif',
          note: "Body, navigation and labels, with tracked capitals for eyebrows.",
        },
      ],
      site: [
        "The site is organised like a small publication: classes, pricing, the studio, instructors, a journal and the policy pages, all written in the same register. Every string on the site exists in English, Spanish, French and German at full parity, around sixteen hundred lines of translated copy, and the language switches in place without a reload.",
        "There is more motion here than on the other sites in this portfolio, though all of it is slow: a film grain overlay across the viewport, images that arrive from a soft blur, a testimonial marquee on a forty second loop, and a gentle scale animation on a breathing rhythm. Lenis smooths the scroll, GSAP drives the reveals, and the whole layer stands down for visitors who prefer reduced motion.",
      ],
      pages: [
        { label: "Classes", note: "Four programmes, with every class capped at eight" },
        { label: "Pricing", note: "Packs, memberships and an introductory offer" },
        { label: "Studio", note: "The Santa Catalina location, hours and the room itself" },
        { label: "Instructors", note: "Profiles of the teaching team" },
        { label: "Journal", note: "Editorial posts in all four languages" },
        { label: "Careers and partnerships", note: "Hiring and partnership enquiries" },
      ],
      build: [
        "Content lives in source-controlled TypeScript rather than a CMS, which is what makes the four-language parity enforceable: a missing translation fails the build instead of slipping through unnoticed. Structured data describes the studio in full, with coordinates, opening hours and the class catalogue, for map results and AI answers about pilates in Palma.",
      ],
      buildPoints: [
        "Four languages held at full parity in a translation layer of around 1,600 lines, with each visitor's choice remembered.",
        "ExerciseGym and LocalBusiness schema carry the coordinates, hours and class catalogue.",
        "Film grain, vignettes and parallax are applied as separate layers, so the photography stays clean at source.",
        "The booking area is structured around the studio's scheduling platform, so switching it on is a matter of adding the embed.",
        "WhatsApp sits alongside the contact form as a primary enquiry channel.",
      ],
      mobileImage: "/portfolio/expose/nimara-mobile.png",
    },
  },
  {
    slug: "first-owners-reference",
    name: "The First Owner's Reference",
    url: "https://firstownersreference.com",
    category: "Web, editorial",
    vertical: "editorial",
    image: "/portfolio/first-owners-reference.png",
    tagline:
      "Annual editorial publication for first-time superyacht buyers. Print and web, designed to read like a yachting field manual.",
    brief:
      "This is an editorial publication rather than a marketing site. The reader is a first-time superyacht owner treating the purchase as a private decision, and the site had to support long reading, citation and a print-quality edition in equal measure.",
    problem:
      "Existing yachting media is written for the trade rather than the owner; the tone is breathless and the structure is that of an auction catalogue. A first-time buyer reading the press would learn little and trust less. The Reference was conceived to fill that gap.",
    approach: [
      "Built the information architecture editorially, around chapters, glossary, calculator and search, with each chapter standing alone as a piece of writing.",
      "Tuned the typography for long reading on screen and on paper: a single column, a generous measure and proper footnotes.",
      "Added schema markup to every chapter so the content can be cited accurately by AI answer engines.",
      "Prepared an internationalisation plan covering French, Spanish, German, Italian, Chinese and Russian editions.",
    ],
    outcomes: [
      "Lays the foundation for a yearly editorial flagship under the Foreland Marine umbrella.",
      "Pre-launch interest from owners and brokers as a reference document.",
      "The architecture produces a print-ready PDF and the public web edition from one source, without dual maintenance.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Paged.js",
      "Puppeteer",
      "Vercel",
    ],
    year: 2026,
    role: "Design, development, editorial systems",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,500;1,300&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap",
      identity: [
        "The masthead is the wordmark: The First Owner's Reference set in Newsreader at its light 300 weight, with the strap line, A yachting field manual, beneath it in the same face italicised. The publisher's lighthouse sits alongside in charcoal or paper depending on the ground, and nothing else identifies the publication.",
        "The palette treats the screen as paper: warm off-white grounds, near-black text, a single marine blue for headings, links and drop caps, stone for metadata, and a warm rule colour for the hairlines that carry the layout. The print edition uses slightly warmer versions of the same tokens.",
        "Three type families divide the work between them. Newsreader carries the editorial prose, DM Sans handles navigation and metadata in letter-spaced capitals, and DM Mono sets the numerals, tabular wherever money is involved.",
        "The masthead is typeset rather than drawn, and appears as live text wherever it is used, which keeps it selectable, accessible and consistent across every page. On the print edition the same wordmark is foil blocked on the cloth boards.",
      ],
      marks: [
        {
          label: "The masthead",
          note: "Set live in Newsreader light with the italic strap line",
          bg: "#F5F2EC",
          wide: true,
          wordmark: {
            text: "The First Owner’s Reference",
            sub: "A yachting field manual",
            css: '"Newsreader", serif',
            color: "#1A1A1A",
            subColor: "#7A756D",
            weight: 300,
            subItalic: true,
          },
        },
        {
          label: "Publisher's mark",
          note: "The Foreland lighthouse, charcoal on paper",
          src: "/portfolio/expose/marks/for-lighthouse-charcoal.svg",
          bg: "#F5F2EC",
        },
        {
          label: "Reversed",
          note: "Paper on charcoal for dark grounds",
          src: "/portfolio/expose/marks/for-lighthouse-paper.svg",
          bg: "#1A1A1A",
        },
        {
          label: "On marine",
          note: "Paper on the marine accent",
          src: "/portfolio/expose/marks/for-lighthouse-paper.svg",
          bg: "#0F3B5C",
        },
      ],
      palette: [
        { name: "Paper", hex: "#F5F2EC", note: "The page" },
        { name: "Charcoal", hex: "#1A1A1A", note: "Editorial text" },
        { name: "Marine", hex: "#0F3B5C", note: "Headings, links, drop caps" },
        { name: "Stone", hex: "#7A756D", note: "Metadata and captions" },
        { name: "Rule", hex: "#D8D2C4", note: "Hairline rules and dividers" },
      ],
      type: [
        {
          family: "Newsreader",
          role: "Masthead and all editorial prose",
          css: '"Newsreader", serif',
          weight: 300,
          note: "Light for the masthead, up to 500 in chapter headings, italic for the strap and pull quotes.",
        },
        {
          family: "DM Sans",
          role: "Signposting",
          css: '"DM Sans", sans-serif',
          note: "Chapter numerals, navigation and metadata in letter-spaced caps.",
        },
        {
          family: "DM Mono",
          role: "Numbers",
          css: '"DM Mono", monospace',
          note: "Tabular numerals for cost tables and the running-cost calculator.",
        },
      ],
      site: [
        "Nine chapters form the spine of the publication, and each is a complete piece of editorial in its own right: a lead essay, a data spread, a guest opinion, an anonymised case and a printable checklist. Around them sit a glossary of more than a hundred defined terms, a search that covers everything, and working tools including a running-cost calculator built on published industry data.",
        "The design serves long reading above all else, with a 38rem measure, drop caps in marine, proper pull quotes, a scroll progress bar and navigation strips between chapters. The publication takes no advertising, a position recorded in the colophon.",
      ],
      pages: [
        { label: "Nine chapters", note: "Essay, data spread, guest opinion, case and checklist in each" },
        { label: "Glossary", note: "Over a hundred terms, each with its own page and schema" },
        { label: "Running-cost calculator", note: "Nine inputs, nine cost categories, sourced data" },
        { label: "Search", note: "Runs entirely in the browser; queries are never sent anywhere" },
        { label: "Colophon and press kit", note: "How the publication is made, and how to cite it" },
        { label: "Print edition", note: "The complete magazine as a single route, rendered to PDF" },
      ],
      build: [
        "The publication is stored as typed data, with chapters, essays, glossary entries and checklists all version controlled in TypeScript; there is no CMS behind it. The same content renders twice, once as the website and once through a two thousand line print stylesheet into a 230 by 300 millimetre book, paginated by Paged.js and output through headless Chrome. The print run is five hundred hand-numbered copies on Munken Pure stock with a foil-blocked cover.",
      ],
      buildPoints: [
        "A single content source produces both editions: the web pages, and a print-ready PDF with running heads, drop caps and a generated index.",
        "Ten JSON-LD schema types are in use, from Article on each chapter to DefinedTerm on each glossary entry.",
        "The search index is compiled at build time and shipped with the page, so queries never leave the browser.",
        "Each chapter's checklist has a single-page print layout, intended to be printed and taken to meetings.",
        "Every numerical claim in the text carries a source, and the schema carries a suggested citation format.",
      ],
      mobileImage: "/portfolio/expose/for-mobile.png",
    },
  },
  {
    slug: "birdham-carpentry",
    name: "Birdham Carpentry & Building",
    url: "https://birdhamcarpentry.co.uk",
    category: "Naming, brand, web, product",
    vertical: "craft",
    image: "/portfolio/birdham.png",
    tagline:
      "Name, brand, website and a complete quoting and payments system for a new carpentry and building firm on Chichester Harbour.",
    brief:
      "Birdham Carpentry & Building is a new firm working across Chichester and the South Downs: listed and period building restoration, fine joinery, bespoke kitchens and general building. The commission covered everything a new trade business needs to open its doors: a name, a mark, a website, and the system behind it that runs quotes, jobs and invoices.",
    problem:
      "Trade websites are either a phone number on a template or a lead portal that sells the same enquiry to three other builders. In a catchment full of listed and period property, nobody presents craft properly and nobody quotes online. The brief was to look like the most careful firm in the county from the first day of trading.",
    approach: [
      "Named the firm after its harbour village and drew the gull mark from the founder's own sketch, as one solid shape that embroiders cleanly and holds at favicon size.",
      "Set the identity in Spectral with a palette drawn from heritage paint colours, avoiding the trade's usual green and gold.",
      "Built a multi-step quote request priced against a maintained materials list, producing a branded PDF quote with a shareable client link and card deposit.",
      "Added an operations backend to the same site, covering enquiries, clients, quotes, jobs, calendar, invoicing and payments.",
    ],
    outcomes: [
      "Launched with a working pipeline from enquiry to payment: quote request, priced PDF, deposit link and invoice.",
      "The whole firm runs from one admin, with card deposits and payments live from day one.",
      "A one-person firm with a brand that sits comfortably alongside established heritage builders.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "Vercel"],
    year: 2026,
    role: "Naming, brand identity, design, development",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500&family=Hanken+Grotesk:wght@400;600&display=swap",
      identity: [
        "Birdham is a village on Chichester Harbour whose name derives from the Old English for settlement of the birds, and it gave the firm both its name and its mark: a gull in flight, vectorised from the founder's own drawing and refined until the wings balanced. The mark is a single filled path with no stroke. Embroidery set that constraint, since a trade mark spends most of its working life on jackets and van doors, and one continuous shape stitches cleanly as a single thread.",
        "The lockup sets BIRDHAM in letter-spaced Spectral capitals with Carpentry & building beneath in tracked Hanken Grotesk. A seal version, the gull inside a double roundel, covers stationery and avatars.",
        "The palette is drawn from heritage paint colours rather than the bright green and gold that trade businesses tend to reach for: a deep studio-green ink, Bancha green as the working accent, a warm paper white, and an oak tan used sparingly. It sits comfortably alongside lime render and old brick, which is where most of the firm's work happens.",
        "The same path is used everywhere: the website header, the favicon, the seal roundel on stationery and the header of every quote and invoice PDF. It is sized by height rather than width, and reverses to paper on ink or on Bancha without any redrawing.",
      ],
      marks: [
        {
          label: "The mark",
          note: "Ink on paper, the default",
          src: "/portfolio/expose/marks/birdham-gull-ink.svg",
          bg: "#F3EDDF",
        },
        {
          label: "Reversed",
          note: "Paper on ink for dark grounds",
          src: "/portfolio/expose/marks/birdham-gull-paper.svg",
          bg: "#363C3C",
        },
        {
          label: "On Bancha",
          note: "Workwear and site boards",
          src: "/portfolio/expose/marks/birdham-gull-paper.svg",
          bg: "#676A49",
        },
        {
          label: "Horizontal lockup",
          note: "The gull with BIRDHAM in letter-spaced Spectral and the sub-line",
          src: "/portfolio/expose/marks/birdham-gull-ink.svg",
          bg: "#F3EDDF",
          wide: true,
          height: 44,
          wordmark: {
            text: "BIRDHAM",
            sub: "CARPENTRY & BUILDING",
            css: '"Spectral", serif',
            subCss: '"Hanken Grotesk", sans-serif',
            color: "#363C3C",
            subColor: "rgba(54,60,60,0.7)",
            weight: 500,
            tracking: "0.2em",
            subTracking: "0.33em",
          },
        },
      ],
      palette: [
        { name: "Ink", hex: "#363C3C", note: "Studio Green, text and mark" },
        { name: "Bancha", hex: "#676A49", note: "The working accent" },
        { name: "Card Room", hex: "#73806E", note: "Softer secondary green" },
        { name: "Paper", hex: "#F3EDDF", note: "Warm ground, never pure white" },
        { name: "Oak", hex: "#B98A50", note: "Sparing warm accent" },
      ],
      type: [
        {
          family: "Spectral",
          role: "Wordmark, headings and body",
          css: '"Spectral", serif',
          weight: 500,
          note: "Chosen after a full pass of eleven serifs. Letter-spaced capitals in the lockup, roman for headings and copy.",
        },
        {
          family: "Hanken Grotesk",
          role: "Interface and labels",
          css: '"Hanken Grotesk", sans-serif',
          note: "Navigation, tracked-caps eyebrows and the working parts of the quote flow.",
        },
      ],
      site: [
        "Four services lead the offer, with listed and period building restoration in front, and eight individually written area pages cover the catchment from the harbour villages up to the Downs. The centrepiece is the quote flow, a multi-step form that sizes the job, applies a standard, premium or heritage specification, and returns an indicative range on the spot, computed from a maintained materials price list and labour rates. The figure is always presented as a guide, with a firm quote to follow a site visit.",
        "The operations side of the firm lives behind the same domain: a role-gated admin where enquiries convert to clients, quotes convert to jobs, jobs carry stages and calendar bookings, and invoices track payments as they land.",
      ],
      pages: [
        { label: "Four service pages", note: "Restoration in front, joinery, kitchens, building" },
        { label: "Eight area pages", note: "Chichester to Petworth, each written individually" },
        { label: "Quote flow", note: "Sized, specified and priced to an indicative range in under a minute" },
        { label: "Shareable quotes", note: "Clients open a tokenised link, without a login, and can download the PDF" },
        { label: "Operations admin", note: "Enquiries, clients, quotes, jobs, calendar, invoices, payments" },
        { label: "Work, about, reviews", note: "The public pages, written in the firm's own voice" },
      ],
      build: [
        "The public site is the smaller half of the build. Supabase holds the operational schema, with row-level security separating owner, staff and bookkeeper roles, and the public pages never read from the database at all. Stripe takes deposits through tokenised quote links, with an idempotent webhook keeping invoice status accurate through payment, expiry and refund. Quote and invoice PDFs are rendered server-side from the same React components as the on-screen versions, so the documents and the site cannot drift apart.",
      ],
      buildImage: {
        src: "/portfolio/expose/birdham-admin.png",
        alt: "The Birdham Operations admin showing an invoice with client link and card payment",
        caption:
          "Birdham Operations: an invoice with its client link, PDF and payment options",
      },
      buildPoints: [
        "The estimate engine prices each service from a bill of materials, labour rates and a specification multiplier, and always quotes a range rather than a false fixed figure.",
        "Quote links are minted as unguessable tokens and served through a security-definer database function.",
        "Deposits of 10 to 15 percent are taken through Stripe, with status roll-up and refund handling driven by the webhook.",
        "Branded A4 quote and invoice PDFs are generated from React components on demand.",
        "LocalBusiness, Service, FAQ and breadcrumb schema are built from confirmed details only.",
      ],
      mobileImage: "/portfolio/expose/birdham-mobile.png",
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
