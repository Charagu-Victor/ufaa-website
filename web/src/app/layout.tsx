import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChromeVisibility } from "@/components/ChromeVisibility";
import "./globals.css";

export const revalidate = 300;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UFAA | Unclaimed Financial Assets Authority",
    template: "%s | UFAA",
  },
  description:
    "Search for unclaimed financial assets, start a claim and find notices, tenders, vacancies and publications from the Unclaimed Financial Assets Authority.",
  openGraph: {
    siteName: "Unclaimed Financial Assets Authority",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className="h-full">
      <body className="flex min-h-full flex-col">
        <ChromeVisibility header={<SiteHeader />} footer={<SiteFooter />}>
          <main id="main" className="flex-1">
            {children}
          </main>
        </ChromeVisibility>
      </body>
    </html>
  );
}
