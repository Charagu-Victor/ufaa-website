import type { Metadata } from "next";
import { Container, EmptyState, FilterChips, Markdown, PageHeader } from "@/components/ui";
import { listFaqs } from "@/lib/strapi";
import type { Faq } from "@/lib/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Answers about searching for, claiming and reporting unclaimed financial assets.",
};

const CATEGORIES: Faq["category"][] = ["General", "Claims", "Beneficiaries", "Holders"];

type Props = { searchParams: Promise<{ category?: string }> };

export default async function FaqPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const all = await listFaqs();
  const faqs = category ? all.filter((faq) => faq.category === category) : all;
  const groups = CATEGORIES.map((name) => ({ name, items: faqs.filter((faq) => faq.category === name) })).filter(
    (group) => group.items.length > 0,
  );

  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        intro="Quick answers about searching, claiming and reporting unclaimed assets."
        crumbs={[{ label: "Frequently asked questions" }]}
      />
      <Container className="py-10">
        <FilterChips basePath="/faqs" options={CATEGORIES} active={category} />
        {groups.length === 0 ? (
          <EmptyState title="No questions found">Published FAQs appear here.</EmptyState>
        ) : (
          groups.map((group) => (
            <section key={group.name} className="mb-10" aria-labelledby={`faq-${group.name}`}>
              <h2 id={`faq-${group.name}`} className="mb-2 border-b-2 border-ledger-900 pb-2 font-serif text-2xl text-ledger-900">
                {group.name}
              </h2>
              <div className="max-w-3xl">
                {group.items.map((faq) => (
                  <details key={faq.documentId} className="group border-b border-line py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ledger-900">
                      {faq.question}
                      <span aria-hidden="true" className="text-ochre transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="mt-3">
                      <Markdown>{faq.answer}</Markdown>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))
        )}
      </Container>
    </>
  );
}
