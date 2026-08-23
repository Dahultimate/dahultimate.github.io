import type { PhysicalExerciseType } from "./physical-exercise";

export const PREP_TYPES = ["Tabata", "Cardio"] as const;
export type PrepType = (typeof PREP_TYPES)[number];

/** Nombre de créneaux d'exercices numérotés (Exercice 1 à 8), en plus du finisher. */
export const SESSION_EXERCISE_SLOT_COUNT = 8;

export interface PhysicalSession {
  id: string;
  name: string;
  objective: PhysicalExerciseType | null;
  prepType: PrepType | null;
  seriesCount: number | null;
  exerciseDurationSeconds: number | null;
  restDurationSeconds: number | null;
  betweenSeriesDurationSeconds: number | null;
  /** Longueur fixe = SESSION_EXERCISE_SLOT_COUNT, chaque créneau facultatif. */
  exerciseIds: (string | null)[];
  finisherId: string | null;
}

export type PhysicalSessionInput = Omit<PhysicalSession, "id">;

export function emptyExerciseSlots(): (string | null)[] {
  return Array.from({ length: SESSION_EXERCISE_SLOT_COUNT }, () => null);
}
