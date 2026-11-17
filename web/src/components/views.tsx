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
        {page.sections?.map((section) => (
          <section key={section.id} className="mt-10 max-w-[68ch]">
            <h2 className="mb-4 font-serif text-2xl text-ledger-900">{section.heading}</h2>
            <Markdown>{section.body}</Markdown>
          </section>
        ))}
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
