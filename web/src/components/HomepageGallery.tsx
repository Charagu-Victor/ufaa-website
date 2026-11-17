"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Homepage } from "@/lib/types";
import { mediaUrl } from "@/lib/format";
import { Container } from "./ui";

export function HomepageGallery({ images }: { images: NonNullable<Homepage["galleryImages"]> }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = images.filter((item) => mediaUrl(item.image));
  const slides = items.length
    ? items.map((item, index) => ({
        id: item.id,
        src: mediaUrl(item.image)!,
        alt: item.image.alternativeText ?? item.caption ?? `UFAA gallery image ${index + 1}`,
        width: item.image.width ?? 1200,
        height: item.image.height ?? 900,
        caption: item.caption,
      }))
    : [{
        id: 0,
        src: "/ufaa-hero-claim.jpg",
        alt: "UFAA service delivery",
        width: 1200,
        height: 800,
        caption: "UFAA services",
      }];

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.78, behavior: "smooth" });
  }

  return (
    <section className="border-y border-line bg-ledger-50 py-12 sm:py-14" aria-labelledby="gallery-heading">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ledger-700">UFAA in action</p>
            <h2 id="gallery-heading" className="mt-1 text-3xl font-bold text-ledger-900">Gallery</h2>
          </div>
          {slides.length > 1 && (
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Scroll gallery left" className="flex size-10 items-center justify-center rounded-full border border-ledger-900/20 bg-white text-ledger-900 transition hover:border-ledger-900 hover:bg-ledger-900 hover:text-white">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12.5 4-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Scroll gallery right" className="flex size-10 items-center justify-center rounded-full border border-ledger-900/20 bg-white text-ledger-900 transition hover:border-ledger-900 hover:bg-ledger-900 hover:text-white">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4 6 6-6 6" /></svg>
              </button>
            </div>
          )}
        </div>

        <div ref={trackRef} className="gallery-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2" aria-label="UFAA photo gallery">
          {slides.map((item) => (
            <figure key={item.id} className="w-[82%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                unoptimized
                className="aspect-[4/3] w-full rounded-xl border border-line bg-white object-cover shadow-sm"
              />
              {item.caption && <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
