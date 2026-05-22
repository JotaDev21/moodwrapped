"use client";

import { motion } from "framer-motion";
import { PersonalList } from "@/data/types";

interface PersonalListSlideProps {
  list: PersonalList;
}

const cardColors = [
  { bg: "rgba(255,133,200,0.06)", border: "rgba(255,133,200,0.12)", glow: "rgba(255,133,200,0.08)" },
  { bg: "rgba(221,160,221,0.05)", border: "rgba(221,160,221,0.10)", glow: "rgba(221,160,221,0.06)" },
  { bg: "rgba(255,182,209,0.05)", border: "rgba(255,182,209,0.10)", glow: "rgba(255,182,209,0.06)" },
];

export default function PersonalListSlide({ list }: PersonalListSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-5">
      {/* header */}
      <motion.div
        className="flex flex-col items-center text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.span
          className="text-[28px] mb-2"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {list.emoji}
        </motion.span>
        <p className="text-pink-300/25 text-[10px] tracking-[0.35em] uppercase">
          {list.title}
        </p>
        <motion.div
          className="w-8 h-[1px] mt-3 rounded-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,133,200,0.2), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>

      {/* cards */}
      <div className="flex flex-col gap-3">
        {list.items.map((item, i) => {
          const color = cardColors[i % cardColors.length];
          return (
            <motion.div
              key={i}
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.25, duration: 0.7, ease: "easeOut" }}
            >
              <div
                className="relative p-4 rounded-[18px]"
                style={{
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                  boxShadow: `0 8px 24px ${color.glow}, inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
              >
                {/* decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${color.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* emoji watermark */}
                <motion.span
                  className="absolute bottom-2 right-3 text-[32px] select-none pointer-events-none"
                  style={{ opacity: 0.04 }}
                  animate={{ rotate: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  {list.emoji}
                </motion.span>

                {/* number badge */}
                <div
                  className="absolute top-3 left-4 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  style={{
                    background: color.border,
                    fontSize: 9,
                    color: "rgba(255,230,240,0.6)",
                    fontWeight: 600,
                  }}
                >
                  {i + 1}
                </div>

                {/* text */}
                <p
                  className="relative z-10 text-pink-50/60 text-[13px] leading-[1.75] pl-7"
                  style={{ fontWeight: 350 }}
                >
                  {item}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
