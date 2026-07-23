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

/* ── Stack flow ────────────────────────────────────────────────────── */

const STACK_ROLES: Record<string, string> = {
  "Next.js": "Framework",
  TypeScript: "Language",
  Tailwind: "Styling",
  GSAP: "Motion",
  Lenis: "Scroll",
  Supabase: "Data",
  Stripe: "Payments",
  "Paged.js": "Print layout",
  Puppeteer: "PDF render",
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

        {/* The mark, shown on its own grounds */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {e.marks.map((m) => (
            <figure key={m.label} className={m.wide ? "sm:col-span-3" : ""}>
              <div
                className={`rounded-xl border border-foreground/10 flex items-center justify-center px-8 gap-6 ${
                  m.wide ? "py-14 flex-col sm:flex-row" : "aspect-[4/3] flex-col"
                }`}
                style={{ backgroundColor: m.bg }}
              >
                {m.src && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={m.src}
                    alt={`${cs.name} ${m.label}`}
                    style={{ height: m.height ?? 64 }}
                    className="w-auto max-w-full"
                  />
                )}
                {m.wordmark && (
                  <div className={m.src ? "text-center sm:text-left" : "text-center"}>
                    <p
                      className={
                        m.src
                          ? "text-xl md:text-3xl leading-tight"
                          : "text-2xl md:text-4xl leading-tight"
                      }
                      style={{
                        fontFamily: m.wordmark.css,
                        fontWeight: m.wordmark.weight ?? 400,
                        color: m.wordmark.color,
                        letterSpacing: m.wordmark.tracking,
                      }}
                    >
                      {m.wordmark.text}
                    </p>
                    {m.wordmark.sub && (
                      <p
                        className={`mt-1.5 ${
                          m.wordmark.subItalic
                            ? "italic text-base md:text-lg"
                            : "text-[10px] md:text-xs"
                        }`}
                        style={{
                          fontFamily: m.wordmark.subCss ?? m.wordmark.css,
                          color: m.wordmark.subColor ?? m.wordmark.color,
                          letterSpacing: m.wordmark.subTracking,
                        }}
                      >
                        {m.wordmark.sub}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <figcaption className="mt-3">
                <span className="text-sm font-semibold">{m.label}</span>
                {m.note && (
                  <span className="block text-xs text-foreground/60 mt-0.5">
                    {m.note}
                  </span>
                )}
              </figcaption>
            </figure>
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

      <Section title="The build" wide>
        <div className="max-w-2xl space-y-4">
          {e.build.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {e.buildImage && (
          <figure className="mt-10">
            <div className="rounded-xl overflow-hidden border-4 border-[#1A3640] shadow-[0_16px_40px_-16px_rgba(26,54,64,0.3)]">
              <Image
                src={e.buildImage.src}
                alt={e.buildImage.alt}
                width={1580}
                height={1114}
                sizes="(min-width: 896px) 832px, 100vw"
                className="w-full h-auto"
              />
            </div>
            {e.buildImage.caption && (
              <figcaption className="text-xs text-foreground/60 mt-3 text-center">
                {e.buildImage.caption}
              </figcaption>
            )}
          </figure>
        )}
        <ul className="mt-8 max-w-2xl space-y-3">
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
