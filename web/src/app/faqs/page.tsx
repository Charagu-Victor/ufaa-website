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
      <Container className="py-8 sm:py-12">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ledger-700">Find an answer</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-ledger-900">Browse by topic</h2>
          </div>
          <p className="text-sm font-medium text-muted" aria-live="polite">
            {faqs.length} {faqs.length === 1 ? "answer" : "answers"}
            {category ? ` in ${category}` : " across all topics"}
          </p>
        </div>
        <FilterChips basePath="/faqs" options={CATEGORIES} active={category} allLabel="All topics" />

        {groups.length === 0 ? (
          <EmptyState title="No questions found">Published FAQs appear here.</EmptyState>
        ) : (
          groups.map((group) => (
            <section key={group.name} className="mb-10 sm:mb-12" aria-labelledby={`faq-${group.name}`}>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-line pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-ochre">Topic</p>
                  <h2 id={`faq-${group.name}`} className="mt-1 font-serif text-2xl font-bold text-ledger-900">
                    {group.name}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full bg-ledger-50 px-3 py-1 text-sm font-medium text-ledger-800">
                  {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((faq, index) => (
                  <details
                    key={faq.documentId}
                    className="group rounded-xl border border-line bg-white shadow-[0_3px_12px_rgba(16,23,68,0.035)] transition duration-300 hover:-translate-y-0.5 hover:border-ledger-900/20 hover:shadow-[0_10px_24px_rgba(16,23,68,0.08)] open:border-ochre/70 open:shadow-[0_10px_28px_rgba(16,23,68,0.08)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre sm:px-6 sm:py-5">
                      <span className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <span className="mt-0.5 shrink-0 font-mono text-sm font-semibold tabular-nums text-ochre">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold leading-snug text-ledger-900 transition-colors duration-200 group-open:text-ledger-800">
                          {faq.question}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ledger-50 text-xl leading-none text-ledger-800 transition duration-200 group-hover:bg-ochre-soft group-open:rotate-45 group-open:bg-ochre-soft"
                      >
                        +
                      </span>
                    </summary>
                    <div className="faq-answer-enter border-t border-line/80 px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <div className="border-l-2 border-ochre pl-4 sm:pl-5">
                        <Markdown>{faq.answer}</Markdown>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))
        )}

        <section
          aria-labelledby="ask-question-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-ledger-900/10 bg-white shadow-[0_12px_35px_rgba(16,23,68,0.08)]"
        >
          <div className="flex flex-col gap-6 bg-[linear-gradient(110deg,#f3f5fa_0%,#fff_72%)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ochre-soft text-ledger-900">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-ledger-700">Still need help?</p>
                <h2 id="ask-question-heading" className="mt-1 font-serif text-xl font-bold text-ledger-900 sm:text-2xl">
                  Ask UFAA a question
                </h2>
                <p className="mt-2 max-w-[55ch] text-muted">
                  Email our team and we’ll help point you in the right direction.
                </p>
              </div>
            </div>
            <a
              href="mailto:info@ufaa.go.ke?subject=Question%20about%20unclaimed%20financial%20assets"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ledger-900 px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-ledger-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
            >
              Email UFAA
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
