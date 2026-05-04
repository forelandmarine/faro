import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { CASE_STUDIES } from "@/content/work";

export const metadata: Metadata = {
  title: "Work — Faro Creative",
  description:
    "Selected work from Faro Creative: superyacht consultancy, wellness studio, editorial publication.",
  openGraph: {
    title: "Work — Faro Creative",
    description:
      "Selected work from Faro Creative: superyacht consultancy, wellness studio, editorial publication.",
    url: "/work",
  },
};

export default function WorkIndexPage() {
  return (
    <PageShell>
      <article className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="type-eyebrow mb-6">Work</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-8 max-w-3xl">
          A small portfolio of work we are happy to put our name to.
        </h1>
        <p className="type-body max-w-2xl mb-20">
          Faro takes a small number of projects each year. Each one is shipped by
          the person who designed it. The list below is everything we have
          launched. It will grow slowly.
        </p>

        <ul className="space-y-20 md:space-y-28">
          {CASE_STUDIES.map((cs) => (
            <li key={cs.slug}>
              <Link href={`/work/${cs.slug}`} className="group block">
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-[#1A3640]">
                    <Image
                      src={cs.image}
                      alt={`${cs.name} website`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <p className="type-eyebrow mb-3">{cs.category}</p>
                    <h2 className="type-heading-lg text-2xl md:text-3xl mb-4 group-hover:text-accent transition-colors">
                      {cs.name}
                    </h2>
                    <p className="type-body text-base">{cs.tagline}</p>
                    <span className="inline-block mt-6 text-accent text-xs font-semibold tracking-wider uppercase border-b border-accent/40 pb-0.5">
                      Read the case study
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
