"use client";

import { motion } from "framer-motion";

export default function SilenceSlide() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-2 h-2 rounded-full bg-pink-300/20"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
