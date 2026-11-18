"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HomepageFeatureSlide = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string | null;
};

export function HomepageFeatureSlideshow({ slides }: { slides: HomepageFeatureSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];
  if (!activeSlide) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/15 bg-ledger-950/40 shadow-xl">
      <div className="relative">
        {slides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            unoptimized
            aria-hidden={index !== activeIndex}
            className={`aspect-[16/10] w-full object-cover transition-opacity duration-700 ${index === activeIndex ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
          />
        ))}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ledger-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
          UFAA in action
        </span>
        {slides.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5" aria-label={`Image ${activeIndex + 1} of ${slides.length}`}>
            {slides.map((slide, index) => (
              <span key={slide.id} className={`size-2 rounded-full ${index === activeIndex ? "bg-ochre" : "bg-white/70"}`} />
            ))}
          </div>
        )}
      </div>
      <figcaption aria-live="polite" className="min-h-[3.5rem] px-5 py-4 text-sm leading-relaxed text-white/85 sm:text-base">
        {activeSlide.caption ?? "Bringing UFAA services closer to people across Kenya."}
      </figcaption>
    </figure>
  );
}
