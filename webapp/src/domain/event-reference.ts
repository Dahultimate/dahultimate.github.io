export type EventReferenceKind = "event_type" | "format" | "division";

/** Pertinent uniquement pour kind === "event_type" : détermine dans quelle liste (phase 6) l'événement apparaît. */
export type EventFamily = "sportif" | "tournoi";

export interface EventReferenceItem {
  id: string;
  kind: EventReferenceKind;
  label: string;
  sortOrder: number;
  eventFamily: EventFamily | null;
}

export interface EventReferenceItemInput {
  label: string;
  sortOrder: number;
  eventFamily: EventFamily | null;
}
