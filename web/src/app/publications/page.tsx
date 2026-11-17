import type { Metadata } from "next";
import { Container, DownloadLink, EmptyState, FilterChips, ListRow, PageHeader, Pager, Tag } from "@/components/ui";
import { listPublications } from "@/lib/strapi";
import { PUBLICATION_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "Publications and forms",
  description: "Annual reports, strategic plans, the service charter, policies, claim forms and holder forms.",
};

type Props = { searchParams: Promise<{ page?: string; category?: string }> };

export default async function PublicationsPage({ searchParams }: Props) {
  const { page, category } = await searchParams;
  const result = await listPublications({ page: Number(page) || 1, category });

  return (
    <>
      <PageHeader
        title="Publications and forms"
        intro="Reports, policies, the service charter and the forms you need to claim or to report assets."
        crumbs={[{ label: "Publications and forms" }]}
      />
      <Container className="py-10">
        <FilterChips basePath="/publications" options={PUBLICATION_CATEGORIES} active={category} />
        {result.data.length === 0 ? (
          <EmptyState title="Nothing in this category yet">
            {category ? "Try another category, or view everything." : "Uploaded documents appear here."}
          </EmptyState>
        ) : (
          <ul className="border-t border-line">
            {result.data.map((item) => (
              <ListRow
                key={item.documentId}
                title={item.title}
                href={`/publications/${item.slug}`}
                badge={<Tag>{item.category}</Tag>}
                meta={item.year ? `Year: ${item.year}` : undefined}
                description={item.description}
                action={<DownloadLink file={item.file} />}
              />
            ))}
          </ul>
        )}
        <Pager pagination={result.meta.pagination} basePath="/publications" query={{ category }} />
      </Container>
    </>
  );
}
