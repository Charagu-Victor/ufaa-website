import type { MetadataRoute } from "next";
import { listSlugs } from "@/lib/strapi";

export const revalidate = 3600;

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, pages, publications] = await Promise.all([
    listSlugs("news-articles"),
    listSlugs("pages"),
    listSlugs("publications"),
  ]);

  const fixed = ["", "/services", "/news", "/notices", "/tenders", "/publications", "/faqs", "/leadership", "/divisions", "/contact"];

  return [
    ...fixed.map((path) => ({ url: `${site}${path}`, changeFrequency: "weekly" as const })),
    ...pages
      .filter((page) => page.parent && page.parent !== "none")
      .map((page) => ({
        url: `${site}/${page.parent}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: "monthly" as const,
      })),
    ...news.map((item) => ({
      url: `${site}/news/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
    })),
    ...publications.map((item) => ({
      url: `${site}/publications/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
    })),
  ];
}
