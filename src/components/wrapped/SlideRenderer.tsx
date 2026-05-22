"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { slideTransition } from "@/lib/animations";

interface SlideRendererProps {
  currentSlide: number;
  children: ReactNode[];
}

export default function SlideRenderer({ currentSlide, children }: SlideRendererProps) {
  return (
    <div className="relative w-full h-full overflow-hidden z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideTransition}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {children[currentSlide]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
