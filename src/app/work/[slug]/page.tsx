import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  CASE_STUDIES,
  getCaseStudy,
  type CaseStudy,
} from "@/content/work";
import { SITE_URL } from "@/content/entity";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.name} · Faro Creative`;
  return {
    title,
    description: cs.tagline,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      title,
      description: cs.tagline,
      url: `/work/${cs.slug}`,
      type: "article",
      images: [{ url: cs.image, width: 1600, height: 1200 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cs.tagline,
      images: [cs.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.name,
    url: `${SITE_URL}/work/${cs.slug}`,
    description: cs.tagline,
    creator: {
      "@type": "Organization",
      name: "Faro Creative",
      url: SITE_URL,
    },
    image: `${SITE_URL}${cs.image}`,
    datePublished: `${cs.year}-01-01`,
    inLanguage: "en-GB",
    about: cs.vertical,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: cs.name, item: `${SITE_URL}/work/${cs.slug}` },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Link
          href="/work"
          className="text-foreground/60 hover:text-foreground text-xs tracking-wider uppercase"
        >
          &larr; All work
        </Link>

        <header className="mt-10 mb-16">
          <p className="type-eyebrow mb-6">{cs.category}</p>
          <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-6">
            {cs.name}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
            {cs.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60">
            <span>{cs.year}</span>
            <span>{cs.role}</span>
            <a
              href={cs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light"
            >
              Visit {cs.url.replace(/^https?:\/\//, "")}
              <span className="inline-block ml-1">&#8599;</span>
            </a>
          </div>
        </header>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-[#1A3640] mb-20">
          <Image
            src={cs.image}
            alt={`${cs.name} website screenshot`}
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        <Section title="The brief">
          <p>{cs.brief}</p>
        </Section>

        <Section title="The problem">
          <p>{cs.problem}</p>
        </Section>

        <Section title="The approach">
          <ul className="space-y-4">
            {cs.approach.map((a, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-accent font-mono text-sm pt-1 w-6 flex-shrink-0">
                  0{i + 1}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        {cs.expose && <ExposeSections cs={cs} />}

        <Section title="Outcomes">
          <ul className="space-y-3">
            {cs.outcomes.map((o, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-accent flex-shrink-0">&bull;</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="The numbers">
          <dl className="grid sm:grid-cols-3 gap-6 not-prose">
            {cs.metrics.map((m) => (
              <div key={m.label} className="border-l-2 border-accent/40 pl-4">
                <dt className="text-foreground/60 text-xs tracking-wider uppercase mb-2">
                  {m.label}
                </dt>
                <dd className="text-foreground type-display text-2xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Stack">
          <ul className="flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <li
                key={s}
                className="text-xs tracking-wider uppercase border border-foreground/20 rounded-full px-3 py-1.5 text-foreground/80"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-24 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/70">
            Working on something in this space?
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
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className="mb-16">
      <h2 className="type-eyebrow mb-6">{title}</h2>
      <div
        className={`text-foreground/85 text-base md:text-lg leading-relaxed ${
          wide ? "" : "max-w-2xl"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

/* ── Brand and site exposé ─────────────────────────────────────────── */

function ExposeSections({ cs }: { cs: CaseStudy }) {
  const e = cs.expose!;
  return (
    <>
      {/* Brand typefaces, loaded on this page only for the live specimens */}
      {e.fontsHref && (
        <link rel="stylesheet" href={e.fontsHref} precedence="default" />
      )}

      <Section title="The identity" wide>
        <div className="max-w-2xl space-y-4">
          {e.identity.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Palette */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8">
          {e.palette.map((sw) => (
            <div key={sw.hex}>
              <div
                className="h-20 rounded-lg border border-foreground/10"
                style={{ backgroundColor: sw.hex }}
              />
              <p className="mt-3 text-sm font-semibold leading-tight">
                {sw.name}
              </p>
              <p className="text-xs text-foreground/60 font-mono uppercase mt-0.5">
                {sw.hex}
              </p>
              {sw.note && (
                <p className="text-xs text-foreground/60 mt-1 leading-snug">
                  {sw.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Type specimens */}
        <div className="mt-14 space-y-0">
          {e.type.map((t) => (
            <div
              key={`${t.family}-${t.role}`}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-t border-foreground/10 py-6"
            >
              <span
                aria-hidden
                className="text-6xl leading-none shrink-0 w-24"
                style={{ fontFamily: t.css, fontWeight: t.weight ?? 400 }}
              >
                Aa
              </span>
              <div>
                <p
                  className="text-2xl leading-tight"
                  style={{ fontFamily: t.css, fontWeight: t.weight ?? 400 }}
                >
                  {t.family}
                </p>
                <p className="type-eyebrow mt-1">{t.role}</p>
                {t.note && (
                  <p className="text-sm text-foreground/70 mt-2 max-w-xl">
                    {t.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The site" wide>
        <div className="max-w-2xl space-y-4">
          {e.site.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-12">
          {/* Page inventory */}
          <div className="flex-1">
            <p className="type-eyebrow mb-5">What we shipped</p>
            <ul className="divide-y divide-foreground/10">
              {e.pages.map((p) => (
                <li key={p.label} className="py-3">
                  <span className="text-base font-medium">{p.label}</span>
                  {p.note && (
                    <span className="block text-sm text-foreground/60 mt-0.5">
                      {p.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile plate */}
          {e.mobileImage && (
            <div className="shrink-0 self-start mx-auto md:mx-0">
              <div className="w-[230px] rounded-[2rem] border-4 border-[#1A3640] overflow-hidden shadow-[0_16px_40px_-16px_rgba(26,54,64,0.35)]">
                <Image
                  src={e.mobileImage}
                  alt={`${cs.name} on a phone`}
                  width={390}
                  height={844}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-foreground/60 text-center mt-3">
                The same site at 390 pixels
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section title="The build">
        <div className="space-y-4">
          {e.build.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="mt-8 space-y-3">
          {e.buildPoints.map((p, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-accent flex-shrink-0">&bull;</span>
              <span className="text-base">{p}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
