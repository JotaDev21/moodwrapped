"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { WrappedMeta } from "@/data/types";

interface IntroSlideProps {
  meta: WrappedMeta;
  onStart: () => void;
}

const burstHearts = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
  const distance = 300 + Math.random() * 500;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 200,
    size: 12 + Math.random() * 20,
    duration: 1.2 + Math.random() * 0.8,
    rotate: Math.random() * 360,
  };
});

const risingHearts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  size: 8 + Math.random() * 12,
  duration: 5 + Math.random() * 4,
  delay: Math.random() * 2,
  opacity: 0.06 + Math.random() * 0.1,
}));

const textLines = [
  "eu tava pensando...",
  "oq dar pra alguém\nque já tem tudo?",
  "principalmente sabendo\nque a única coisa que\neu sei fazer é codar",
  "acho que esse é o melhor\njeito de expressar algo",
];

export default function IntroSlide({ meta, onStart }: IntroSlideProps) {
  const [phase, setPhase] = useState<"drop" | "burst" | "text">("drop");
  const [textIndex, setTextIndex] = useState(0);
  const [heartBtn, setHeartBtn] = useState<"hidden" | "heart" | "pulse" | "glow" | "morph" | "button">("hidden");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("burst"), 2000);
    const t2 = setTimeout(() => setPhase("text"), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== "text") return;
    if (textIndex >= textLines.length) {
      const t1 = setTimeout(() => setHeartBtn("heart"), 600);
      const t2 = setTimeout(() => setHeartBtn("pulse"), 2000);
      const t3 = setTimeout(() => setHeartBtn("glow"), 3200);
      const t4 = setTimeout(() => setHeartBtn("morph"), 3800);
      const t5 = setTimeout(() => setHeartBtn("button"), 4800);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }
    const charCount = textLines[textIndex].length;
    const stayTime = charCount * 0.05 * 1000 + 2000;
    const t = setTimeout(() => setTextIndex((i) => i + 1), stayTime);
    return () => clearTimeout(t);
  }, [phase, textIndex]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 text-center overflow-hidden">

      {/* corações subindo no fundo (aparecem na fase text) */}
      {phase === "text" && risingHearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-pink-400/60 select-none pointer-events-none"
          style={{ left: h.left, bottom: -20, fontSize: h.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -900, opacity: [0, h.opacity, h.opacity, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          ♡
        </motion.span>
      ))}

      {/* FASE 1: coração cai */}
      <AnimatePresence>
        {phase === "drop" && (
          <motion.div
            className="absolute"
            initial={{ y: -400, opacity: 0, scale: 0.3 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ scale: 1.3, opacity: 0, transition: { duration: 0.4 } }}
            transition={{
              y: { type: "spring", damping: 10, stiffness: 80, duration: 1.4 },
              opacity: { duration: 0.4 },
              scale: { type: "spring", damping: 10, stiffness: 80 },
            }}
          >
            <svg width="160" height="150" viewBox="0 0 160 150">
              <defs>
                <linearGradient id="glassBase" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF85C8" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#FF5C93" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#FF85C8" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#FF85C8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFD6EB" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="glassShine" x1="30%" y1="0%" x2="70%" y2="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                  <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="glassGlow" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#FF85C8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FF5C93" stopOpacity="0" />
                </radialGradient>
                <filter id="glassBlur"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" /></filter>
                <filter id="outerGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <clipPath id="heartClip">
                  <path d="M80 138 C80 138, 12 94, 12 56 C12 27, 36 12, 55 12 C65 12, 75 19, 80 29 C85 19, 95 12, 105 12 C124 12, 148 27, 148 56 C148 94, 80 138, 80 138Z" />
                </clipPath>
              </defs>
              <path d="M80 138 C80 138, 12 94, 12 56 C12 27, 36 12, 55 12 C65 12, 75 19, 80 29 C85 19, 95 12, 105 12 C124 12, 148 27, 148 56 C148 94, 80 138, 80 138Z" fill="#FF85C8" opacity="0.06" filter="url(#outerGlow)" />
              <path d="M80 138 C80 138, 12 94, 12 56 C12 27, 36 12, 55 12 C65 12, 75 19, 80 29 C85 19, 95 12, 105 12 C124 12, 148 27, 148 56 C148 94, 80 138, 80 138Z" fill="url(#glassBase)" />
              <path d="M80 138 C80 138, 12 94, 12 56 C12 27, 36 12, 55 12 C65 12, 75 19, 80 29 C85 19, 95 12, 105 12 C124 12, 148 27, 148 56 C148 94, 80 138, 80 138Z" fill="url(#glassGlow)" />
              <g clipPath="url(#heartClip)">
                <ellipse cx="60" cy="38" rx="40" ry="25" fill="url(#glassShine)" />
                <ellipse cx="45" cy="32" rx="18" ry="10" fill="white" opacity="0.1" filter="url(#glassBlur)" />
              </g>
              <path d="M80 138 C80 138, 12 94, 12 56 C12 27, 36 12, 55 12 C65 12, 75 19, 80 29 C85 19, 95 12, 105 12 C124 12, 148 27, 148 56 C148 94, 80 138, 80 138Z" fill="none" stroke="url(#glassBorder)" strokeWidth="1.2" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-cute text-2xl text-white/90 pt-2">
              {meta.recipientName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FASE 2: corações explodem pra fora */}
      <AnimatePresence>
        {phase === "burst" && burstHearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-pink-400 select-none pointer-events-none"
            style={{ fontSize: h.size }}
            initial={{ x: 0, y: 0, opacity: 0.8, scale: 1, rotate: 0 }}
            animate={{ x: h.x, y: h.y, opacity: 0, scale: 0.3, rotate: h.rotate }}
            transition={{ duration: h.duration, ease: [0.25, 0.1, 0.25, 1] }}
          >
            ♡
          </motion.span>
        ))}
      </AnimatePresence>

      {/* FASE 3: uma frase por vez */}
      {phase === "text" && (
        <div className="flex flex-col items-center justify-center">
          <div className="h-[140px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {textIndex < textLines.length && (
                <motion.p
                  key={textIndex}
                  className="text-pink-200/70 text-[20px] leading-relaxed text-center"
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {textLines[textIndex].split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      style={char === " " ? { width: "0.3em" } : char === "\n" ? { display: "block", height: 4 } : undefined}
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                    >
                      {char === "\n" ? null : char}
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* coração que vira botão */}
          {heartBtn !== "hidden" && (
            <div className="relative flex items-center justify-center" style={{ height: 80 }}>
              {/* glow atrás do coração */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 120, height: 120, background: "radial-gradient(circle, rgba(255,133,200,0.3) 0%, transparent 70%)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: heartBtn === "glow" || heartBtn === "pulse" ? 1 : heartBtn === "morph" || heartBtn === "button" ? 0.4 : 0,
                  scale: heartBtn === "glow" ? 1.8 : heartBtn === "morph" || heartBtn === "button" ? 2 : 0.5,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* coração SVG */}
              <motion.div
                className="absolute pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: heartBtn === "morph" || heartBtn === "button" ? 0 : 1,
                  scale:
                    heartBtn === "heart" ? [0, 1.15, 1]
                    : heartBtn === "pulse" ? [1, 1.2, 0.95, 1.15, 1]
                    : heartBtn === "glow" ? [1, 1.3]
                    : 0.5,
                  filter: heartBtn === "glow" ? "blur(6px)" : "blur(0px)",
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: heartBtn === "heart"
                    ? { duration: 0.8, ease: "easeOut" }
                    : heartBtn === "pulse"
                      ? { duration: 1.2, times: [0, 0.25, 0.45, 0.7, 1], ease: "easeInOut" }
                      : { duration: 0.6, ease: "easeOut" },
                  filter: { duration: 0.6 },
                }}
              >
                <svg width="70" height="65" viewBox="0 0 70 65">
                  <defs>
                    <linearGradient id="btnHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF85C8" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#FF5C93" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M35 60 C35 60, 5 40, 5 22 C5 10, 15 2, 24 2 C28 2, 32 6, 35 12 C38 6, 42 2, 46 2 C55 2, 65 10, 65 22 C65 40, 35 60, 35 60Z"
                    fill="url(#btnHeartGrad)"
                  />
                </svg>
              </motion.div>

              {/* partículas que saem do coração ao dissolver */}
              {(heartBtn === "morph" || heartBtn === "button") && (
                <>
                  {Array.from({ length: 8 }, (_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    return (
                      <motion.span
                        key={`p-${i}`}
                        className="absolute text-pink-400/60 pointer-events-none"
                        style={{ fontSize: 10 }}
                        initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                        animate={{
                          x: Math.cos(angle) * 60,
                          y: Math.sin(angle) * 60,
                          opacity: 0,
                          scale: 0.3,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        ♡
                      </motion.span>
                    );
                  })}
                </>
              )}

              {/* botão pill */}
              <motion.button
                onClick={heartBtn === "button" ? onStart : undefined}
                className="relative flex items-center justify-center overflow-hidden"
                style={{ cursor: heartBtn === "button" ? "pointer" : "default" }}
                initial={{ width: 0, height: 0, borderRadius: "9999px", opacity: 0 }}
                animate={
                  heartBtn === "morph" || heartBtn === "button"
                    ? { width: 180, height: 52, borderRadius: "9999px", opacity: 1 }
                    : { width: 0, height: 0, borderRadius: "9999px", opacity: 0 }
                }
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileTap={heartBtn === "button" ? { scale: 0.95 } : undefined}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, rgba(255,133,200,0.15) 0%, rgba(255,92,147,0.1) 100%)",
                    border: "1px solid rgba(255,133,200,0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: heartBtn === "morph" || heartBtn === "button" ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                <motion.span
                  className="relative z-10 text-pink-200/90 font-medium text-[14px] tracking-wider"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: heartBtn === "button" ? 1 : 0,
                    y: heartBtn === "button" ? 0 : 6,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  começar
                </motion.span>
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
