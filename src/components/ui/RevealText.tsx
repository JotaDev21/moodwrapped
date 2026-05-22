"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordInterval?: number;
  lastWordExtraDelay?: number;
}

export default function RevealText({
  text,
  className = "",
  delay = 0,
  wordInterval = 0.1,
  lastWordExtraDelay = 0,
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        const d = delay + i * wordInterval + (isLast ? lastWordExtraDelay : 0);

        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: d }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
