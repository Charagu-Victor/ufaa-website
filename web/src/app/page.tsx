import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AssetJourney } from "@/components/AssetJourney";
import { HomepageGallery } from "@/components/HomepageGallery";
import { Container, EmptyState, Tag } from "@/components/ui";
import { formatDate, mediaUrl } from "@/lib/format";
import { getHomepage, getSiteSettings, listNews, listNotices } from "@/lib/strapi";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepage();
  return {
    title: home?.seo?.metaTitle ?? undefined,
    description: home?.seo?.metaDescription ?? undefined,
  };
}

export default async function HomePage() {
  const [home, settings, news, notices] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
    listNews({ pageSize: 3 }),
    listNotices({ pageSize: 5 }),
  ]);

  const claimHref = settings.claimPortalUrl ?? "https://reunify.ufaa.go.ke";
  const [lead, ...rest] = news.data;
  const leadImage = mediaUrl(lead?.cover);
  const heroImage = mediaUrl(home?.heroImage);

  return (
    <>
      <HeroCarousel
        claimHref={claimHref}
        heroTitle={home?.heroTitle}
        heroSubtitle={home?.heroSubtitle}
        heroImage={heroImage && home?.heroImage ? {
          url: heroImage,
          alt: home.heroImage.alternativeText ?? "UFAA reunification services",
          width: home.heroImage.width ?? 1200,
          height: home.heroImage.height ?? 900,
        } : null}
        ussdCode={settings.ussdCode}
        steps={home?.steps}
      />

      <AssetJourney claimHref={claimHref} ussdCode={settings.ussdCode} />

      <section className="border-y border-line bg-white py-14 sm:py-16" aria-labelledby="access-heading">
        <Container>
          <div className="mb-7 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ledger-700">Access UFAA services</p>
            <h2 id="access-heading" className="mt-1 text-3xl font-bold text-ledger-900 sm:text-4xl">How you want to search and claim</h2>
            <p className="mt-3 text-muted">Search and claim online, use your phone, or get help from UFAA through its published service channels.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <article className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ledger-700">Online portal</span>
              <h3 className="mt-2 text-xl font-bold text-ledger-900">Search &amp; claim</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Look up assets and follow the online claim process.</p>
              <a href={claimHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-ledger-900 px-4 py-2 text-sm font-bold text-white hover:bg-ledger-800">Open portal <span className="ml-2" aria-hidden="true">→</span></a>
            </article>
            <article className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ledger-700">Mobile app</span>
              <h3 className="mt-2 text-xl font-bold text-ledger-900">Claim on the go</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Use the UFAA app on Android or iPhone to search and manage a claim.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={settings.playStoreUrl ?? "https://play.google.com/store/apps/details?id=com.ufaa.ereunify_mobile"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-ledger-900/20 px-3 py-2 text-sm font-semibold text-ledger-900 hover:bg-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M5.2 3.7a1.8 1.8 0 0 0-.4 1.2v14.2c0 .5.1.9.4 1.2L13 12 5.2 3.7Zm1.3-.8L15 10l2.3-2.3L8.5 2.8a2.1 2.1 0 0 0-2-.1Zm10 8.2 2.6 1.5c.8.5.8 1.3 0 1.8l-2.6 1.5-2.8-2.9 2.8-1.9Zm-1.5 5.6-8.5 7.1a2.1 2.1 0 0 0 2-.1l8.8-4.9-2.3-2.1Z" /></svg>
                  Google Play
                </a>
                <a href={settings.appStoreUrl ?? "https://apps.apple.com/my/app/ufaa-reunite/id6812353264"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-ledger-900/20 px-3 py-2 text-sm font-semibold text-ledger-900 hover:bg-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M16.7 12.8c0-2.1 1.7-3.1 1.8-3.2a3.9 3.9 0 0 0-3.1-1.7c-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8a4.2 4.2 0 0 0-3.6 2.2c-1.5 2.6-.4 6.5 1 8.6.7 1 1.5 2.1 2.5 2.1s1.4-.7 2.7-.7 1.7.7 2.8.7 1.8-1 2.5-2.1a9.5 9.5 0 0 0 1.1-2.3 3.6 3.6 0 0 1-1.7-3.6ZM14.6 6.5a3.8 3.8 0 0 0 .9-2.7 3.9 3.9 0 0 0-2.5 1.3 3.6 3.6 0 0 0-.9 2.6 3.2 3.2 0 0 0 2.5-1.2Z" /></svg>
                  App Store
                </a>
              </div>
            </article>
            <article className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ledger-700">USSD</span>
              <h3 className="mt-2 text-xl font-bold text-ledger-900">Use any phone</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Access UFAA’s mobile service without an internet connection.</p>
              <a href={`tel:${(settings.ussdCode ?? "*361#").replaceAll("#", "%23")}`} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-ochre px-4 py-2 text-sm font-bold text-ledger-950">Dial {settings.ussdCode ?? "*361#"}</a>
            </article>
            <article className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ledger-700">WhatsApp</span>
              <h3 className="mt-2 text-xl font-bold text-ledger-900">Chat with UFAA</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Get the current official WhatsApp service link from UFAA.</p>
              <a href={settings.whatsappUrl ?? "/get-in-touch"} target={settings.whatsappUrl ? "_blank" : undefined} rel={settings.whatsappUrl ? "noopener noreferrer" : undefined} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-ledger-900/20 px-4 py-2 text-sm font-semibold text-ledger-900 hover:bg-white">{settings.whatsappUrl ? "Open WhatsApp" : "Contact UFAA"}</a>
            </article>
            <article className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ledger-700">SMS</span>
              <h3 className="mt-2 text-xl font-bold text-ledger-900">SMS services</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Find out about UFAA SMS services and the current instructions.</p>
              <a href={settings.smsInstructionsUrl ?? "/get-in-touch"} target={settings.smsInstructionsUrl ? "_blank" : undefined} rel={settings.smsInstructionsUrl ? "noopener noreferrer" : undefined} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-ledger-900/20 px-4 py-2 text-sm font-semibold text-ledger-900 hover:bg-white">{settings.smsInstructionsUrl ? "View SMS instructions" : "Contact UFAA"}</a>
            </article>
          </div>
        </Container>
      </section>

      <HomepageGallery images={home?.galleryImages ?? []} />

      {/* News and notices */}
      <Container className="mt-14 grid gap-12 lg:grid-cols-5">
        <section className="lg:col-span-3" aria-labelledby="news-heading">
          <div className="flex items-baseline justify-between border-b-2 border-ledger-900 pb-2">
            <h2 id="news-heading" className="font-serif text-2xl text-ledger-900">Latest news</h2>
            <Link href="/news" className="text-sm font-semibold text-ledger-700 underline underline-offset-4">
              All news
            </Link>
          </div>

          {lead ? (
            <>
              <article className="mt-6">
                {leadImage && lead.cover && (
                  <Image
                    src={leadImage}
                    alt={lead.cover.alternativeText ?? ""}
                    width={lead.cover.width ?? 1200}
                    height={lead.cover.height ?? 675}
                    unoptimized
                    className="mb-4 aspect-video w-full rounded-sm object-cover"
                  />
                )}
                <p className="flex items-center gap-2 text-sm text-muted">
                  <Tag>{lead.category}</Tag>
                  <time dateTime={lead.publishedOn}>{formatDate(lead.publishedOn)}</time>
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight text-ledger-900">
                  <Link href={`/news/${lead.slug}`} className="hover:underline underline-offset-4">
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[62ch] text-muted">{lead.summary}</p>
              </article>

              {rest.length > 0 && (
                <ul className="mt-6 border-t border-line">
                  {rest.map((item) => (
                    <li key={item.documentId} className="border-b border-line py-4">
                      <p className="text-sm text-muted">
                        {item.category}, <time dateTime={item.publishedOn}>{formatDate(item.publishedOn)}</time>
                      </p>
                      <h3 className="font-serif text-xl text-ledger-900">
                        <Link href={`/news/${item.slug}`} className="hover:underline underline-offset-4">
                          {item.title}
                        </Link>
                      </h3>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="mt-6">
              <EmptyState title="No news yet">Publish a News Article in Strapi and it appears here.</EmptyState>
            </div>
          )}
        </section>

        <section className="lg:col-span-2" aria-labelledby="notices-heading">
          <div className="flex items-baseline justify-between border-b-2 border-ledger-900 pb-2">
            <h2 id="notices-heading" className="font-serif text-2xl text-ledger-900">Notices</h2>
            <Link href="/notices" className="text-sm font-semibold text-ledger-700 underline underline-offset-4">
              All notices
            </Link>
          </div>
          {notices.data.length > 0 ? (
            <ul className="mt-2">
              {notices.data.map((notice) => {
                const file = mediaUrl(notice.document);
                return (
                  <li key={notice.documentId} className="border-b border-line py-4">
                    <p className="text-sm text-muted">
                      {notice.category}, <time dateTime={notice.publishedOn}>{formatDate(notice.publishedOn)}</time>
                    </p>
                    <p className="font-medium text-ledger-900">
                      {file ? (
                        <a href={file} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                          {notice.title}
                        </a>
                      ) : (
                        notice.title
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-6">
              <EmptyState title="No notices yet">Published notices appear here.</EmptyState>
            </div>
          )}
        </section>
      </Container>

      {/* Intro and holders */}
      <section className="mt-16 bg-ledger-900 text-white">
        <Container className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">{home?.introTitle ?? "What we do"}</h2>
            <p className="mt-4 max-w-[58ch] text-ledger-100">
              {home?.introBody ??
                "The Authority receives unclaimed financial assets from the institutions that hold them, safeguards them, and reunites them with their rightful owners."}
            </p>
            <Link
              href="/about/about-ufaa"
              className="mt-6 inline-block rounded-sm border-2 border-white px-5 py-2.5 font-semibold hover:bg-white hover:text-ledger-900"
            >
              About the Authority
            </Link>
          </div>
          <div className="border-l-4 border-ochre pl-6">
            <h2 className="font-serif text-2xl">Are you a holder of assets?</h2>
            <p className="mt-3 max-w-[56ch] text-ledger-100">
              Banks, insurers, SACCOs, pension schemes and public bodies report and surrender unclaimed assets to the
              Authority. Find the forms and guidance you need.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/publications?category=Holder%20Form" className="rounded-sm bg-ochre px-5 py-2.5 font-semibold text-ledger-950 hover:bg-white">
                Holder forms
              </Link>
              <Link href="/faqs?category=Holders" className="rounded-sm border-2 border-white px-5 py-2.5 font-semibold hover:bg-white hover:text-ledger-900">
                Holder questions
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
