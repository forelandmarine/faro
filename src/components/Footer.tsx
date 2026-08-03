"use client";

import Link from "next/link";
import Lighthouse from "./Lighthouse";

export default function Footer() {
  return (
    <footer className="relative py-14 px-6 md:px-16 lg:px-24 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Lighthouse size={18} color="#7EC8E3" />
          <span className="type-display text-base tracking-[-0.02em]">FARO</span>
        </div>

        <div className="flex items-center gap-6 text-muted text-xs">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>

        <p className="text-muted text-xs">
          &copy; {new Date().getFullYear()} Faro Creative
        </p>
      </div>
    </footer>
  );
}
