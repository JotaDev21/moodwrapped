"use client";

import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  duration: number = 1500,
  start: number = 0,
  active: boolean = true
): number {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!active) {
      setValue(start);
      return;
    }

    const startTime = performance.now();
    let raf: number;

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(update);
      }
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, active]);

  return value;
}
