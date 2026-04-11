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

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ScrollEffects = dynamic(() => import("@/components/ScrollEffects"), {
  ssr: false,
});
const CursorDistortion = dynamic(
  () => import("@/components/CursorDistortion"),
  { ssr: false }
);
const VelocityEffects = dynamic(
  () => import("@/components/VelocityEffects"),
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
      <ScrollEffects />
      <CursorDistortion />
      <VelocityEffects />

      <SmoothScroll>
        <Navbar />
        <HorizontalScroll>
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <About />
          <Testimonials />
          <Contact />
        </HorizontalScroll>
      </SmoothScroll>
    </SoundProvider>
  );
}
