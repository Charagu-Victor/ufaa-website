import type { Metadata } from "next";
import { Container, DownloadLink, EmptyState, FilterChips, ListRow, PageHeader, Pager, Tag } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { listNotices } from "@/lib/strapi";
import { NOTICE_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "Notices",
  description: "Public notices, unclaimed asset listings and holder notices from the Authority.",
};

type Props = { searchParams: Promise<{ page?: string; category?: string }> };

export default async function NoticesPage({ searchParams }: Props) {
  const { page, category } = await searchParams;
  const result = await listNotices({ page: Number(page) || 1, category });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader
        title="Notices"
        intro="Public notices, listings of unclaimed assets and notices to holders."
        crumbs={[{ label: "Notices" }]}
      />
      <Container className="py-10">
        <FilterChips basePath="/notices" options={NOTICE_CATEGORIES} active={category} />
        {result.data.length === 0 ? (
          <EmptyState title="No notices found">
            {category ? "Try another category, or view all notices." : "Published notices appear here."}
          </EmptyState>
        ) : (
          <ul className="border-t border-line">
            {result.data.map((notice) => {
              const expired = notice.expiresOn ? notice.expiresOn < today : false;
              return (
                <ListRow
                  key={notice.documentId}
                  title={notice.title}
                  badge={<Tag>{notice.category}</Tag>}
                  meta={
                    <>
                      Published <time dateTime={notice.publishedOn}>{formatDate(notice.publishedOn)}</time>
                      {expired && <span className="ml-2 font-semibold text-clay">Expired</span>}
                    </>
                  }
                  description={notice.description}
                  action={<DownloadLink file={notice.document} />}
                />
              );
            })}
          </ul>
        )}
        <Pager pagination={result.meta.pagination} basePath="/notices" query={{ category }} />
      </Container>
    </>
  );
}
