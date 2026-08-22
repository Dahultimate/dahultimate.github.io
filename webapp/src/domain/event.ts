import type { Sex } from "./member";

export const EVENT_CATEGORIES = ["Mixte", "Féminin", "Open", "Loose Mixte", "Master"] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface AllowedCategory {
  sex: Sex;
  ageCategoryId: string;
}

export interface SportEvent {
  id: string;
  eventTypeId: string;
  category: EventCategory;
  formatId: string;
  divisionId: string;
  location: string;
  /** Date ISO (yyyy-mm-dd). */
  eventDate: string;
  organizerId: string;
  /** Date ISO (yyyy-mm-dd). */
  responseDeadline: string;
  allowedCategories: AllowedCategory[];
}

export type EventInput = Omit<SportEvent, "id">;
