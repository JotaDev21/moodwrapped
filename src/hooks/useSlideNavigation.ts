"use client";

import { useState, useCallback, useRef } from "react";

interface UseSlideNavigationReturn {
  currentSlide: number;
  direction: number;
  totalSlides: number;
  isTransitioning: boolean;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function useSlideNavigation(
  total: number,
  transitionLock: number = 1400
): UseSlideNavigationReturn {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      lockRef.current = false;
      setIsTransitioning(false);
    }, transitionLock);
  }, [transitionLock]);

  const next = useCallback(() => {
    if (lockRef.current) return;
    setCurrentSlide((prev) => {
      if (prev >= total - 1) return prev;
      setDirection(1);
      lock();
      return prev + 1;
    });
  }, [total, lock]);

  const prev = useCallback(() => {
    if (lockRef.current) return;
    setCurrentSlide((prev) => {
      if (prev <= 0) return prev;
      setDirection(-1);
      lock();
      return prev - 1;
    });
  }, [lock]);

  const goTo = useCallback(
    (index: number) => {
      if (lockRef.current || index < 0 || index >= total) return;
      setDirection(index > currentSlide ? 1 : -1);
      lock();
      setCurrentSlide(index);
    },
    [total, currentSlide, lock]
  );

  const reset = useCallback(() => {
    setDirection(-1);
    lock();
    setCurrentSlide(0);
  }, [lock]);

  return {
    currentSlide,
    direction,
    totalSlides: total,
    isTransitioning,
    next,
    prev,
    goTo,
    reset,
    isFirst: currentSlide === 0,
    isLast: currentSlide === total - 1,
  };
}
