"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/format";
import type { Media } from "@/lib/types";

type Props = { mode: "claim" | "holder"; clip?: Media | null };

/** Lightweight, responsive motion graphic for the active hero journey. */
export function HeroAnimatedClip({ mode, clip }: Props) {
  const isClaim = mode === "claim";
  const clipUrl = mediaUrl(clip);
  const isVideo = Boolean(clip?.mime?.startsWith("video/"));
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || reducedMotion) {
      video.pause();
    } else {
      void video.play().catch(() => setPaused(true));
    }
  }, [paused, reducedMotion, clipUrl]);

  return (
    <div
      key={mode}
      role="group"
      aria-label={isClaim ? "Animated illustration of searching for and claiming an asset" : "Animated illustration of an institution reporting assets to UFAA"}
      className={`hero-clip hero-clip-${mode} relative min-h-[320px] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#1d5a82] via-[#164b75] to-[#102f55] shadow-2xl sm:min-h-[380px] ${paused || reducedMotion ? "motion-paused" : ""}`}
    >
      {clipUrl ? (
        isVideo ? (
          <video ref={videoRef} src={clipUrl} muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 size-full object-contain p-3 sm:p-5" />
        ) : (
          <Image src={clipUrl} alt="" width={clip?.width ?? 1200} height={clip?.height ?? 800} unoptimized className="absolute inset-0 size-full object-contain p-3 sm:p-5" />
        )
      ) : (
        <>
      <div className="pointer-events-none absolute -right-14 -top-20 size-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-36 -left-20 size-72 rounded-full border border-white/10" />
      <svg viewBox="0 0 640 400" className="absolute inset-0 size-full" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`clip-card-${mode}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#e9f0fa" />
          </linearGradient>
          <filter id={`clip-shadow-${mode}`} x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#071b37" floodOpacity=".28" />
          </filter>
        </defs>

        <circle cx="500" cy="86" r="112" stroke="white" strokeOpacity=".08" />
        <circle cx="500" cy="86" r="78" stroke="white" strokeOpacity=".07" />
        <path d="M45 320H595" stroke="white" strokeOpacity=".14" />

        {isClaim ? (
          <>
            <text x="48" y="54" fill="#f1c629" fontSize="13" fontWeight="700" letterSpacing="2.2">FIND &amp; CLAIM</text>
            <text x="48" y="80" fill="white" fillOpacity=".78" fontSize="14">A simple path to your assets</text>

            <path className="clip-route" d="M90 270H548" stroke="#edbd20" strokeWidth="3" strokeLinecap="round" />
            {[90, 319, 548].map((x, index) => (
              <g key={x}>
                <circle cx={x} cy="270" r="19" fill="#174d77" stroke="#edbd20" strokeWidth="2" />
                <text x={x} y="275" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">0{index + 1}</text>
              </g>
            ))}
            <text x="90" y="311" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="12">Search</text>
            <text x="319" y="311" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="12">Verify</text>
            <text x="548" y="311" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="12">Claim</text>

            <g className="clip-float" filter={`url(#clip-shadow-${mode})`}>
              <rect x="150" y="112" width="340" height="120" rx="18" fill={`url(#clip-card-${mode})`} />
              <rect x="174" y="136" width="42" height="42" rx="13" fill="#e8eef9" />
              <circle cx="193" cy="155" r="10" stroke="#1a3e70" strokeWidth="2.4" />
              <path d="m200 162 7 7" stroke="#1a3e70" strokeWidth="2.4" strokeLinecap="round" />
              <text x="232" y="148" fill="#69738a" fontSize="11" fontWeight="600">SEARCH UFAA&apos;S REGISTER</text>
              <text x="232" y="170" fill="#18265f" fontSize="15" fontWeight="700">Find assets in your name</text>
              <rect x="174" y="192" width="244" height="7" rx="3.5" fill="#dce3ef" />
              <rect x="174" y="192" width="158" height="7" rx="3.5" fill="#e2b51b" />
              <circle cx="456" cy="157" r="17" fill="#e1f1e9" />
              <path d="m448 157 5 5 10-11" stroke="#1d7652" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g className="clip-float clip-float-delay">
              <rect x="390" y="91" width="142" height="38" rx="19" fill="#ffffff" />
              <circle cx="411" cy="110" r="5" fill="#1d7652" />
              <text x="425" y="114" fill="#18265f" fontSize="11" fontWeight="700">Claim guidance</text>
            </g>
          </>
        ) : (
          <>
            <text x="48" y="54" fill="#f1c629" fontSize="13" fontWeight="700" letterSpacing="2.2">HOLDER REPORTING</text>
            <text x="48" y="80" fill="white" fillOpacity=".78" fontSize="14">Report, safeguard, reunite</text>

            <path className="clip-route" d="M128 260C220 260 245 260 310 260S410 260 510 260" stroke="#edbd20" strokeWidth="3" strokeLinecap="round" />
            <g className="clip-float-delay">
              <rect x="65" y="137" width="124" height="102" rx="14" fill="#ffffff" fillOpacity=".12" stroke="white" strokeOpacity=".25" />
              <path d="M103 169h48v48h-48zM95 169h64M109 157h36" stroke="white" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M113 183h28M113 194h28M113 205h18" stroke="#edbd20" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="clip-float" filter={`url(#clip-shadow-${mode})`}>
              <rect x="227" y="118" width="206" height="122" rx="17" fill={`url(#clip-card-${mode})`} />
              <text x="250" y="148" fill="#69738a" fontSize="11" fontWeight="600">REPORTING WORKFLOW</text>
              <text x="250" y="171" fill="#18265f" fontSize="15" fontWeight="700">Prepare asset return</text>
              <rect x="250" y="190" width="152" height="7" rx="3.5" fill="#dce3ef" />
              <rect x="250" y="190" width="94" height="7" rx="3.5" fill="#e2b51b" />
              <circle cx="403" cy="206" r="14" fill="#e1f1e9" />
              <path d="m397 206 4 4 8-9" stroke="#1d7652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g>
              <circle cx="128" cy="260" r="19" fill="#174d77" stroke="#edbd20" strokeWidth="2" />
              <circle cx="310" cy="260" r="19" fill="#174d77" stroke="#edbd20" strokeWidth="2" />
              <circle cx="510" cy="260" r="19" fill="#174d77" stroke="#edbd20" strokeWidth="2" />
              <text x="128" y="265" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">01</text>
              <text x="310" y="265" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">02</text>
              <text x="510" y="265" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">03</text>
            </g>
            <text x="128" y="302" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="11">Notify owners</text>
            <text x="310" y="302" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="11">Report assets</text>
            <text x="510" y="302" textAnchor="middle" fill="white" fillOpacity=".88" fontSize="11">Submit securely</text>
            <circle className="clip-pulse" cx="536" cy="130" r="27" fill="#e2b51b" fillOpacity=".16" />
            <path d="M536 114v31m-12-18 12-13 12 13m-24 14v8h24v-8" stroke="#f1c629" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
        </>
      )}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Play hero animation" : "Pause hero animation"}
        aria-pressed={paused}
        className="absolute bottom-3 right-3 z-10 rounded-full border border-white/25 bg-ledger-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-ledger-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
      >
        {paused ? "Play animation" : "Pause animation"}
      </button>
    </div>
  );
}
