"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";

interface LoveEquationSlideProps {
  partnerName: string;
  recipientName: string;
}

interface TypedLine {
  text: string;
  speed: number; // ms per character
  pause: number; // ms pause after line
  color?: string;
  size?: number;
}

const solvingLines: TypedLine[] = [
  { text: "(x² + y² - 1)³ = x²y³", speed: 50, pause: 600, color: "rgba(255,200,225,0.8)", size: 15 },
  { text: "", speed: 0, pause: 300 },
  { text: "resolvendo para y...", speed: 40, pause: 500, color: "rgba(255,133,200,0.5)" },
  { text: "", speed: 0, pause: 200 },
  { text: "x = -1.20  →  y = ±0.000", speed: 15, pause: 80, color: "rgba(255,200,225,0.3)" },
  { text: "x = -1.00  →  y = ±0.947", speed: 15, pause: 80, color: "rgba(255,200,225,0.3)" },
  { text: "x = -0.80  →  y = ±1.098", speed: 15, pause: 80, color: "rgba(255,200,225,0.3)" },
  { text: "x = -0.50  →  y = ±1.189", speed: 12, pause: 60, color: "rgba(255,200,225,0.3)" },
  { text: "x = -0.20  →  y = ±1.053", speed: 12, pause: 60, color: "rgba(255,200,225,0.3)" },
  { text: "x =  0.00  →  y = ±1.000", speed: 12, pause: 60, color: "rgba(255,200,225,0.3)" },
  { text: "x =  0.20  →  y = ±1.053", speed: 10, pause: 50, color: "rgba(255,200,225,0.3)" },
  { text: "x =  0.50  →  y = ±1.189", speed: 10, pause: 50, color: "rgba(255,200,225,0.3)" },
  { text: "x =  0.80  →  y = ±1.098", speed: 10, pause: 50, color: "rgba(255,200,225,0.3)" },
  { text: "x =  1.00  →  y = ±0.947", speed: 10, pause: 50, color: "rgba(255,200,225,0.3)" },
  { text: "x =  1.20  →  y = ±0.000", speed: 10, pause: 50, color: "rgba(255,200,225,0.3)" },
  { text: "", speed: 0, pause: 400 },
  { text: "312 pontos calculados ✓", speed: 30, pause: 600, color: "rgba(255,133,200,0.6)" },
  { text: "", speed: 0, pause: 300 },
  { text: "plotando no plano cartesiano...", speed: 35, pause: 400, color: "rgba(255,133,200,0.5)" },
];

