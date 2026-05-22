"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

interface NavigationControlsProps {
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
}

export default function NavigationControls({
  onNext,
  onPrev,
  enabled = true,
}: NavigationControlsProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  useSwipeGesture({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    enabled,
  });

  useEffect(() => {
    if (!enabled) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onPrev();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, onNext, onPrev]);

  const handleTap = useCallback(
    (side: "left" | "right") => {
      if (!enabled) return;
      if (side === "left") onPrev();
      else onNext();
    },
    [enabled, onNext, onPrev]
  );

  if (!enabled) return null;

  return (
    <>
      {/* zona esquerda — voltar */}
      <div
        className="fixed top-0 left-0 bottom-0 z-20"
        style={{ width: "33.33%" }}
        onClick={() => handleTap("left")}
      />
      {/* zona direita — avançar */}
      <div
        className="fixed top-0 right-0 bottom-0 z-20"
        style={{ width: "33.33%" }}
        onClick={() => handleTap("right")}
      />

      {/* ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.id}
            className="fixed rounded-full bg-pink-300/[0.06] pointer-events-none z-20"
            style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
