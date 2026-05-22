"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface WhatYouAreSlideProps {
  phrases: string[];
}

const stars = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

function PhraseTypewriter({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const calledDone = useRef(false);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        const jitter = Math.random() * 18 - 9;
        timer = setTimeout(tick, 40 + jitter);
      } else {
        setDone(true);
      }
    }
    timer = setTimeout(tick, 40);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (done && !calledDone.current) {
      calledDone.current = true;
      const t = setTimeout(onDone, 2500);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <p className="text-pink-50/80 text-[17px] leading-[1.8] text-center max-w-[300px] font-light">
      {displayed}
      <motion.span
        className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle bg-pink-300/50"
        animate={done ? { opacity: 0 } : { opacity: [1, 0, 1] }}
        transition={
          done
            ? { duration: 0.3 }
            : { duration: 0.7, repeat: Infinity, ease: "linear" }
        }
      />
    </p>
  );
}

export default function WhatYouAreSlide({ phrases }: WhatYouAreSlideProps) {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIndex(0), 2800);
    return () => clearTimeout(t);
  }, []);

  function handlePhraseDone() {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setVisible(true);
    }, 700);
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[120px]"
        animate={{
          opacity: [0.03, 0.06, 0.03],
          backgroundColor: ["#FF85C8", "#DDA0DD", "#FF85C8"],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {index === -1 && (
          <motion.p
            key="intro"
            className="text-pink-300/30 text-[13px] tracking-[0.2em] uppercase text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            o que você é pra mim?
          </motion.p>
        )}

        {index >= 0 && index < phrases.length && visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PhraseTypewriter text={phrases[index]} onDone={handlePhraseDone} />
          </motion.div>
        )}

        {index >= phrases.length && (
          <motion.div
            key="end"
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.span
              className="text-pink-300/15 text-[40px]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ∞
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
