import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Demo — Embyte Nexus",
};

export default function NexusDemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
