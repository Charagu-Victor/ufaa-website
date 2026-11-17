"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FocusEvent } from "react";
import { Container } from "./ui";

type HeroStep = { id: number; title: string; description?: string | null };

type Props = {
  claimHref: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: { url: string; alt: string; width: number; height: number } | null;
  ussdCode?: string | null;
  steps?: HeroStep[];
};

const slideLabels = ["Find and claim assets", "Report assets as a holder"];
const defaultClaimImage = "/ufaa-hero-claim.jpg";

export function HeroCarousel({
  claimHref,
  heroTitle,
  heroSubtitle,
  heroImage,
  ussdCode,
  steps = [],
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (autoPlay) setAutoPlay(false);
      return;
    }
    if (!autoPlay || paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slideLabels.length), 7000);
    return () => window.clearInterval(timer);
  }, [autoPlay, paused]);

  function moveTo(index: number) {
    setActive((index + slideLabels.length) % slideLabels.length);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
  }

  const claimSteps = steps.length
    ? steps.slice(0, 4)
    : [
        { id: 1, title: "Search" },
        { id: 2, title: "Prepare" },
        { id: 3, title: "Submit" },
        { id: 4, title: "Receive" },
      ];

  return (
    <section
      aria-label="UFAA services"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden border-b border-ledger-900 bg-ledger-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={heroImage?.url ?? defaultClaimImage}
          alt=""
          width={heroImage?.width ?? 1200}
          height={heroImage?.height ?? 800}
          unoptimized
          priority
          className="absolute inset-0 size-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ledger-950/85 via-ledger-950/60 to-ledger-950/35" />
      </div>

      <Container className="relative z-10 !max-w-[1440px] py-8 sm:py-12 lg:py-14">
        <div key={active} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slideLabels.length}: ${slideLabels[active]}`} className="hero-slide grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="py-2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-ledger-950/35 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
              <span className="size-2 rounded-full bg-ochre" /> Receive. Safeguard. Reunite.
            </p>

            {active === 0 ? (
              <>
                <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  Did you know? You could find your share of millions in unclaimed assets.
                  {/* {heroTitle ?? "Did you know? You could find your share of millions in unclaimed assets."} */}
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  {heroSubtitle ?? "Search for financial assets held in your name or find out how to claim assets belonging to a loved one. The service is free."}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={claimHref} className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Start claiming <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link href="/find-claim" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Claiming instructions
                  </Link>
                </div>
                {ussdCode && <p className="mt-4 text-sm text-white/75">No internet? Dial <strong className="text-white">{ussdCode}</strong> from your phone.</p>}
              </>
            ) : (
              <>
                <h1 className="max-w-[15ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  Are you a holder of unclaimed assets?
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  Banks, insurers, SACCOs, pension schemes, and other institutions can report and surrender unclaimed assets to UFAA.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/holders/login" className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Open holders portal <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link href="/faqs?category=Holders" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Holder guidance
                  </Link>
                </div>
              </>
            )}
          </div>

          {active === 0 ? (
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/35 bg-ledger-950/35 p-5 text-white shadow-xl sm:min-h-[430px] sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-ledger-950/15" />
              <div className="relative flex min-h-[320px] flex-col justify-between gap-8 sm:min-h-[366px]">
                <div className="max-w-md pt-4 sm:pt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ochre sm:text-sm">Your assets. Your future.</p>
                  <p className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Find what belongs to you.</p>
                  <p className="mt-2 text-sm text-white/85 sm:text-base">Search UFAA’s records and take the next step toward a claim.</p>
                </div>
                <div className="rounded-xl border border-white/70 bg-white p-4 text-ledger-900 shadow-lg sm:p-5">
                  <p className="text-sm font-bold">How a claim works</p>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {claimSteps.map((step, index) => (
                      <div key={step.id} className="min-w-0 border-t-2 border-ochre pt-2">
                        <span className="block text-[11px] font-bold text-muted">0{index + 1}</span>
                        <span className="block truncate text-xs font-semibold sm:text-sm">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-white/35 bg-ledger-950/35 p-6 text-white shadow-xl sm:min-h-[430px] sm:p-8">
              <div className="relative z-10 flex min-h-[312px] flex-col justify-between sm:min-h-[366px]">
                <div className="max-w-sm pt-2 sm:pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ochre sm:text-sm">For asset holders</p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Help reunite assets with their owners.</h2>
                  <p className="mt-2 text-sm text-white/80 sm:text-base">Find reporting information and access the holders portal.</p>
                </div>
                <div className="grid gap-2 rounded-xl border border-white/70 bg-white p-4 text-ledger-900 shadow-lg sm:grid-cols-3 sm:gap-3 sm:p-5">
                  {[
                    ["01", "Locate owners"],
                    ["02", "Report assets"],
                    ["03", "Remit cash"],
                  ].map(([number, label]) => (
                    <div key={number} className="border-t-2 border-ochre pt-2">
                      <span className="block text-[11px] font-bold text-muted">{number}</span>
                      <span className="text-sm font-semibold">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4" aria-label="Hero slide controls">
          <p className="text-sm font-semibold text-white/75">
            <span className="text-ochre">0{active + 1}</span><span className="mx-2 text-white/35">/</span>0{slideLabels.length}
            <span className="ml-3 hidden sm:inline">{slideLabels[active]}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setAutoPlay((playing) => !playing)} aria-label={autoPlay ? "Pause automatic hero slides" : "Play automatic hero slides"} aria-pressed={!autoPlay} className="mr-1 rounded-full px-2 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
              {autoPlay ? "Pause" : "Play"}
            </button>
            <button type="button" onClick={() => moveTo(active - 1)} aria-label="Previous hero slide" className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/70 hover:bg-white/10">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12.5 4-6 6 6 6" /></svg>
            </button>
            {slideLabels.map((label, index) => (
              <button key={label} type="button" onClick={() => moveTo(index)} aria-label={`Show slide ${index + 1}: ${label}`} aria-current={active === index ? "true" : undefined} className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-ochre" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />
            ))}
            <button type="button" onClick={() => moveTo(active + 1)} aria-label="Next hero slide" className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/70 hover:bg-white/10">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
