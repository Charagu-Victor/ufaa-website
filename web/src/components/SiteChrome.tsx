import Link from "next/link";
import { getPageIndex, getSiteSettings } from "@/lib/strapi";
import type { SiteSetting } from "@/lib/types";
import { mediaUrl } from "@/lib/format";
import { Container } from "./ui";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; href: string; items: NavItem[] };

/** Builds the main navigation from CMS pages plus the fixed UFAA sections. */
function buildNav(settings: SiteSetting, pages: Awaited<ReturnType<typeof getPageIndex>>): NavGroup[] {
  const configuredLinks = (links: SiteSetting["knowledgeHubLinks"], fallback: NavItem[]): NavItem[] =>
    links?.length ? links.map(({ label, href }) => ({ label, href })) : fallback;

  const trustFundPage = pages.find((page) => /trust.?fund/i.test(`${page.title} ${page.slug}`));
  const groups: NavGroup[] = [
    {
      label: "About",
      href: settings.aboutLinks?.[0]?.href ?? "/about/about-ufaa",
      items: configuredLinks(settings.aboutLinks, [
        { label: "About Us", href: "/about/about-ufaa" },
        { label: "Board Of Directors", href: "/leadership#board-of-directors" },
        { label: "Management Team", href: "/leadership#management-team" },
        { label: "Access To Information", href: "/about/access-to-information" },
      ]),
    },
    {
      label: "Find & Claim",
      href: "/find-claim",
      items: configuredLinks(settings.findClaimLinks, [
        { label: "Find Assets", href: "/find-claim" },
        { label: "Claiming Instructions", href: "/find-and-claim/claiming-instructions" },
        { label: "No Objection Notice", href: "/find-and-claim/no-objection-notice" },
        { label: "Reunification Agency", href: "/find-and-claim/reunification-agency" },
      ]),
    },
    {
      label: "Report Assets",
      href: "/holders/login",
      items: configuredLinks(settings.reportAssetsLinks, [
        { label: "Compliance Notice", href: "/holders/compliance-notice" },
        { label: "Reporting Instructions", href: "/holders/reporting-instructions" },
        { label: "Bank Details", href: "/publications" },
        { label: "Asset Codes", href: "/publications" },
        { label: "Report Assets", href: "/holders/login" },
      ]),
    },
    {
      label: "Trust Fund",
      href: trustFundPage ? `/services/${trustFundPage.slug}` : "/services/trust-fund",
      items: [],
    },
    {
      label: "Procurement",
      href: "/tenders",
      items: configuredLinks(settings.procurementLinks, [
        { label: "Tenders On EGP", href: "/tenders" },
        { label: "Procurement Plan", href: "/publications" },
        { label: "E-Procurement", href: "https://eprocurement.ufaa.go.ke" },
      ]),
    },
    {
      label: "Knowledge Hub",
      href: "/publications",
      items: configuredLinks(settings.knowledgeHubLinks, [
        { label: "Publications and forms", href: "/publications" },
        { label: "Frequently asked questions", href: "/faqs" },
        { label: "News", href: "/news" },
        { label: "Notices", href: "/notices" },
      ]),
    },
    { label: "Careers", href: "/vacancies", items: [] },
  ];

  return groups;
}

