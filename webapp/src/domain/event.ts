import type { MemberDirectoryEntry, Sex } from "./member";

export const EVENT_CATEGORIES = ["Mixte", "Féminin", "Open", "Loose Mixte", "Master"] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface AllowedCategory {
  sex: Sex;
  ageCategoryId: string;
}

export interface SportEvent {
  id: string;
  /** Pré-rempli par computeDefaultEventName() à la création, librement modifiable ensuite. */
  name: string;
  eventTypeId: string;
  category: EventCategory;
  formatId: string;
  divisionId: string;
  /** Optionnel : voir displayLocation() pour l'affichage ("Lieu inconnu" si vide). */
  location: string | null;
  /** Date ISO (yyyy-mm-dd). */
  startDate: string;
  /** Date ISO (yyyy-mm-dd), toujours >= startDate. */
  endDate: string;
  /** Facultatif : voir displayOrganizerName() pour l'affichage. */
  organizerId: string | null;
  /** Date ISO (yyyy-mm-dd), toujours < startDate. */
  responseDeadline: string;
  allowedCategories: AllowedCategory[];
}

export type EventInput = Omit<SportEvent, "id">;

export function displayLocation(location: string | null): string {
  return location && location.trim() ? location : "Lieu inconnu";
}

export function displayOrganizerName(
  organizerId: string | null,
  members: readonly Pick<MemberDirectoryEntry, "id" | "firstName" | "lastName">[],
): string {
  if (!organizerId) return "Non renseigné";
  const organizer = members.find((m) => m.id === organizerId);
  return organizer ? `${organizer.firstName} ${organizer.lastName}` : "Non renseigné";
}

/** Nom par défaut proposé à la création (ex. "Championnat Open Indoor N3"), avant modification manuelle éventuelle. */
export function computeDefaultEventName(
  eventTypeLabel: string,
  category: EventCategory,
  formatLabel: string,
  divisionLabel: string,
): string {
  return [eventTypeLabel, category, formatLabel, divisionLabel]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ");
}
