import { describe, expect, it } from "vitest";
import { evaluateParticipants, findUnansweredEvents, summarizeParticipants } from "./event-participation";
import type { AgeCategory } from "./age-category";
import type { MemberDirectoryEntry } from "./member";
import type { AllowedCategory, SportEvent } from "./event";

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

function event(id: string, deadline: string, allowedCategories: AllowedCategory[]): SportEvent {
  return {
    id,
    name: "Événement de test",
    eventTypeId: "type-1",
    category: "Mixte",
    formatId: "format-1",
    divisionId: "division-1",
    location: "Annecy",
    startDate: "2030-06-15",
    endDate: "2030-06-15",
    organizerId: "organizer-1",
    responseDeadline: deadline,
    allowedCategories,
  };
}

describe("findUnansweredEvents", () => {
  const me = { sex: "F" as const, birthYear: 2000 }; // Sénior F
  const allowedForMe: AllowedCategory[] = [{ sex: "F", ageCategoryId: "f-senior" }];
  const allowedForOthers: AllowedCategory[] = [{ sex: "M", ageCategoryId: "m-senior" }];

  it("inclut un événement concerné, futur, sans réponse", () => {
    const events = [event("e1", "2030-01-01", allowedForMe)];
    const result = findUnansweredEvents(events, me, AGE_CATEGORIES, new Set(), "2029-12-01");
    expect(result.map((e) => e.id)).toEqual(["e1"]);
  });

  it("exclut un événement déjà répondu", () => {
    const events = [event("e1", "2030-01-01", allowedForMe)];
    const result = findUnansweredEvents(events, me, AGE_CATEGORIES, new Set(["e1"]), "2029-12-01");
    expect(result).toEqual([]);
  });

  it("exclut un événement dont la date butoir est dépassée", () => {
    const events = [event("e1", "2029-01-01", allowedForMe)];
    const result = findUnansweredEvents(events, me, AGE_CATEGORIES, new Set(), "2029-12-01");
    expect(result).toEqual([]);
  });

  it("exclut un événement pour lequel le membre n'est pas concerné", () => {
    const events = [event("e1", "2030-01-01", allowedForOthers)];
    const result = findUnansweredEvents(events, me, AGE_CATEGORIES, new Set(), "2029-12-01");
    expect(result).toEqual([]);
  });
});
