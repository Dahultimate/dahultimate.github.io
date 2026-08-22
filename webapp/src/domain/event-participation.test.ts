import { describe, expect, it } from "vitest";
import { evaluateParticipants, summarizeParticipants } from "./event-participation";
import type { AgeCategory } from "./age-category";
import type { MemberDirectoryEntry } from "./member";
import type { AllowedCategory } from "./event";

const AGE_CATEGORIES: AgeCategory[] = [
  { id: "f-senior", sex: "F", label: "Sénior", minBirthYear: 1998, maxBirthYear: 2007, sortOrder: 0 },
  { id: "m-senior", sex: "M", label: "Sénior", minBirthYear: 1995, maxBirthYear: 2007, sortOrder: 0 },
  { id: "m-master", sex: "M", label: "Master", minBirthYear: 1988, maxBirthYear: 1994, sortOrder: 1 },
];

function member(id: string, sex: "F" | "M", birthYear: number): MemberDirectoryEntry {
  return { id, firstName: `Prenom${id}`, lastName: `Nom${id}`, sex, birthYear };
}

describe("evaluateParticipants / summarizeParticipants", () => {
  const allowed: AllowedCategory[] = [
    { sex: "F", ageCategoryId: "f-senior" },
    { sex: "M", ageCategoryId: "m-senior" },
  ];

  it("classe non-concerné un membre dont la catégorie n'est pas autorisée", () => {
    const members = [member("1", "M", 1990)]; // Master, pas autorisé
    const evaluations = evaluateParticipants(members, AGE_CATEGORIES, allowed, new Map());
    expect(evaluations[0]?.status).toBe("not-concerned");
  });

  it("classe sans-réponse un membre concerné sans ligne de disponibilité", () => {
    const members = [member("1", "F", 2000)]; // Sénior F, autorisé
    const evaluations = evaluateParticipants(members, AGE_CATEGORIES, allowed, new Map());
    expect(evaluations[0]?.status).toBe("no-response");
  });

  it("reflète le statut de disponibilité pour un membre concerné qui a répondu", () => {
    const members = [member("1", "F", 2000)];
    const evaluations = evaluateParticipants(members, AGE_CATEGORIES, allowed, new Map([["1", "uncertain"]]));
    expect(evaluations[0]?.status).toBe("uncertain");
  });

  it("calcule des compteurs cohérents sur un scénario mixte", () => {
    const members = [
      member("f1", "F", 2000), // Sénior F, autorisé, disponible
      member("f2", "F", 2000), // Sénior F, autorisé, sans réponse
      member("m1", "M", 2000), // Sénior M, autorisé, indisponible
      member("m2", "M", 2000), // Sénior M, autorisé, incertain
      member("m3", "M", 1990), // Master M, non concerné
    ];
    const availabilities = new Map<string, "available" | "unavailable" | "uncertain">([
      ["f1", "available"],
      ["m1", "unavailable"],
      ["m2", "uncertain"],
    ]);

    const evaluations = evaluateParticipants(members, AGE_CATEGORIES, allowed, availabilities);
    const counts = summarizeParticipants(evaluations);

    expect(counts).toEqual({
      totalAvailable: 1,
      womenAvailable: 1,
      menAvailable: 0,
      uncertain: 1,
      notConcerned: 1,
      noResponse: 1,
      unavailable: 1,
      totalResponses: 3,
    });
  });
});
