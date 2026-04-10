"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reel from "@/components/Reel";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />

      <SmoothScroll>
        <Navbar />
        <main
          className={`transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Hero />
          <Reel />
          <Services />
          <Portfolio />
          <Process />
          <About />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
