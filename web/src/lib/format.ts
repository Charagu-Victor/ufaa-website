import type { Media } from "./types";

const PUBLIC_STRAPI =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? "http://localhost:1337";

/** Strapi returns relative upload paths when files are stored locally. */
export function mediaUrl(media?: Pick<Media, "url"> | null): string | null {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${PUBLIC_STRAPI}${media.url}`;
}

export function formatDate(value?: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export function fileSize(media?: Pick<Media, "size" | "ext"> | null): string {
  if (!media) return "";
  const type = media.ext ? media.ext.replace(".", "").toUpperCase() : "";
  const kb = media.size ?? 0;
  const size = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(kb))} KB`;
  return [type, size].filter(Boolean).join(", ");
}

/** A tender or vacancy is open only while its status is Open and the closing time is ahead. */
export function isOpen(status: string, closingDate: string): boolean {
  return status === "Open" && new Date(closingDate).getTime() > Date.now();
}

export function plainText(markdown?: string | null, max = 160): string {
  if (!markdown) return "";
  const text = markdown
    .replace(/[#>*_`~-]|\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
