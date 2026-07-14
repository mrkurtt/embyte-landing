export interface NexusEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  category: "conference" | "concert" | "gala" | "meetup";
}

export const featuredEvents: NexusEvent[] = [
  {
    id: "ev-1",
    title: "DevSummit 2026",
    date: "Mar 14–16, 2026",
    venue: "Manila Convention Center",
    image: "/types/nexus.jpg",
    category: "conference",
  },
  {
    id: "ev-2",
    title: "Neon Nights Festival",
    date: "Apr 5, 2026",
    venue: "CCP Open Grounds",
    image: "/types/nexus.jpg",
    category: "concert",
  },
  {
    id: "ev-3",
    title: "Founders Gala 2026",
    date: "May 20, 2026",
    venue: "The Grand Ballroom, Shangri-La",
    image: "/types/nexus.jpg",
    category: "gala",
  },
  {
    id: "ev-4",
    title: "Design Systems Meetup",
    date: "Jun 8, 2026",
    venue: "Clock In BGC",
    image: "/types/nexus.jpg",
    category: "meetup",
  },
  {
    id: "ev-5",
    title: "AI World Conference",
    date: "Jul 22–23, 2026",
    venue: "SMX Convention Center",
    image: "/types/nexus.jpg",
    category: "conference",
  },
];

export const gridEvents: NexusEvent[] = [
  {
    id: "ev-6",
    title: "Startup Weekend Manila",
    date: "Feb 10–12, 2026",
    venue: "加速 Coworking Space",
    image: "/types/nexus.jpg",
    category: "conference",
  },
  {
    id: "ev-7",
    title: "Jazz Under the Stars",
    date: "Feb 28, 2026",
    venue: "Terrace of the Peninsula",
    image: "/types/nexus.jpg",
    category: "concert",
  },
  {
    id: "ev-8",
    title: "Annual Charity Gala",
    date: "Mar 5, 2026",
    venue: "Makati Shangri-La",
    image: "/types/nexus.jpg",
    category: "gala",
  },
  {
    id: "ev-9",
    title: "ReactPH Conference",
    date: "Mar 20, 2026",
    venue: "One Ayala Mall",
    image: "/types/nexus.jpg",
    category: "conference",
  },
  {
    id: "ev-10",
    title: "Indie Music Night",
    date: "Apr 12, 2026",
    venue: "19 East, Makati",
    image: "/types/nexus.jpg",
    category: "concert",
  },
  {
    id: "ev-11",
    title: "Tech Leaders Forum",
    date: "Apr 25, 2026",
    venue: "BGC Arts Center",
    image: "/types/nexus.jpg",
    category: "meetup",
  },
  {
    id: "ev-12",
    title: "Gala for Education",
    date: "May 3, 2026",
    venue: "Grand Hyatt Manila",
    image: "/types/nexus.jpg",
    category: "gala",
  },
  {
    id: "ev-13",
    title: "CloudConf Asia",
    date: "May 18–19, 2026",
    venue: "Marina Bay Sands Expo",
    image: "/types/nexus.jpg",
    category: "conference",
  },
];

export const filterCategories = [
  { id: "all", label: "All Events" },
  { id: "conference", label: "Conferences" },
  { id: "concert", label: "Concerts" },
  { id: "gala", label: "Galas" },
] as const;
