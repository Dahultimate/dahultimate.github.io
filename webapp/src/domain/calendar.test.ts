import { describe, expect, it } from "vitest";
import { buildMonthGrid, isDateKeyInRange, toDateKey, weeklyDatesBetween } from "./calendar";

describe("buildMonthGrid", () => {
  it.each([
    [2024, 0], // janvier (le 1er est un lundi)
    [2024, 1], // février (année bissextile)
    [2024, 2], // mars (le 1er n'est pas un lundi)
    [2025, 11], // décembre
  ])("produit une grille correcte pour %i-%i", (year, monthIndex) => {
    const grid = buildMonthGrid(year, monthIndex);

    // Chaque semaine a 7 jours, chaque grille a 4 à 6 semaines.
    expect(grid.length).toBeGreaterThanOrEqual(4);
    expect(grid.length).toBeLessThanOrEqual(6);
    for (const week of grid) expect(week).toHaveLength(7);

    // La grille commence un lundi et finit un dimanche.
    expect(grid[0]![0]!.getDay()).toBe(1);
    expect(grid.at(-1)!.at(-1)!.getDay()).toBe(0);

    // Les jours sont consécutifs, sans trou ni doublon.
    const allDays = grid.flat();
    for (let i = 1; i < allDays.length; i++) {
      const diffMs = allDays[i]!.getTime() - allDays[i - 1]!.getTime();
      expect(diffMs).toBe(24 * 60 * 60 * 1000);
    }

    // Tous les jours du mois demandé apparaissent, avec le bon mois/année.
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const daysOfMonthInGrid = allDays.filter((d) => d.getMonth() === monthIndex && d.getFullYear() === year);
    expect(daysOfMonthInGrid).toHaveLength(daysInMonth);
  });
});

describe("toDateKey", () => {
  it("formate en yyyy-mm-dd avec les zéros de remplissage", () => {
    expect(toDateKey(new Date(2024, 0, 5))).toBe("2024-01-05");
    expect(toDateKey(new Date(2024, 10, 23))).toBe("2024-11-23");
  });
});

describe("isDateKeyInRange", () => {
  it("inclut les bornes", () => {
    expect(isDateKeyInRange("2024-06-01", "2024-06-01", "2024-06-03")).toBe(true);
    expect(isDateKeyInRange("2024-06-03", "2024-06-01", "2024-06-03")).toBe(true);
    expect(isDateKeyInRange("2024-06-02", "2024-06-01", "2024-06-03")).toBe(true);
  });

  it("exclut ce qui est hors de l'intervalle", () => {
    expect(isDateKeyInRange("2024-05-31", "2024-06-01", "2024-06-03")).toBe(false);
    expect(isDateKeyInRange("2024-06-04", "2024-06-01", "2024-06-03")).toBe(false);
  });
});

describe("weeklyDatesBetween", () => {
  it("génère une date par semaine, bornes incluses", () => {
    // 2024-01-03 est un mercredi.
    expect(weeklyDatesBetween("2024-01-03", "2024-01-24")).toEqual([
      "2024-01-03",
      "2024-01-10",
      "2024-01-17",
      "2024-01-24",
    ]);
  });

  it("inclut la date de départ seule si la fin tombe avant la semaine suivante", () => {
    expect(weeklyDatesBetween("2024-01-03", "2024-01-09")).toEqual(["2024-01-03"]);
  });

  it("retourne un tableau vide si la fin est avant le départ", () => {
    expect(weeklyDatesBetween("2024-01-10", "2024-01-03")).toEqual([]);
  });
});
