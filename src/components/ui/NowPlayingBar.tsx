"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { isMusicPlaying, pauseMusic, playMusic } from "@/lib/audio";

interface NowPlayingBarProps {
  title: string;
  artist: string;
  visible: boolean;
}

export default function NowPlayingBar({ title, artist, visible }: NowPlayingBarProps) {
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);

  const sync = useCallback(() => {
    setPlaying(isMusicPlaying());
    rafRef.current = requestAnimationFrame(sync);
  }, []);

  useEffect(() => {
    if (visible) {
      rafRef.current = requestAnimationFrame(sync);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, sync]);

  function toggle() {
    if (isMusicPlaying()) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  return (
    <motion.div
      className="fixed z-40 flex justify-center left-0 right-0"
      style={{ top: 22 }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: visible ? 0 : -40, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-2.5 py-1 rounded-full active:scale-95 transition-transform"
        style={{
          background: "#0a0a0a",
          boxShadow: "0 2px 12px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* barras de equalizer */}
        <div className="flex items-end gap-[1.5px] w-[10px] h-[10px] shrink-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{ backgroundColor: "#FF85C8" }}
              animate={
                playing
                  ? { height: ["2px", "10px", "4px", "8px", "2px"] }
                  : { height: "2px" }
              }
              transition={
                playing
                  ? {
                      duration: 0.7 + i * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>

        {/* titulo · artista */}
        <span className="text-[10px] text-white/70 truncate max-w-[140px] leading-none">
          {title}
          <span className="text-white/25"> · </span>
          {artist}
        </span>

        {/* play/pause icon */}
        {playing ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white" className="shrink-0 opacity-60">
            <rect x="1" y="0.5" width="2" height="7" rx="0.5" />
            <rect x="5" y="0.5" width="2" height="7" rx="0.5" />
          </svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="white" className="shrink-0 opacity-60">
            <path d="M2 0.5V7.5L7 4L2 0.5Z" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
