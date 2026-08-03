import Link from "next/link";

/** Shared layout for the plain-text legal pages (privacy, terms). */
export function LegalDoc({
  title,
  eyebrow,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <Link
        href="/"
        className="text-foreground/60 hover:text-foreground text-xs tracking-wider uppercase"
      >
        &larr; Back to Faro
      </Link>

      <header className="mt-10 mb-14">
        <p className="type-eyebrow mb-6">{eyebrow}</p>
        <h1 className="type-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] mb-5">
          {title}
        </h1>
        <p className="text-sm text-foreground/60">Last updated {updated}</p>
      </header>

      <div className="text-foreground/85 text-base md:text-lg leading-relaxed space-y-6">
        {children}
      </div>
    </article>
  );
}

/** One titled section within a legal document. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-4">
      <h2 className="type-eyebrow mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
