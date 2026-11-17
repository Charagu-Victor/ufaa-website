import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/components/views";
import { Container, PageHeader } from "@/components/ui";
import { mediaUrl, plainText } from "@/lib/format";
import { isSection } from "@/lib/sections";
import { getPage, getPageIndex } from "@/lib/strapi";

export const revalidate = 300;

type Props = { params: Promise<{ section: string; slug: string }> };

export async function generateStaticParams() {
  const pages = await getPageIndex();
  return pages.filter((page) => page.parent !== "none").map((page) => ({ section: page.parent, slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const page = await getPage(slug, section);
  if (!page && section === "services" && slug === "trust-fund") {
    return {
      title: "Unclaimed Assets Trust Fund",
      description: "How the Unclaimed Assets Trust Fund receives remittances and pays rightful owners.",
    };
  }
  if (!page) return {};
  const image = mediaUrl(page.seo?.shareImage ?? page.cover);
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? page.summary ?? plainText(page.body),
    openGraph: image ? { images: [image] } : undefined,
  };
}

function TrustFundFallback() {
  const figures = [
    { value: "KSh 115.03B", label: "Remittances received into the Trust Fund" },
    { value: "2.03B", label: "Units of shares reported" },
    { value: "4,200", label: "Safe deposit boxes reported" },
    { value: "9.9M", label: "Units of trusts reported" },
    { value: "KSh 2.84B", label: "Claims paid to 39,203 claimants" },
  ];

  return (
    <>
      <PageHeader
        title="Unclaimed Assets Trust Fund"
        intro="The Fund receives unclaimed assets and pays them to their rightful owners when identified."
        crumbs={[{ label: "Services" }, { label: "Trust Fund" }]}
      />
      <Container className="py-10 sm:py-12">
        <section aria-labelledby="trust-fund-status">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-ledger-700">The Fund</p>
          <h2 id="trust-fund-status" className="mt-1 text-2xl font-bold text-ledger-900 sm:text-3xl">Status of the Unclaimed Assets Trust Fund</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-muted">
            The Unclaimed Assets Trust Fund was created under Section 44 of the Unclaimed Financial Assets Act, No. 40 of 2011. It is vested in, and operated and managed by the Authority.
          </p>
          <p className="mt-4 max-w-4xl leading-relaxed text-muted">
            The Fund receives remittances from holders for money that becomes or is deemed to be unclaimed assets, and other payments required by the Act or by any other written law to be paid into the Fund. Once identified, payments are made from the Fund to the rightful owners of unclaimed assets.
          </p>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Trust Fund figures">
          {figures.map((figure) => (
            <article key={figure.label} className="rounded-xl border border-line border-t-4 border-t-ochre bg-white p-5 shadow-sm">
              <p className="font-serif text-2xl font-bold leading-tight text-ledger-900">{figure.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{figure.label}</p>
            </article>
          ))}
        </section>

        <p className="mt-8 max-w-4xl leading-relaxed text-muted">
          The Unclaimed Financial Assets Regulations, 2016 formalize processes relating to the management of unclaimed financial assets.
        </p>
      </Container>
    </>
  );
}

export default async function CmsPageRoute({ params }: Props) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();
  const page = await getPage(slug, section);
  if (!page) {
    if (section === "services" && slug === "trust-fund") return <TrustFundFallback />;
    notFound();
  }
  return <CmsPageView page={page} />;
}
