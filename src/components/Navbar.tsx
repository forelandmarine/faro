"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";
import Magnetic from "./Magnetic";
import { SoundToggle } from "./SoundEngine";
import { scrollState } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // In horizontal mode, use scroll progress; in vertical, use scrollY
      const isHorizontalMode = window.innerWidth >= 768 || (window.innerWidth > window.innerHeight);
      if (isHorizontalMode) {
        setScrolled(scrollState.progress > 0.02);
      } else {
        setScrolled(window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 3,
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const target = document.querySelector(href);
    if (!target) return;

    // In horizontal scroll mode, we need to calculate the equivalent
    // vertical scroll position for the target panel
    const isHorizontal = window.innerWidth >= 768 || (window.innerWidth > window.innerHeight);

    if (isHorizontal) {
      // Find the panel track and calculate position
      const track = document.querySelector(".panel-track");
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // How far the target is from the track's left edge (accounting for current transform)
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      const currentX = matrix.m41;

      // Target's offset from the start of the track
      const targetOffset = targetRect.left - trackRect.left + Math.abs(currentX);

      // Total scrollable distance maps to total track overflow
      const totalTrackOverflow = track.scrollWidth - window.innerWidth;
      const scrollTriggers = ScrollTrigger.getAll();
      const mainTrigger = scrollTriggers.find((t) => t.vars.pin);

      if (mainTrigger) {
        const scrollRatio = targetOffset / totalTrackOverflow;
        const targetScroll = mainTrigger.start + (mainTrigger.end - mainTrigger.start) * scrollRatio;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <Lighthouse
            size={18}
            color="#7EC8E3"
            className="opacity-50 group-hover:opacity-100 transition-opacity"
          />
          <span className="type-display text-base tracking-[-0.02em]">FARO</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-xs font-medium tracking-[0.1em] uppercase text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SoundToggle />
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="text-xs font-medium tracking-[0.1em] uppercase px-5 py-2.5 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-background transition-all"
            >
              Start a project
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-3"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-px bg-foreground transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-px bg-foreground transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-8 pt-4 bg-background/95 backdrop-blur-xl border-t border-foreground/6 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block text-sm font-medium tracking-[0.05em] uppercase text-foreground hover:text-accent transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="block text-sm font-medium tracking-[0.05em] uppercase text-accent pt-4 border-t border-foreground/6"
          >
            Start a project
          </a>
        </div>
      </div>
    </nav>
  );
}
