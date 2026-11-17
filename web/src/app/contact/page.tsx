import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { getSiteSettings, listOffices } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact us",
  description: "Phone numbers, email, postal and physical addresses for the Unclaimed Financial Assets Authority.",
};

export default async function ContactPage() {
  const [settings, offices] = await Promise.all([getSiteSettings(), listOffices()]);

  return (
    <>
      <PageHeader
        title="Contact us"
        intro="Call, email or visit. You can also get help with a claim at any Huduma Centre."
        crumbs={[{ label: "Contact us" }]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-2">
        <section aria-labelledby="reach-us">
          <h2 id="reach-us" className="border-b-2 border-ledger-900 pb-2 font-serif text-2xl text-ledger-900">
            Reach us
          </h2>
          <dl className="mt-4 space-y-5">
            {settings.phones && (
              <div>
                <dt className="font-semibold text-ledger-900">Phone</dt>
                <dd className="whitespace-pre-line">{settings.phones}</dd>
              </div>
            )}
            {settings.ussdCode && (
              <div>
                <dt className="font-semibold text-ledger-900">Check by phone</dt>
                <dd>Dial {settings.ussdCode}</dd>
              </div>
            )}
            {settings.email && (
              <div>
                <dt className="font-semibold text-ledger-900">Email</dt>
                <dd>
                  <a className="text-ledger-700 underline underline-offset-4" href={`mailto:${settings.email}`}>
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {settings.postalAddress && (
              <div>
                <dt className="font-semibold text-ledger-900">Postal address</dt>
                <dd>{settings.postalAddress}</dd>
              </div>
            )}
            {settings.physicalAddress && (
              <div>
                <dt className="font-semibold text-ledger-900">Physical address</dt>
                <dd>{settings.physicalAddress}</dd>
              </div>
            )}
          </dl>
        </section>

        <section aria-labelledby="offices">
          <h2 id="offices" className="border-b-2 border-ledger-900 pb-2 font-serif text-2xl text-ledger-900">
            Offices
          </h2>
          {offices.length === 0 ? (
            <p className="mt-4 text-muted">Offices added in the CMS appear here.</p>
          ) : (
            <ul className="mt-2">
              {offices.map((office) => (
                <li key={office.documentId} className="border-b border-line py-5">
                  <h3 className="font-serif text-xl text-ledger-900">{office.name}</h3>
                  <p className="mt-1 whitespace-pre-line">{office.address}</p>
                  {office.hours && <p className="text-muted">Hours: {office.hours}</p>}
                  {office.phone && <p className="text-muted">Phone: {office.phone}</p>}
                  {office.email && (
                    <p>
                      <a className="text-ledger-700 underline underline-offset-4" href={`mailto:${office.email}`}>
                        {office.email}
                      </a>
                    </p>
                  )}
                  {office.mapUrl && (
                    <p className="mt-2">
                      <a
                        className="font-semibold text-ledger-700 underline underline-offset-4"
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in maps
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </>
  );
}
