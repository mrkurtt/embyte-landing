import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'RSVP — Embyte Weddings',
};

export default function PublicRsvpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
