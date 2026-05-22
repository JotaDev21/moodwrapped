"use client";

import { motion } from "framer-motion";
import { Quote } from "@/data/types";

interface QuoteHighlightSlideProps {
  quote: Quote;
}

export default function QuoteHighlightSlide({ quote }: QuoteHighlightSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-10 text-center">
      <motion.span
        className="text-pink-300/10 text-7xl font-display leading-none mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        &ldquo;
      </motion.span>

      <motion.p
        className="font-display text-2xl text-pink-50/90 leading-relaxed max-w-[280px]"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        {quote.text}
      </motion.p>

      {quote.context && (
        <motion.p
          className="text-pink-200/20 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {quote.context}
        </motion.p>
      )}
    </div>
  );
}
