"use client";

import { useEffect, useCallback } from "react";
import { wrappedData } from "@/data/wrapped-data";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { startMusic, silenceAll, resumeAll, cleanup } from "@/lib/audio";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ProgressBar from "@/components/ui/ProgressBar";
import NavigationControls from "@/components/ui/NavigationControls";
import FilmGrain from "@/components/ui/FilmGrain";
import NowPlayingBar from "@/components/ui/NowPlayingBar";
import SlideRenderer from "./SlideRenderer";
import {
  IntroSlide,
  ConfessionsSlide,
  WhatYouAreSlide,
  QuoteHighlightSlide,
  LetterSlide,
  StatsSlide,
  SilenceSlide,
  PersonalListSlide,
  MusicSlide,
  LoveEquationSlide,
  FillHeartSlide,
  FinalSlide,
} from "./slides";

const SILENCE_SLIDE = 4;
const TOTAL_SLIDES = 14;

export default function WrappedApp() {
  const { currentSlide, next, prev, reset, isFirst, isLast } =
    useSlideNavigation(TOTAL_SLIDES);

  useEffect(() => {
    startMusic();

    function handleFirstTouch() {
      startMusic();
      document.removeEventListener("click", handleFirstTouch);
      document.removeEventListener("touchstart", handleFirstTouch);
    }

    document.addEventListener("click", handleFirstTouch);
    document.addEventListener("touchstart", handleFirstTouch);

    return () => {
      document.removeEventListener("click", handleFirstTouch);
      document.removeEventListener("touchstart", handleFirstTouch);
    };
  }, []);

  const handleStart = useCallback(() => {
    startMusic();
    next();
  }, [next]);

  useEffect(() => {
    if (currentSlide === SILENCE_SLIDE) {
      silenceAll();
      const timer = setTimeout(() => {
        resumeAll();
        next();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, next]);

  useEffect(() => {
    return cleanup;
  }, []);

  const highlightQuote = wrappedData.quotes.find((q) => q.highlight);
  const navEnabled = !isFirst && !isLast && currentSlide !== SILENCE_SLIDE;
  const MUSIC_SLIDE = 8;
  const showNowPlaying = currentSlide > 0 && currentSlide !== MUSIC_SLIDE && currentSlide !== SILENCE_SLIDE;

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ height: "100dvh" }}>
      <AnimatedBackground slideIndex={currentSlide} />
      <FilmGrain />
      <ProgressBar total={TOTAL_SLIDES} current={currentSlide} visible={!isFirst} />

      <SlideRenderer currentSlide={currentSlide}>
        {[
          <IntroSlide key="intro" meta={wrappedData.meta} onStart={handleStart} />,
          <QuoteHighlightSlide key="quote-hl" quote={highlightQuote!} />,
          <LetterSlide key="letter" letter={wrappedData.letter} />,
          <StatsSlide key="stats" stats={wrappedData.stats} />,
          <SilenceSlide key="silence" />,
          <PersonalListSlide key="percebi" list={wrappedData.personalLists[0]} />,
          <PersonalListSlide key="quero" list={wrappedData.personalLists[1]} />,
          <PersonalListSlide key="razoes" list={wrappedData.personalLists[2]} />,
          <MusicSlide key="music" song={wrappedData.song} />,
          <LoveEquationSlide key="equation" partnerName={wrappedData.meta.partnerName} recipientName={wrappedData.meta.recipientName} />,
          <WhatYouAreSlide key="whatyouare" phrases={wrappedData.whatYouAre} />,
          <ConfessionsSlide key="confessions" confessions={wrappedData.confessions} />,
          <FillHeartSlide key="fillheart" />,
          <FinalSlide key="final" message={wrappedData.finalMessage} onRestart={reset} />,
        ]}
      </SlideRenderer>

      <NowPlayingBar
        title={wrappedData.song.title}
        artist={wrappedData.song.artist}
        visible={showNowPlaying}
      />
      <NavigationControls onNext={next} onPrev={prev} enabled={navEnabled} />
    </div>
  );
}
