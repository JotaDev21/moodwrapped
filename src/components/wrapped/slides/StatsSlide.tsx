"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { StatItem } from "@/data/types";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { daysSince } from "@/lib/utils";
import CountUpComponent from "@/components/ui/CountUp";

interface StatsSlideProps {
  stats: StatItem[];
}

function LiveTimer({ since }: { since: string }) {
  const [elapsed, setElapsed] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const origin = new Date(since + "T21:57:00").getTime();

    function tick() {
      const diff = Math.max(0, Date.now() - origin);
      const s = Math.floor(diff / 1000) % 60;
      const m = Math.floor(diff / 60000) % 60;
      const h = Math.floor(diff / 3600000) % 24;
      const d = Math.floor(diff / 86400000);
      setElapsed({ d, h, m, s });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [since]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[32px] font-bold text-pink-50 tabular-nums">
        {elapsed.d}
      </span>
      <span className="text-[10px] text-pink-200/25">dias</span>
      <div className="flex items-center gap-2 mt-1 tabular-nums">
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-bold text-pink-50/80">{String(elapsed.h).padStart(2, "0")}</span>
          <span className="text-[8px] text-pink-200/20">hrs</span>
        </div>
        <span className="text-pink-200/15 text-[14px] -mt-3">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-bold text-pink-50/80">{String(elapsed.m).padStart(2, "0")}</span>
          <span className="text-[8px] text-pink-200/20">min</span>
        </div>
        <span className="text-pink-200/15 text-[14px] -mt-3">:</span>
        <div className="flex flex-col items-center">
          <motion.span
            key={elapsed.s}
            className="text-[18px] font-bold text-pink-300/70"
            initial={{ opacity: 0.5, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {String(elapsed.s).padStart(2, "0")}
          </motion.span>
          <span className="text-[8px] text-pink-200/20">seg</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  const computedValue =
    stat.computed === "daysSince" && stat.computeFrom
      ? daysSince(stat.computeFrom)
      : null;

  const displayValue = computedValue ?? stat.value;
  const isNumeric = typeof displayValue === "number";
  const isDays = stat.label === "dias juntos";
  const isFofa = stat.label.includes("fofa");

  return (
    <motion.div
      variants={staggerItem}
      className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-pink-100/[0.02] border border-pink-200/[0.05] text-center ${isFofa ? "col-span-2" : isDays ? "col-span-2" : "aspect-square"}`}
    >
      {isFofa && (
        <span className="text-5xl mb-2">🎀</span>
      )}

      {isDays && stat.computeFrom ? (
        <>
          <LiveTimer since={stat.computeFrom} />
          <span className="text-[12px] text-pink-200/35 mt-2">{stat.label}</span>
          <motion.span
            className="text-[10px] text-pink-300/20 mt-1 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            e contando
          </motion.span>
        </>
      ) : (
        <>
          <div className="text-[28px] font-bold text-pink-50 tabular-nums">
            {isNumeric ? (
              <CountUpComponent
                end={displayValue as number}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                duration={2200}
              />
            ) : (
              <span className="text-pink-300/80">{stat.prefix}{displayValue}{stat.suffix}</span>
            )}
          </div>
          <span className="text-[12px] text-pink-200/35 mt-2">{stat.label}</span>
        </>
      )}
    </motion.div>
  );
}

export default function StatsSlide({ stats }: StatsSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        className="text-pink-300/25 text-[11px] tracking-[0.3em] uppercase mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        em números
      </motion.p>

      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </motion.div>
    </div>
  );
}