export default function LoveEquationSlide({ partnerName, recipientName }: LoveEquationSlideProps) {
  const [phase, setPhase] = useState<"question" | "tease" | "solving" | "plotting" | "result">("question");
  const [showButton, setShowButton] = useState(false);
  const [showRunButton, setShowRunButton] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [visibleLines, setVisibleLines] = useState<{ text: string; color?: string; size?: number }[]>([]);
  const [cursorChar, setCursorChar] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef(false);

  const pathData = useMemo(() => {
    const points: string[] = [];
    const steps = 300;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.sin(t) ** 3;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const sx = 120 + x * 6;
      const sy = 115 + y * 6;
      points.push(`${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return points.join(" ") + " Z";
  }, []);

  useEffect(() => {
    if (phase === "question") {
      const t = setTimeout(() => setShowButton(true), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // typing animation
  useEffect(() => {
    if (phase !== "solving") return;
    if (typingRef.current) return;
    typingRef.current = true;
    setShowCursor(true);

    let cancelled = false;

    async function typeAll() {
      for (let li = 0; li < solvingLines.length; li++) {
        if (cancelled) return;
        const line = solvingLines[li];

        if (line.text === "") {
          setVisibleLines((prev) => [...prev, { text: "", color: line.color, size: line.size }]);
          await wait(line.pause);
          continue;
        }

        // type char by char
        for (let ci = 0; ci <= line.text.length; ci++) {
          if (cancelled) return;
          const partial = line.text.slice(0, ci);
          setCursorChar(partial);

          // update visible lines: all completed + current partial
          setVisibleLines((prev) => {
            const completed = prev.filter((_, idx) => idx < countCompleted(li));
            return [...completed, { text: partial, color: line.color, size: line.size }];
          });

          if (ci < line.text.length) {
            await wait(line.speed);
          }
        }

        // line complete
        setVisibleLines((prev) => {
          const completed = prev.filter((_, idx) => idx < countCompleted(li));
          return [...completed, { text: line.text, color: line.color, size: line.size }];
        });

        await wait(line.pause);
      }

      // done typing → go to plot
      setShowCursor(false);
      await wait(500);
      if (!cancelled) setPhase("plotting");
    }

    function countCompleted(currentLineIndex: number): number {
      return currentLineIndex;
    }

    typeAll();
    return () => { cancelled = true; };
  }, [phase]);

  // auto scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // draw heart on plot
  useEffect(() => {
    if (phase !== "plotting") return;
    const el = pathRef.current;
    if (!el) return;

    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;

    requestAnimationFrame(() => {
      el.style.transition = "stroke-dashoffset 3s ease-in-out";
      el.style.strokeDashoffset = "0";
    });

    const t = setTimeout(() => {
      setDrawn(true);
      setTimeout(() => setPhase("result"), 1500);
    }, 3800);

    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "tease") {
      const t = setTimeout(() => setShowRunButton(true), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleDontKnow() {
    setShowButton(false);
    setPhase("tease");
  }

  function handleRun() {
    setShowRunButton(false);
    setPhase("solving");
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 text-center overflow-hidden">
      <motion.p
        className="absolute top-[10%] text-pink-300/20 text-[10px] tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        quiz do amor
      </motion.p>

      <AnimatePresence mode="wait">
        {/* pergunta */}
        {phase === "question" && (
          <motion.div
            key="question"
            className="flex flex-col items-center gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-pink-200/40 text-[13px] leading-relaxed max-w-[280px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              já que você odeia matemática e eu amo, resolve essa equação:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8, type: "spring", damping: 15 }}
            >
              <div
                className="px-6 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,133,200,0.1)",
                }}
              >
                <p className="text-[17px] text-pink-100/80 font-mono tracking-wide">
                  (x² + y² - 1)³ = x²y³
                </p>
              </div>
            </motion.div>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  onClick={handleDontKnow}
                  className="relative z-50 px-6 py-2.5 rounded-full text-[13px] text-pink-200/50 active:scale-95 transition-transform"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,133,200,0.12)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  não sei 🤔
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* tease — "eu sei q não meu bem" */}
        {phase === "tease" && (
          <motion.div
            key="tease"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="px-6 py-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,133,200,0.1)",
              }}
            >
              <p className="text-[17px] text-pink-100/80 font-mono tracking-wide">
                (x² + y² - 1)³ = x²y³
              </p>
            </div>

            <motion.p
              className="text-pink-200/50 text-[14px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              eu sei que não meu bem rs
            </motion.p>

            <motion.p
              className="text-pink-300/25 text-[12px] max-w-[250px] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              deixa eu resolver pra você
            </motion.p>

            <AnimatePresence>
              {showRunButton && (
                <motion.button
                  onClick={handleRun}
                  className="relative z-50 px-6 py-2.5 rounded-full text-[13px] text-pink-200/60 active:scale-95 transition-transform"
                  style={{
                    background: "rgba(255,133,200,0.08)",
                    border: "1px solid rgba(255,133,200,0.15)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  executar ▶
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* terminal resolvendo */}
        {phase === "solving" && (
          <motion.div
            key="solving"
            className="w-full max-w-[320px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(10,5,12,0.8)",
                border: "1px solid rgba(255,133,200,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* barra do terminal */}
              <div
                className="flex items-center gap-1.5 px-3 py-2"
                style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div className="w-[7px] h-[7px] rounded-full bg-red-400/40" />
                <div className="w-[7px] h-[7px] rounded-full bg-yellow-400/40" />
                <div className="w-[7px] h-[7px] rounded-full bg-green-400/40" />
                <span className="text-[9px] text-white/15 ml-2 font-mono">love-solver.py</span>
              </div>

              {/* conteúdo */}
              <div
                ref={scrollRef}
                className="px-3 py-3 font-mono overflow-y-auto"
                style={{ maxHeight: 280, minHeight: 180 }}
              >
                {visibleLines.map((line, i) => (
                  <div key={i} style={{ minHeight: line.text === "" ? 8 : undefined }}>
                    {line.text && (
                      <span
                        style={{
                          color: line.color || "rgba(255,200,225,0.4)",
                          fontSize: line.size || 11,
                          lineHeight: "1.8",
                        }}
                      >
                        {line.text}
                      </span>
                    )}
                  </div>
                ))}

                {/* cursor piscando */}
                {showCursor && (
                  <motion.span
                    className="inline-block w-[6px] h-[13px] ml-0.5 align-middle"
                    style={{ background: "rgba(255,133,200,0.6)" }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* plotando */}
        {phase === "plotting" && (
          <motion.div
            key="plotting"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-pink-300/25 text-[10px] tracking-[0.2em] uppercase font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              plotando...
            </motion.p>

            <svg width="240" height="240" viewBox="0 0 240 240">
              {/* eixos */}
              <motion.line
                x1="120" y1="10" x2="120" y2="230"
                stroke="rgba(255,200,225,0.08)" strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.line
                x1="10" y1="120" x2="230" y2="120"
                stroke="rgba(255,200,225,0.08)" strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              {/* grid */}
              {[40, 80, 160, 200].map((v) => (
                <g key={v}>
                  <line x1={v} y1="10" x2={v} y2="230" stroke="rgba(255,200,225,0.02)" strokeWidth="0.5" />
                  <line x1="10" y1={v} x2="230" y2={v} stroke="rgba(255,200,225,0.02)" strokeWidth="0.5" />
                </g>
              ))}

              {/* labels dos eixos */}
              <text x="232" y="118" fill="rgba(255,200,225,0.12)" fontSize="8" fontFamily="monospace">x</text>
              <text x="123" y="16" fill="rgba(255,200,225,0.12)" fontSize="8" fontFamily="monospace">y</text>

              {/* curva do coração */}
              <path
                ref={pathRef}
                d={pathData}
                fill="none"
                stroke="#FF85C8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* glow fill quando termina */}
              {drawn && (
                <motion.path
                  d={pathData}
                  fill="rgba(255,133,200,0.08)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              )}
            </svg>

            <motion.p
              className="text-pink-200/15 text-[10px] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              (x² + y² - 1)³ = x²y³
            </motion.p>
          </motion.div>
        )}

        {/* resultado */}
        {phase === "result" && (
          <motion.div
            key="result"
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", damping: 10 }}
            >
              <svg width="180" height="180" viewBox="0 0 240 240">
                <defs>
                  <linearGradient id="heartResultFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF85C8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF5C93" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="heartResultGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d={pathData}
                  fill="url(#heartResultFill)"
                  stroke="#FF85C8"
                  strokeWidth="1.5"
                  filter="url(#heartResultGlow)"
                />
              </svg>
            </motion.div>

            <motion.p
              className="text-pink-200/50 text-[15px] leading-relaxed max-w-[260px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              a resposta sempre foi um coração.
            </motion.p>

            <motion.p
              className="text-pink-300/20 text-[12px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              o nosso.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
