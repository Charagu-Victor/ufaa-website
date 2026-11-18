import Image from "next/image";
import { formatDate, mediaUrl } from "@/lib/format";
import { SECTION_LABELS } from "@/lib/sections";
import type { CmsPage, NewsArticle } from "@/lib/types";
import { Container, Markdown, PageHeader, Tag } from "./ui";

export function CmsPageView({ page }: { page: CmsPage }) {
  const cover = mediaUrl(page.cover);
  const section = page.parent !== "none" ? SECTION_LABELS[page.parent] : undefined;
  return (
    <>
      <PageHeader
        title={page.title}
        intro={page.summary}
        crumbs={[...(section ? [{ label: section }] : []), { label: page.title }]}
      />
      <Container className="py-12">
        {cover && page.cover && (
          <Image
            src={cover}
            alt={page.cover.alternativeText ?? ""}
            width={page.cover.width ?? 1200}
            height={page.cover.height ?? 600}
            unoptimized
            className="mb-10 max-h-96 w-full rounded-sm object-cover"
          />
        )}
        <Markdown>{page.body}</Markdown>
        {page.sections?.map((section) => {
          const sectionImage = mediaUrl(section.image);
          return (
            <section key={section.id} className="mt-10 max-w-[72ch] rounded-2xl border border-line bg-white p-6 sm:p-8">
              {sectionImage && section.image && (
                <Image src={sectionImage} alt={section.imageAlt ?? section.image.alternativeText ?? ""} width={section.image.width ?? 1200} height={section.image.height ?? 675} unoptimized className="mb-6 max-h-96 w-full rounded-xl object-cover" />
              )}
              <h2 className="mb-4 text-2xl font-bold text-ledger-900">{section.heading}</h2>
              <Markdown>{section.body}</Markdown>
              {section.actionLabel && section.actionUrl && (
                <a href={section.actionUrl} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-ledger-900 px-5 py-2.5 font-semibold text-white transition hover:bg-ledger-800">
                  {section.actionLabel}<span className="ml-2" aria-hidden="true">→</span>
                </a>
              )}
            </section>
          );
        })}
      </Container>
    </>
  );
}

export function ArticleView({ article }: { article: NewsArticle }) {
  const cover = mediaUrl(article.cover);
  return (
    <>
      <PageHeader
        title={article.title}
        crumbs={[{ label: "News", href: "/news" }, { label: article.title }]}
      />
      <Container className="py-12">
        <p className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <Tag>{article.category}</Tag>
          <time dateTime={article.publishedOn}>{formatDate(article.publishedOn)}</time>
        </p>
        <p className="mb-8 max-w-[65ch] font-serif text-xl leading-snug text-ledger-900">{article.summary}</p>
        {cover && article.cover && (
          <Image
            src={cover}
            alt={article.cover.alternativeText ?? ""}
            width={article.cover.width ?? 1200}
            height={article.cover.height ?? 675}
            unoptimized
            className="mb-10 max-h-[28rem] w-full rounded-sm object-cover"
          />
        )}
        <Markdown>{article.content}</Markdown>
      </Container>
    </>
  );
}
