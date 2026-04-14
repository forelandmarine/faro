"use client";

import { useEffect, useState } from "react";

export default function OrientationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => {
      // Show prompt on portrait mobile only
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth < 768;
      setShowPrompt(isPortrait && isMobile && !dismissed);
    };

    check();
    window.addEventListener("resize", check);

    // Reload on orientation change so layout recalculates
    const onOrientationChange = () => {
      // Small delay to let the viewport settle
      setTimeout(() => window.location.reload(), 300);
    };

    // Modern API
    if (screen.orientation) {
      screen.orientation.addEventListener("change", onOrientationChange);
    }
    // Fallback
    window.addEventListener("orientationchange", onOrientationChange);

    return () => {
      window.removeEventListener("resize", check);
      if (screen.orientation) {
        screen.orientation.removeEventListener("change", onOrientationChange);
      }
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, [dismissed]);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[999] md:hidden">
      <div className="bg-surface/95 backdrop-blur-lg border border-foreground/10 rounded-xl px-5 py-4 flex items-center gap-4 shadow-lg">
        {/* Rotate icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent shrink-0"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M12 18h.01" />
          <path d="M2 12l2-2 2 2" />
          <path d="M4 10c0-3.5 3-6 7-6" />
        </svg>

        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-medium">
            Rotate for the best experience
          </p>
          <p className="text-foreground/50 text-xs mt-0.5">
            This site is designed for landscape viewing
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-foreground/40 hover:text-foreground/70 transition-colors shrink-0 p-1"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
