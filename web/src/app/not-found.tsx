import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="max-w-xl border-l-4 border-ochre pl-6">
        <h1 className="font-serif text-4xl text-ledger-900">We could not find that page</h1>
        <p className="mt-3 text-lg text-muted">
          The address may have changed, or the page is no longer published. Try searching, or start from the home page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="rounded-sm bg-ledger-900 px-5 py-2.5 font-semibold text-white hover:bg-ledger-950">
            Go to the home page
          </Link>
          <Link href="/search" className="rounded-sm border-2 border-ledger-900 px-5 py-2.5 font-semibold text-ledger-900 hover:bg-ledger-50">
            Search the site
          </Link>
        </div>
      </div>
    </Container>
  );
}
