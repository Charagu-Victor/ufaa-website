import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView, CmsPageView } from "@/components/views";
import { Container } from "@/components/ui";
import { getNews, getPage } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<{ secret?: string }>;
};

/**
 * Editors open this from the Strapi "Preview" button to see drafts exactly as they will look.
 * It is never cached and requires the shared PREVIEW_SECRET.
 */
export default async function PreviewPage({ params, searchParams }: Props) {
  const [{ type, slug }, { secret }] = await Promise.all([params, searchParams]);
  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) notFound();

  const banner = (
    <div className="bg-ochre text-ledger-950">
      <Container className="py-2 text-center text-sm font-semibold">
        Preview of unpublished content. This page is not public.
      </Container>
    </div>
  );

  if (type === "news-article") {
    const article = await getNews(slug, true);
    if (!article) notFound();
    return (
      <>
        {banner}
        <ArticleView article={article} />
      </>
    );
  }

  if (type === "page") {
    const page = await getPage(slug, undefined, true);
    if (!page) notFound();
    return (
      <>
        {banner}
        <CmsPageView page={page} />
      </>
    );
  }

  notFound();
}
