import qs from "qs";
import type {
  CmsPage,
  Department,
  Faq,
  Homepage,
  NewsArticle,
  Notice,
  Office,
  PageSection,
  Publication,
  SiteSetting,
  StrapiList,
  StrapiSingle,
  TeamMember,
  Tender,
  Vacancy,
} from "./types";

const BASE = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const TOKEN = process.env.STRAPI_API_TOKEN;
const REVALIDATE = Number(process.env.REVALIDATE_SECONDS ?? 300);

type RequestOptions = {
  /** Cache tag so the Strapi webhook can refresh this data on publish. */
  tag?: string;
  /** Fetch unpublished drafts and skip the cache (used by the preview route). */
  draft?: boolean;
  /** Skip the cache entirely (used by search). */
  noCache?: boolean;
};

/**
 * Low-level Strapi REST call. Returns null instead of throwing, so the site still
 * builds and renders helpful empty states when the CMS is unreachable.
 */
async function request<T>(
  path: string,
  query: Record<string, unknown> = {},
  { tag, draft, noCache }: RequestOptions = {},
): Promise<T | null> {
  const params = draft ? { ...query, status: "draft" } : query;
  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  const url = `${BASE}/api/${path}${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(url, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
      ...(draft || noCache
        ? { cache: "no-store" as const }
        : { next: { revalidate: REVALIDATE, tags: ["strapi", ...(tag ? [`strapi:${tag}`] : [])] } }),
    });
    if (!res.ok) {
      console.warn(`[strapi] ${res.status} for ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[strapi] request failed for ${path}:`, (error as Error).message);
    return null;
  }
}

const emptyList = <T,>(): StrapiList<T> => ({
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
});

async function list<T>(
  path: string,
  query: Record<string, unknown>,
  options?: RequestOptions,
): Promise<StrapiList<T>> {
  return (await request<StrapiList<T>>(path, query, options)) ?? emptyList<T>();
}

async function first<T>(
  path: string,
  query: Record<string, unknown>,
  options?: RequestOptions,
): Promise<T | null> {
  const res = await list<T>(path, { ...query, pagination: { pageSize: 1 } }, options);
  return res.data[0] ?? null;
}

// ---------- Site-wide ----------

export async function getSiteSettings(): Promise<SiteSetting> {
  const res = await request<StrapiSingle<SiteSetting>>(
    "site-setting",
    { populate: { logo: true, aboutLinks: true, knowledgeHubLinks: true, findClaimLinks: true, reportAssetsLinks: true, procurementLinks: true, mainNavigation: { populate: ["items"] }, footerLinks: true } },
    { tag: "site-setting" },
  );
  return (
    res?.data ?? {
      siteName: "Unclaimed Financial Assets Authority",
      shortName: "UFAA",
      tagline: "Receive, Safeguard and Re-unite Unclaimed Financial Assets",
    }
  );
}

export async function getHomepage(): Promise<Homepage | null> {
  const res = await request<StrapiSingle<Homepage>>(
    "homepage",
    { populate: { stats: true, steps: true, heroImage: true, claimHeroClip: true, holderHeroClip: true, galleryImages: { populate: ["image"] }, seo: { populate: ["shareImage"] } } },
    { tag: "homepage" },
  );
  return res?.data ?? null;
}

// ---------- Pages ----------

export async function getPageIndex(): Promise<Pick<CmsPage, "title" | "slug" | "parent">[]> {
  const res = await list<CmsPage>(
    "pages",
    { fields: ["title", "slug", "parent"], sort: ["title:asc"], pagination: { pageSize: 100 } },
    { tag: "page" },
  );
  return res.data;
}

export function getPage(slug: string, parent?: PageSection, draft = false) {
  return first<CmsPage>(
    "pages",
    {
      filters: { slug: { $eq: slug }, ...(parent ? { parent: { $eq: parent } } : {}) },
      populate: { cover: true, seo: { populate: ["shareImage"] }, sections: { populate: ["image"] } },
    },
    { tag: "page", draft },
  );
}

// ---------- News ----------

export function listNews(opts: { page?: number; pageSize?: number; category?: string; featured?: boolean } = {}) {
  const { page = 1, pageSize = 9, category, featured } = opts;
  return list<NewsArticle>(
    "news-articles",
    {
      filters: {
        ...(category ? { category: { $eq: category } } : {}),
        ...(featured ? { featured: { $eq: true } } : {}),
      },
      sort: ["publishedOn:desc"],
      populate: ["cover"],
      pagination: { page, pageSize },
    },
    { tag: "news-article" },
  );
}

export function getNews(slug: string, draft = false) {
  return first<NewsArticle>(
    "news-articles",
    { filters: { slug: { $eq: slug } }, populate: { cover: true, seo: { populate: ["shareImage"] } } },
    { tag: "news-article", draft },
  );
}

// ---------- Notices, tenders, vacancies, publications ----------

export function listNotices(opts: { page?: number; pageSize?: number; category?: string } = {}) {
  const { page = 1, pageSize = 15, category } = opts;
  return list<Notice>(
    "notices",
    {
      filters: category ? { category: { $eq: category } } : {},
      sort: ["publishedOn:desc"],
      populate: ["document"],
      pagination: { page, pageSize },
    },
    { tag: "notice" },
  );
}

export function listTenders(opts: { page?: number; pageSize?: number } = {}) {
  const { page = 1, pageSize = 15 } = opts;
  return list<Tender>(
    "tenders",
    { sort: ["closingDate:desc"], populate: ["document"], pagination: { page, pageSize } },
    { tag: "tender" },
  );
}

export function listVacancies(opts: { page?: number; pageSize?: number } = {}) {
  const { page = 1, pageSize = 15 } = opts;
  return list<Vacancy>(
    "vacancies",
    { sort: ["closingDate:desc"], populate: ["document"], pagination: { page, pageSize } },
    { tag: "vacancy" },
  );
}

export function listPublications(opts: { page?: number; pageSize?: number; category?: string } = {}) {
  const { page = 1, pageSize = 12, category } = opts;
  return list<Publication>(
    "publications",
    {
      filters: category ? { category: { $eq: category } } : {},
      sort: ["year:desc", "title:asc"],
      populate: ["file", "cover"],
      pagination: { page, pageSize },
    },
    { tag: "publication" },
  );
}

export function getPublication(slug: string, draft = false) {
  return first<Publication>(
    "publications",
    {
      filters: { slug: { $eq: slug } },
      populate: { file: true, cover: true, sections: true },
    },
    { tag: "publication", draft },
  );
}

// ---------- FAQs, offices, team ----------

export async function listFaqs() {
  const res = await list<Faq>(
    "faqs",
    { sort: ["order:asc", "question:asc"], pagination: { pageSize: 100 } },
    { tag: "faq" },
  );
  return res.data;
}

export async function listOffices() {
  const res = await list<Office>(
    "offices",
    { sort: ["isHeadOffice:desc", "name:asc"], pagination: { pageSize: 50 } },
    { tag: "office" },
  );
  return res.data;
}

export async function listTeam() {
  const res = await list<TeamMember>(
    "team-members",
    { sort: ["order:asc", "name:asc"], populate: ["photo"], pagination: { pageSize: 100 } },
    { tag: "team-member" },
  );
  return res.data;
}

export async function listDepartments() {
  const res = await list<Department>(
    "departments",
    { sort: ["order:asc", "name:asc"], populate: ["image"], pagination: { pageSize: 100 } },
    { tag: "department" },
  );
  return res.data;
}

// ---------- Search ----------

export async function searchSite(term: string) {
  const match = (fields: string[]) => ({
    $or: fields.map((field) => ({ [field]: { $containsi: term } })),
  });
  const opts = { noCache: true } as const;
  const pagination = { pageSize: 8 };

  const [news, notices, pages, publications, faqs] = await Promise.all([
    list<NewsArticle>("news-articles", { filters: match(["title", "summary"]), sort: ["publishedOn:desc"], pagination }, opts),
    list<Notice>("notices", { filters: match(["title", "description"]), sort: ["publishedOn:desc"], populate: ["document"], pagination }, opts),
    list<CmsPage>("pages", { filters: match(["title", "summary", "body"]), pagination }, opts),
    list<Publication>("publications", { filters: match(["title", "description"]), populate: ["file"], pagination }, opts),
    list<Faq>("faqs", { filters: match(["question", "answer"]), pagination }, opts),
  ]);

  return {
    news: news.data,
    notices: notices.data,
    pages: pages.data,
    publications: publications.data,
    faqs: faqs.data,
  };
}

// ---------- Sitemap helpers ----------

export async function listSlugs(collection: "news-articles" | "pages" | "publications") {
  const res = await list<{ slug: string; parent?: PageSection; updatedAt: string }>(
    collection,
    {
      fields: collection === "pages" ? ["slug", "parent", "updatedAt"] : ["slug", "updatedAt"],
      pagination: { pageSize: 100 },
    },
    { tag: collection === "pages" ? "page" : "news-article" },
  );
  return res.data;
}
