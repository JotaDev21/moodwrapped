"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { SongTheme } from "@/data/types";
import { formatDuration } from "@/lib/utils";
import { getMusicTime, isMusicPlaying, pauseMusic, playMusic, seekMusic } from "@/lib/audio";
import PompompurinSVG from "@/components/sanrio/PompompurinSVG";

interface MusicSlideProps {
  song: SongTheme;
}

export default function MusicSlide({ song }: MusicSlideProps) {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef<number | null>(null);

  const sync = useCallback(() => {
    setElapsed(getMusicTime());
    setPlaying(isMusicPlaying());
    rafRef.current = requestAnimationFrame(sync);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(sync);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sync]);

  function togglePlay() {
    if (isMusicPlaying()) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function skipBack() {
    seekMusic(getMusicTime() - 15);
  }

  function skipForward() {
    seekMusic(getMusicTime() + 15);
  }

  const duration = song.durationSeconds;
  const remaining = Math.max(0, duration - elapsed);
  const progress = duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full px-5">
      <motion.div
        className="w-full max-w-[320px] rounded-3xl bg-gradient-to-b from-pink-950/90 to-rose-900/60 p-5 pb-6 shadow-lg shadow-pink-950/30"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
      >
        {/* capa */}
        <div
          className="w-full aspect-square rounded-2xl bg-gradient-to-br from-pink-900/80 via-rose-950 to-pink-950 flex items-center justify-center pointer-events-none"
          style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
        >
          <PompompurinSVG size={140} />
        </div>

        {/* titulo + artista */}
        <div className="flex items-start justify-between mt-5 pointer-events-none">
          <div>
            <h3 className="text-[18px] font-bold text-white leading-tight">{song.title}</h3>
            <p className="text-[15px] text-pink-200/50 mt-0.5">{song.artist}</p>
          </div>
          <span className="text-pink-300/25 text-lg mt-1">♡</span>
        </div>

        {/* barra de progresso */}
        <div className="mt-5 pointer-events-none">
          <div className="relative w-full h-[3px] rounded-full bg-white/[0.1]">
            <div
              className="h-full rounded-full bg-white/40"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-white/80 shadow-sm"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-white/30 tabular-nums font-mono">
            <span>{formatDuration(Math.floor(elapsed))}</span>
            <span>-{formatDuration(Math.floor(remaining))}</span>
          </div>
        </div>

        {/* controles */}
        <div className="flex items-center justify-center gap-10 mt-4">
          <button onClick={skipBack} className="active:scale-90 active:opacity-60 transition-all p-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="opacity-60">
              <path d="M12.5 3C7.81 3 4 6.81 4 11.5H2L5 14.5L8 11.5H6C6 7.91 8.91 5 12.5 5C16.09 5 19 7.91 19 11.5C19 15.09 16.09 18 12.5 18C10.71 18 9.1 17.26 7.94 16.1L6.52 17.52C8.04 19.04 10.15 20 12.5 20C17.19 20 21 16.19 21 11.5C21 6.81 17.19 3 12.5 3Z" />
              <text x="10" y="13.5" fontSize="5.5" fontWeight="bold" fill="white" textAnchor="middle">15</text>
            </svg>
          </button>

          <button onClick={togglePlay} className="active:scale-90 active:opacity-60 transition-all p-2">
            {playing ? (
              <svg width="46" height="46" viewBox="0 0 24 24" fill="white" className="opacity-85">
                <rect x="6" y="4" width="4" height="16" rx="1.2" />
                <rect x="14" y="4" width="4" height="16" rx="1.2" />
              </svg>
            ) : (
              <svg width="46" height="46" viewBox="0 0 24 24" fill="white" className="opacity-85">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
            )}
          </button>

          <button onClick={skipForward} className="active:scale-90 active:opacity-60 transition-all p-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="opacity-60">
              <path d="M11.5 3C16.19 3 20 6.81 20 11.5H22L19 14.5L16 11.5H18C18 7.91 15.09 5 11.5 5C7.91 5 5 7.91 5 11.5C5 15.09 7.91 18 11.5 18C13.29 18 14.9 17.26 16.06 16.1L17.48 17.52C15.96 19.04 13.85 20 11.5 20C6.81 20 3 16.19 3 11.5C3 6.81 6.81 3 11.5 3Z" />
              <text x="14" y="13.5" fontSize="5.5" fontWeight="bold" fill="white" textAnchor="middle">15</text>
            </svg>
          </button>
        </div>

        {/* volume — visual */}
        <div className="flex items-center gap-2.5 mt-5 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-20 shrink-0">
            <path d="M7 9V15H11L16 20V4L11 9H7Z" />
          </svg>
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-white/20 w-[60%]" />
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-20 shrink-0">
            <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" />
          </svg>
        </div>
      </motion.div>

      {/* frase com doces e pompompurin */}
      <motion.div
        className="relative mt-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {/* doces flutuando */}
        {["🍰", "🧁", "🍩", "🍬", "🍭", "🎀"].map((emoji, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const rx = 120 + (i % 2) * 20;
          const ry = 30 + (i % 2) * 10;
          return (
            <motion.span
              key={i}
              className="absolute text-[12px]"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [Math.cos(angle) * rx, Math.cos(angle + 0.5) * rx, Math.cos(angle + 1) * rx, Math.cos(angle) * rx],
                y: [Math.sin(angle) * ry, Math.sin(angle + 0.5) * ry - 4, Math.sin(angle + 1) * ry, Math.sin(angle) * ry],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          );
        })}

        {/* pompompurin pequeno */}
        <motion.div
          className="absolute"
          style={{ right: -16, top: -8 }}
          animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <PompompurinSVG size={22} />
        </motion.div>

        <p className="text-pink-200/30 text-[12px] text-center max-w-[260px] leading-relaxed italic">
          &ldquo;{song.reason}&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
