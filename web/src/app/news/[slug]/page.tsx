import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/views";
import { mediaUrl } from "@/lib/format";
import { getNews, listSlugs } from "@/lib/strapi";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await listSlugs("news-articles");
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNews(slug);
  if (!article) return {};
  const image = mediaUrl(article.seo?.shareImage ?? article.cover);
  return {
    title: article.seo?.metaTitle ?? article.title,
    description: article.seo?.metaDescription ?? article.summary,
    openGraph: {
      type: "article",
      publishedTime: article.publishedOn,
      images: image ? [image] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNews(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