export async function SiteHeader() {
  const [settings, pages] = await Promise.all([getSiteSettings(), getPageIndex()]);
  const groups = buildNav(settings, pages);
  const logoUrl = mediaUrl(settings.logo);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-ochre focus:px-4 focus:py-2 focus:font-semibold focus:text-ledger-950"
      >
        Skip to main content
      </a>

      {settings.alertText && (
        <div className="bg-ochre-soft text-ledger-950">
          <Container className="py-2 text-center text-sm font-medium">
            {settings.alertLink ? (
              <Link href={settings.alertLink} className="underline underline-offset-4">
                {settings.alertText}
              </Link>
            ) : (
              settings.alertText
            )}
          </Container>
        </div>
      )}

      <div className="border-b border-[#ead990] bg-[#fae79f] text-ledger-900">
        <Container className="!max-w-[1640px] !px-4 flex min-h-10 items-center justify-between gap-4 py-1.5 text-xs font-semibold sm:!px-6 sm:text-[13px] 2xl:!px-10">
          <p className="hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.12em] text-ledger-800 lg:block">
            Receive <span className="mx-1 text-[#b28c10]">·</span> Safeguard <span className="mx-1 text-[#b28c10]">·</span> Reunite
          </p>
          <div className="ml-auto flex min-w-0 items-center justify-end gap-3 overflow-x-auto sm:gap-5 lg:ml-0">
          {[
            { label: "0140100100", href: "tel:0140100100" },
            { label: "0706 866 984", href: "tel:+254706866984" },
            { label: "020 402300", href: "tel:+25420402300" },
            { label: `USSD ${settings.ussdCode ?? "*361#"}`, href: "tel:*361%23" },
          ].map((phone, index) => (
            <a key={phone.label} href={phone.href} className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-ledger-900 transition-colors hover:text-ledger-700 ${index === 0 || index === 2 ? "hidden sm:inline-flex" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3.5h4l2 5-2.5 1.8a16 16 0 0 0 5.7 5.7l1.8-2.5 5 2v4c0 1.1-.9 2-2 2C10 21.5 2.5 14 2.5 5.5c0-1.1.9-2 2-2Z" />
                <path d="M14 3a7 7 0 0 1 7 7M14 6a4 4 0 0 1 4 4" />
              </svg>
              {phone.label}
            </a>
          ))}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-ledger-900 transition-colors hover:text-ledger-700 sm:inline-flex">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
                <path d="m3.5 6 8.5 7 8.5-7" />
              </svg>
              {settings.email}
            </a>
          )}
          <Link href="/search" aria-label="Search the UFAA website" className="ml-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-ledger-900/15 bg-white/60 text-ledger-800 transition hover:border-ledger-900 hover:bg-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="10.8" cy="10.8" r="7.2" />
              <path d="m16 16 5 5" />
            </svg>
          </Link>
          </div>
        </Container>
      </div>

      <header className="relative z-30 border-b border-line/80 bg-white text-ledger-900">
        <Container className="!max-w-[1640px] !px-4 relative flex min-h-[88px] items-center justify-start gap-4 py-3 sm:min-h-[104px] sm:!px-6 sm:py-4 xl:gap-5 2xl:!px-10">
          <Link href="/" className="flex flex-col leading-tight" aria-label={`${settings.siteName}, home`}>
            {logoUrl ? (
              // Use the CMS logo when configured, with the UFAA wordmark as a fallback.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={`${settings.siteName} logo`}
                className="h-auto max-h-[82px] w-auto max-w-[min(60vw,380px)] object-contain sm:max-h-[94px] min-[1500px]:max-w-[380px]"
              />
            ) : (
              <span className="flex max-w-[min(78vw,420px)] items-center gap-2 sm:gap-3" aria-label={`${settings.siteName} logo`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Coat_of_arms_of_Kenya_(Official).svg"
                  alt=""
                  className="h-11 w-9 shrink-0 object-contain sm:h-[68px] sm:w-14"
                />
                <span aria-hidden="true" className="h-10 w-1 shrink-0 bg-[linear-gradient(to_bottom,#111_0_18%,#fff_18%_25%,#c8102e_25%_75%,#fff_75%_82%,#006b3f_82%)] sm:h-[68px]" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.greatkenyanjobs.com/jsjobsdata/data/employer/comp_4968/logo/Unclaimed%20Financial%20Assets%20Authority.jpg"
                  alt=""
                  className="size-12 shrink-0 object-contain sm:size-[68px]"
                />
                <span aria-hidden="true" className="h-9 shrink-0 border-l border-ledger-900/30 sm:h-14" />
                <span className="max-w-36 text-[10px] font-extrabold uppercase leading-[1.08] tracking-tight text-ledger-900 sm:max-w-48 sm:text-sm">
                  Unclaimed<br />Financial<br />Assets<br />Authority
                </span>
              </span>
            )}
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center justify-center gap-0 min-[1100px]:flex 2xl:gap-1 min-[1800px]:gap-2">
            {groups.map((group) => (
              <div key={group.label} className="group relative">
                {group.items.length > 0 && group.href ? (
                  <Link
                    href={group.href}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors 2xl:px-2.5 2xl:text-sm min-[1800px]:px-3 ${group.label === "Find & Claim" ? "bg-ledger-900 text-white shadow-sm hover:bg-ledger-800" : "hover:bg-ledger-50 hover:text-ledger-700"}`}
                    aria-haspopup="true"
                  >
                    {group.label}
                    <svg aria-hidden="true" viewBox="0 0 12 8" className="size-3 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m1.5 2 4.5 4 4.5-4" /></svg>
                  </Link>
                ) : (
                  <Link href={group.href} className="inline-flex items-center rounded-full px-2 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors hover:bg-ledger-50 hover:text-ledger-700 2xl:px-2.5 2xl:text-sm min-[1800px]:px-3">
                    {group.label}
                  </Link>
                )}
                {group.items.length > 0 && (
                  <ul className="invisible absolute left-0 top-full z-40 min-w-64 translate-y-1 rounded-2xl border border-line bg-white p-2 text-ink opacity-0 shadow-[0_18px_45px_rgba(20,32,77,0.16)] transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {group.items.map((item, index) => (
                      <li key={`${group.label}-${item.label}-${item.href}-${index}`}>
                        <Link href={item.href} className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ledger-50 hover:text-ledger-900">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <details className="relative ml-auto min-[1100px]:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-line px-4 py-2.5 font-semibold text-ledger-900 transition hover:border-ledger-900/30 hover:bg-ledger-50">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-full z-40 mt-3 w-[min(88vw,24rem)] rounded-2xl border border-line bg-white p-3 text-ink shadow-[0_18px_45px_rgba(20,32,77,0.16)]"
            >
              {groups.map((group) => (
                <div key={group.label} className="border-b border-line/70 px-2 py-2 last:border-0">
                  {group.href && (
                    <Link href={group.href} className="block rounded-lg py-1 font-semibold text-ledger-900 hover:text-ledger-700">
                      {group.label}
                    </Link>
                  )}
                  {group.items.length > 0 && <ul className="mt-1 border-l-2 border-ochre pl-3">
                    {group.items.map((item, index) => (
                      <li key={`${group.label}-${item.label}-${item.href}-${index}`}>
                        <Link href={item.href} className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-ledger-50 hover:text-ledger-900">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>}
                </div>
              ))}
            </nav>
          </details>
        </Container>
      </header>
    </>
  );
}

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const logoUrl = mediaUrl(settings.logo);
  const socials = [
    { label: "Facebook", href: settings.facebookUrl },
    { label: "X", href: settings.xUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "YouTube", href: settings.youtubeUrl },
    { label: "Instagram", href: settings.instagramUrl },
  ].filter((social): social is { label: string; href: string } => Boolean(social.href));

  const column = "text-sm text-ledger-100";
  const link = "underline-offset-4 hover:text-white hover:underline";

  return (
    <footer className="mt-16 bg-ledger-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={`${settings.siteName} logo`} className="h-auto max-h-16 max-w-64 object-contain" />
          ) : (
            <p className="font-serif text-2xl font-bold">{settings.shortName}</p>
          )}
          <p className={`mt-2 ${column}`}>{settings.tagline}</p>
          {settings.ussdCode && (
            <p className="mt-4 text-sm">
              Check by phone: dial <strong className="text-ochre">{settings.ussdCode}</strong>
            </p>
          )}
        </div>

        <div className={column}>
          <p className="mb-3 font-serif text-lg text-white">Quick links</p>
          <ul className="space-y-1.5">
            <li><Link className={link} href="/find-claim">Search and claim</Link></li>
            <li><Link className={link} href="/news">News</Link></li>
            <li><Link className={link} href="/notices">Notices</Link></li>
            <li><Link className={link} href="/publications">Publications and forms</Link></li>
            <li><Link className={link} href="/faqs">Frequently asked questions</Link></li>
          </ul>
        </div>

        <div className={column}>
          <p className="mb-3 font-serif text-lg text-white">Get in touch</p>
          <address className="space-y-2 not-italic">
            {settings.physicalAddress && <p>{settings.physicalAddress}</p>}
            {settings.postalAddress && <p>{settings.postalAddress}</p>}
            {settings.phones && <p className="whitespace-pre-line">{settings.phones}</p>}
            {settings.email && (
              <p>
                <a className={link} href={`mailto:${settings.email}`}>{settings.email}</a>
              </p>
            )}
          </address>
        </div>

        <div className={column}>
          <p className="mb-3 font-serif text-lg text-white">Follow us</p>
          {socials.length > 0 ? (
            <ul className="space-y-1.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a className={link} href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Social links are added in the CMS under Site Setting.</p>
          )}
        </div>
      </Container>
      <div className="border-t border-ledger-800">
        <Container className="py-5 text-sm text-ledger-100">
          <p>{settings.footerNote}</p>
          <p className="mt-1">© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
