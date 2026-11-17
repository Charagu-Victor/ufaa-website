import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, DownloadLink, Markdown, PageHeader, Tag } from "@/components/ui";
import { getPublication } from "@/lib/strapi";
import { mediaUrl } from "@/lib/format";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublication(slug);
  if (!publication) return { title: "Publication not found" };
  return {
    title: publication.title,
    description: publication.description ?? undefined,
  };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  if (!publication) notFound();

  const cover = mediaUrl(publication.cover);

  return (
    <>
      <PageHeader
        title={publication.title}
        intro={publication.description}
        crumbs={[{ label: "Publications and forms", href: "/publications" }, { label: publication.title }]}
      />
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Tag>{publication.category}</Tag>
          {publication.year && <span className="text-sm text-muted">Year: {publication.year}</span>}
          <DownloadLink file={publication.file} />
        </div>

        {cover && publication.cover && (
          <Image
            src={cover}
            alt={publication.cover.alternativeText ?? ""}
            width={publication.cover.width ?? 1200}
            height={publication.cover.height ?? 675}
            unoptimized
            className="mb-10 max-h-96 w-full rounded-sm object-cover"
          />
        )}

        {publication.sections?.map((section) => (
          <section key={section.id} className="mb-10 max-w-[68ch]">
            <h2 className="mb-4 font-serif text-2xl text-ledger-900">{section.heading}</h2>
            <Markdown>{section.body}</Markdown>
          </section>
        ))}
      </Container>
    </>
  );
}
