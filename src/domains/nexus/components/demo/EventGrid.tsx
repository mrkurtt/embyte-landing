"use client";

import Image from "next/image";
import { gridEvents, filterCategories } from "@/domains/nexus/data/mockEvents";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export function EventGrid() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 sm:px-10 lg:px-8 xl:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Upcoming Events
        </h2>
        <div className="flex items-center gap-3">
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto">
            {filterCategories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-brand-gradient text-white"
                    : "border border-white/10 bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="hidden gap-1 sm:flex">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {gridEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-0 shrink-0 basis-[280px] cursor-pointer group"
            >
              <div className="aspect-[9/10] overflow-hidden rounded-2xl bg-surface transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={444}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 space-y-1.5">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {event.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Calendar className="h-3 w-3 shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="line-clamp-1">{event.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
