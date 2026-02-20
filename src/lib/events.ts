import eventsData from '../data/events.json';

export interface Event {
  id: string;
  title: string;
  date: string;
  schedule: string;
  description: string;
  details: string[];
  comments: string[];
  link: string | null;
  image: string | null;
  featured: boolean;
  badge: string | null;
  order: number;
  category: 'yearly' | 'weekly' | 'irregular';
}

/**
 * 全イベントを取得（order順）
 */
export function getAllEvents(): Event[] {
  return (eventsData as Event[]).sort((a, b) => a.order - b.order);
}

/**
 * 指定したorder以下のイベントを取得
 */
export function getEventsByMaxOrder(maxOrder: number): Event[] {
  return getAllEvents().filter((event) => event.order <= maxOrder);
}

/**
 * featuredイベントを取得
 */
export function getFeaturedEvents(): Event[] {
  return getAllEvents().filter((event) => event.featured);
}

/**
 * IDでイベントを取得
 */
export function getEventById(id: string): Event | undefined {
  return getAllEvents().find((event) => event.id === id);
}
