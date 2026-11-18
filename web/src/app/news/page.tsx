import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, EmptyState, PageHeader, Pager } from "@/components/ui";
import { formatDate, mediaUrl } from "@/lib/format";
import { listNews, listNewsYears } from "@/lib/strapi";
import type { NewsArticle } from "@/lib/types";
import { NEWS_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "News and press releases",
  description: "Press releases, events and updates from the Unclaimed Financial Assets Authority.",
};

type Props = { searchParams: Promise<{ page?: string; category?: string; year?: string }> };

type MonthGroup = {
  key: string;
  name: string;
  year: string;
  articles: NewsArticle[];
};

function groupNewsByYear(articles: NewsArticle[]) {
  const years = new Map<string, Map<string, MonthGroup>>();
  const monthFormatter = new Intl.DateTimeFormat("en-KE", { month: "long", timeZone: "UTC" });

  for (const article of articles) {
    const date = new Date(article.publishedOn);
    const validDate = !Number.isNaN(date.getTime());
    const year = validDate ? String(date.getUTCFullYear()) : "Other";
    const monthKey = validDate ? `${year}-${String(date.getUTCMonth() + 1).padStart(2, "0")}` : `${year}-other`;
    const monthName = validDate ? monthFormatter.format(date) : "Other dates";

    let months = years.get(year);
    if (!months) {
      months = new Map<string, MonthGroup>();
      years.set(year, months);
    }

    let month = months.get(monthKey);
    if (!month) {
      month = { key: monthKey, name: monthName, year, articles: [] };
      months.set(monthKey, month);
    }
    month.articles.push(article);
  }

  return Array.from(years, ([year, months]) => ({ year, months: Array.from(months.values()) }));
}

function newsHref(category?: string, year?: number) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (year) params.set("year", String(year));
  const query = params.toString();
  return query ? `/news?${query}` : "/news";
}

function parseYear(value?: string) {
  if (!value || !/^\d{4}$/.test(value)) return undefined;
  const year = Number(value);
  return year >= 1900 ? year : undefined;
}

