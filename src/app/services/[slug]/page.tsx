import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SERVICES, getService } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";
import { SITE_URL } from "@/content/entity";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.name} — Faro Creative`;
  return {
    title,
    description: s.tagline,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title,
      description: s.tagline,
      url: `/services/${s.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: s.tagline,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const relatedStudies = CASE_STUDIES.filter((c) =>
    s.caseStudySlugs.includes(c.slug)
  );

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.tagline,
    provider: {
      "@type": "Organization",
      name: "Faro Creative",
      url: SITE_URL,
    },
    areaServed: ["United Kingdom", "Spain", "Worldwide"],
    serviceType: s.name,
    url: `${SITE_URL}/services/${s.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Link
          href="/services"
          className="text-foreground/60 hover:text-foreground text-xs tracking-wider uppercase"
        >
          &larr; All services
        </Link>

        <header className="mt-10 mb-16">
          <p className="type-eyebrow mb-6">Service</p>
          <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-6">
            {s.name}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
            {s.tagline}
          </p>
        </header>

        <Block title={`What does Faro build for ${s.shortName.toLowerCase()} clients?`}>
          <p>{s.faqs[0].a}</p>
          <ul className="mt-6 space-y-2 text-foreground/80">
            {s.whatsIncluded.map((w, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-accent flex-shrink-0">&bull;</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={`How much does a ${s.shortName.toLowerCase()} project cost?`}>
          <p>{s.costRange}</p>
        </Block>

        <Block title={`How long does a ${s.shortName.toLowerCase()} project take?`}>
          <p>{s.timeline}</p>
        </Block>

        <Block title={`Who is Faro for in ${s.shortName.toLowerCase()}?`}>
          <p className="mb-4">
            <strong className="text-foreground">For:</strong> {s.forWhom}
          </p>
          <p>
            <strong className="text-foreground">Not for:</strong> {s.notForWhom}
          </p>
        </Block>

        {relatedStudies.length > 0 && (
          <Block title="Related work">
            <ul className="space-y-4 not-prose">
              {relatedStudies.map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`/work/${cs.slug}`}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="type-heading-lg text-xl group-hover:text-accent transition-colors">
                      {cs.name}
                    </span>
                    <span className="text-foreground/60 text-sm">
                      {cs.category}
                    </span>
                    <span className="text-accent text-xs ml-auto">&#8599;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Block>
        )}

        <div className="mt-24 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/70 max-w-md">
            Faro takes one {s.shortName.toLowerCase()} project per quarter.
            Briefs welcome, even rough ones.
          </p>
          <Link
            href="/contact"
            className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors whitespace-nowrap"
          >
            Talk to Faro
          </Link>
        </div>
      </article>
    </PageShell>
  );
}

function Block({
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
      <div className="text-foreground/85 text-base md:text-lg leading-relaxed max-w-2xl">
        {children}
      </div>
    </section>
  );
}
