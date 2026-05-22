"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/animations";

interface BadgeProps {
  label: string;
  color: string;
  icon?: string;
}

export default function Badge({ label, color, icon }: BadgeProps) {
  return (
    <motion.span
      variants={staggerItem}
      className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium"
      style={{
        backgroundColor: `${color}12`,
        color: color,
        border: `1px solid ${color}25`,
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.span>
  );
}
