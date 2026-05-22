"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ConfessionsSlideProps {
  confessions: string[];
}

export default function ConfessionsSlide({ confessions }: ConfessionsSlideProps) {
  const [phase, setPhase] = useState<"intro" | "list" | "all">("intro");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("list"), 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "list") return;
    if (index >= confessions.length) {
      const t = setTimeout(() => setPhase("all"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 3200);
    return () => clearTimeout(t);
  }, [phase, index, confessions.length]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
      {/* intro */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            className="flex flex-col items-center gap-4 max-w-[280px]"
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-pink-200/50 text-[20px] leading-relaxed text-center"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              tem umas coisas que eu nunca te falei...
            </motion.p>
            <motion.p
              className="text-pink-300/20 text-[13px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              mas tá na hora.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confissões uma por vez */}
      {phase === "list" && (
        <div className="h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {index < confessions.length && (
              <motion.p
                key={index}
                className="text-pink-50/70 text-[18px] leading-relaxed text-center max-w-[300px]"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {confessions[index]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* todas juntas no final */}
      {phase === "all" && (
        <motion.div
          className="flex flex-col gap-4 max-w-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {confessions.map((c, i) => (
            <motion.p
              key={i}
              className="text-pink-50/50 text-[13px] leading-relaxed text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {c}
            </motion.p>
          ))}
        </motion.div>
      )}
    </div>
  );
}
