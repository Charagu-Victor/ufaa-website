import type { Metadata } from "next";
import { AssetJourney } from "@/components/AssetJourney";
import { Container, PageHeader } from "@/components/ui";
import { getSiteSettings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Services",
  description: "Find UFAA services for asset owners and holders, including online, mobile and assisted options.",
};

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const claimHref = settings.claimPortalUrl ?? "https://reunify.ufaa.go.ke";
  const ussdCode = settings.ussdCode ?? "*361#";

  return (
    <>
      <PageHeader
        title="Services and support"
        intro="Choose the path that fits your needs, whether you are searching for assets or reporting them as a holder."
        crumbs={[{ label: "Services" }]}
      />

      <AssetJourney claimHref={claimHref} ussdCode={settings.ussdCode} />

      <section className="border-t border-line bg-white py-12 sm:py-14" aria-labelledby="service-channels-heading">
        <Container>
          <div className="mb-7 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ledger-700">Choose a channel</p>
            <h2 id="service-channels-heading" className="mt-1 text-3xl font-bold text-ledger-900">Reach UFAA your way</h2>
            <p className="mt-3 text-muted">Use the online portal, mobile app or phone-based services to get started.</p>
          </div>

          <div className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="flex flex-col rounded-xl border border-[#f9e49d] bg-paper p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c39545] hover:bg-white hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[#c39545] focus-within:bg-white focus-within:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-ledger-700">Online portal</p>
              <h3 className="mt-2 text-lg font-bold text-ledger-900">Search and claim</h3>
              {/*<p className="mt-2 text-sm leading-relaxed text-muted">Search for assets and follow the online claim process.</p>*/}
              <a href={claimHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-ledger-900 px-3 py-1.5 text-sm font-bold text-white hover:bg-ledger-800">Open claim portal <span className="ml-2" aria-hidden="true">→</span></a>
            </article>

            <article className="flex flex-col rounded-xl border border-[#f9e49d] bg-paper p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c39545] hover:bg-white hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[#c39545] focus-within:bg-white focus-within:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-ledger-700">Mobile app</p>
              <h3 className="mt-2 text-lg font-bold text-ledger-900">Claim on the go</h3>
              {/*<p className="mt-2 text-sm leading-relaxed text-muted">Use the UFAA app to search and manage a claim from your phone.</p>*/}
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={settings.playStoreUrl ?? "https://play.google.com/store/apps/details?id=com.ufaa.ereunify_mobile"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-ledger-900/20 px-2.5 py-1.5 text-sm font-semibold text-ledger-900 transition duration-200 hover:-translate-y-0.5 hover:border-ledger-900 hover:bg-ledger-900 hover:text-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger-700">Google Play </a>
                <a href={settings.appStoreUrl ?? "https://apps.apple.com/my/app/ufaa-reunite/id6812353264"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-ledger-900/20 px-2.5 py-1.5 text-sm font-semibold text-ledger-900 transition duration-200 hover:-translate-y-0.5 hover:border-ledger-900 hover:bg-ledger-900 hover:text-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger-700">App Store</a>
              </div>
            </article>

            <article className="flex flex-col rounded-xl border border-[#f9e49d] bg-paper p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c39545] hover:bg-white hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[#c39545] focus-within:bg-white focus-within:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-ledger-700">USSD</p>
              <h3 className="mt-2 text-lg font-bold text-ledger-900">Use any phone</h3>
              {/*<p className="mt-2 text-sm leading-relaxed text-muted">Access UFAA&apos;s mobile service without an internet connection.</p>*/}
              <a href={`tel:${ussdCode.replaceAll("#", "%23")}`} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#f9e49d] px-3 py-1.5 text-sm font-bold text-ledger-950">Dial {ussdCode}</a>
            </article>

            <article className="flex flex-col rounded-xl border border-[#f9e49d] bg-paper p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c39545] hover:bg-white hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[#c39545] focus-within:bg-white focus-within:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-ledger-700">WhatsApp</p>
              <h3 className="mt-2 text-lg font-bold text-ledger-900">Chat with UFAA</h3>
              {/*<p className="mt-2 text-sm leading-relaxed text-muted">Get help using UFAA&apos;s official WhatsApp service.</p>*/}
              <a href={settings.whatsappUrl ?? "/contact"} target={settings.whatsappUrl ? "_blank" : undefined} rel={settings.whatsappUrl ? "noopener noreferrer" : undefined} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-ledger-900/20 px-3 py-1.5 text-sm font-semibold text-ledger-900 hover:bg-white">{settings.whatsappUrl ? "Open WhatsApp" : "Contact UFAA"}</a>
            </article>

            {/*<article className="flex flex-col rounded-xl border border-line bg-paper p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ledger-700">SMS</p>
              <h3 className="mt-2 text-lg font-bold text-ledger-900">SMS services</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">View UFAA&apos;s current SMS service instructions.</p>
              <a href={settings.smsInstructionsUrl ?? "/contact"} target={settings.smsInstructionsUrl ? "_blank" : undefined} rel={settings.smsInstructionsUrl ? "noopener noreferrer" : undefined} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-ledger-900/20 px-3 py-1.5 text-sm font-semibold text-ledger-900 hover:bg-white">{settings.smsInstructionsUrl ? "View SMS instructions" : "Contact UFAA"}</a>
            </article>*/}
          </div>
        </Container>
      </section>
    </>
  );
}
