import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader } from "@/components/ui";
import { mediaUrl } from "@/lib/format";
import { getHomepage } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from UFAA events, outreach and work with communities across Kenya.",
};

const placeholderCards = [1, 2, 3, 4, 5, 6];

export default async function GalleryPage() {
  const homepage = await getHomepage();
  const images = (homepage?.galleryImages ?? []).filter((item) => Boolean(mediaUrl(item.image)));

  return (
    <>
      <PageHeader
        title="Gallery"
        intro="Photos from UFAA events, outreach and work with communities across Kenya."
        crumbs={[{ label: "Knowledge Hub" }, { label: "Gallery" }]}
      />
      <Container className="py-8 sm:py-12">
        <section aria-labelledby="gallery-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-ledger-700">UFAA in action</p>
              <h2 id="gallery-heading" className="mt-1 font-serif text-2xl font-bold text-ledger-900 sm:text-3xl">
                Moments from our work
              </h2>
            </div>
            <p className="text-sm font-medium text-muted" aria-live="polite">
              {images.length > 0
                ? `${images.length} ${images.length === 1 ? "photo" : "photos"}`
                : "Gallery being prepared"}
            </p>
          </div>

          {images.length === 0 && (
            <p className="mb-6 max-w-[65ch] text-muted">
              Gallery photos will appear here as they are published by the UFAA content team.
            </p>
          )}

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.length > 0
              ? images.map((item, index) => {
                  const src = mediaUrl(item.image);
                  if (!src) return null;

                  const caption = item.caption?.trim();
                  return (
                    <li key={item.id}>
                      <figure className="group overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(16,23,68,0.06)] transition duration-300 hover:-translate-y-1 hover:border-ledger-900/20 hover:shadow-[0_18px_38px_rgba(16,23,68,0.13)]">
                        <div className="relative aspect-[4/3] overflow-hidden bg-ledger-100">
                          <Image
                            src={src}
                            alt={item.image.alternativeText ?? caption ?? `UFAA gallery image ${index + 1}`}
                            width={item.image.width ?? 800}
                            height={item.image.height ?? 600}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                            unoptimized
                            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ledger-950/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                        <figcaption className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
                          <span className="font-medium leading-snug text-ledger-900">
                            {caption || `UFAA in action ${String(index + 1).padStart(2, "0")}`}
                          </span>
                          <span aria-hidden="true" className="shrink-0 text-xl text-ochre transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })
              : placeholderCards.map((item) => (
                  <li key={item}>
                    <div className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl border border-ledger-900/10 bg-ledger-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(226,181,27,0.4),transparent_32%),linear-gradient(135deg,#101744,#253879_62%,#3d5190)] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div aria-hidden="true" className="absolute -right-12 -top-12 size-48 rounded-full border border-white/10" />
                      <div aria-hidden="true" className="absolute -right-5 -top-5 size-32 rounded-full border border-white/10" />
                      <div className="relative m-auto flex flex-col items-center gap-3 p-6 text-center text-white">
                        <svg aria-hidden="true" viewBox="0 0 32 32" className="size-10 fill-none stroke-current text-ochre" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="6" width="24" height="20" rx="3" />
                          <circle cx="12" cy="13" r="2.5" />
                          <path d="m6 23 7-6 4 3 4-4 5 5" />
                        </svg>
                        <span className="font-semibold">Photo coming soon</span>
                        <span className="font-mono text-xs tracking-[0.18em] text-white/55">
                          {String(item).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
