"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { scrollState } from "./HorizontalScroll";

/* ─── Sound Context ─── */

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

/* ─── Synthesized Sounds (no audio files needed) ─── */

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext)();
}

function playTick(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(2400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

function playWhoosh(ctx: AudioContext) {
  // Filtered noise whoosh
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(3000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.025, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(ctx.currentTime);
}

function playConfirm(ctx: AudioContext) {
  // Two-tone chime
  [880, 1100].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.value = freq;

    const start = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0.03, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

    osc.start(start);
    osc.stop(start + 0.2);
  });
}

/* ─── Provider ─── */

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPanelRef = useRef(-1);
  const lastFormSubmitRef = useRef(0);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next && !ctxRef.current) {
        ctxRef.current = createAudioContext();
      }
      // Play a tiny tick on enable to confirm audio works
      if (next && ctxRef.current) {
        if (ctxRef.current.state === "suspended") {
          ctxRef.current.resume();
        }
        playTick(ctxRef.current);
      }
      return next;
    });
  }, []);

  // Panel transition sounds
  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const ctx = ctxRef.current;
      if (!ctx || ctx.state === "suspended") return;

      const panelCount = scrollState.panelCount || 8;
      const progress = scrollState.progress;
      const currentPanel = Math.round(progress * (panelCount - 1));

      if (currentPanel !== lastPanelRef.current && lastPanelRef.current >= 0) {
        playTick(ctx);
        // Whoosh if moving fast
        if (Math.abs(scrollState.velocity) > 500) {
          playWhoosh(ctx);
        }
      }
      lastPanelRef.current = currentPanel;
    };

    // Check every ~100ms instead of every frame for perf
    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, [enabled]);

  // Form submit sound — listen for custom event
  useEffect(() => {
    if (!enabled) return;

    const handler = () => {
      const now = Date.now();
      if (now - lastFormSubmitRef.current < 1000) return;
      lastFormSubmitRef.current = now;
      if (ctxRef.current) playConfirm(ctxRef.current);
    };

    window.addEventListener("faro:form-submit", handler);
    return () => window.removeEventListener("faro:form-submit", handler);
  }, [enabled]);

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}

/* ─── Toggle Button (for navbar) ─── */

export function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex items-center justify-center group"
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {/* Sound wave icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="text-foreground/40 group-hover:text-accent transition-colors"
      >
        <path
          d="M11 5L6 9H2v6h4l5 4V5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {enabled ? (
          <>
            <path
              d="M15.5 8.5a4 4 0 010 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 5a8.5 8.5 0 010 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        ) : (
          <path
            d="M23 9l-6 6M17 9l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Active indicator dot */}
      {enabled && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent/60" />
      )}
    </button>
  );
}
