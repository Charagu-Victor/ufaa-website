import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HomepageFeatureSlideshow } from "@/components/HomepageFeatureSlideshow";
import { Container } from "@/components/ui";
import { mediaUrl } from "@/lib/format";
import { getHomepage, getSiteSettings } from "@/lib/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepage();
  return {
    title: home?.seo?.metaTitle ?? undefined,
    description: home?.seo?.metaDescription ?? undefined,
  };
}

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomepage(), getSiteSettings()]);

  const claimHref = settings.claimPortalUrl ?? "https://reunifyufaa.go.ke";
  const heroImage = mediaUrl(home?.heroImage);
  const featureSlides = home?.galleryImages?.flatMap((item, index) => {
    const src = mediaUrl(item.image);
    return src ? [{
      id: item.id,
      src,
      alt: item.image.alternativeText ?? item.caption ?? `UFAA service delivery ${index + 1}`,
      width: item.image.width ?? 1200,
      height: item.image.height ?? 800,
      caption: item.caption,
    }] : [];
  }) ?? [];
  if (featureSlides.length === 0) {
    featureSlides.push({
      id: 0,
      src: heroImage ?? "/ufaa-hero-claim.jpg",
      alt: home?.heroImage?.alternativeText ?? "UFAA service delivery",
      width: home?.heroImage?.width ?? 1200,
      height: home?.heroImage?.height ?? 800,
      caption: "Bringing UFAA services closer to people across Kenya.",
    });
  }
  const claimLinks = settings.findClaimLinks?.length ? settings.findClaimLinks.map((item) => ({
    ...item,
    href: item.href === "/find-claim" ? claimHref : item.href,
  })) : [
    { id: 1, label: "Find Assets", href: claimHref },
    { id: 2, label: "Claiming Instructions", href: "/find-and-claim/claiming-instructions" },
    { id: 3, label: "No Objection Notice", href: "/find-and-claim/no-objection-notice" },
    { id: 4, label: "Reunification Agency", href: "/find-and-claim/reunification-agency" },
  ];
  const holderLinks = settings.reportAssetsLinks?.length ? settings.reportAssetsLinks.map((item) => ({
    ...item,
    href: item.href === "/holders/login" ? settings.holdersPortalUrl ?? "https://holders.ufaa.go.ke" : item.href,
  })) : [
    { id: 1, label: "Compliance Notice", href: "/holders/compliance-notice" },
    { id: 2, label: "Reporting Instructions", href: "/holders/reporting-instructions" },
    { id: 3, label: "Report Assets", href: settings.holdersPortalUrl ?? "https://holders.ufaa.go.ke" },
  ];
  const impactStats = home?.stats?.length
    ? home.stats.slice(0, 3)
    : [
        { id: "assets-remitted", value: "125 Billion", label: "Approximate value of unclaimed assets remitted to date" },
        { id: "claimants-paid", value: "44,693", label: "Total number of claimants paid to date" },
        { id: "total-payouts", value: "3.12 Billion", label: "Total payouts made to date" },
      ];

  return (
    <>
      <HeroCarousel
        claimHref={claimHref}
        holdersHref={settings.holdersPortalUrl}
        whatsappUrl={settings.whatsappUrl}
        playStoreUrl={settings.playStoreUrl}
        appStoreUrl={settings.appStoreUrl}
        heroTitle={home?.heroTitle}
        heroSubtitle={home?.heroSubtitle}
        heroImage={heroImage && home?.heroImage ? {
          url: heroImage,
          alt: home.heroImage.alternativeText ?? "UFAA reunification services",
          width: home.heroImage.width ?? 1200,
          height: home.heroImage.height ?? 900,
        } : null}
        claimHeroClip={home?.claimHeroClip}
        holderHeroClip={home?.holderHeroClip}
        whatsappHeroClip={home?.whatsappHeroClip}
        mobileAppHeroClip={home?.mobileAppHeroClip}
        ussdCode={settings.ussdCode}
        steps={home?.steps}
      />

      <section aria-label="UFAA impact" className="relative isolate overflow-hidden bg-[#f9e49d] py-7 sm:py-8">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 left-[11%] size-[27rem] rounded-full border-[5px] border-sage/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 left-[15%] size-[27rem] rounded-full border-[5px] border-sage/10" />
        <Container className="relative !max-w-[1600px]">
          <dl className="grid gap-6 text-center sm:grid-cols-3 sm:gap-4">
            {impactStats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center px-3 py-1">
                <dt className="order-2 mt-2 max-w-[30ch] text-base leading-snug text-ledger-950 sm:text-lg">{stat.label}</dt>
                <dd className="order-1 text-4xl font-bold tracking-tight text-ledger-900 sm:text-5xl lg:text-6xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-ledger-900 text-white" aria-label="Claim and report assets">
        <Container className="grid gap-7 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.45fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <h2 className="text-2xl font-bold tracking-tight">Claim your assets</h2>
            <ul className="mt-4 divide-y divide-white/15">
              {claimLinks.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link href={item.href} className="group flex min-h-12 items-center justify-between gap-3 py-2 text-sm font-medium text-white/90 transition hover:text-ochre sm:text-base">
                    {item.label}
                    <span aria-hidden="true" className="text-xl text-white/55 transition group-hover:translate-x-1 group-hover:text-ochre">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <HomepageFeatureSlideshow slides={featureSlides} />

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <h2 className="text-2xl font-bold tracking-tight">Report assets</h2>
            <ul className="mt-4 divide-y divide-white/15">
              {holderLinks.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link href={item.href} className="group flex min-h-12 items-center justify-between gap-3 py-2 text-sm font-medium text-white/90 transition hover:text-ochre sm:text-base">
                    {item.label}
                    <span aria-hidden="true" className="text-xl text-white/55 transition group-hover:translate-x-1 group-hover:text-ochre">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
