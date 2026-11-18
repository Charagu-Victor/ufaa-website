export type Media = {
  id: number;
  url: string;
  name: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string;
  ext?: string;
  size?: number; // kilobytes
};

export type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: Media | null;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiList<T> = { data: T[]; meta: { pagination: Pagination } };
export type StrapiSingle<T> = { data: T };

export type SiteSetting = {
  siteName: string;
  shortName: string;
  tagline?: string | null;
  logo?: Media | null;
  email?: string | null;
  phones?: string | null;
  postalAddress?: string | null;
  physicalAddress?: string | null;
  ussdCode?: string | null;
  eCitizenUrl?: string | null;
  claimPortalUrl?: string | null;
  holdersPortalUrl?: string | null;
  knowledgeHubLinks?: { id: number; label: string; href: string }[];
  aboutLinks?: { id: number; label: string; href: string }[];
  findClaimLinks?: { id: number; label: string; href: string }[];
  reportAssetsLinks?: { id: number; label: string; href: string }[];
  procurementLinks?: { id: number; label: string; href: string }[];
  mainNavigation?: { id: number; label: string; href?: string | null; items?: { id: number; label: string; href: string }[] }[];
  footerLinks?: { id: number; label: string; href: string }[];
  whatsappUrl?: string | null;
  smsInstructionsUrl?: string | null;
  playStoreUrl?: string | null;
  appStoreUrl?: string | null;
  facebookUrl?: string | null;
  xUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  alertText?: string | null;
  alertLink?: string | null;
  footerNote?: string | null;
};

export type Homepage = {
  heroTitle: string;
  heroSubtitle?: string | null;
  heroImage?: Media | null;
  claimHeroClip?: Media | null;
  holderHeroClip?: Media | null;
  whatsappHeroClip?: Media | null;
  mobileAppHeroClip?: Media | null;
  stats?: { id: number; value: string; label: string }[];
  introTitle?: string | null;
  introBody?: string | null;
  steps?: { id: number; title: string; description?: string | null }[];
  galleryImages?: { id: number; image: Media; caption?: string | null }[];
  seo?: Seo | null;
};

export type PageSection = "about" | "services" | "find-and-claim" | "holders" | "none";

export type CmsPage = {
  documentId: string;
  title: string;
  slug: string;
  summary?: string | null;
  parent: PageSection;
  body?: string | null;
  cover?: Media | null;
  sections?: { id: number; heading: string; body?: string | null; image?: Media | null; imageAlt?: string | null; actionLabel?: string | null; actionUrl?: string | null }[];
  seo?: Seo | null;
  updatedAt?: string;
};

export type NewsArticle = {
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  content?: string | null;
  cover?: Media | null;
  publishedOn: string;
  category: string;
  featured?: boolean;
  seo?: Seo | null;
};

export type Notice = {
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  category: string;
  publishedOn: string;
  expiresOn?: string | null;
  document?: Media | null;
};

export type Tender = {
  documentId: string;
  title: string;
  slug: string;
  reference?: string | null;
  description?: string | null;
  publishedOn?: string | null;
  closingDate: string;
  tenderStatus: "Open" | "Closed" | "Awarded" | "Cancelled";
  document?: Media[] | null;
};

export type Vacancy = {
  documentId: string;
  title: string;
  slug: string;
  reference?: string | null;
  jobGroup?: string | null;
  description?: string | null;
  publishedOn?: string | null;
  closingDate: string;
  vacancyStatus: "Open" | "Closed";
  document?: Media | null;
};

export type Publication = {
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  category: string;
  year?: number | null;
  file?: Media | null;
  cover?: Media | null;
  sections?: { id: number; heading: string; body?: string | null }[];
};

export type Faq = {
  documentId: string;
  question: string;
  answer: string;
  category: "General" | "Claims" | "Beneficiaries" | "Holders";
  order: number;
};

export type Office = {
  documentId: string;
  name: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  hours?: string | null;
  mapUrl?: string | null;
  isHeadOffice?: boolean;
};

export type TeamMember = {
  documentId: string;
  name: string;
  position: string;
  group: "Board" | "Management";
  bio?: string | null;
  photo?: Media | null;
  order: number;
};

export type Department = {
  documentId: string;
  name: string;
  slug: string;
  summary: string;
  mandate?: string | null;
  services?: string | null;
  head?: string | null;
  email?: string | null;
  phone?: string | null;
  image?: Media | null;
  order: number;
};

export const PUBLICATION_CATEGORIES = [
  "Annual Report",
  "Strategic Plan",
  "Service Charter",
  "Policy",
  "Act and Regulations",
  "Claim Form",
  "Holder Form",
  "Newsletter",
  "Other",
] as const;

export const NEWS_CATEGORIES = [
  "Press Release",
  "News",
  "Event",
  "Public Awareness",
  "Reunification Drive",
] as const;

export const NOTICE_CATEGORIES = [
  "Public Notice",
  "Unclaimed Assets Listing",
  "Holders Notice",
  "Gazette Notice",
  "Other",
] as const;
