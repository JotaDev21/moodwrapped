"use client";

import { motion } from "framer-motion";
import { SongTheme } from "@/data/types";
import { formatDuration } from "@/lib/utils";

interface FakePlayerProps {
  song: SongTheme;
}

export default function FakePlayer({ song }: FakePlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 w-full max-w-[280px] mx-auto"
    >
      <motion.div
        className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-2xl shadow-pink-900/20"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-pink-950/80 to-rose-950/60 flex items-center justify-center">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🎀
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        className="text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className="text-base font-bold text-pink-50/90">{song.title}</h3>
        <p className="text-[13px] text-pink-200/30 mt-0.5">{song.artist}</p>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="w-full h-[2px] rounded-full bg-pink-200/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-pink-300/50"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: song.durationSeconds, ease: "linear", delay: 1.2 }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-pink-200/15 tabular-nums">
          <span>0:00</span>
          <span>{formatDuration(song.durationSeconds)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
