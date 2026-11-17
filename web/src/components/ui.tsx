import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fileSize, formatDate, isOpen, mediaUrl } from "@/lib/format";
import type { Media, Pagination as PaginationMeta } from "@/lib/types";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Markdown({ children }: { children?: string | null }) {
  if (!children) return null;
  return (
    <div className="prose-ufaa">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

/** Title band shared by every inner page. */
export function PageHeader({
  title,
  intro,
  crumbs = [],
}: {
  title: string;
  intro?: string | null;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="border-b-4 border-ochre bg-ledger-900 text-white">
      <Container className="py-8 sm:py-10">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="text-white/75 underline underline-offset-4 hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex gap-x-2">
                  <span aria-hidden="true">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-white/75 underline underline-offset-4 hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="border-l-4 border-ochre pl-5">
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 max-w-[65ch] text-lg text-white/80">{intro}</p>}
        </div>
      </Container>
    </header>
  );
}

export function StatusBadge({ open, label }: { open: boolean; label?: string }) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-sm font-semibold ${
        open ? "bg-sage-soft text-sage" : "bg-clay-soft text-clay"
      }`}
    >
      {label ?? (open ? "Open" : "Closed")}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm bg-ledger-100 px-2 py-0.5 text-sm font-medium text-ledger-800">
      {children}
    </span>
  );
}

export function DownloadLink({ file, label }: { file?: Media | null; label?: string }) {
  const href = mediaUrl(file);
  if (!href || !file) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-ledger-900 px-3 py-1.5 text-sm font-semibold text-ledger-900 hover:bg-ledger-900 hover:text-white"
    >
      {label ?? "Download"}
      <span className="font-normal opacity-80">({fileSize(file)})</span>
    </a>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-sm border border-dashed border-line bg-white px-6 py-10 text-center">
      <p className="font-serif text-xl text-ledger-900">{title}</p>
      {children && <p className="mt-2 text-muted">{children}</p>}
    </div>
  );
}

/** Row used by notices, tenders and vacancies: title and facts left, action right. */
export function ListRow({
  title,
  href,
  meta,
  badge,
  description,
  action,
}: {
  title: string;
  href?: string;
  meta?: ReactNode;
  badge?: ReactNode;
  description?: string | null;
  action?: ReactNode;
}) {
  return (
    <li className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-[65ch]">
        <div className="flex flex-wrap items-center gap-2">
          {badge}
          <h3 className="font-serif text-xl leading-snug text-ledger-900">
            {href ? (
              <Link href={href} className="hover:underline underline-offset-4">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
        </div>
        {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
        {description && <p className="mt-2 text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </li>
  );
}

export function FilterChips({
  basePath,
  options,
  active,
  paramName = "category",
  allLabel = "All",
}: {
  basePath: string;
  options: readonly string[];
  active?: string;
  paramName?: string;
  allLabel?: string;
}) {
  const chip = (isActive: boolean) =>
    `rounded-sm border px-3 py-1.5 text-sm font-medium ${
      isActive
        ? "border-ledger-900 bg-ledger-900 text-white"
        : "border-line bg-white text-ledger-900 hover:border-ledger-900"
    }`;
  return (
    <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
      <Link href={basePath} className={chip(!active)} aria-current={!active ? "true" : undefined}>
        {allLabel}
      </Link>
      {options.map((option) => (
        <Link
          key={option}
          href={`${basePath}?${paramName}=${encodeURIComponent(option)}`}
          className={chip(active === option)}
          aria-current={active === option ? "true" : undefined}
        >
          {option}
        </Link>
      ))}
    </nav>
  );
}

export function Pager({
  pagination,
  basePath,
  query = {},
}: {
  pagination: PaginationMeta;
  basePath: string;
  query?: Record<string, string | undefined>;
}) {
  if (pagination.pageCount <= 1) return null;
  const href = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => value && params.set(key, value));
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const linkClass =
    "rounded-sm border border-line bg-white px-3 py-1.5 text-sm font-medium text-ledger-900 hover:border-ledger-900";
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4">
      {pagination.page > 1 ? (
        <Link href={href(pagination.page - 1)} className={linkClass} rel="prev">
          Previous page
        </Link>
      ) : (
        <span />
      )}
      <p className="text-sm text-muted">
        Page {pagination.page} of {pagination.pageCount}
      </p>
      {pagination.page < pagination.pageCount ? (
        <Link href={href(pagination.page + 1)} className={linkClass} rel="next">
          Next page
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export { formatDate, isOpen };
