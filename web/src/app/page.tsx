import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
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

  const claimHref = settings.claimPortalUrl ?? "https://reunify.ufaa.go.ke";
  const heroImage = mediaUrl(home?.heroImage);

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

      {home?.stats?.length ? (
        <section aria-label="UFAA impact" className="relative z-10 -mt-5">
          <Container>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_18px_55px_rgba(16,23,68,0.10)] sm:grid-cols-3">
              {home.stats.slice(0, 3).map((stat) => (
                <div key={stat.id} className="bg-white px-6 py-6 sm:px-7">
                  <dt className="text-sm font-medium text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-tight text-ledger-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      <section className="py-8 sm:py-10" aria-labelledby="quick-access-heading">
        <Container>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ledger-700">Start here</p>
              <h2 id="quick-access-heading" className="mt-1 text-2xl font-bold text-ledger-900">Quick access</h2>
            </div>
            <Link href="/services" className="shrink-0 text-sm font-semibold text-ledger-700 underline underline-offset-4">All services</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Find and claim assets", detail: "Search for assets in your name", href: "/find-claim" },
              { label: "Report assets", detail: "Guidance for asset holders", href: "/holders/login" },
              { label: "Trust Fund", detail: "How unclaimed assets are safeguarded", href: "/services/trust-fund" },
              { label: "News and resources", detail: "Notices, reports and publications", href: "/publications" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="group rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-ledger-700/40 hover:shadow-md sm:p-5">
                <span className="text-base font-bold text-ledger-900 group-hover:text-ledger-700">{item.label}<span aria-hidden="true" className="ml-2">&rarr;</span></span>
                <span className="mt-1 block text-sm text-muted">{item.detail}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
