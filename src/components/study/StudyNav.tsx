"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * In-page navigation for the study documents.
 *
 * These run to a couple of thousand words and forty-odd figures, and until now
 * carried a contents list at the top and nothing after it. Two thirds of the
 * way down, on a phone especially, there was no way to tell where you were or
 * to get back without scrolling to the top.
 *
 * The rail only appears where there is genuinely spare width beside the
 * measure. Everything else is a hairline progress bar and a return to the top,
 * both of which stay out of the way.
 */
export function StudyNav({
  sections,
}: {
  sections: { id: string; number: string; title: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    // The heading nearest the top of the viewport wins, rather than whichever
    // section happens to occupy the most pixels: on a document with figures
    // taller than the window those two answers disagree.
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
      setShowTop(doc.scrollTop > doc.clientHeight);

      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
        else break;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      {/* Reading progress, under the sticky header */}
      <div
        aria-hidden
        className="fixed top-16 left-0 right-0 h-px bg-transparent z-40 print-hide"
      >
        <div
          className="h-full bg-accent origin-left transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Section rail. Needs room beside a 64rem article, so it waits for xl. */}
      <nav
        aria-label="Sections"
        className="hidden xl:block fixed left-[max(1.5rem,calc(50vw-38rem))] top-32 w-44 z-30 print-hide"
      >
        <ol className="space-y-1">
          {sections.map((s) => {
            const on = s.id === active;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`group flex items-baseline gap-2.5 py-1 text-xs leading-snug transition-colors ${
                    on
                      ? "text-accent"
                      : "text-foreground/40 hover:text-foreground/75"
                  }`}
                >
                  <span className="font-mono text-[10px] shrink-0">
                    {s.number}
                  </span>
                  <span className="truncate">{s.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {showTop && (
        <button
          type="button"
          onClick={toTop}
          className="fixed bottom-6 right-6 z-40 text-[10px] tracking-[0.14em] uppercase text-foreground/60 hover:text-accent bg-background/85 backdrop-blur-sm border border-foreground/15 hover:border-accent/50 rounded-full px-4 py-2.5 transition-colors print-hide"
        >
          Top
        </button>
      )}
    </>
  );
}
