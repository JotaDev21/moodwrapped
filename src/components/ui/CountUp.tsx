"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  active?: boolean;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  active = true,
  className = "",
}: CountUpProps) {
  const value = useCountUp(end, duration, 0, active);

  return (
    <span className={className}>
      {prefix}
      {formatNumber(value)}
      {suffix && <span className="text-[0.45em] ml-1.5 text-pink-200/30">{suffix}</span>}
    </span>
  );
}
