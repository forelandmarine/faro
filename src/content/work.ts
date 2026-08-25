/**
 * Case study overviews. The deep brand and build detail lives in the study
 * documents under src/content/studies, which are the single source of truth for
 * palettes, type, measurements and architecture. Nothing here should restate a
 * figure that a study document already carries.
 */

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
      "Audited more than forty studios across three cities before drawing anything, to establish which decisions would make the brand invisible.",
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
      "Built the information architecture editorially, around chapters, glossary, calculators and search, with each chapter standing alone as a piece of writing.",
      "Tuned the typography for long reading on screen and on paper: a single column, a generous measure and proper footnotes.",
      "Added schema markup to every chapter so the content can be cited accurately by AI answer engines.",
      "Built a press pipeline that renders the book from the website itself, with no page layout application in the chain.",
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
      "Puppeteer",
      "Ghostscript",
      "Vercel",
    ],
    year: 2026,
    role: "Design, development, editorial systems",
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
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
