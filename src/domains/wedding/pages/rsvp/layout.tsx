import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Create RSVP — Embyte Weddings',
};

export default function RsvpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
