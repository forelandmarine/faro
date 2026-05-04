import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { FOUNDER, SITE_URL } from "@/content/entity";

export const metadata: Metadata = {
  title: "Contact — Faro Creative",
  description:
    "Talk to Faro Creative. Brief, sketch, or rough idea, all welcome. Email hello@faro.is.",
  openGraph: {
    title: "Contact — Faro Creative",
    description:
      "Talk to Faro Creative. Brief, sketch, or rough idea, all welcome.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: SITE_URL + "/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Faro Creative",
    email: "hello@faro.is",
    url: SITE_URL,
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="type-eyebrow mb-6">Contact</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] mb-8">
          Write to us.
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-16 max-w-2xl">
          Full brief, napkin sketch, or a rough idea. It does not matter where
          you are in the process. There is no commitment and no sales pitch.
        </p>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="type-heading-sm text-base text-foreground/60 tracking-wider uppercase mb-6">
              Direct
            </h2>
            <ul className="space-y-4 text-foreground/85 text-base">
              <li>
                <a
                  href={`mailto:${FOUNDER.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {FOUNDER.email}
                </a>
              </li>
              <li className="text-foreground/70">
                {FOUNDER.name}, {FOUNDER.role.toLowerCase()}.
              </li>
              <li className="text-foreground/70">
                United Kingdom and Mallorca.
              </li>
            </ul>

            <h2 className="type-heading-sm text-base text-foreground/60 tracking-wider uppercase mt-12 mb-4">
              What helps
            </h2>
            <ul className="space-y-2 text-foreground/85 text-base">
              <li>A link to your existing site, if one exists</li>
              <li>The vertical or sector you operate in</li>
              <li>A rough launch window if you have one</li>
              <li>A budget range, even an order of magnitude</li>
            </ul>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </article>
    </PageShell>
  );
}
