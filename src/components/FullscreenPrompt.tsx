"use client";

import { useEffect, useState } from "react";

type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
};
type FullscreenEl = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

function getFullscreenElement(): Element | null {
  const doc = document as FullscreenDoc;
  return doc.fullscreenElement || doc.webkitFullscreenElement || null;
}

function requestFullscreen(el: HTMLElement) {
  const target = el as FullscreenEl;
  if (target.requestFullscreen) return target.requestFullscreen();
  if (target.webkitRequestFullscreen) return target.webkitRequestFullscreen();
  return Promise.reject(new Error("Fullscreen not supported"));
}

export default function FullscreenPrompt() {
  const [eligible, setEligible] = useState(false);
  const [inFullscreen, setInFullscreen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const check = () => {
      const landscapeMobile =
        window.innerWidth > window.innerHeight && window.innerHeight <= 600;
      const el = document.documentElement as FullscreenEl;
      const supports = !!(el.requestFullscreen || el.webkitRequestFullscreen);
      setEligible(landscapeMobile && supports);
    };

    const onFullscreenChange = () => setInFullscreen(!!getFullscreenElement());

    check();
    onFullscreenChange();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  const enter = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await requestFullscreen(document.documentElement);
    } catch {
      // Some iOS versions reject silently. Hide the prompt either way so
      // the user isn't left tapping a button that does nothing.
      setDismissed(true);
    } finally {
      setBusy(false);
    }
  };

  if (!eligible || inFullscreen || dismissed) return null;

  return (
    <div className="fixed bottom-3 right-3 z-[999] flex items-center gap-2">
      <button
        onClick={enter}
        className="bg-foreground/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase px-3 py-2 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
        aria-label="Enter immersive view"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9V5a1 1 0 0 1 1-1h4" />
          <path d="M20 9V5a1 1 0 0 0-1-1h-4" />
          <path d="M4 15v4a1 1 0 0 0 1 1h4" />
          <path d="M20 15v4a1 1 0 0 1-1 1h-4" />
        </svg>
        Immersive
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="bg-foreground/60 backdrop-blur-md text-white/80 rounded-full w-7 h-7 grid place-items-center shadow-lg active:scale-95 transition-transform"
        aria-label="Dismiss immersive prompt"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
