import type { Metadata } from "next";
import Image from "next/image";
import { Container, Markdown, PageHeader } from "@/components/ui";
import { mediaUrl } from "@/lib/format";
import { listDepartments } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore the departments that deliver the Unclaimed Financial Assets Authority's mandate.",
};

export default async function DepartmentsPage() {
  const departments = await listDepartments();

  return (
    <>
      <PageHeader
        title="Our divisions"
        intro="Meet the teams responsible for receiving, safeguarding and reuniting unclaimed financial assets."
        crumbs={[{ label: "About", href: "/about/about-ufaa" }, { label: "Departments" }]}
      />
      <Container className="py-10 sm:py-14">
        {departments.length ? (
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((department) => {
              const image = mediaUrl(department.image);
              return (
                <li key={department.documentId} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,32,77,0.10)]">
                  {image && department.image ? (
                    <Image src={image} alt={department.image.alternativeText ?? ""} width={department.image.width ?? 800} height={department.image.height ?? 440} unoptimized className="aspect-[16/8] w-full object-cover" />
                  ) : (
                    <div className="h-2 bg-gradient-to-r from-ochre via-ochre to-ledger-900" />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-ledger-900">{department.name}</h2>
                    <p className="mt-3 leading-relaxed text-muted">{department.summary}</p>
                    {department.mandate && <div className="mt-4 border-l-2 border-ochre pl-4 text-sm text-ink"><Markdown>{department.mandate}</Markdown></div>}
                    {department.services && <div className="mt-4"><h3 className="text-sm font-bold text-ledger-900">Services</h3><Markdown>{department.services}</Markdown></div>}
                    {(department.head || department.email || department.phone) && (
                      <dl className="mt-5 grid gap-2 border-t border-line pt-4 text-sm">
                        {department.head && <div><dt className="font-semibold text-ledger-900">Department head</dt><dd className="text-muted">{department.head}</dd></div>}
                        {department.email && <div><dt className="sr-only">Email</dt><dd><a className="text-ledger-700 underline underline-offset-4" href={`mailto:${department.email}`}>{department.email}</a></dd></div>}
                        {department.phone && <div><dt className="sr-only">Telephone</dt><dd><a className="text-ledger-700 underline underline-offset-4" href={`tel:${department.phone}`}>{department.phone}</a></dd></div>}
                      </dl>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-ledger-900">Department profiles are being prepared</h2>
            <p className="mt-2 text-muted">Published profiles will appear here when they are available.</p>
          </div>
        )}
      </Container>
    </>
  );
}
