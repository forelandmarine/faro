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
      <CoastlineScene />
      <FlyingBirds />
      <OrientationPrompt />

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
