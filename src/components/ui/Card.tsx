"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { staggerItem } from "@/lib/animations";

interface CardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  variants?: Variants;
}

export default function Card({
  children,
  className = "",
  accentColor,
  variants = staggerItem,
}: CardProps) {
  return (
    <motion.div
      variants={variants}
      className={`relative rounded-3xl bg-pink-200/[0.03] border border-pink-300/[0.08] p-5 backdrop-blur-sm ${className}`}
      style={
        accentColor
          ? { borderColor: `${accentColor}25`, boxShadow: `0 0 30px ${accentColor}0a` }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
