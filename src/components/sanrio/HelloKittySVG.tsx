"use client";

import { motion } from "framer-motion";

interface HelloKittySVGProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function HelloKittySVG({ size = 60, className = "", animate = false }: HelloKittySVGProps) {
  return (
    <div className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* bow */}
        {animate ? (
          <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "72px 20px" }}
          >
            <ellipse cx="65" cy="18" rx="8" ry="6" fill="#FF85C8" />
            <ellipse cx="79" cy="18" rx="8" ry="6" fill="#FF85C8" />
            <circle cx="72" cy="18" r="3.5" fill="#FF5C93" />
          </motion.g>
        ) : (
          <g>
            <ellipse cx="65" cy="18" rx="8" ry="6" fill="#FF85C8" />
            <ellipse cx="79" cy="18" rx="8" ry="6" fill="#FF85C8" />
            <circle cx="72" cy="18" r="3.5" fill="#FF5C93" />
          </g>
        )}

        {/* face */}
        <ellipse cx="50" cy="55" rx="32" ry="30" fill="#FFFFFF" />

        {/* ears */}
        <polygon points="25,30 18,10 38,25" fill="#FFFFFF" />
        <polygon points="75,30 82,10 62,25" fill="#FFFFFF" />

        {/* eyes */}
        <ellipse cx="38" cy="52" rx="3.5" ry="4" fill="#1A1A1A" />
        <ellipse cx="62" cy="52" rx="3.5" ry="4" fill="#1A1A1A" />

        {/* nose */}
        <ellipse cx="50" cy="60" rx="3" ry="2.5" fill="#FFD700" />

        {/* whiskers */}
        <line x1="10" y1="50" x2="30" y2="54" stroke="#3D3D3D" strokeWidth="1.2" />
        <line x1="10" y1="58" x2="30" y2="58" stroke="#3D3D3D" strokeWidth="1.2" />
        <line x1="10" y1="66" x2="30" y2="62" stroke="#3D3D3D" strokeWidth="1.2" />
        <line x1="90" y1="50" x2="70" y2="54" stroke="#3D3D3D" strokeWidth="1.2" />
        <line x1="90" y1="58" x2="70" y2="58" stroke="#3D3D3D" strokeWidth="1.2" />
        <line x1="90" y1="66" x2="70" y2="62" stroke="#3D3D3D" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
