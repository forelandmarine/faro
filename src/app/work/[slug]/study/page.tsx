import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { StudyDocument } from "@/components/study/StudyDocument";
import { STUDIES, getStudy } from "@/content/studies";
import { getCaseStudy } from "@/content/work";
import { SITE_URL } from "@/content/entity";
import "./print.css";

export function generateStaticParams() {
  return STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getStudy(slug);
  const cs = getCaseStudy(slug);
  if (!doc || !cs) return {};
  const title = `${doc.client}, design and build notes · Faro Creative`;
  return {
    title,
    description: doc.subtitle,
    alternates: { canonical: `/work/${doc.slug}/study` },
    openGraph: {
      title,
      description: doc.subtitle,
      url: `/work/${doc.slug}/study`,
      type: "article",
      images: [{ url: cs.image, width: 1600, height: 1200 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: doc.subtitle,
      images: [cs.image],
    },
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getStudy(slug);
  const cs = getCaseStudy(slug);
  if (!doc || !cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.subtitle,
    url: `${SITE_URL}/work/${doc.slug}/study`,
    image: `${SITE_URL}${cs.image}`,
    inLanguage: "en-GB",
    datePublished: `${cs.year}-01-01`,
    author: { "@type": "Organization", name: "Faro Creative", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Faro Creative", url: SITE_URL },
    about: doc.client,
    articleSection: doc.sections.map((s) => s.title),
    isPartOf: {
      "@type": "CreativeWork",
      name: cs.name,
      url: `${SITE_URL}/work/${cs.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: cs.name,
        item: `${SITE_URL}/work/${cs.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Design and build notes",
        item: `${SITE_URL}/work/${cs.slug}/study`,
      },
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

      <article className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center justify-between gap-6 print-hide">
          <Link
            href={`/work/${cs.slug}`}
            className="text-foreground/60 hover:text-foreground text-xs tracking-wider uppercase"
          >
            &larr; {cs.name}
          </Link>
          <a
            href={`/portfolio/study/${cs.slug}/faro-${cs.slug}-notes.pdf`}
            download
            className="text-accent hover:text-accent-light text-xs tracking-wider uppercase border border-accent/30 hover:border-accent rounded-full px-4 py-2 transition-colors shrink-0"
          >
            Download as PDF
          </a>
        </div>

        <div className="mt-10">
          <StudyDocument doc={doc} />
        </div>

        <div className="mt-24 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 print-hide">
          <p className="text-foreground/70 max-w-md">
            This is how we work on every project. If it suits what you are
            building, we should talk.
          </p>
          <Link
            href="/contact"
            className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors shrink-0"
          >
            Talk to Faro
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
