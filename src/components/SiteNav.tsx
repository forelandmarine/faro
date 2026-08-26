"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Lighthouse from "./Lighthouse";

/**
 * The header for the routed pages.
 *
 * Five inline links plus the wordmark need about 460 pixels, so on a phone they
 * used to run off the side of the screen. Below the small breakpoint the links
 * collapse behind a disclosure instead of being shrunk until they happen to
 * fit, which is the only version of this that cannot overflow at some width
 * nobody tested.
 */
export function SiteNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A navigation should not leave its own menu hanging open behind the page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b border-foreground/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Lighthouse size={20} color="#1A3640" />
          <span className="type-display text-base tracking-tight">FARO</span>
        </Link>

        {/* Phones: a disclosure. Everything else: the links inline. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav-menu"
          className="sm:hidden text-xs font-medium tracking-wider uppercase text-foreground/70 hover:text-foreground transition-colors py-2 -mr-2 pr-2"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden sm:flex items-center gap-5 md:gap-8 text-xs font-medium tracking-wider uppercase">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isCurrent(n.href) ? "page" : undefined}
              className={`transition-colors ${
                isCurrent(n.href)
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <nav
          id="site-nav-menu"
          className="sm:hidden border-t border-foreground/10 px-6 pb-4 pt-2"
        >
          <ul className="flex flex-col">
            {items.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isCurrent(n.href) ? "page" : undefined}
                  className={`block py-3 text-sm tracking-wider uppercase border-b border-foreground/10 last:border-0 transition-colors ${
                    isCurrent(n.href)
                      ? "text-accent"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
