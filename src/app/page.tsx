"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import HorizontalScroll from "@/components/HorizontalScroll";
import { SoundProvider } from "@/components/SoundEngine";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import OrientationPrompt from "@/components/OrientationPrompt";
import FullscreenPrompt from "@/components/FullscreenPrompt";
import MobileCoastline from "@/components/MobileCoastline";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const CoastlineScene = dynamic(
  () => import("@/components/CoastlineScene"),
  { ssr: false }
);
const FlyingBirds = dynamic(
  () => import("@/components/FlyingBirds"),
  { ssr: false }
);

type SceneMode = "portrait" | "landscape-mobile" | "desktop";

/* Mount only the coastline variant the viewport actually shows. The CSS
   display rules still act as a backstop, but an unmounted scene also skips
   its SVG DOM and per-frame GSAP ticker — that matters on phones. */
function useSceneMode(): SceneMode | null {
  const [mode, setMode] = useState<SceneMode | null>(null);

  useEffect(() => {
    const update = () => {
      const landscapeMobile =
        window.innerWidth > window.innerHeight && window.innerHeight < 600;
      if (landscapeMobile) setMode("landscape-mobile");
      else setMode(window.innerWidth < 768 ? "portrait" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return mode;
}

export default function Home() {
  const sceneMode = useSceneMode();
  const handlePreloaderComplete = useCallback(() => {
    // Preloader finished — could trigger entrance animations here
  }, []);

  return (
    <SoundProvider>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <FlyingBirds />
      <OrientationPrompt />
      <FullscreenPrompt />

      <SmoothScroll>
        <Navbar />
        <HorizontalScroll
          footer={sceneMode === "desktop" ? <CoastlineScene /> : undefined}
        >
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <About />
          <Testimonials />
          <Contact />
        </HorizontalScroll>
        {sceneMode === "portrait" && <MobileCoastline />}
        {/* Landscape mobile: CoastlineScene outside the scroll container
            because iOS Safari breaks position:fixed inside overflow:auto. */}
        {sceneMode === "landscape-mobile" && (
          <div className="landscape-coastline-outer">
            <CoastlineScene />
          </div>
        )}
      </SmoothScroll>
    </SoundProvider>
  );
}
