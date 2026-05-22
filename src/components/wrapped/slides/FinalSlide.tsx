"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FinalMessage } from "@/data/types";

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
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      {/* envelope lacre */}
      <motion.div
        className="w-8 h-[1px] bg-pink-300/20 mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />

      {/* carta */}
      <motion.div
        className="w-full max-w-[300px] rounded-2xl px-7 pt-10 pb-8 flex flex-col gap-5 text-left relative"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,133,200,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
      >
        {/* lacre de coração */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(220,60,100,0.9) 0%, rgba(180,30,70,0.85) 100%)",
            boxShadow: "0 2px 12px rgba(220,60,100,0.5), 0 0 0 2px rgba(255,133,200,0.15)",
          }}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.0, duration: 0.5, type: "spring", damping: 10, stiffness: 200 }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>♥</span>
        </motion.div>
        {/* saudação */}
        <motion.p
          className="text-pink-200/60 text-[14px] italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          Thayla,
        </motion.p>

        {/* corpo */}
        <motion.p
          className="text-pink-50/75 text-[14px] leading-[1.85] font-light"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
        >
          {message.text}
        </motion.p>

        {/* separador */}
        <motion.div
          className="w-8 h-[1px] bg-pink-300/15"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        />

        {/* assinatura */}
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          <p className="text-pink-200/30 text-[12px]">com carinho,</p>
          <p className="text-pink-200/50 text-[15px] italic">— Jota</p>
        </motion.div>
      </motion.div>

      {/* lacre embaixo */}
      <motion.div
        className="w-8 h-[1px] bg-pink-300/20 mt-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 4.2, duration: 0.8 }}
      />

      <motion.p
        className="absolute bottom-24 text-[10px] text-pink-200/10 tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8, duration: 1.5 }}
      >
        {time}
      </motion.p>

      <motion.button
        onClick={onRestart}
        className="absolute bottom-10 px-5 py-2.5 rounded-full border border-pink-200/8 text-pink-200/30 text-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.2, duration: 1 }}
        whileTap={{ scale: 0.97 }}
      >
        rever
      </motion.button>
    </div>
  );
}
