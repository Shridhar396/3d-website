"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete: () => void;
  totalFrames: number;
}

export default function Preloader({ onLoadComplete, totalFrames }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let framesLoaded = 0;
    
    // Instead of loading all images and blowing up memory, we trigger a lightweight Image fetch
    // so the browser caches them for the canvas.
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameStr}.jpg`;
      
      img.onload = () => {
        framesLoaded++;
        setProgress(Math.round((framesLoaded / totalFrames) * 100));
        if (framesLoaded === totalFrames) {
          // Slight delay for smooth transition
          setTimeout(onLoadComplete, 800);
        }
      };
      
      img.onerror = () => {
        // Fallback if a frame is missing so we don't hang infinitely
        framesLoaded++;
        setProgress(Math.round((framesLoaded / totalFrames) * 100));
        if (framesLoaded === totalFrames) {
          setTimeout(onLoadComplete, 800);
        }
      };
    }
  }, [totalFrames, onLoadComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center text-orange-50/90 transition-colors duration-1000 bg-[#D7C0AE]"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif text-4xl mb-4 tracking-widest uppercase">Genzest</h1>
          <div className="w-64 h-[1px] bg-white/20 relative mx-auto mb-2">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-white/80"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "circOut" }}
            />
          </div>
          <span className="font-sans text-xs tracking-[0.2em]">{progress}%</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
