import type { Metadata } from "next";
import Image from "next/image";
import { Container, EmptyState, Markdown, PageHeader } from "@/components/ui";
import { mediaUrl } from "@/lib/format";
import { listTeam } from "@/lib/strapi";
import type { TeamMember } from "@/lib/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Leadership",
  description: "The Board and management of the Unclaimed Financial Assets Authority.",
};

function Person({ person }: { person: TeamMember }) {
  const photo = mediaUrl(person.photo);
  return (
    <li className="flex gap-4 border-b border-line py-5">
      {photo && person.photo ? (
        <Image
          src={photo}
          alt={person.photo.alternativeText ?? person.name}
          width={96}
          height={96}
          unoptimized
          className="size-24 shrink-0 rounded-sm object-cover"
        />
      ) : (
        <div className="grid size-24 shrink-0 place-items-center rounded-sm bg-ledger-100 font-serif text-3xl text-ledger-800" aria-hidden="true">
          {person.name.slice(0, 1)}
        </div>
      )}
      <div>
        <h3 className="font-serif text-xl text-ledger-900">{person.name}</h3>
        <p className="font-medium text-muted">{person.position}</p>
        {person.bio && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-ledger-700 underline underline-offset-4">
              Read profile
            </summary>
            <div className="mt-2">
              <Markdown>{person.bio}</Markdown>
            </div>
          </details>
        )}
      </div>
    </li>
  );
}

export default async function LeadershipPage() {
  const team = await listTeam();
  const groups = [
    { title: "Board of Directors", id: "board-of-directors", items: team.filter((member) => member.group === "Board") },
    { title: "Management Team", id: "management-team", items: team.filter((member) => member.group === "Management") },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <PageHeader
        title="Leadership"
        intro="The people who govern and manage the Authority."
        crumbs={[{ label: "About us" }, { label: "Leadership" }]}
      />
      <Container className="py-10">
        {groups.length === 0 ? (
          <EmptyState title="No profiles yet">Add Team Members in the CMS and they appear here.</EmptyState>
        ) : (
          groups.map((group) => (
            <section key={group.id} className="mb-10" aria-labelledby={group.id}>
              <h2 id={group.id} className="border-b-2 border-ledger-900 pb-2 font-serif text-2xl text-ledger-900">
                {group.title}
              </h2>
              <ul className="grid gap-x-10 md:grid-cols-2">
                {group.items.map((person) => (
                  <Person key={person.documentId} person={person} />
                ))}
              </ul>
            </section>
          ))
        )}
      </Container>
    </>
  );
}
