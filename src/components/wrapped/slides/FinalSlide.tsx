"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FinalMessage } from "@/data/types";
import RevealText from "@/components/ui/RevealText";
import PompompurinSVG from "@/components/sanrio/PompompurinSVG";
import HelloKittySVG from "@/components/sanrio/HelloKittySVG";

interface FinalSlideProps {
  message: FinalMessage;
  onRestart: () => void;
}

export default function FinalSlide({ message, onRestart }: FinalSlideProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-10 text-center">
      <motion.div
        className="flex items-center gap-3 mb-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PompompurinSVG size={36} />
        </motion.div>
        <motion.span
          className="text-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          🎀
        </motion.span>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <HelloKittySVG size={36} />
        </motion.div>
      </motion.div>

      <div className="max-w-[280px]">
        <RevealText
          text={message.text}
          className="text-[22px] sm:text-[26px] font-display font-bold text-pink-50/90 leading-snug"
          delay={1}
          wordInterval={0.12}
          lastWordExtraDelay={1.5}
        />

        {message.signature && (
          <motion.p
            className="text-pink-200/15 text-[13px] mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1.2 }}
          >
            {message.signature}
          </motion.p>
        )}
      </div>

      <motion.p
        className="absolute bottom-24 text-[10px] text-pink-200/10 tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 1.5 }}
      >
        {time}
      </motion.p>

      <motion.button
        onClick={onRestart}
        className="absolute bottom-10 px-5 py-2.5 rounded-full border border-pink-200/8 text-pink-200/30 text-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
        whileTap={{ scale: 0.97 }}
      >
        rever
      </motion.button>
    </div>
  );
}
