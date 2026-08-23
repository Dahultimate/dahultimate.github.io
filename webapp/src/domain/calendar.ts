function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7; // lundi=0 ... dimanche=6
}

/** Format yyyy-mm-dd en heure locale (contrairement à toISOString, qui bascule en UTC et peut décaler le jour). */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Grille d'un mois en semaines de 7 jours (lundi à dimanche), complétée par
 * les jours des mois voisins pour que chaque semaine soit entière.
 */
export function buildMonthGrid(year: number, monthIndex: number): Date[][] {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const lastOfMonth = new Date(year, monthIndex + 1, 0);

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - mondayIndex(firstOfMonth));

  const gridEnd = new Date(lastOfMonth);
  gridEnd.setDate(gridEnd.getDate() + (6 - mondayIndex(lastOfMonth)));

  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

/** Un jour (bornes incluses) tombe-t-il dans l'intervalle [startDateKey, endDateKey] ? */
export function isDateKeyInRange(dateKey: string, startDateKey: string, endDateKey: string): boolean {
  return dateKey >= startDateKey && dateKey <= endDateKey;
}

/**
 * Toutes les dates (même jour de la semaine que startDateKey), de
 * startDateKey à endDateKey inclus, par pas de 7 jours — pour déclarer un
 * entraînement récurrent (ex. "tous les mercredis jusqu'au...").
 * Retourne un tableau vide si endDateKey est avant startDateKey.
 */
export function weeklyDatesBetween(startDateKey: string, endDateKey: string): string[] {
  const dates: string[] = [];
  let cursor = new Date(`${startDateKey}T00:00:00`);
  const end = new Date(`${endDateKey}T00:00:00`);
  while (cursor <= end) {
    dates.push(toDateKey(cursor));
    const next = new Date(cursor);
    next.setDate(next.getDate() + 7);
    cursor = next;
  }
  return dates;
}
