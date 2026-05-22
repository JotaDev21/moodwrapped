"use client";

import { motion } from "framer-motion";
import { slideAtmosphere } from "@/styles/design-tokens";

interface AnimatedBackgroundProps {
  slideIndex: number;
}

const floatingElements = [
  { char: "✦", size: 10, left: "12%", top: "18%", duration: 8, delay: 0, opacity: 0.08 },
  { char: "♡", size: 12, left: "78%", top: "25%", duration: 10, delay: 1.5, opacity: 0.06 },
  { char: "✦", size: 8, left: "25%", top: "72%", duration: 9, delay: 0.8, opacity: 0.1 },
  { char: "♡", size: 14, left: "85%", top: "65%", duration: 11, delay: 2, opacity: 0.07 },
  { char: "✦", size: 9, left: "55%", top: "85%", duration: 7, delay: 0.3, opacity: 0.12 },
  { char: "♡", size: 11, left: "40%", top: "10%", duration: 12, delay: 1, opacity: 0.09 },
];

export default function AnimatedBackground({ slideIndex }: AnimatedBackgroundProps) {
  const atm = slideAtmosphere[slideIndex] || slideAtmosphere[0];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse at ${atm.position}, ${atm.color} 0%, #0A0A0A 65%)`,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ top: "20%", left: "10%" }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -20, 10, 0],
          backgroundColor: "#FF69B4",
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 20, repeat: Infinity, ease: "linear" },
          backgroundColor: { duration: 2 },
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[150px] opacity-[0.025]"
        style={{ bottom: "20%", right: "10%" }}
        animate={{
          x: [0, -15, 10, 0],
          y: [0, 15, -10, 0],
          backgroundColor: "#FF5C93",
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "linear" },
          y: { duration: 18, repeat: Infinity, ease: "linear" },
        }}
      />

      {floatingElements.map((el, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300 select-none pointer-events-none"
          style={{
            left: el.left,
            top: el.top,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 5, -5, 0],
            opacity: [el.opacity, el.opacity * 1.3, el.opacity],
          }}
          transition={{
            y: { duration: el.duration, repeat: Infinity, ease: "easeInOut", delay: el.delay },
            x: { duration: el.duration * 1.3, repeat: Infinity, ease: "easeInOut", delay: el.delay },
            opacity: { duration: el.duration, repeat: Infinity, ease: "easeInOut", delay: el.delay },
          }}
        >
          {el.char}
        </motion.span>
      ))}
    </div>
  );
}
