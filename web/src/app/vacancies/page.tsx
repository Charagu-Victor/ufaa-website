import type { Metadata } from "next";
import { Container, DownloadLink, EmptyState, ListRow, PageHeader, Pager, StatusBadge } from "@/components/ui";
import { formatDateTime, isOpen } from "@/lib/format";
import { listVacancies } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Vacancies",
  description: "Job opportunities at the Unclaimed Financial Assets Authority.",
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function VacanciesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const result = await listVacancies({ page: Number(page) || 1 });

  return (
    <>
      <PageHeader
        title="Vacancies"
        intro="Current openings at the Authority. Closing times are in East Africa Time."
        crumbs={[{ label: "Vacancies" }]}
      />
      <Container className="py-10">
        {result.data.length === 0 ? (
          <EmptyState title="No vacancies right now">New openings appear here when they are published.</EmptyState>
        ) : (
          <ul className="border-t border-line">
            {result.data.map((job) => {
              const open = isOpen(job.vacancyStatus, job.closingDate);
              return (
                <ListRow
                  key={job.documentId}
                  title={job.title}
                  badge={<StatusBadge open={open} />}
                  meta={
                    <>
                      {job.reference && <span className="mr-3">Reference: {job.reference}</span>}
                      {job.jobGroup && <span className="mr-3">Job group: {job.jobGroup}</span>}
                      Closes <time dateTime={job.closingDate}>{formatDateTime(job.closingDate)}</time>
                    </>
                  }
                  action={<DownloadLink file={job.document} label="Advert" />}
                />
              );
            })}
          </ul>
        )}
        <Pager pagination={result.meta.pagination} basePath="/vacancies" />
      </Container>
    </>
  );
}
