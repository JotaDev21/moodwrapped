"use client";

import { motion } from "framer-motion";
import { LetterText } from "@/data/types";

interface LetterSlideProps {
  letter: LetterText;
}

export default function LetterSlide({ letter }: LetterSlideProps) {
  const words = letter.text.split(" ");

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <p className="text-[15px] leading-[1.9] text-center max-w-[320px]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block text-pink-50/70 mr-[0.3em]"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
