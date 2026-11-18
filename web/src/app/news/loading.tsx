import { Container } from "@/components/ui";

export default function NewsLoading() {
  return (
    <div role="status" aria-busy="true">
      <p className="sr-only">Loading UFAA news and press releases</p>
      <div className="border-b-4 border-ochre bg-ledger-900">
        <Container className="py-10 sm:py-12">
          <div className="h-4 w-24 animate-pulse rounded bg-white/25" />
          <div className="mt-5 h-10 w-72 max-w-full animate-pulse rounded bg-white/35" />
          <div className="mt-4 h-5 w-[min(34rem,100%)] animate-pulse rounded bg-white/20" />
        </Container>
      </div>

      <Container className="py-8 sm:py-12">
        <div className="mb-9 flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((item) => (
              <span key={item} className="h-10 w-28 animate-pulse rounded-full bg-ledger-100" />
            ))}
          </div>
          <div className="h-11 w-44 animate-pulse rounded-full bg-ledger-100" />
        </div>

        <div className="mb-5 h-8 w-40 animate-pulse rounded bg-ledger-100" />
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <li key={item} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="aspect-[16/9] animate-pulse bg-ledger-100" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-32 animate-pulse rounded bg-ledger-100" />
                <div className="h-5 w-full animate-pulse rounded bg-ledger-100" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-ledger-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-ledger-100" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
