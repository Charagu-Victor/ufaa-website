import type { Metadata } from "next";
import { Container, DownloadLink, EmptyState, ListRow, PageHeader, Pager, StatusBadge } from "@/components/ui";
import { formatDateTime, isOpen } from "@/lib/format";
import { listTenders } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Tenders",
  description: "Open and past tenders issued by the Unclaimed Financial Assets Authority.",
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function TendersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const result = await listTenders({ page: Number(page) || 1 });

  return (
    <>
      <PageHeader
        title="Tenders"
        intro="Current and past tenders. Closing times are in East Africa Time."
        crumbs={[{ label: "Tenders" }]}
      />
      <Container className="py-10">
        {result.data.length === 0 ? (
          <EmptyState title="No tenders published">New tenders appear here when they are published.</EmptyState>
        ) : (
          <ul className="border-t border-line">
            {result.data.map((tender) => {
              const open = isOpen(tender.tenderStatus, tender.closingDate);
              const label = tender.tenderStatus === "Open" && !open ? "Closed" : tender.tenderStatus;
              return (
                <ListRow
                  key={tender.documentId}
                  title={tender.title}
                  badge={<StatusBadge open={open} label={label} />}
                  meta={
                    <>
                      {tender.reference && <span className="mr-3">Reference: {tender.reference}</span>}
                      Closes <time dateTime={tender.closingDate}>{formatDateTime(tender.closingDate)}</time>
                    </>
                  }
                  action={
                    <div className="flex flex-col items-start gap-2">
                      {(tender.document ?? []).map((file) => (
                        <DownloadLink key={file.id} file={file} label={file.name} />
                      ))}
                    </div>
                  }
                />
              );
            })}
          </ul>
        )}
        <Pager pagination={result.meta.pagination} basePath="/tenders" />
      </Container>
    </>
  );
}
