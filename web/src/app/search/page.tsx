import type { Metadata } from "next";
import Link from "next/link";
import { Container, EmptyState, PageHeader } from "@/components/ui";
import { formatDate, mediaUrl, plainText } from "@/lib/format";
import { searchSite } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Search the site",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ q?: string }> };

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="border-b-2 border-ledger-900 pb-2 font-serif text-2xl text-ledger-900">{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

const itemClass = "border-b border-line py-4";
const linkClass = "font-serif text-xl text-ledger-900 hover:underline underline-offset-4";

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const term = q?.trim() ?? "";
  const results = term.length >= 2 ? await searchSite(term) : null;
  const total = results
    ? results.news.length + results.notices.length + results.pages.length + results.publications.length + results.faqs.length
    : 0;

  return (
    <>
      <PageHeader title="Search the site" crumbs={[{ label: "Search" }]} />
      <Container className="py-10">
        <form action="/search" role="search" className="mb-10 flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">
            Search news, notices, pages, publications and questions
          </label>
          <input
            id="q"
            name="q"
            defaultValue={term}
            placeholder="Search news, notices, forms and questions"
            className="w-full rounded-sm border border-ledger-900 bg-white px-4 py-2.5"
          />
          <button type="submit" className="rounded-sm bg-ledger-900 px-5 py-2.5 font-semibold text-white hover:bg-ledger-950">
            Search
          </button>
        </form>

        {!results ? (
          <EmptyState title="Type at least two letters">Search covers news, notices, pages, publications and FAQs.</EmptyState>
        ) : total === 0 ? (
          <EmptyState title={`Nothing found for "${term}"`}>Try a shorter or different word.</EmptyState>
        ) : (
          <>
            {results.pages.length > 0 && (
              <Group title="Pages">
                {results.pages.map((page) => (
                  <li key={page.documentId} className={itemClass}>
                    <Link className={linkClass} href={page.parent === "none" ? `/${page.slug}` : `/${page.parent}/${page.slug}`}>
                      {page.title}
                    </Link>
                    <p className="text-muted">{page.summary ?? plainText(page.body)}</p>
                  </li>
                ))}
              </Group>
            )}
            {results.news.length > 0 && (
              <Group title="News">
                {results.news.map((item) => (
                  <li key={item.documentId} className={itemClass}>
                    <Link className={linkClass} href={`/news/${item.slug}`}>{item.title}</Link>
                    <p className="text-sm text-muted">{formatDate(item.publishedOn)}</p>
                    <p className="text-muted">{item.summary}</p>
                  </li>
                ))}
              </Group>
            )}
            {results.notices.length > 0 && (
              <Group title="Notices">
                {results.notices.map((item) => (
                  <li key={item.documentId} className={itemClass}>
                    <a className={linkClass} href={mediaUrl(item.document) ?? "/notices"}>{item.title}</a>
                    <p className="text-sm text-muted">{formatDate(item.publishedOn)}</p>
                  </li>
                ))}
              </Group>
            )}
            {results.publications.length > 0 && (
              <Group title="Publications and forms">
                {results.publications.map((item) => (
                  <li key={item.documentId} className={itemClass}>
                    <a className={linkClass} href={mediaUrl(item.file) ?? "/publications"}>{item.title}</a>
                    <p className="text-sm text-muted">{item.category}</p>
                  </li>
                ))}
              </Group>
            )}
            {results.faqs.length > 0 && (
              <Group title="Questions">
                {results.faqs.map((item) => (
                  <li key={item.documentId} className={itemClass}>
                    <Link className={linkClass} href={`/faqs?category=${item.category}`}>{item.question}</Link>
                  </li>
                ))}
              </Group>
            )}
          </>
        )}
      </Container>
    </>
  );
}
