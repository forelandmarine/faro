import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { FOUNDER } from "@/content/entity";
import { LegalDoc, LegalSection } from "@/components/LegalDoc";

const UPDATED = "August 2026";

export const metadata: Metadata = {
  title: "Privacy · Faro Creative",
  description:
    "How Faro Creative handles the small amount of personal data it collects: contact enquiries, hosting, and cookieless analytics.",
  openGraph: {
    title: "Privacy · Faro Creative",
    description:
      "How Faro Creative handles the small amount of personal data it collects.",
    url: "/privacy",
  },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalDoc title="Privacy" eyebrow="Legal" updated={UPDATED}>
        <p>
          Faro Creative is a founder-led design and development studio based in
          the United Kingdom and Mallorca. This page explains what personal data
          the site collects, why, and what your rights are. It is written to be
          read, not to be hidden behind. Faro collects very little.
        </p>

        <LegalSection title="Who is responsible">
          <p>
            The studio, Faro Creative, is the data controller for this site. If
            you have any question about your data, or want it removed, write to{" "}
            <a
              href={`mailto:${FOUNDER.email}`}
              className="text-accent hover:text-accent-light"
            >
              {FOUNDER.email}
            </a>
            . A person will read it, not a ticketing system.
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            When you send an enquiry through the contact form, we collect the
            name, email address, and message you enter. That is the only
            personal data the site asks you for. We do not run accounts, ask for
            payment on this site, or collect anything you do not type in
            yourself.
          </p>
        </LegalSection>

        <LegalSection title="How we use it">
          <p>
            Your enquiry is used to read your message and reply to it. Nothing
            more. We do not add you to a marketing list, sell your details, or
            share them with third parties for their own purposes. The legal basis
            is our legitimate interest in answering people who get in touch, and
            in taking steps to enter into work with prospective clients.
          </p>
        </LegalSection>

        <LegalSection title="The services behind the site">
          <p>
            A few carefully chosen providers help run the site. They process data
            on our instructions and nothing else.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              [
                "Vercel",
                "Hosts the website and serves the pages. It processes standard server request data, such as IP address, as part of delivering the site securely.",
              ],
              [
                "Resend",
                "Delivers contact-form enquiries to our inbox as email. It handles the name, email, and message you submit, in transit only.",
              ],
              [
                "Plausible",
                "Privacy-first analytics, used to understand roughly how many people visit which pages. It sets no cookies, and does not track you across sites or build a profile of you.",
              ],
            ].map(([name, note]) => (
              <li key={name} className="flex gap-4">
                <span className="text-accent flex-shrink-0">&bull;</span>
                <span>
                  <span className="font-semibold">{name}.</span> {note}
                </span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title="Cookies and tracking">
          <p>
            This site sets no advertising or tracking cookies. There is no Google
            Analytics, no ad pixels, and no cross-site tracking. Analytics is
            cookieless. That is a deliberate choice, not an oversight.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep it">
          <p>
            Enquiries stay in our email for as long as is useful to the
            conversation and any work that follows, then they are cleared out.
            If you want your enquiry deleted sooner, ask, and it will be.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            If you are in the UK or the EU, you have the right to ask for a copy
            of the data we hold about you, to have it corrected, or to have it
            erased. To use any of these, email{" "}
            <a
              href={`mailto:${FOUNDER.email}`}
              className="text-accent hover:text-accent-light"
            >
              {FOUNDER.email}
            </a>
            . You also have the right to complain to the UK Information
            Commissioner&apos;s Office if you think your data has been mishandled.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this page">
          <p>
            If how the site handles data changes, this page changes with it, and
            the date at the top is updated. This version is current as of{" "}
            {UPDATED}.
          </p>
        </LegalSection>
      </LegalDoc>
    </PageShell>
  );
}
