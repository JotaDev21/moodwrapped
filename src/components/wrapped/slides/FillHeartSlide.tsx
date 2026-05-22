"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useCallback } from "react";

const MAX_PUMPS = 12;

const floatDirections = Array.from({ length: MAX_PUMPS }, (_, i) => ({
  x: -80 + Math.random() * 160,
  y: -120 - Math.random() * 80,
  rotate: -25 + Math.random() * 50,
  size: 11 + Math.random() * 4,
}));

const burstParticles = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
  const dist = 120 + Math.random() * 280;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 60,
    size: 10 + Math.random() * 20,
    dur: 1 + Math.random() * 0.6,
    rotate: Math.random() * 540 - 270,
    emoji: ["💖", "💗", "💕", "🩷", "♡", "❤️", "🎀", "✨"][i % 8],
  };
});

export default function FillHeartSlide() {
  const [pumps, setPumps] = useState(0);
  const [floats, setFloats] = useState<number[]>([]);
  const [exploded, setExploded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [pumping, setPumping] = useState(false);
  const heartControls = useAnimation();

  const fill = Math.min(pumps / MAX_PUMPS, 1);
  const glowIntensity = fill * 0.4;

  const handlePump = useCallback(() => {
    if (exploded || pumping) return;
    setPumping(true);

    const next = pumps + 1;
    setPumps(next);
    setFloats((prev) => [...prev, Date.now()]);

    heartControls.start({
      scale: [1 + fill * 0.2, 1 + (next / MAX_PUMPS) * 0.2 + 0.12, 1 + (next / MAX_PUMPS) * 0.2],
      transition: { duration: 0.4, times: [0, 0.3, 1], ease: "easeOut" },
    });

    setTimeout(() => setPumping(false), 300);

    if (next >= MAX_PUMPS) {
      setTimeout(() => {
        heartControls.start({
          scale: [1.45, 1.5, 1.55, 0],
          opacity: [1, 1, 1, 0],
          transition: { duration: 0.6, times: [0, 0.3, 0.6, 1] },
        });
        setTimeout(() => {
          setExploded(true);
          setTimeout(() => setShowMessage(true), 1000);
        }, 500);
      }, 500);
    }
  }, [pumps, exploded, pumping, fill, heartControls]);

  const fillY = 155 - 145 * fill;

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {!exploded ? (
          <motion.div
            key="filling"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-pink-300/20 text-[10px] tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              enche meu coração
            </motion.p>

            <div className="relative flex flex-col items-center">
              {/* floating "eu te amo" */}
              <AnimatePresence>
                {floats.map((key, idx) => {
                  const dir = floatDirections[idx % floatDirections.length];
                  return (
                    <motion.span
                      key={key}
                      className="absolute pointer-events-none font-medium z-10"
                      style={{ fontSize: dir.size, color: "rgba(255,180,210,0.8)", top: "30%" }}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.3, rotate: 0 }}
                      animate={{
                        opacity: [1, 0.8, 0],
                        x: dir.x,
                        y: dir.y,
                        scale: 1,
                        rotate: dir.rotate,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                    >
                      eu te amo
                    </motion.span>
                  );
                })}
              </AnimatePresence>

              {/* glow behind heart */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 220,
                  height: 220,
                  top: -15,
                  background: `radial-gradient(circle, rgba(255,133,200,${glowIntensity}) 0%, transparent 70%)`,
                }}
                animate={{ scale: 1 + fill * 0.3 }}
                transition={{ duration: 0.4 }}
              />

              {/* heart */}
              <motion.div animate={heartControls} initial={{ scale: 1 }}>
                <svg width="180" height="170" viewBox="0 0 180 170">
                  <defs>
                    <clipPath id="fhClip">
                      <path d="M90 155 C90 155, 15 105, 15 60 C15 30, 40 12, 60 12 C72 12, 82 20, 90 32 C98 20, 108 12, 120 12 C140 12, 165 30, 165 60 C165 105, 90 155, 90 155Z" />
                    </clipPath>
                    <linearGradient id="fhBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FF85C8" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="fhFill" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#FF5C93" stopOpacity="0.6" />
                      <stop offset="60%" stopColor="#FF85C8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FFB6D9" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="fhShine" cx="35%" cy="25%" r="40%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                    <filter id="fhGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* heart bg */}
                  <path
                    d="M90 155 C90 155, 15 105, 15 60 C15 30, 40 12, 60 12 C72 12, 82 20, 90 32 C98 20, 108 12, 120 12 C140 12, 165 30, 165 60 C165 105, 90 155, 90 155Z"
                    fill="rgba(255,133,200,0.04)"
                    stroke="url(#fhBorder)"
                    strokeWidth="1.5"
                    filter="url(#fhGlow)"
                  />

                  {/* liquid fill */}
                  <g clipPath="url(#fhClip)">
                    <rect x="0" y={fillY} width="180" height={170 - fillY + 5} fill="url(#fhFill)">
                      <animate attributeName="y" from={fillY + 3} to={fillY} dur="0.4s" fill="freeze" />
                    </rect>

                    {/* wave */}
                    <motion.path
                      fill="url(#fhFill)"
                      animate={{
                        d: [
                          `M0 ${fillY} Q30 ${fillY - 8} 60 ${fillY} T120 ${fillY} T180 ${fillY} V180 H0Z`,
                          `M0 ${fillY} Q30 ${fillY + 5} 60 ${fillY} T120 ${fillY} T180 ${fillY} V180 H0Z`,
                          `M0 ${fillY} Q30 ${fillY - 8} 60 ${fillY} T120 ${fillY} T180 ${fillY} V180 H0Z`,
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* tiny "eu te amo" inside */}
                    {Array.from({ length: Math.min(pumps, MAX_PUMPS) }, (_, i) => {
                      const tx = 25 + ((i * 47) % 130);
                      const ty = 155 - ((i + 1) / MAX_PUMPS) * 120;
                      return (
                        <text
                          key={i}
                          x={tx}
                          y={ty}
                          fill="rgba(255,220,235,0.12)"
                          fontSize="7"
                          fontFamily="sans-serif"
                          transform={`rotate(${-10 + (i % 3) * 10}, ${tx}, ${ty})`}
                        >
                          eu te amo
                        </text>
                      );
                    })}
                  </g>

                  {/* glass reflection */}
                  <path
                    d="M90 155 C90 155, 15 105, 15 60 C15 30, 40 12, 60 12 C72 12, 82 20, 90 32 C98 20, 108 12, 120 12 C140 12, 165 30, 165 60 C165 105, 90 155, 90 155Z"
                    fill="url(#fhShine)"
                  />
                </svg>
              </motion.div>

              {/* tube */}
              <div className="flex flex-col items-center -mt-1">
                <div
                  style={{
                    width: 5,
                    height: 35,
                    background: "linear-gradient(to right, rgba(255,180,220,0.06), rgba(255,180,220,0.15), rgba(255,180,220,0.06))",
                    borderRadius: 3,
                  }}
                >
                  {/* liquid in tube on pump */}
                  {pumping && (
                    <motion.div
                      className="w-full rounded-full"
                      style={{ background: "rgba(255,133,200,0.3)" }}
                      initial={{ height: 0, y: 35 }}
                      animate={{ height: 35, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </div>

                {/* pump */}
                <motion.button
                  onClick={handlePump}
                  className="relative z-50 mt-1"
                  whileTap={{ y: 5, scale: 0.92 }}
                  transition={{ type: "spring", damping: 15, stiffness: 400 }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 32,
                      borderRadius: 10,
                      background: `linear-gradient(to bottom, rgba(255,133,200,${0.1 + fill * 0.15}), rgba(255,92,147,${0.08 + fill * 0.12}))`,
                      border: `1px solid rgba(255,133,200,${0.15 + fill * 0.15})`,
                      boxShadow: `0 4px 16px rgba(255,133,200,${0.05 + fill * 0.1})`,
                    }}
                  >
                    <span className="text-pink-200/60 text-[18px] leading-none select-none">♡</span>
                  </div>
                  <div
                    style={{
                      width: 24,
                      height: 6,
                      borderRadius: "0 0 4px 4px",
                      background: "rgba(255,133,200,0.08)",
                      margin: "0 auto",
                    }}
                  />
                </motion.button>
              </div>

              {/* counter */}
              <motion.p
                className="text-pink-300/15 text-[10px] mt-3 tabular-nums font-mono"
                animate={{ opacity: pumps > 0 ? 1 : 0 }}
              >
                {pumps}/{MAX_PUMPS}
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="exploded"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* burst */}
            {burstParticles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute pointer-events-none"
                style={{ fontSize: p.size }}
                initial={{ x: 0, y: -20, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 1, 0],
                  scale: [1, 1.2, 0.2],
                  rotate: p.rotate,
                }}
                transition={{ duration: p.dur, ease: [0.2, 0.8, 0.3, 1] }}
              >
                {p.emoji}
              </motion.span>
            ))}

            {/* flash */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,133,200,0.3) 0%, transparent 60%)" }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* message */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p
                    className="text-pink-100/70 text-[20px] font-display font-bold leading-snug text-center max-w-[280px]"
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                  >
                    ainda duvida do meu amor por ti?
                  </motion.p>

                  <motion.p
                    className="text-pink-200/40 text-[15px] text-center max-w-[260px]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  >
                    eu amo você completamente.
                  </motion.p>

                  <motion.span
                    className="text-[36px]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [0, 1.4, 1] }}
                    transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
                  >
                    🩷
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
