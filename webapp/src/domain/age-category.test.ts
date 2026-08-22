import { describe, expect, it } from "vitest";
import { computeAgeCategory, type AgeCategory } from "./age-category";

// Reproduit exactement les tranches de la spec (docs/03... / prompt_dahultiapp.md).
const CATEGORIES: AgeCategory[] = [
  { id: "f-ggm", sex: "F", label: "Great Grand Master", minBirthYear: null, maxBirthYear: 1982, sortOrder: 0 },
  { id: "f-gm", sex: "F", label: "Grand Master", minBirthYear: 1983, maxBirthYear: 1990, sortOrder: 1 },
  { id: "f-m", sex: "F", label: "Master", minBirthYear: 1991, maxBirthYear: 1997, sortOrder: 2 },
  { id: "f-s", sex: "F", label: "Sénior", minBirthYear: 1998, maxBirthYear: 2007, sortOrder: 3 },
  { id: "f-u20", sex: "F", label: "U20", minBirthYear: 2008, maxBirthYear: 2010, sortOrder: 4 },
  { id: "f-u17", sex: "F", label: "U17", minBirthYear: 2011, maxBirthYear: 2012, sortOrder: 5 },
  { id: "f-u15", sex: "F", label: "U15", minBirthYear: 2013, maxBirthYear: 2014, sortOrder: 6 },
  { id: "f-u13", sex: "F", label: "U13", minBirthYear: 2015, maxBirthYear: 2016, sortOrder: 7 },
  { id: "f-u11", sex: "F", label: "U11", minBirthYear: 2017, maxBirthYear: null, sortOrder: 8 },
  { id: "m-ggm", sex: "M", label: "Great Grand Master", minBirthYear: null, maxBirthYear: 1979, sortOrder: 0 },
  { id: "m-gm", sex: "M", label: "Grand Master", minBirthYear: 1980, maxBirthYear: 1987, sortOrder: 1 },
  { id: "m-m", sex: "M", label: "Master", minBirthYear: 1988, maxBirthYear: 1994, sortOrder: 2 },
  { id: "m-s", sex: "M", label: "Sénior", minBirthYear: 1995, maxBirthYear: 2007, sortOrder: 3 },
  { id: "m-u20", sex: "M", label: "U20", minBirthYear: 2008, maxBirthYear: 2010, sortOrder: 4 },
  { id: "m-u17", sex: "M", label: "U17", minBirthYear: 2011, maxBirthYear: 2012, sortOrder: 5 },
  { id: "m-u15", sex: "M", label: "U15", minBirthYear: 2013, maxBirthYear: 2014, sortOrder: 6 },
  { id: "m-u13", sex: "M", label: "U13", minBirthYear: 2015, maxBirthYear: 2016, sortOrder: 7 },
  { id: "m-u11", sex: "M", label: "U11", minBirthYear: 2017, maxBirthYear: null, sortOrder: 8 },
];

describe("computeAgeCategory", () => {
  it.each([
    [1950, "Great Grand Master"],
    [1982, "Great Grand Master"],
    [1983, "Grand Master"],
    [1990, "Grand Master"],
    [1991, "Master"],
    [1997, "Master"],
    [1998, "Sénior"],
    [2007, "Sénior"],
    [2008, "U20"],
    [2010, "U20"],
    [2011, "U17"],
    [2012, "U17"],
    [2013, "U15"],
    [2014, "U15"],
    [2015, "U13"],
    [2016, "U13"],
    [2017, "U11"],
    [2030, "U11"],
  ])("femmes nées en %i -> %s", (birthYear, expected) => {
    expect(computeAgeCategory(CATEGORIES, "F", birthYear)?.label).toBe(expected);
  });

  it.each([
    [1950, "Great Grand Master"],
    [1979, "Great Grand Master"],
    [1980, "Grand Master"],
    [1987, "Grand Master"],
    [1988, "Master"],
    [1994, "Master"],
    [1995, "Sénior"],
    [2007, "Sénior"],
    [2008, "U20"],
    [2017, "U11"],
  ])("hommes nés en %i -> %s", (birthYear, expected) => {
    expect(computeAgeCategory(CATEGORIES, "M", birthYear)?.label).toBe(expected);
  });

  it("retourne null si aucune tranche ne correspond (sexe absent des catégories)", () => {
    const partial = CATEGORIES.filter((c) => c.sex === "F");
    expect(computeAgeCategory(partial, "M", 2000)).toBeNull();
  });

  it("reflète immédiatement une modification de borne (rien n'est mis en cache)", () => {
    const edited = CATEGORIES.map((c) => (c.id === "f-s" ? { ...c, maxBirthYear: 2005 } : c));
    expect(computeAgeCategory(edited, "F", 2006)?.label).not.toBe("Sénior");
  });
});
