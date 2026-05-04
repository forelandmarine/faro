import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Process — Faro Creative",
  description:
    "How Faro Creative runs a project, from kickoff to launch. Five steps: Listen, Design, Build, Launch, Grow.",
  openGraph: {
    title: "Process — Faro Creative",
    description:
      "How Faro Creative runs a project, from kickoff to launch. Five steps: Listen, Design, Build, Launch, Grow.",
    url: "/process",
  },
  alternates: { canonical: "/process" },
};

const STEPS = [
  {
    name: "Listen",
    duration: "Week one",
    summary: "Before we draw anything, we learn everything.",
    detail:
      "We start with a working session, in person or by video, that runs ninety minutes to two hours. The agenda is one question repeated in many forms: what is this site supposed to do that is hard to do without it? We come out of it with a one-page brief, a measurable success criterion, and a flat fee.",
  },
  {
    name: "Design",
    duration: "Weeks two to four",
    summary: "You see the real thing before we write a line of code.",
    detail:
      "Faro designs in a working file, not in PowerPoint. Typography, layout, photography direction, copy tone all settle before any production code is written. You see one strong direction, not three weak ones. Revisions are conversational: we change in the file, share, and discuss.",
  },
  {
    name: "Build",
    duration: "Weeks four to eight",
    summary: "Performance-first. Every interaction intentional.",
    detail:
      "Front-end development happens on Next.js with TypeScript and Tailwind. We build to Lighthouse 95+ on every page, with hand-tuned animation and motion. There is no marketing pixel layer, no Google Tag Manager, no third-party scripts unless the project genuinely requires them.",
  },
  {
    name: "Launch",
    duration: "Week before launch",
    summary: "Hosting, domain, analytics. Sorted.",
    detail:
      "Faro handles deployment to Vercel, custom domain configuration, transactional email setup, and analytics installation. Plausible or Fathom, never Google Analytics. We do a launch readiness review forty-eight hours before going live: sitemap, robots, schema, OG cards, redirects.",
  },
  {
    name: "Grow",
    duration: "After launch",
    summary: "The site is live. The relationship is not over.",
    detail:
      "Faro retains a quarterly review with every client. We bring data, you bring questions. Iterations happen on a small fixed retainer or as scoped follow-up sprints. We do not sell maintenance contracts that expire if you do not use the hours.",
  },
];

const processJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Faro Creative runs a project",
  description: "Five-step process from kickoff to ongoing partnership.",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.summary,
  })),
};

export default function ProcessPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="type-eyebrow mb-6">Process</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-8">
          Five steps. No surprises.
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-20 max-w-2xl">
          Faro projects move through the same five stages. Each one has a
          deliverable you can sign off, a budget that does not change, and a
          person you can call.
        </p>

        <ol className="space-y-16">
          {STEPS.map((step, i) => (
            <li key={step.name} className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <p className="type-display text-sm text-accent mb-2">
                  0{i + 1}
                </p>
                <h2 className="type-display text-3xl md:text-4xl text-foreground">
                  {step.name}
                </h2>
                <p className="text-foreground/60 text-xs tracking-wider uppercase mt-3">
                  {step.duration}
                </p>
              </div>
              <div className="md:col-span-9">
                <p className="text-foreground type-heading-sm text-xl mb-4">
                  {step.summary}
                </p>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-24 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/70">Ready to start at step one?</p>
          <Link
            href="/contact"
            className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors"
          >
            Talk to Faro
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
