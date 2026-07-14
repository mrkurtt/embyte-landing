"use client";

import { NexusNavbar } from "@/domains/nexus/components/demo/NexusNavbar";
import { NexusHero } from "@/domains/nexus/components/demo/NexusHero";
import { FeaturedEvents } from "@/domains/nexus/components/demo/FeaturedEvents";
import { EventGrid } from "@/domains/nexus/components/demo/EventGrid";
import { OrganizerGrid } from "@/domains/nexus/components/demo/OrganizerGrid";
import { NexusFooter } from "@/domains/nexus/components/demo/NexusFooter";

export default function NexusDemoPage() {
  return (
    <>
      <NexusNavbar />
      <div className="min-h-screen space-y-18 text-white sm:space-y-24">
        <NexusHero />
        <FeaturedEvents />
        <EventGrid />
        <OrganizerGrid />
        <NexusFooter />
      </div>
    </>
  );
}
