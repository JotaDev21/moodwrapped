"use client";

import { motion } from "framer-motion";
import { EmotionStat } from "@/data/types";

interface EmotionSlideProps {
  emotions: EmotionStat[];
}

const layouts = [
  { x: "48%", y: "18%", size: 110 },
  { x: "18%", y: "38%", size: 95 },
  { x: "72%", y: "35%", size: 100 },
  { x: "35%", y: "58%", size: 90 },
  { x: "65%", y: "62%", size: 115 },
];

const drifts = [
  { dx: [0, 6, -4, 0], dy: [0, -8, 4, 0], dur: 9 },
  { dx: [0, -5, 7, 0], dy: [0, 5, -6, 0], dur: 11 },
  { dx: [0, 8, -3, 0], dy: [0, -5, 7, 0], dur: 10 },
  { dx: [0, -6, 4, 0], dy: [0, 7, -5, 0], dur: 12 },
  { dx: [0, 5, -7, 0], dy: [0, -6, 8, 0], dur: 8 },
];

export default function EmotionSlide({ emotions }: EmotionSlideProps) {
  const sorted = [...emotions].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 overflow-hidden">
      <motion.p
        className="absolute top-[10%] left-6 text-pink-300/25 text-[11px] tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        o que vc me faz sentir
      </motion.p>

      {sorted.map((emotion, i) => {
        const layout = layouts[i];
        const drift = drifts[i];
        const scale = layout.size / 100;

        return (
          <motion.div
            key={emotion.name}
            className="absolute flex flex-col items-center justify-center rounded-full"
            style={{
              left: layout.x,
              top: layout.y,
              width: layout.size,
              height: layout.size,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: drift.dx,
              y: drift.dy,
            }}
            transition={{
              opacity: { delay: 0.5 + i * 0.2, duration: 0.8 },
              scale: { delay: 0.5 + i * 0.2, duration: 0.8, type: "spring", damping: 12 },
              x: { duration: drift.dur, repeat: Infinity, ease: "easeInOut" },
              y: { duration: drift.dur, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-20"
              style={{ backgroundColor: emotion.color }}
            />

            {/* glass bubble */}
            <div
              className="relative w-full h-full rounded-full flex flex-col items-center justify-center border border-white/[0.08]"
              style={{
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`,
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.06), 0 4px 20px ${emotion.color}15`,
              }}
            >
              {/* highlight */}
              <div
                className="absolute rounded-full opacity-40"
                style={{
                  width: "40%",
                  height: "25%",
                  top: "15%",
                  left: "20%",
                  background: "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 80%)",
                }}
              />

              <span className="text-[11px] text-white/80 font-medium">{emotion.name}</span>
              <span
                className="text-[20px] font-bold mt-0.5"
                style={{ color: emotion.color, fontSize: 18 * scale }}
              >
                {emotion.percentage}%
              </span>
              <span className="text-lg mt-0.5">{emotion.icon}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
