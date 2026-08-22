export type EventReferenceKind = "event_type" | "format" | "division";

export interface EventReferenceItem {
  id: string;
  kind: EventReferenceKind;
  label: string;
  sortOrder: number;
}

export interface EventReferenceItemInput {
  label: string;
  sortOrder: number;
}
