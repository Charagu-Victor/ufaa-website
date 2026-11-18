"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FocusEvent } from "react";
import { Container } from "./ui";
import { HeroAnimatedClip } from "./HeroAnimatedClip";
import type { Media } from "@/lib/types";
import { HOLDERS_PORTAL_URL } from "@/lib/urls";

type HeroStep = { id: number; title: string; description?: string | null };

type Props = {
  claimHref: string;
  holdersHref?: string | null;
  whatsappUrl?: string | null;
  playStoreUrl?: string | null;
  appStoreUrl?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: { url: string; alt: string; width: number; height: number } | null;
  claimHeroClip?: Media | null;
  holderHeroClip?: Media | null;
  whatsappHeroClip?: Media | null;
  mobileAppHeroClip?: Media | null;
  ussdCode?: string | null;
  steps?: HeroStep[];
};

const slideLabels = ["Find and claim assets", "Report assets as a holder", "Use WhatsApp", "UFAA mobile app"];
const defaultClaimImage = "/ufaa-hero-claim.jpg";

export function HeroCarousel({
  claimHref,
  holdersHref,
  whatsappUrl,
  playStoreUrl,
  appStoreUrl,
  heroTitle,
  heroSubtitle,
  heroImage,
  claimHeroClip,
  holderHeroClip,
  whatsappHeroClip,
  mobileAppHeroClip,
  ussdCode,
  steps = [],
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slideLabels.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

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

      <Container className="relative z-10 !max-w-[1440px] py-7 sm:py-10 lg:py-10">
        <div key={active} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${slideLabels.length}: ${slideLabels[active]}`} className="hero-slide grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="py-2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-ledger-950/35 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
              <span className="size-2 rounded-full bg-ochre" /> Receive. Safeguard. Reunite.
            </p>

            {active === 0 ? (
              <>
                <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  {heroTitle ?? "Your assets. Your future. Find what belongs to you."}
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  {heroSubtitle ?? "Search for financial assets held in your name or find out how to claim assets belonging to a loved one. The service is free."}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={claimHref} className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Start claiming <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link href="/find-and-claim/claiming-instructions" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Claiming instructions
                  </Link>
                </div>
                {ussdCode && <p className="mt-4 text-sm text-white/75">No internet? Dial <strong className="text-white">{ussdCode}</strong> from your phone.</p>}
              </>
            ) : active === 1 ? (
              <>
                <h1 className="max-w-[15ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  Are you a holder of unclaimed assets?
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  Banks, insurers, SACCOs, pension schemes, and other institutions can report and surrender unclaimed assets to UFAA.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={holdersHref ?? HOLDERS_PORTAL_URL} className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Make A Report <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                  <Link href="/faqs?category=Holders" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Holder guidance
                  </Link>
                </div>
              </>
            ) : active === 2 ? (
              <>
                <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  Get help finding your assets on WhatsApp.
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  Save UFAA&apos;s official number, send Hi, and follow the guided steps to search.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={whatsappUrl ?? "/contact"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noopener noreferrer" : undefined} className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Open WhatsApp <span aria-hidden="true" className="ml-2">→</span>
                  </a>
                  <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Other ways to search
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[clamp(3rem,3.7vw,3.75rem)]">
                  UFAA services, wherever you are.
                </h1>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80">
                  Use the UFAA mobile app to search for assets and manage your claim from your phone.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={playStoreUrl ?? "https://play.google.com/store/apps/details?id=com.ufaa.ereunify_mobile"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md bg-ochre px-6 py-3 font-bold text-ledger-950 shadow-sm transition hover:bg-[#f1d56c]">
                    Get it on Google Play
                  </a>
                  <a href={appStoreUrl ?? "https://apps.apple.com/my/app/ufaa-reunite/id6812353264"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 bg-ledger-950/35 px-6 py-3 font-bold text-white transition hover:bg-ledger-950/55">
                    Download on the App Store
                  </a>
                </div>
              </>
            )}
          </div>

          <HeroAnimatedClip
            key={active}
            mode={active === 0 ? "claim" : active === 1 ? "holder" : active === 2 ? "whatsapp" : "mobile"}
            clip={active === 0 ? claimHeroClip : active === 1 ? holderHeroClip : active === 2 ? whatsappHeroClip : mobileAppHeroClip}
          />
        </div>

      </Container>
    </section>
  );
}
