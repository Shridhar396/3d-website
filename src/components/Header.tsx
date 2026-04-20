"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-none"
    >
      <div className="flex-1 pointer-events-auto">
        <Link href="/" className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-opacity hover:opacity-80">
          Genzest
        </Link>
      </div>

      <nav className="hidden md:flex gap-10 font-sans text-sm tracking-widest uppercase text-white/80 pointer-events-auto">
        {["Our Story", "Collections", "Sustainability"].map((item) => (
          <Link
            key={item}
            href="#"
            className="relative group transition-colors hover:text-white"
          >
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
      
      <div className="md:hidden pointer-events-auto">
        <button className="flex flex-col gap-1.5 p-2">
          <div className="w-6 h-[1px] bg-white/90"></div>
          <div className="w-6 h-[1px] bg-white/90"></div>
        </button>
      </div>
    </motion.header>
  );
}
