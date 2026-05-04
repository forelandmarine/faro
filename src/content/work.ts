export type CaseStudy = {
  slug: string;
  name: string;
  url: string;
  category: string;
  vertical: "marine" | "wellness" | "editorial";
  image: string;
  tagline: string;
  brief: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
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
      "Independent superyacht consultancy site, written and designed for owners and captains, not search robots.",
    brief:
      "Foreland Marine is an independent consultancy that runs refit projects and acts as owner's representative on new builds. The site needed to read like a colleague, not a brochure. It had to communicate enough about the work to earn a meeting without giving away the playbook.",
    problem:
      "Yacht consultancies tend to look identical online: dark backgrounds, drone footage, stock superlatives. Foreland's actual edge is editorial: clear thinking, written plainly. The site had to look and read the way the consultancy actually works.",
    approach: [
      "Stripped the homepage to one paragraph and a single contact line. No carousel, no buzzwords.",
      "Wrote service pages in the cadence of a private memo, not a sales deck. Plain language, real numbers, named clients where permitted.",
      "Custom Next.js build with edge-rendered pages, no marketing pixels, hand-tuned typography in Figtree.",
      "Built the editorial system that later became the foundation for The First Owner's Reference.",
    ],
    outcomes: [
      "Inbound enquiries shifted from agencies to direct owner contact.",
      "Average enquiry quality rose: longer briefs, named vessels, named yards.",
      "Site became a credibility asset cited by other professionals in pitches.",
    ],
    metrics: [
      { label: "Time to first paint", value: "TBD" },
      { label: "Lighthouse performance", value: "TBD" },
      { label: "Time from kickoff to launch", value: "TBD" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
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
      "Nimara is a new pilates and yoga brand launching in Mallorca, with London and Paris in the medium term. The site needed to feel calm, considered, and unmistakably premium without slipping into wellness cliché.",
    problem:
      "Most pilates studios online look the same: terracotta palettes, stock photography of women in athleisure on hardwood floors. Nimara needed to read as a brand that could credibly stand alongside hospitality and beauty houses, not just other studios.",
    approach: [
      "Defined a typographic system before any layout work. The brand reads first as letterforms, second as imagery.",
      "Photography direction toward editorial stillness rather than fitness energy.",
      "Site architecture that scales from one studio to three without rebuilding.",
      "Booking flow built directly on Mindbody without iframe ugliness.",
    ],
    outcomes: [
      "Brand cleared visual differentiation from every studio in the local market.",
      "Founders use the site as the primary asset in landlord and investor conversations.",
      "Architecture ready for the multi-location rollout without redesign.",
    ],
    metrics: [
      { label: "Time to first paint", value: "TBD" },
      { label: "Lighthouse performance", value: "TBD" },
      { label: "Time from kickoff to launch", value: "TBD" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS", "Vercel"],
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
    metrics: [
      { label: "Time to first paint", value: "TBD" },
      { label: "Chapters at first edition", value: "TBD" },
      { label: "Time from kickoff to launch", value: "TBD" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "MDX",
      "next-intl",
      "Vercel",
    ],
    year: 2026,
    role: "Design, development, editorial systems",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
