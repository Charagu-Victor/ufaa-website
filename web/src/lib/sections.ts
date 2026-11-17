import type { PageSection } from "./types";

/** URL segment -> label, for pages managed in the CMS "Page" content type. */
export const SECTION_LABELS: Record<Exclude<PageSection, "none">, string> = {
  about: "About us",
  services: "Services",
  "find-and-claim": "Find and claim",
  holders: "For holders",
};

export function isSection(value: string): value is Exclude<PageSection, "none"> {
  return value in SECTION_LABELS;
}
