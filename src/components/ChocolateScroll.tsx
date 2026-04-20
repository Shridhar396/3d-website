"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

interface ChocolateScrollProps {
  totalFrames: number;
}

export default function ChocolateScroll({ totalFrames }: ChocolateScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  // Load images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameStr = i.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${frameStr}.jpg`;
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [totalFrames]);

  // Render on canvas
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    // VERY IMPORTANT: Alpha must be true so the canvas background can be transparent
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Calculate current frame index
      const currentIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(frameIndex.get()) - 1)
      );
      
      const img = images[currentIndex];
      
      if (img && img.complete && img.naturalWidth > 0) {
        const containRatio = Math.min(canvas.width / img.width, canvas.height / img.height);
        const drawWidth = img.width * containRatio;
        const drawHeight = img.height * containRatio;
        
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        // Clear canvas completely so the dynamic CSS background shines through
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image directly
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [images, frameIndex, totalFrames]);

  // Handle Resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[700vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
          }}
        />
      </div>
    </div>
  );
}
