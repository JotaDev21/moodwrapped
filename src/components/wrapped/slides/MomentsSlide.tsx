"use client";

import { motion } from "framer-motion";
import { MemoryMoment } from "@/data/types";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface MomentsSlideProps {
  moments: MemoryMoment[];
}

export default function MomentsSlide({ moments }: MomentsSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        className="text-pink-300/25 text-[11px] tracking-[0.3em] uppercase mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        os que ficaram
      </motion.p>

      <motion.div
        className="relative flex flex-col gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* timeline line */}
        <div className="absolute left-[22px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-pink-400/30 to-transparent" />

        {moments.map((moment) => (
          <motion.div
            key={moment.rank}
            variants={staggerItem}
            className="relative flex items-center gap-4 p-4 rounded-2xl bg-pink-100/[0.02] border border-pink-200/[0.05]"
          >
            <span className="text-xl font-bold text-pink-400/50 w-7 text-center shrink-0 font-display relative z-10">
              {moment.rank}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-pink-50/80 text-[13px] font-semibold">{moment.title}</h3>
              {moment.description && (
                <p className="text-pink-200/25 text-[11px] mt-0.5">{moment.description}</p>
              )}
            </div>
            {moment.date && (
              <span className="text-[9px] text-pink-200/15 shrink-0">{moment.date}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
