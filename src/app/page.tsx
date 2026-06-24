"use client";

import { useCallback } from "react";
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

export default function Home() {
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
        <HorizontalScroll footer={<CoastlineScene />}>
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <About />
          <Testimonials />
          <Contact />
        </HorizontalScroll>
        <MobileCoastline />
        {/* Landscape mobile: CoastlineScene outside the scroll container
            because iOS Safari breaks position:fixed inside overflow:auto.
            CSS hides the one inside HorizontalScroll on landscape mobile. */}
        <div className="landscape-coastline-outer">
          <CoastlineScene />
        </div>
      </SmoothScroll>
    </SoundProvider>
  );
}
