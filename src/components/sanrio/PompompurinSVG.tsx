"use client";

import { motion } from "framer-motion";

interface PompompurinSVGProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

function PompompurinIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* beret/hat */}
      <ellipse cx="50" cy="28" rx="28" ry="14" fill="#C8956C" />
      <ellipse cx="50" cy="24" rx="22" ry="10" fill="#E8B87A" />
      <circle cx="50" cy="16" r="4" fill="#C8956C" />

      {/* face */}
      <ellipse cx="50" cy="55" rx="30" ry="28" fill="#FFF3B0" />

      {/* ears */}
      <ellipse cx="26" cy="42" rx="8" ry="10" fill="#FFF3B0" />
      <ellipse cx="74" cy="42" rx="8" ry="10" fill="#FFF3B0" />

      {/* cheeks */}
      <circle cx="36" cy="60" r="6" fill="#FFB5C5" opacity="0.7" />
      <circle cx="64" cy="60" r="6" fill="#FFB5C5" opacity="0.7" />

      {/* eyes */}
      <circle cx="40" cy="52" r="3" fill="#3D2C1E" />
      <circle cx="60" cy="52" r="3" fill="#3D2C1E" />

      {/* nose */}
      <ellipse cx="50" cy="58" rx="2.5" ry="2" fill="#3D2C1E" />

      {/* mouth */}
      <path d="M46 63 Q50 67 54 63" stroke="#3D2C1E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function PompompurinSVG({ size = 60, className = "", animate = false }: PompompurinSVGProps) {
  if (animate) {
    return (
      <motion.div
        className={className}
        initial={{ y: -8 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <PompompurinIcon size={size} />
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <PompompurinIcon size={size} />
    </div>
  );
}