export default async function NewsPage({ searchParams }: Props) {
  const { page, category, year } = await searchParams;
  const selectedYear = parseYear(year);
  const parsedPage = Number(page);
  const currentPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const [result, yearsResult] = await Promise.all([
    listNews({ page: currentPage, pageSize: 12, category, year: selectedYear }),
    listNewsYears(),
  ]);
  const years = Array.from(
    new Set(
      yearsResult.data
        .map((item) => Number(item.publishedOn.slice(0, 4)))
        .filter((item) => Number.isInteger(item) && item >= 1900),
    ),
  ).sort((a, b) => b - a);
  if (selectedYear && !years.includes(selectedYear)) years.unshift(selectedYear);
  const groupedYears = groupNewsByYear(result.data);

  return (
    <>
      <PageHeader
        title="News & press releases"
        intro="Stories, announcements and public updates from the Unclaimed Financial Assets Authority."
        crumbs={[{ label: "News" }]}
      />
      <Container className="py-8 sm:py-12">
        <section
          aria-label="Filter news"
          className="mb-9 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(16,23,68,0.05)] sm:p-5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-ledger-700">Browse updates</p>
              <nav aria-label="Filter by news category" className="flex flex-wrap gap-2">
                <Link
                  href={newsHref(undefined, selectedYear)}
                  aria-current={!category ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                    !category
                      ? "border-ledger-900 bg-ledger-900 text-white shadow-sm"
                      : "border-line bg-white text-ledger-900 hover:-translate-y-0.5 hover:border-ledger-700 hover:bg-ledger-50"
                  }`}
                >
                  All updates
                </Link>
                {NEWS_CATEGORIES.map((option) => {
                  const active = category === option;
                  return (
                    <Link
                      key={option}
                      href={newsHref(option, selectedYear)}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                        active
                          ? "border-ledger-900 bg-ledger-900 text-white shadow-sm"
                          : "border-line bg-white text-ledger-900 hover:-translate-y-0.5 hover:border-ledger-700 hover:bg-ledger-50"
                      }`}
                    >
                      {option}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <form action="/news" method="get" className="flex shrink-0 items-end gap-2">
              {category && <input type="hidden" name="category" value={category} />}
              <label className="min-w-40">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">Select year</span>
                <select
                  name="year"
                  defaultValue={selectedYear?.toString() ?? ""}
                  className="min-h-11 w-full rounded-full border border-line bg-white px-4 text-sm font-semibold text-ledger-900 transition focus:border-ledger-700 focus:outline-2 focus:outline-offset-2 focus:outline-ochre"
                >
                  <option value="">All years</option>
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="min-h-11 rounded-full bg-ledger-900 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ledger-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
              >
                Apply
              </button>
            </form>
          </div>
        </section>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ochre">From the newsroom</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-ledger-900">
              {selectedYear ? `${selectedYear} updates` : "Latest updates"}
            </h2>
          </div>
          <p className="text-sm font-medium text-muted" aria-live="polite">
            {result.meta.pagination.total} {result.meta.pagination.total === 1 ? "story" : "stories"}
          </p>
        </div>

        {result.data.length === 0 ? (
          <EmptyState title="No published stories yet">
            {category || selectedYear
              ? "Try another year or category, or view all updates."
              : "Published news and press releases from UFAA will appear here."}
          </EmptyState>
        ) : (
          groupedYears.map((yearGroup) => (
            <section key={yearGroup.year} className="mb-12" aria-labelledby={`news-year-${yearGroup.year}`}>
              <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
                <h2 id={`news-year-${yearGroup.year}`} className="font-serif text-2xl font-bold text-ledger-900">
                  {yearGroup.year}
                </h2>
                <span className="text-sm text-muted">
                  {yearGroup.months.reduce((sum, month) => sum + month.articles.length, 0)} updates
                </span>
              </div>

              <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {yearGroup.months.map((month, index) => {
                  const leadArticle = month.articles.find((article) => article.cover) ?? month.articles[0];
                  const cover = mediaUrl(leadArticle.cover);

                  return (
                    <li
                      key={month.key}
                      className="news-card-enter"
                      style={{ animationDelay: `${index * 65}ms` }}
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(16,23,68,0.06)] transition duration-300 hover:-translate-y-1 hover:border-ledger-900/20 hover:shadow-[0_18px_38px_rgba(16,23,68,0.13)]">
                        <div className="relative aspect-[16/9] overflow-hidden bg-ledger-900">
                          {cover && leadArticle.cover ? (
                            <Image
                              src={cover}
                              alt={leadArticle.cover.alternativeText ?? ""}
                              width={leadArticle.cover.width ?? 800}
                              height={leadArticle.cover.height ?? 450}
                              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
                              unoptimized
                              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(226,181,27,0.55),transparent_30%),linear-gradient(135deg,#101744,#253879_62%,#3d5190)] transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-ledger-950/85 via-ledger-950/20 to-ledger-950/5" />
                          <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 text-white">
                            <div>
                              <p className="text-2xl font-bold leading-tight">{month.name}</p>
                              <p className="mt-1 text-sm font-semibold tracking-wide text-white/80">{month.year}</p>
                            </div>
                            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                              {month.articles.length} {month.articles.length === 1 ? "story" : "stories"}
                            </span>
                          </div>
                        </div>

                        <ul className="flex-1 divide-y divide-line px-5">
                          {month.articles.map((article) => (
                            <li key={article.documentId}>
                              <Link
                                href={`/news/${article.slug}`}
                                className="group/story block py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
                              >
                                <span className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted">
                                  <time dateTime={article.publishedOn}>{formatDate(article.publishedOn)}</time>
                                  <span aria-hidden="true" className="text-ochre">•</span>
                                  <span>{article.category}</span>
                                </span>
                                <span className="flex items-start justify-between gap-3">
                                  <span>
                                    <span className="block font-semibold leading-snug text-ledger-900 transition-colors duration-200 group-hover/story:text-ledger-700">
                                      {article.title}
                                    </span>
                                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                                      {article.summary}
                                    </span>
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className="mt-0.5 shrink-0 text-lg text-sage transition-transform duration-200 group-hover/story:translate-x-1"
                                  >
                                    →
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}

        <Pager
          pagination={result.meta.pagination}
          basePath="/news"
          query={{ category, year: selectedYear?.toString() }}
        />
      </Container>
    </>
  );
}
