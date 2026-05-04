import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — Faro Creative",
  description:
    "Faro Creative builds websites and brand systems for three verticals: marine and superyacht, wellness and studio, editorial publication.",
  openGraph: {
    title: "Services — Faro Creative",
    description:
      "Faro Creative builds websites and brand systems for three verticals: marine and superyacht, wellness and studio, editorial publication.",
    url: "/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <PageShell>
      <article className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="type-eyebrow mb-6">Services</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-8 max-w-3xl">
          We work in three verticals. We say no to the rest.
        </h1>
        <p className="type-body max-w-2xl mb-20">
          Specialism is a service offer in itself. Faro takes work where the
          studio already understands the buyer, the trade press, and the words
          that mean something. The three verticals below are where we have
          shipped, where we have references, and where we are best.
        </p>

        <ul className="space-y-16">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
                  <div className="md:col-span-3">
                    <p className="type-display text-3xl md:text-4xl text-accent group-hover:text-foreground transition-colors">
                      {s.shortName}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="type-heading-lg text-xl md:text-2xl mb-3">
                      {s.name}
                    </h2>
                    <p className="type-body text-base">{s.tagline}</p>
                    <span className="inline-block mt-5 text-accent text-xs font-semibold tracking-wider uppercase border-b border-accent/40 pb-0.5">
                      Read more
                      <span className="inline-block ml-1">&#8599;</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
