"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./ui";

type JourneyKey = "search" | "claim" | "holder";

const journeys: Record<JourneyKey, {
  tab: string;
  title: string;
  description: string;
  steps: string[];
  action: string;
  href: string;
  secondary: string;
  secondaryHref: string;
}> = {
  search: {
    tab: "Find assets",
    title: "Search for assets in your name",
    description: "Use UFAA’s search service to check whether assets are being held for you or a family member.",
    steps: ["Open the search service", "Check the owner details", "Follow the claim guidance if you find a match"],
    action: "Search for assets",
    href: "/find-claim",
    secondary: "Call *361#",
    secondaryHref: "tel:*361%23",
  },
  claim: {
    tab: "Make a claim",
    title: "Get ready to claim an asset",
    description: "The claim process is free. Review the instructions and forms for your situation before submitting a claim.",
    steps: ["Choose the right claim instructions", "Prepare the supporting documents", "Submit your claim through the available service"],
    action: "View claiming instructions",
    href: "/find-claim",
    secondary: "Browse claim forms",
    secondaryHref: "/publications?category=Claim%20Form",
  },
  holder: {
    tab: "Report as a holder",
    title: "Reporting unclaimed assets?",
    description: "Holding institutions can review their responsibilities and access the UFAA reporting portal.",
    steps: ["Review holder reporting guidance", "Prepare the required asset information", "Report or surrender assets through the portal"],
    action: "Open holders portal",
    href: "/holders/login",
    secondary: "Holder questions",
    secondaryHref: "/faqs?category=Holders",
  },
};

const assetTypes = [
  { id: "deposits", title: "Bank accounts & deposits", description: "Dormant accounts, deposits and other balances held by financial institutions." },
  { id: "shares", title: "Shares & dividends", description: "Unclaimed shares, dividends and other investment proceeds." },
  { id: "insurance", title: "Insurance & pensions", description: "Policy proceeds, benefits and retirement funds that have not reached their owner." },
  { id: "other", title: "Utilities & other assets", description: "Utility deposits, court refunds and other financial assets that may be unclaimed." },
];

export function AssetJourney({ claimHref, ussdCode }: { claimHref: string; ussdCode?: string | null }) {
  const [journey, setJourney] = useState<JourneyKey>("search");
  const [assetType, setAssetType] = useState<string | null>(null);
  const current = journeys[journey];
  const selectedAsset = assetTypes.find((asset) => asset.id === assetType);

  const primaryHref = journey === "search" ? claimHref : current.href;
  const secondaryHref = journey === "search" && ussdCode ? `tel:${ussdCode.replaceAll("#", "%23")}` : current.secondaryHref;
  const secondaryLabel = journey === "search" && ussdCode ? `Call ${ussdCode}` : current.secondary;

  return (
    <section className="bg-ledger-50 py-14 sm:py-16">
      <Container>
        <div className="mb-7 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-ledger-700">UFAA services</p>
          <h2 className="mt-1 text-3xl font-bold text-ledger-900 sm:text-4xl">What would you like to do?</h2>
          <p className="mt-3 text-muted">Choose a service for relevant next steps, or explore the types of assets UFAA safeguards.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
            <nav aria-label="Choose a UFAA service" className="flex gap-2 overflow-x-auto bg-ledger-900 p-4 lg:flex-col lg:gap-2 lg:p-5">
              {(Object.keys(journeys) as JourneyKey[]).map((key, index) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={journey === key}
                  onClick={() => setJourney(key)}
                  className={`flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:w-full ${journey === key ? "bg-white text-ledger-900 shadow-sm" : "text-white/85 hover:bg-white/10 hover:text-white"}`}
                >
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${journey === key ? "bg-ochre-soft text-ledger-900" : "bg-white/10 text-white"}`}>0{index + 1}</span>
                  {journeys[key].tab}
                </button>
              ))}
            </nav>

            <div className="p-5 sm:p-8 lg:p-9" aria-live="polite">
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-ledger-700">{current.tab}</p>
              <h3 className="mt-2 text-2xl font-bold text-ledger-900 sm:text-3xl">{current.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{current.description}</p>

              <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                {current.steps.map((step, index) => (
                  <li key={step} className="rounded-xl border border-line bg-paper p-4">
                    <span className="text-xs font-bold text-ledger-700">STEP 0{index + 1}</span>
                    <p className="mt-1 text-sm font-semibold leading-snug text-ledger-900">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={primaryHref} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ledger-900 px-5 py-2.5 font-bold text-white transition hover:bg-ledger-800">
                  {current.action}<span className="ml-2" aria-hidden="true">→</span>
                </Link>
                <Link href={secondaryHref} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ledger-900/20 px-5 py-2.5 font-semibold text-ledger-900 transition hover:border-ledger-900 hover:bg-ledger-50">
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-ledger-700">Asset guide</p>
              <h3 className="mt-1 text-2xl font-bold text-ledger-900">What kinds of assets can be unclaimed?</h3>
            </div>
            <p className="max-w-lg text-sm text-muted">Select a category to learn more. You don’t need to know the asset type before searching.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {assetTypes.map((asset, index) => {
              const isOpen = assetType === asset.id;
              return (
                <button
                  key={asset.id}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setAssetType(isOpen ? null : asset.id)}
                  className={`rounded-xl border p-5 text-left transition ${isOpen ? "border-ledger-900 bg-white shadow-sm" : "border-line bg-white/60 hover:border-ledger-900/40 hover:bg-white"}`}
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-ochre-soft text-sm font-bold text-ledger-900">0{index + 1}</span>
                  <span className="mt-4 block font-bold text-ledger-900">{asset.title}</span>
                  {isOpen && <span className="mt-2 block text-sm leading-relaxed text-muted">{asset.description}</span>}
                  <span className="mt-3 block text-xs font-semibold text-ledger-700">{isOpen ? "Show less" : "Learn more"}</span>
                </button>
              );
            })}
          </div>
          {selectedAsset && (
            <p className="mt-4 text-sm text-muted" role="status">
              Looking for <strong className="text-ledger-900">{selectedAsset.title.toLowerCase()}</strong>? Start with the search service or review the claiming instructions above.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
