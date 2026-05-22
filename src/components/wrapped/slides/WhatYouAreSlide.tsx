"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WhatYouAreSlideProps {
  phrases: string[];
}

const stars = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

export default function WhatYouAreSlide({ phrases }: WhatYouAreSlideProps) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const introDelay = setTimeout(() => setIndex(0), 2800);
    return () => clearTimeout(introDelay);
  }, []);

  useEffect(() => {
    if (index < 0) return;
    if (index >= phrases.length) return;
    const stayTime = Math.max(4000, phrases[index].length * 45);
    const t = setTimeout(() => setIndex((i) => i + 1), stayTime);
    return () => clearTimeout(t);
  }, [index, phrases]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
      {/* estrelas no fundo */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* glow central */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[120px]"
        animate={{
          opacity: [0.03, 0.06, 0.03],
          backgroundColor: ["#FF85C8", "#DDA0DD", "#FF85C8"],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* intro */}
      <AnimatePresence mode="wait">
        {index === -1 && (
          <motion.p
            key="intro"
            className="text-pink-300/30 text-[13px] tracking-[0.2em] uppercase text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            o que você é pra mim
          </motion.p>
        )}

        {index >= 0 && index < phrases.length && (
          <motion.p
            key={index}
            className="text-pink-50/80 text-[17px] leading-[1.8] text-center max-w-[300px] font-light"
            initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {phrases[index]}
          </motion.p>
        )}

        {index >= phrases.length && (
          <motion.div
            key="end"
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.span
              className="text-pink-300/15 text-[40px]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ∞
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
