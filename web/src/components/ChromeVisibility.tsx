"use client";

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
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
