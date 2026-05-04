import Link from "next/link";
import Lighthouse from "./Lighthouse";
import { ENTITY_SHORT, FOUNDER, RELATED_SITES } from "@/content/entity";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-foreground/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Lighthouse size={20} color="#1A3640" />
          <span className="type-display text-base tracking-tight">FARO</span>
        </Link>
        <nav className="flex items-center gap-5 md:gap-8 text-xs font-medium tracking-wider uppercase">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-6">
            <Lighthouse size={20} color="#D6E9E4" />
            <span className="type-display text-base tracking-tight text-background">
              FARO
            </span>
          </div>
          <p className="text-background/70 text-sm leading-relaxed max-w-sm">
            {ENTITY_SHORT}
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-background/50 text-xs tracking-wider uppercase mb-4">
            Studio
          </h3>
          <ul className="space-y-2 text-sm text-background/80">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-background transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-background/50 text-xs tracking-wider uppercase mb-4">
            Related properties
          </h3>
          <ul className="space-y-3 text-sm text-background/80">
            {RELATED_SITES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                >
                  {s.name}
                </a>
                <p className="text-background/50 text-xs mt-1">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-background/50">
          <p>
            &copy; {new Date().getFullYear()} Faro Creative. {FOUNDER.name}, {FOUNDER.role.toLowerCase()}.
          </p>
          <a href={`mailto:${FOUNDER.email}`} className="hover:text-background transition-colors">
            {FOUNDER.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
