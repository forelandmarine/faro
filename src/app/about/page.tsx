import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ENTITY_PARAGRAPH, FOUNDER, RELATED_SITES, SITE_URL } from "@/content/entity";

export const metadata: Metadata = {
  title: "About — Faro Creative",
  description:
    "Faro Creative is a founder-led design and development studio. Run by Jack from the United Kingdom and Mallorca.",
  openGraph: {
    title: "About — Faro Creative",
    description:
      "Faro Creative is a founder-led design and development studio. Run by Jack from the United Kingdom and Mallorca.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jack",
  jobTitle: "Founder, designer and developer at Faro Creative",
  worksFor: {
    "@type": "Organization",
    name: "Faro Creative",
    url: SITE_URL,
  },
  url: SITE_URL + "/about",
  email: "mailto:hello@faro.is",
  sameAs: RELATED_SITES.map((s) => s.url),
};

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="type-eyebrow mb-6">About</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-10">
          Faro is a small studio with a long memory.
        </h1>

        <p className="text-xl md:text-2xl text-foreground/85 leading-relaxed mb-16">
          {ENTITY_PARAGRAPH}
        </p>

        <Section title="Who runs Faro?">
          <p className="mb-4">
            {FOUNDER.name} is the founder, designer, and developer of Faro
            Creative. He also runs Foreland Marine, an independent superyacht
            consultancy, and edits The First Owner&apos;s Reference, an annual
            publication for first-time superyacht buyers.
          </p>
          <p>
            Working across consultancy and design at the same time is unusual.
            It is also the source of Faro&apos;s view: a website is a piece of
            infrastructure, not a marketing artefact, and the people who buy
            websites for serious operations want to be talked to like adults.
          </p>
        </Section>

        <Section title="How does Faro work?">
          <p className="mb-4">
            Three to four projects at a time, no more. The founder is on every
            call, on every design review, and writes the front-end. There is no
            account manager because there is no agency layer to manage.
          </p>
          <p>
            Most projects run six to twelve weeks. We use Next.js, TypeScript,
            and Tailwind because they hold up under five years of maintenance,
            not because they trend on Twitter. Hosting is on Vercel. Analytics
            is Plausible or Fathom. There is no Google Analytics on a Faro
            site.
          </p>
        </Section>

        <Section title="Where is Faro?">
          <p>
            The studio operates between the United Kingdom and Mallorca. Most
            client work is done remotely, with on-site visits where the project
            warrants it.
          </p>
        </Section>

        <Section title="Related properties">
          <ul className="space-y-4 not-prose">
            {RELATED_SITES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="type-heading-lg text-xl group-hover:text-accent transition-colors">
                    {s.name}
                  </span>
                  <span className="text-foreground/60 text-sm flex-1">
                    {s.description}
                  </span>
                  <span className="text-accent text-xs">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-20 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/70">
            Brief, sketch, or rough idea, all welcome.
          </p>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="type-heading-lg text-xl md:text-2xl mb-5 text-foreground">
        {title}
      </h2>
      <div className="text-foreground/85 text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}
