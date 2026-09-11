import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CASE_STUDIES, getCaseStudy } from "@/content/work";
import { getStudy } from "@/content/studies";
import type { StudyDoc } from "@/content/studies/types";
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
  const study = getStudy(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.name,
    ...(cs.alternateName ? { alternateName: cs.alternateName } : {}),
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
    ...(study
      ? {
          subjectOf: {
            "@type": "TechArticle",
            name: `${cs.name}, design and build notes`,
            url: `${SITE_URL}/work/${cs.slug}/study`,
          },
        }
      : {}),
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
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        {study && <IdentityStrip study={study} slug={cs.slug} name={cs.name} />}

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

        <Section title="Stack" wide>
          <StackFlow stack={cs.stack} />
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

/* ── Identity strip ────────────────────────────────────────────────────
   A glance at the identity, then straight through to the full document.
   Everything measured lives on the study page, not here.                */

function IdentityStrip({
  study,
  slug,
  name,
}: {
  study: StudyDoc;
  slug: string;
  name: string;
}) {
  const mark = study.glance.mark;
  return (
    <section className="mb-16">
      <h2 className="type-eyebrow mb-6">The identity</h2>

      {study.fontsHref && (
        <link rel="stylesheet" href={study.fontsHref} precedence="default" />
      )}

      <div
        className="rounded-xl border border-foreground/10 flex items-center justify-center gap-6 px-8 py-14 flex-col sm:flex-row"
        style={{ backgroundColor: mark.bg }}
      >
        {mark.src && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mark.src}
            alt={`${name} ${mark.label}`}
            style={{ height: mark.height ?? 64 }}
            className="w-auto max-w-full"
          />
        )}
        {mark.wordmark && (
          <div className={mark.src ? "text-center sm:text-left" : "text-center"}>
            <p
              className={
                mark.src
                  ? "text-xl md:text-3xl leading-tight"
                  : "text-2xl md:text-4xl leading-tight"
              }
              style={{
                fontFamily: mark.wordmark.css,
                fontWeight: mark.wordmark.weight ?? 400,
                color: mark.wordmark.color,
                letterSpacing: mark.wordmark.tracking,
              }}
            >
              {mark.wordmark.text}
            </p>
            {mark.wordmark.sub && (
              <p
                className={`mt-1.5 ${
                  mark.wordmark.subItalic
                    ? "italic text-base md:text-lg"
                    : "text-[10px] md:text-xs"
                }`}
                style={{
                  fontFamily: mark.wordmark.subCss ?? mark.wordmark.css,
                  color: mark.wordmark.subColor ?? mark.wordmark.color,
                  letterSpacing: mark.wordmark.subTracking,
                }}
              >
                {mark.wordmark.sub}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.glance.palette.map((sw) => (
          <div key={sw.hex} className="flex items-center gap-2">
            <span
              className="h-7 w-7 rounded border border-foreground/15 shrink-0"
              style={{ backgroundColor: sw.hex }}
              aria-hidden
            />
            <span className="text-xs font-mono uppercase text-foreground/60 mr-3">
              {sw.hex}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={`/work/${slug}/study`}
        className="mt-10 group flex items-center justify-between gap-6 border border-foreground/15 rounded-xl px-6 py-5 hover:border-accent/50 transition-colors"
      >
        <span className="min-w-0">
          <span className="block text-base font-semibold group-hover:text-accent transition-colors">
            Design and build notes
          </span>
          <span className="block text-sm text-foreground/65 mt-1 leading-snug">
            The full briefing: mark construction and clear space, measured
            colour and type, layout, motion and architecture.
          </span>
        </span>
        <svg
          width="28"
          height="10"
          viewBox="0 0 28 10"
          fill="none"
          aria-hidden
          className="text-accent shrink-0 group-hover:translate-x-1 transition-transform"
        >
          <path
            d="M0 5h24M21 1.5L24.5 5 21 8.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </section>
  );
}

/* ── Stack flow ────────────────────────────────────────────────────── */

const STACK_ROLES: Record<string, string> = {
  "Next.js": "Framework",
  TypeScript: "Language",
  Tailwind: "Styling",
  GSAP: "Motion",
  Lenis: "Scroll",
  Supabase: "Data",
  Stripe: "Payments",
  Puppeteer: "Print render",
  Ghostscript: "Prepress",
  Vercel: "Hosting",
};

function StackFlow({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-4">
      {stack.map((s, i) => (
        <div key={s} className="flex items-center">
          {i > 0 && (
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              aria-hidden
              className="mx-2 text-accent shrink-0"
            >
              <path
                d="M0 5h24M21 1.5L24.5 5 21 8.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <div className="border border-foreground/15 rounded-md px-4 py-2.5 bg-white/40">
            <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/50 leading-none">
              {STACK_ROLES[s] ?? "Tooling"}
            </p>
            <p className="text-sm font-semibold mt-1 leading-none">{s}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
