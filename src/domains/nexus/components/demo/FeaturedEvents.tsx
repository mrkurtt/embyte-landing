"use client";

import Image from "next/image";
import { featuredEvents } from "@/domains/nexus/data/mockEvents";
import { ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export function FeaturedEvents() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-10 lg:px-8 xl:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Featured</h2>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          See All
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-0 shrink-0 basis-[65%] sm:basis-[45%] lg:basis-[18.5%]"
            >
              <div className="aspect-[9/16] overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={711}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                {event.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
