"use client";

import { useState, useRef } from "react";
import Preloader from "@/components/Preloader";
import GrainOverlay from "@/components/GrainOverlay";
import Header from "@/components/Header";
import ChocolateScroll from "@/components/ChocolateScroll";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic Multi-Stage Background Sync
  const dynamicBackground = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#D7C0AE", "#967E76", "#634433", "#2C1B12"]
  );

  // Fade animations for each narrative section
  const section1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.1, 0.15], [0, 1, 1, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.main ref={containerRef} className="relative min-h-screen text-orange-50/90 font-sans shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" style={{ backgroundColor: dynamicBackground }}>
      <GrainOverlay />
      
      {!loading && <Header />}

      {loading && <Preloader onLoadComplete={() => setLoading(false)} totalFrames={120} />}
      
      {!loading && (
        <div className="relative w-full">
          {/* Main Canvas Component handling the background image sequence */}
          <ChocolateScroll totalFrames={120} />

          {/* Texts Overlays Container */}
          <div className="fixed inset-0 pointer-events-none flex flex-col justify-center">
            
            {/* Section 1: 0% - 15% (Centered Always) */}
            <motion.div 
              style={{ opacity: section1Opacity }}
              className="absolute inset-x-0 top-[60%] md:top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-6"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-white/95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                GENZEST.
              </h1>
              <p className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                The Origin of Indulgence.
              </p>
            </motion.div>

            {/* Section 2: 25% - 40% (Mobile: Bottom center, Desktop: Left Aligned) */}
            <motion.div 
              style={{ opacity: section2Opacity }}
              className="absolute inset-x-0 bottom-[15%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 px-6 md:px-24 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="md:max-w-xl">
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 text-white/95 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  From the heart of the Cacao Pod.
                </h2>
                <p className="text-base md:text-xl font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Raw, organic, and ethically sourced textures tell a story of authentic creation.
                </p>
              </div>
            </motion.div>

            {/* Section 3: 50% - 65% (Mobile: Bottom center, Desktop: Right Aligned) */}
            <motion.div 
              style={{ opacity: section3Opacity }}
              className="absolute inset-x-0 bottom-[15%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 px-6 md:px-24 flex flex-col items-center md:items-end text-center md:text-right"
            >
               <div className="md:max-w-xl">
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 text-white/95 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  Refined. Tempered.<br className="hidden md:block" /> Perfected.
                </h2>
                <p className="text-base md:text-xl font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Decades of mastery condensed into each buttery layer of dark chocolate.
                </p>
              </div>
            </motion.div>

            {/* Section 4: 85% - 100% (Centered CTA) */}
            <motion.div 
              style={{ opacity: section4Opacity }}
              className="absolute inset-x-0 top-[60%] md:top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-6 pointer-events-auto"
            >
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-12 text-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                The Ultimate Transformation.
              </h2>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#3C2A21", borderColor: "#3C2A21" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white/5 border border-white/20 backdrop-blur-md rounded-sm font-sans tracking-[0.2em] text-xs md:text-sm uppercase text-white/95 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] drop-shadow-lg"
              >
                Experience Now
              </motion.button>
            </motion.div>

          </div>
        </div>
      )}
    </motion.main>
  );
}
