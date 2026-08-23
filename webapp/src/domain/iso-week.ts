/**
 * Numéro de semaine ISO-8601 (la même numérotation "Semaine NN" que les
 * calendriers usuels en France). Sert à déterminer la session de
 * préparation physique de la semaine courante à partir du roulement.
 */
export function getIsoWeekNumber(date: Date): number {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const isoWeekday = utcDate.getUTCDay() || 7; // lundi=1 ... dimanche=7
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - isoWeekday); // jeudi de la même semaine ISO
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

/**
 * Id de session à afficher pour la semaine courante, selon le roulement
 * ([X, Y, Z] rejoué en boucle : semaine ISO 1 -> X, 2 -> Y, 3 -> Z, 4 -> X...).
 * Les ids qui ne correspondent plus à une session existante (supprimée
 * entre-temps) sont ignorés, pour ne pas casser tout le roulement.
 */
export function currentRotationSessionId(
  rotation: readonly string[],
  existingSessionIds: ReadonlySet<string>,
  today: Date = new Date(),
): string | null {
  const validRotation = rotation.filter((id) => existingSessionIds.has(id));
  if (validRotation.length === 0) return null;
  const index = (getIsoWeekNumber(today) - 1) % validRotation.length;
  return validRotation[index] ?? null;
}
