export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  forWhom: string;
  notForWhom: string;
  whatsIncluded: string[];
  costRange: string;
  timeline: string;
  faqs: { q: string; a: string }[];
  caseStudySlugs: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "marine",
    name: "Marine and superyacht",
    shortName: "Marine",
    tagline:
      "Websites for superyacht consultancies, brokers, refit yards, and editorial properties in the marine sector.",
    forWhom:
      "Independent consultancies, owner's representatives, niche brokers, refit yards, and marine publishers who want to read as serious operators rather than as agency clients.",
    notForWhom:
      "Volume charter operators, comparison portals, listing aggregators. Faro is not the right fit if the brief is to look like every other yacht site.",
    whatsIncluded: [
      "Strategy and copy direction with the founder, not a planner",
      "Brand identity, typography system, photography art direction",
      "Site design and front-end engineering on Next.js or equivalent",
      "Editorial system if long-form content is part of the property",
      "Hosting on Vercel, custom domains, transactional email",
      "Plausible or Fathom analytics, no Google Analytics",
    ],
    costRange:
      "Marine projects typically run from £18,000 for a focused brochure site to £55,000 for a full editorial property with multilingual structure.",
    timeline:
      "Six to twelve weeks from kickoff to launch, depending on scope. Faro takes one marine project per quarter.",
    faqs: [
      {
        q: "What does Faro build for marine clients?",
        a: "Websites and brand systems for superyacht consultancies, brokers, refit yards, and marine publishers. Not listing portals, not comparison sites, not generic charter pages.",
      },
      {
        q: "How much does a marine website project cost?",
        a: "Marine projects typically run from £18,000 to £55,000 depending on scope. The lower end is a focused brochure site for a consultancy. The upper end is a multilingual editorial property.",
      },
      {
        q: "How long does a marine project take?",
        a: "Six to twelve weeks from kickoff to launch. Faro takes one marine project per quarter to keep work directly under the founder's hands.",
      },
      {
        q: "Who is Faro for in the marine sector?",
        a: "Independent consultancies, owner's representatives, niche brokers, refit yards, and marine publishers who want to read as serious operators. Not volume charter or aggregators.",
      },
      {
        q: "Does Faro understand the marine industry?",
        a: "Yes. The studio is run by Jack, who also runs Foreland Marine, an independent superyacht consultancy, and The First Owner's Reference, an editorial publication for first-time superyacht buyers.",
      },
    ],
    caseStudySlugs: ["foreland-marine", "first-owners-reference"],
  },
  {
    slug: "wellness",
    name: "Wellness and studio",
    shortName: "Wellness",
    tagline:
      "Brand identity and websites for pilates, yoga, and wellness studios that want to clear the visual noise of the category.",
    forWhom:
      "Independent pilates and yoga studios, founder-led wellness brands, and small hospitality groups with a wellness arm. Best fit when the studio plans to scale to two or three locations.",
    notForWhom:
      "Franchise gym chains, generic fitness apps, and crowded marketplace platforms.",
    whatsIncluded: [
      "Brand identity from naming through to typographic system and asset pack",
      "Photography art direction and shoot supervision",
      "Site design and engineering on Next.js with Sanity or similar",
      "Booking integration with Mindbody, Walla, or Glofox without iframe ugliness",
      "Multi-location architecture from the start",
      "Plausible or Fathom analytics",
    ],
    costRange:
      "Wellness projects typically run from £15,000 for a single-studio launch to £40,000 for a multi-location brand build.",
    timeline:
      "Six to ten weeks from kickoff to launch. Faro takes one wellness project per quarter.",
    faqs: [
      {
        q: "What does Faro build for wellness studios?",
        a: "Brand identity and websites for pilates, yoga, and wellness studios. The work covers naming, typographic system, photography direction, and a site that integrates booking without compromise.",
      },
      {
        q: "How much does a wellness studio website cost?",
        a: "Wellness projects typically run from £15,000 to £40,000 depending on scope. A single studio launch sits at the lower end. A multi-location brand build sits at the upper end.",
      },
      {
        q: "How long does a wellness project take?",
        a: "Six to ten weeks from kickoff to launch. Faro works on one wellness project at a time.",
      },
      {
        q: "Who is Faro for in the wellness sector?",
        a: "Independent pilates and yoga studios, founder-led wellness brands, and small hospitality groups with a wellness arm. Best when the studio plans to scale.",
      },
    ],
    caseStudySlugs: ["nimara-pilates"],
  },
  {
    slug: "editorial",
    name: "Editorial publication",
    shortName: "Editorial",
    tagline:
      "Editorial systems for independent publishers: long-form reading, print-quality download, AI-citation-ready structure.",
    forWhom:
      "Independent publishers, specialist consultancies launching annual reference titles, and operators with a story too detailed for a blog.",
    notForWhom:
      "High-frequency news sites, ad-funded content farms, social-first creator newsletters.",
    whatsIncluded: [
      "Editorial information architecture: chapters, glossary, calculators, search",
      "Typography tuned for long-form reading on screen and in print",
      "MDX or headless CMS pipeline so writers can publish directly",
      "Schema markup on every chapter for AI citation readiness",
      "Internationalisation scaffolding if multilingual is in scope",
      "Print-ready PDF export from the same source content",
    ],
    costRange:
      "Editorial projects typically run from £25,000 for a focused single-edition site to £75,000 for a multilingual property with print export and a multi-edition archive.",
    timeline:
      "Eight to sixteen weeks from kickoff to launch, depending on chapter count and translation scope.",
    faqs: [
      {
        q: "What does Faro build for editorial publishers?",
        a: "Reading-first websites with chapter structure, long-form typography, schema markup for AI citation, and a print-ready export pipeline. The same source content drives screen and print.",
      },
      {
        q: "How much does an editorial publication site cost?",
        a: "Editorial projects typically run from £25,000 to £75,000 depending on scope. Multilingual and print-ready output sit at the upper end.",
      },
      {
        q: "How long does an editorial project take?",
        a: "Eight to sixteen weeks from kickoff to launch, depending on the number of chapters and translation languages.",
      },
      {
        q: "Who is Faro for in editorial?",
        a: "Independent publishers, specialist consultancies launching annual reference titles, and operators with a story too detailed for a blog.",
      },
    ],
    caseStudySlugs: ["first-owners-reference"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
