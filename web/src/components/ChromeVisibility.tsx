"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function ChromeVisibility({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isPortalPage = pathname === "/holders/login" || pathname === "/find-claim";

  return (
    <>
      {!isPortalPage && header}
      {children}
      {!isPortalPage && footer}
    </>
  );
}
