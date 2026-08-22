import type { Sex } from "./member";

export interface AgeCategory {
  id: string;
  sex: Sex;
  label: string;
  minBirthYear: number | null;
  maxBirthYear: number | null;
  sortOrder: number;
}

export interface AgeCategoryInput {
  sex: Sex;
  label: string;
  minBirthYear: number | null;
  maxBirthYear: number | null;
  sortOrder: number;
}

/**
 * Détermine la catégorie d'âge d'un membre à partir des tranches actuelles.
 * Toujours recalculé à la volée (jamais stocké) : si l'admin modifie une
 * borne, le résultat change immédiatement pour tous les membres concernés.
 */
export function computeAgeCategory(
  categories: readonly AgeCategory[],
  sex: Sex,
  birthYear: number,
): AgeCategory | null {
  const match = categories.find(
    (category) =>
      category.sex === sex &&
      (category.minBirthYear === null || birthYear >= category.minBirthYear) &&
      (category.maxBirthYear === null || birthYear <= category.maxBirthYear),
  );
  return match ?? null;
}
