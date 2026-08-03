import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { FOUNDER } from "@/content/entity";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";

const UPDATED = "August 2026";

export const metadata: Metadata = {
  title: "Terms · Faro Creative",
  description:
    "The terms for using the Faro Creative website: what the site is, how the content may be used, and the limits of what it promises.",
  openGraph: {
    title: "Terms · Faro Creative",
    description: "The terms for using the Faro Creative website.",
    url: "/terms",
  },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell>
      <LegalDoc title="Terms" eyebrow="Legal" updated={UPDATED}>
        <p>
          These terms cover the use of this website. They are not the contract
          for a design or development project. Any work Faro takes on is governed
          by a separate, signed proposal and agreement. This page is only about
          the site you are reading.
        </p>

        <LegalSection title="Who runs this site">
          <p>
            This site is run by Faro Creative, a founder-led design and
            development studio based in the United Kingdom and Mallorca. You can
            reach the studio at{" "}
            <a
              href={`mailto:${FOUNDER.email}`}
              className="text-accent hover:text-accent-light"
            >
              {FOUNDER.email}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Using the site">
          <p>
            You are welcome to read the site, share links to it, and get in
            touch. Please do not use it to break the law, to disrupt the service
            for others, or to attempt to gain access to systems or data you are
            not entitled to. That is the whole of it.
          </p>
        </LegalSection>

        <LegalSection title="Our content">
          <p>
            The words, design, code, brand marks, and case-study material on this
            site belong to Faro Creative or to the clients whose work is shown,
            and are used here with permission. The client brands, logos, and
            project imagery remain the property of those clients. You may not copy
            or reuse any of it for your own commercial purposes without asking
            first.
          </p>
        </LegalSection>

        <LegalSection title="Links to other sites">
          <p>
            The site links out to client websites and to related properties such
            as Foreland Marine and The First Owner&apos;s Reference. Those sites
            have their own terms and privacy practices, and Faro is not
            responsible for their content once you leave this site.
          </p>
        </LegalSection>

        <LegalSection title="Case studies and examples">
          <p>
            The case studies describe real work, but they are presented as a
            portfolio, not as a promise of a particular result for your own
            project. Every project is different. What Faro will deliver for you is
            set out in your proposal, not inferred from the examples here.
          </p>
        </LegalSection>

        <LegalSection title="No warranty">
          <p>
            The site is provided as it is. Faro takes care to keep the
            information accurate and the site available, but does not guarantee
            that it will always be error-free or uninterrupted, and is not liable
            for any loss arising from your use of the site itself. Nothing here
            limits any liability that cannot be limited under law.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            These terms are governed by the law of England and Wales. If any part
            of them is found not to apply, the rest still stand.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            These terms may be updated from time to time. The current version is
            dated at the top of the page. This version is current as of {UPDATED}.
          </p>
        </LegalSection>
      </LegalDoc>
    </PageShell>
  );
}
