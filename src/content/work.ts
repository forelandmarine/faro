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
      "Independent superyacht consultancy site, written and designed for owners and captains, not search robots.",
    brief:
      "Foreland Marine is an independent consultancy that runs refit projects and acts as owner's representative on new builds. The site needed to read like a colleague, not a brochure. It had to communicate enough about the work to earn a meeting without giving away the playbook.",
    problem:
      "Yacht consultancies tend to look identical online: dark backgrounds, drone footage, stock superlatives. Foreland's actual edge is editorial: clear thinking, written plainly. The site had to look and read the way the consultancy actually works.",
    approach: [
      "Stripped the homepage to one paragraph and a single contact line. No carousel, no buzzwords.",
      "Wrote service pages in the cadence of a private memo, not a sales deck. Plain language, real numbers, named clients where permitted.",
      "Custom Next.js build, no marketing pixels, typography set in Nunito Sans with a light display weight.",
      "Built the editorial system that later became the foundation for The First Owner's Reference.",
    ],
    outcomes: [
      "Inbound enquiries shifted from agencies to direct owner contact.",
      "Average enquiry quality rose: longer briefs, named vessels, named yards.",
      "Site became a credibility asset cited by other professionals in pitches.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe", "Supabase", "Vercel"],
    year: 2026,
    role: "Design, development, copy direction",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600&display=swap",
      identity: [
        "The company takes its name from the South Foreland Lighthouse in Kent, and the identity takes its cue from the same place: a white lighthouse mark and wordmark that only ever appear on deep navy. There is no light version of this brand. The darkness is the point; it reads as chart, night watch and instrument panel rather than brochure.",
        "One typeface does everything. Nunito Sans at a light 300 carries every heading, which is the signature move of the identity: large, quiet, and unbolded where the rest of the industry shouts. Semibold is reserved for buttons and eyebrow labels, and body copy sits in a muted chart-blue rather than grey, so even paragraphs feel like they belong at sea.",
        "The mark is governed by hard rules written into the brand kit: white only, clear space equal to the height of the lighthouse on every side, a minimum width of 204 pixels on screen and 50 millimetres in print, and no effects, outlines or rotation under any circumstances. The standalone lighthouse carries favicons, avatars and small formats where the full lockup would not survive.",
      ],
      marks: [
        {
          label: "Primary lockup",
          note: "White on navy. The only colourway that exists.",
          src: "/portfolio/expose/marks/foreland-lockup-white.svg",
          bg: "#081630",
          wide: true,
          height: 52,
        },
        {
          label: "The icon mark",
          note: "Favicons, avatars, small formats",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#040D1A",
        },
        {
          label: "On chart blue",
          note: "Holds on every surface blue in the palette",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#0C1E42",
        },
        {
          label: "On ocean",
          note: "The accent as ground",
          src: "/portfolio/expose/marks/foreland-icon-white.svg",
          bg: "#5386B6",
        },
      ],
      palette: [
        { name: "Deep navy", hex: "#040D1A", note: "Deepest ground, footer" },
        { name: "Navy", hex: "#081630", note: "Primary page background" },
        { name: "Chart blue", hex: "#0C1E42", note: "Cards and raised surfaces" },
        { name: "Ocean", hex: "#5386B6", note: "The single accent" },
        { name: "Muted blue", hex: "#7BA8C8", note: "Body copy, never grey" },
      ],
      type: [
        {
          family: "Nunito Sans",
          role: "The whole site, one family",
          css: '"Nunito Sans", system-ui, sans-serif',
          weight: 300,
          note: "Light 300 for every heading, regular for body, semibold for labels and buttons. No second typeface anywhere.",
        },
      ],
      site: [
        "This is not a brochure site. Around the four consultancy services sits a working platform: a paid technical support product with three subscription tiers, six self-serve tools, an insights journal, a quarterly newsletter archive, and a code-gated private membership. Each service page carries FAQ schema and reads like a memo rather than a pitch.",
        "The scroll language is restrained on purpose: dual-layer parallax on heroes, intersection-observer reveals, and 150 millisecond colour transitions. Nothing bounces. The photography is real racing and yard imagery, held at half opacity under navy gradients so the interface stays legible on top of it.",
      ],
      pages: [
        { label: "Four service pages", note: "Refit, new build, management, technical consultancy" },
        { label: "Technical Support", note: "Three paid tiers with Stripe checkout and invoicing" },
        { label: "Six tools", note: "Sea time tracker, ISM platform, running cost calculator and more" },
        { label: "Insights journal", note: "Articles with per-page generated OG images" },
        { label: "Newsletter archive", note: "The Foreland Quarter, issue by issue" },
        { label: "Foreland Group", note: "Code-gated membership with logged downloads" },
      ],
      build: [
        "Under the surface this is a small product company, not a static site. Stripe runs subscriptions through a custom checkout and webhook flow, Resend handles transactional email in brand templates, and Supabase sits behind the membership gating and download logging.",
      ],
      buildPoints: [
        "Dynamic OpenGraph images generated per article at request time, no pre-build step.",
        "A dual llms.txt corpus, index plus full text, so AI answer engines can cite the consultancy accurately.",
        "Parallax and scroll reveals written against the raw browser APIs. No animation library shipped.",
        "Structured data throughout: ProfessionalService, Service, Person and FAQ schema on the relevant pages.",
        "Images served as AVIF and WebP with responsive sizes, heroes preloaded, the rest lazy.",
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
      "Nimara is a new pilates and yoga brand launching in Mallorca, with London and Paris in the medium term. The site needed to feel calm, considered, and unmistakably premium without slipping into wellness cliché.",
    problem:
      "Most pilates studios online look the same: terracotta palettes, stock photography of women in athleisure on hardwood floors. Nimara needed to read as a brand that could credibly stand alongside hospitality and beauty houses, not just other studios.",
    approach: [
      "Defined a typographic system before any layout work. The brand reads first as letterforms, second as imagery.",
      "Photography direction toward editorial stillness rather than fitness energy.",
      "Site architecture that scales from one studio to three without rebuilding.",
      "Four languages at full parity from day one: English, Spanish, French and German, switched in place.",
    ],
    outcomes: [
      "Brand cleared visual differentiation from every studio in the local market.",
      "Founders use the site as the primary asset in landlord and investor conversations.",
      "Architecture ready for the multi-location rollout without redesign.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP", "Lenis", "Vercel"],
    year: 2026,
    role: "Brand identity, design, development",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@400;500&display=swap",
      identity: [
        "The mark is a Mallorquin leopardess mid-stretch, drawn as a single unbroken line with no fill and no ornament. It holds from a sixteen pixel favicon to storefront signage, and ships in three line weights: light for screen, heavy for large format, fine for embroidery and foil. The wordmark is NIMĀRA in Cinzel, capitals only, with a macron on the second A that is not optional.",
        "The palette is warm surfaces and one accent. Sand and cream grounds, ink text, and a single sage green that does every accent job on the site; hover states dim through opacity rather than reaching for a second colour. Oak appears only on rules and borders, never as text. The discipline is monastic on purpose: one typeface per role, one accent, one mark.",
        "Every heading on the site is sentence case. Title case was banned in the brand system because it reads as advertising, and this brand is built to read as a publication.",
        "The full asset library runs to more than four hundred files: marks, wordmarks, horizontal and vertical lockups, favicons, social crops and print variants, each cut in every permitted colourway. Below one hundred pixels the wordmark comes off and the leopardess stands alone.",
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
        { name: "Sage", hex: "#7E9A7A", note: "The single accent" },
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
          note: "Quiet sans for body, navigation and labels, tracked caps for eyebrows.",
        },
      ],
      site: [
        "The site reads as a small publication about a studio rather than a gym website: classes, pricing, studio, instructors, a journal, and a policy set written in the same register as the editorial pages. Every string on the site exists in English, Spanish, French and German at full parity, roughly sixteen hundred lines of translated copy, switched in place without a reload.",
        "Motion is where the brand breathes: film grain over the full viewport, blur-to-sharp image loading, a slow testimonial marquee, and a breathing pulse animation timed like an exhale. Lenis smooths the scroll and GSAP drives the reveals, all behind a reduced-motion fallback.",
      ],
      pages: [
        { label: "Classes", note: "Four programmes, eight Reformers, never more" },
        { label: "Pricing", note: "Packs, memberships and a discovery offer, no hidden conditions" },
        { label: "Studio", note: "Santa Catalina location, hours, the room itself" },
        { label: "Instructors", note: "The teaching team, written as people not bios" },
        { label: "Journal", note: "Editorial posts in all four languages" },
        { label: "Careers and partnerships", note: "Hiring and B2B, same voice throughout" },
      ],
      build: [
        "Content is source-controlled TypeScript rather than a CMS, which is what makes four-language parity enforceable: a missing translation is a build error, not a silent gap. Structured data describes the studio as a local business with geo coordinates, hours and the full class catalogue, aimed at map results and AI answers for pilates in Palma.",
      ],
      buildPoints: [
        "Four languages at full parity in a 1,600 line translation layer, persisted per visitor.",
        "ExerciseGym and LocalBusiness schema with geo, hours and the class catalogue.",
        "Film grain, vignettes and parallax as layered components, not baked into imagery.",
        "Booking widget slot structured for the studio's scheduling platform, so going live is an embed, not a rebuild.",
        "WhatsApp as a first-class contact channel alongside the form.",
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
      "An editorial publication, not a marketing site. The reader is a first-time superyacht owner, treating yachting as a private decision rather than a public one. The site had to support deep reading, citation, and a print-quality download in equal measure.",
    problem:
      "Existing yachting media is built for the trade, not for the owner. Tone is breathless, structure is auction-catalogue. A first-time buyer reading the existing press would learn nothing useful and trust no one. The Reference is the response to that gap.",
    approach: [
      "Editorial-first information architecture: chapters, glossary, calculator, search. Each chapter a standalone piece of writing.",
      "Typography tuned for long-form reading on screen and on paper. Single column, generous measure, real footnotes.",
      "Schema markup on every chapter so the content is citation-ready for AI answer engines.",
      "Internationalisation plan in place for EN, FR, ES, DE, IT, ZH, RU.",
    ],
    outcomes: [
      "Foundation laid for a yearly editorial flagship under the Foreland Marine umbrella.",
      "Pre-launch interest from owners and brokers as a reference document.",
      "Architecture supports both a print-ready PDF and a public web edition without dual maintenance.",
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
        "The masthead is the wordmark: The First Owner's Reference set in Newsreader at a light 300, with the strap A yachting field manual beneath it in the same face, italic. The publisher's lighthouse mark sits alongside in charcoal or paper depending on the ground. Nothing else identifies the publication, which is the level of restraint the register demands.",
        "The palette is a paper object translated to the screen: warm paper grounds, near-black text, a single marine blue for headings, links and drop caps, stone for metadata and a warm hairline rule colour for the lines that do the layout work. The print edition carries its own slightly warmer overrides of the same tokens.",
        "Three families divide the labour. Newsreader carries every word of editorial prose, DM Sans signposts in tracked caps, and DM Mono sets the numerals, tabular where money is involved.",
        "The masthead is never an image. It is typeset live in Newsreader wherever it appears, which keeps it searchable, accessible and honest about what this thing is: a publication, not a logo with articles attached. On the print edition the same wordmark is foil-blocked on cloth boards.",
      ],
      marks: [
        {
          label: "The masthead",
          note: "Typeset Newsreader light with the italic strap, never an image",
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
          note: "The accent as ground",
          src: "/portfolio/expose/marks/for-lighthouse-paper.svg",
          bg: "#0F3B5C",
        },
      ],
      palette: [
        { name: "Paper", hex: "#F5F2EC", note: "The page" },
        { name: "Charcoal", hex: "#1A1A1A", note: "Editorial text" },
        { name: "Marine", hex: "#0F3B5C", note: "Headings, links, drop caps" },
        { name: "Stone", hex: "#7A756D", note: "Metadata and captions" },
        { name: "Rule", hex: "#D8D2C4", note: "Hairlines that do the layout" },
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
        "Nine chapters form the spine, each one a complete piece of editorial: a lead essay, a data spread, a guest opinion, an anonymised case and a printable checklist. Around them sit a glossary of over a hundred defined terms, a client-side search across everything, and working tools including a running-cost calculator built on published industry data.",
        "Reading is the interface. A 38rem prose measure, drop caps in marine, real pull quotes, a scroll progress bar, and per-chapter navigation strips. There is no advertising and there never will be, which the colophon states as policy.",
      ],
      pages: [
        { label: "Nine chapters", note: "Essay, data spread, guest opinion, case and checklist in each" },
        { label: "Glossary", note: "Over a hundred terms, each with its own page and schema" },
        { label: "Running-cost calculator", note: "Nine inputs, nine cost categories, sourced data" },
        { label: "Search", note: "Client-side, tokenised, no third party sees a query" },
        { label: "Colophon and press kit", note: "The publication documents its own making" },
        { label: "Print edition", note: "The full magazine as a route, rendered to PDF" },
      ],
      build: [
        "The whole publication is typed data: chapters, essays, glossary entries and checklists live as version-controlled TypeScript, no CMS. That same content renders twice, once as the website and once through a 2,000 line print stylesheet into a 230 by 300 millimetre book via Paged.js and headless Chrome: Munken Pure text stock, cloth boards, foil-blocked wordmark, five hundred hand-numbered copies.",
      ],
      buildPoints: [
        "One content source, two editions: web pages and a print-ready PDF with running heads, drop caps and a generated index.",
        "Ten JSON-LD schema types, from Article per chapter to DefinedTerm per glossary entry, built for citation by AI answer engines.",
        "Search index compiled at build time and shipped to the browser, so queries never leave the page.",
        "Checklists ship as single-page print layouts, made to be taken to a shipyard meeting.",
        "Every numerical claim in the text carries a source, and the schema carries the suggested citation format.",
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
      "Birdham Carpentry & Building is a new firm working across Chichester and the South Downs: listed and period building restoration, fine joinery, bespoke kitchens and general building. The commission covered everything a new trade business needs to open its doors. A name, a mark, a website, and the system that runs quotes, jobs and invoices behind it.",
    problem:
      "Trade websites are either a phone number on a template or a lead portal that sells the same enquiry to three other builders. In a catchment full of listed and period property, nobody presents craft properly and nobody quotes online. The brief was to look like the most careful firm in the county from the first day of trading.",
    approach: [
      "Named the firm for its harbour village and drew the gull mark from a hand sketch: one solid shape that holds at favicon size and embroiders on a work jacket as a single thread.",
      "Identity set in Spectral with a palette drawn from heritage paint colours, refusing the green-and-gold defaults of the trade.",
      "Multi-step quote request priced against a maintained materials price list, producing a branded PDF quote with a shareable client link and a card deposit.",
      "Operations backend behind the same site: enquiries, clients, quotes, jobs, calendar, invoicing and payments in one place.",
    ],
    outcomes: [
      "Launched with a working enquiry-to-payment pipeline: quote request, priced PDF, deposit link, invoice, all under one roof.",
      "The whole firm runs from one admin, with card deposits and payments live from day one.",
      "A one-person trade brand that stands next to established heritage firms rather than other start-ups.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "Vercel"],
    year: 2026,
    role: "Naming, brand identity, design, development",
    expose: {
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500&family=Hanken+Grotesk:wght@400;600&display=swap",
      identity: [
        "Birdham is a Chichester Harbour village whose name means settlement of the birds, and the mark is a gull in flight: one solid filled silhouette, vectorised from the founder's own hand drawing and then refined until the wings balanced. One path, one fill, no stroke. The constraint was embroidery, because a trade mark lives on work jackets before it lives anywhere else, and a single shape stitches as a single thread.",
        "The lockup sets BIRDHAM in Spectral capitals, letter-spaced like an engraving, with Carpentry & building beneath in tracked Hanken Grotesk. A seal version, the gull in a double roundel, covers stationery and avatars.",
        "The palette is taken from heritage paint colours rather than the kelly green and gold that builders default to: a deep studio-green ink, Bancha green as the working accent, warm paper instead of white, and an oak tan used sparingly. It is a palette that sits comfortably next to lime render and old brick.",
        "One drawing serves every medium. The same path renders the website header, the favicon, the seal roundel on stationery, and the header of every quote and invoice PDF, and because it is a single shape it stitches onto a work jacket as one thread. The mark is sized by height, never width, and reverses to paper on ink or Bancha without redrawing.",
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
        "Four services lead the offer, with listed and period building restoration in front, and eight individually written area pages cover the catchment from the harbour villages to the Downs. The centrepiece is the quote flow: a multi-step form that sizes the job, applies a standard, premium or heritage specification, and returns an indicative range on the spot, computed from a maintained materials price list plus labour rates, always presented as a guide with a firm quote to follow a visit.",
        "Behind the same domain sits the operations side of the firm: a role-gated admin where enquiries convert to clients, quotes convert to jobs, jobs carry stages and calendar bookings, and invoices track payments as they land.",
      ],
      pages: [
        { label: "Four service pages", note: "Restoration in front, joinery, kitchens, building" },
        { label: "Eight area pages", note: "Chichester to Petworth, each written individually" },
        { label: "Quote flow", note: "Sized, specified and priced to an indicative range in a moment" },
        { label: "Shareable quotes", note: "Clients open a tokenised link, no login, with a branded PDF" },
        { label: "Operations admin", note: "Enquiries, clients, quotes, jobs, calendar, invoices, payments" },
        { label: "Work, about, reviews", note: "The public face, in the firm's own patient voice" },
      ],
      build: [
        "This is a business system wearing a brochure. Supabase holds the schema, with row-level security dividing owner, staff and bookkeeper roles, and the public site never reads the database at all. Stripe takes deposits through tokenised quote links and keeps invoice status honest through an idempotent webhook. The quote and invoice PDFs are rendered server-side from the same React components as the screen versions, gull mark and all, so the brand cannot drift between mediums.",
      ],
      buildPoints: [
        "Estimate engine with per-service bills of materials, labour rates and specification multipliers, quoting a range, never a false fixed price.",
        "Public quote links minted as unguessable tokens, served through a security-definer function.",
        "Stripe deposits at 10 to 15 percent with webhook-driven status rollup and refund handling.",
        "Branded A4 quote and invoice PDFs generated from React components on demand.",
        "LocalBusiness, Service, FAQ and breadcrumb schema built only from confirmed facts, nothing invented.",
      ],
      mobileImage: "/portfolio/expose/birdham-mobile.png",
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
