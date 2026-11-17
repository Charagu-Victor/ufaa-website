import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, EmptyState, FilterChips, PageHeader, Pager, Tag } from "@/components/ui";
import { formatDate, mediaUrl } from "@/lib/format";
import { listNews } from "@/lib/strapi";
import { NEWS_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "News",
  description: "News, press releases and events from the Unclaimed Financial Assets Authority.",
};

type Props = { searchParams: Promise<{ page?: string; category?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const { page, category } = await searchParams;
  const result = await listNews({ page: Number(page) || 1, pageSize: 9, category });

  return (
    <>
      <PageHeader title="News" intro="Press releases, events and updates from the Authority." crumbs={[{ label: "News" }]} />
      <Container className="py-10">
        <FilterChips basePath="/news" options={NEWS_CATEGORIES} active={category} />

        {result.data.length === 0 ? (
          <EmptyState title="No news found">
            {category ? "Try another category, or view all news." : "Published news articles appear here."}
          </EmptyState>
        ) : (
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((item) => {
              const cover = mediaUrl(item.cover);
              return (
                <li key={item.documentId}>
                  <article>
                    {cover && item.cover && (
                      <Image
                        src={cover}
                        alt={item.cover.alternativeText ?? ""}
                        width={item.cover.width ?? 800}
                        height={item.cover.height ?? 450}
                        unoptimized
                        className="mb-3 aspect-video w-full rounded-sm object-cover"
                      />
                    )}
                    <p className="flex items-center gap-2 text-sm text-muted">
                      <Tag>{item.category}</Tag>
                      <time dateTime={item.publishedOn}>{formatDate(item.publishedOn)}</time>
                    </p>
                    <h2 className="mt-2 font-serif text-xl leading-snug text-ledger-900">
                      <Link href={`/news/${item.slug}`} className="hover:underline underline-offset-4">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-muted">{item.summary}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <Pager pagination={result.meta.pagination} basePath="/news" query={{ category }} />
      </Container>
    </>
  );
}
