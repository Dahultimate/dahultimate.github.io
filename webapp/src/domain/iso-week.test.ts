import { describe, expect, it } from "vitest";
import { currentRotationSessionId, getIsoWeekNumber } from "./iso-week";

describe("getIsoWeekNumber", () => {
  // 2024-01-01 est un lundi (fait vérifiable) : semaine ISO 1, jour 1.
  // Les cas ci-dessous restent volontairement loin des bornes d'année
  // (où une semaine peut être réattribuée à l'année suivante/précédente
  // par la norme ISO-8601), pour ne tester que des valeurs sûres.
  it.each([
    ["2024-01-01", 1], // lundi, semaine 1 jour 1
    ["2024-01-07", 1], // dimanche, fin de semaine 1
    ["2024-01-08", 2], // lundi, semaine 2
    ["2024-01-15", 3], // lundi, semaine 3
    ["2024-06-03", 23], // lundi, semaine 23
  ])("%s -> semaine %i", (iso, expected) => {
    const [y, m, d] = iso.split("-").map(Number);
    expect(getIsoWeekNumber(new Date(y!, m! - 1, d!))).toBe(expected);
  });
});

describe("currentRotationSessionId", () => {
  const existing = new Set(["x", "y", "z"]);

  it("suit le cycle [X, Y, Z] selon la semaine ISO", () => {
    // Semaine 1 (2024-01-01, lundi) -> index 0 -> X
    expect(currentRotationSessionId(["x", "y", "z"], existing, new Date(2024, 0, 1))).toBe("x");
    // Semaine 2 (2024-01-08) -> index 1 -> Y
    expect(currentRotationSessionId(["x", "y", "z"], existing, new Date(2024, 0, 8))).toBe("y");
    // Semaine 3 (2024-01-15) -> index 2 -> Z
    expect(currentRotationSessionId(["x", "y", "z"], existing, new Date(2024, 0, 15))).toBe("z");
    // Semaine 4 (2024-01-22) -> le cycle reprend -> X
    expect(currentRotationSessionId(["x", "y", "z"], existing, new Date(2024, 0, 22))).toBe("x");
  });

  it("retourne null si le roulement est vide", () => {
    expect(currentRotationSessionId([], existing, new Date(2024, 0, 1))).toBeNull();
  });

  it("ignore les ids de session qui n'existent plus", () => {
    // "y" a été supprimé entre-temps : le roulement effectif est [x, z].
    expect(currentRotationSessionId(["x", "y", "z"], new Set(["x", "z"]), new Date(2024, 0, 8))).toBe("z");
  });
});
