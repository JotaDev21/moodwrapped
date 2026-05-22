"use client";

import { motion } from "framer-motion";
import { Quote } from "@/data/types";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface QuoteSlideProps {
  quotes: Quote[];
}

export default function QuoteSlide({ quotes }: QuoteSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        className="text-pink-300/25 text-[11px] tracking-[0.3em] uppercase mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        frases que ficaram
      </motion.p>

      <motion.div
        className="flex flex-col gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="relative p-5 rounded-2xl bg-pink-100/[0.02] border border-pink-200/[0.05] overflow-hidden"
          >
            <span className="absolute top-1 left-3 text-7xl text-pink-400/10 font-display leading-none select-none pointer-events-none">
              &ldquo;
            </span>
            <p className={`relative z-10 text-pink-50/70 leading-relaxed ${i === 0 ? "text-[17px]" : "text-[13px]"}`}>
              {quote.text}
            </p>
            {quote.context && (
              <p className="relative z-10 text-pink-200/20 text-xs mt-2">{quote.context}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
