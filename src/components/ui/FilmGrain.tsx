"use client";

export default function FilmGrain() {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ animation: "grain-drift 0.8s steps(3) infinite" }}
    >
      <svg className="w-full h-full opacity-[0.032]">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
