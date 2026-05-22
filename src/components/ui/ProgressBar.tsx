"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  total: number;
  current: number;
  visible: boolean;
}

export default function ProgressBar({ total, current, visible }: ProgressBarProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-30 flex gap-[3px] px-3 pt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[2px] flex-1 rounded-full bg-pink-200/[0.08] overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full bg-pink-200/50"
            initial={false}
            animate={{
              width: i <= current ? "100%" : "0%",
            }}
            transition={{
              duration: i === current ? 0.8 : 0.3,
              ease: "easeOut",
              delay: i === current ? 0.3 : 0,
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}
