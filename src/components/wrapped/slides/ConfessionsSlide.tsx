"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface ConfessionsSlideProps {
  confessions: string[];
}

function useTypewriter(text: string, active: boolean, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    function tick() {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        // slight natural variation in speed
        const jitter = Math.random() * 20 - 10;
        timer = setTimeout(tick, speed + jitter);
      } else {
        setDone(true);
      }
    }
    let timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, active, speed]);

  return { displayed, done };
}

function ConfessionItem({
  text,
  onDone,
}: {
  text: string;
  onDone: () => void;
}) {
  const { displayed, done } = useTypewriter(text, true, 38);
  const calledDone = useRef(false);

  useEffect(() => {
    if (done && !calledDone.current) {
      calledDone.current = true;
      const t = setTimeout(onDone, 2200);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <div className="flex flex-col items-center gap-3 max-w-[300px] text-center">
      <motion.div
        className="w-4 h-[1px] bg-pink-300/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
      />
      <p className="text-pink-50/75 text-[17px] leading-[1.7] tracking-wide font-light">
        {displayed}
        <motion.span
          className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle bg-pink-300/60"
          animate={done ? { opacity: 0 } : { opacity: [1, 0, 1] }}
          transition={
            done
              ? { duration: 0.3 }
              : { duration: 0.7, repeat: Infinity, ease: "linear" }
          }
        />
      </p>
    </div>
  );
}

export default function ConfessionsSlide({ confessions }: ConfessionsSlideProps) {
  const [phase, setPhase] = useState<"intro" | "list" | "all">("intro");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("list"), 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleConfessionDone() {
    setVisible(false);
    setTimeout(() => {
      const next = index + 1;
      if (next >= confessions.length) {
        setPhase("all");
      } else {
        setIndex(next);
        setVisible(true);
      }
    }, 700);
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            className="flex flex-col items-center gap-4 max-w-[280px]"
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-pink-200/50 text-[20px] leading-relaxed text-center"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              tem umas coisas que eu nunca te falei...
            </motion.p>
            <motion.p
              className="text-pink-300/20 text-[13px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              mas tá na hora.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "list" && (
        <div className="flex items-center justify-center min-h-[120px]">
          <AnimatePresence mode="wait">
            {visible && index < confessions.length && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ConfessionItem
                  text={confessions[index]}
                  onDone={handleConfessionDone}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {phase === "all" && (
        <motion.div
          className="flex flex-col gap-4 max-w-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {confessions.map((c, i) => (
            <motion.p
              key={i}
              className="text-pink-50/40 text-[12px] leading-relaxed text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {c}
            </motion.p>
          ))}
        </motion.div>
      )}
    </div>
  );
}
