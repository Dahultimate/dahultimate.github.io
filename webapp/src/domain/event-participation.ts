import { computeAgeCategory, type AgeCategory } from "./age-category";
import type { AllowedCategory, SportEvent } from "./event";
import type { MemberDirectoryEntry } from "./member";
import type { AvailabilityStatus } from "./availability";

export type ParticipationStatus = AvailabilityStatus | "no-response" | "not-concerned";

export interface ParticipantEvaluation {
  member: MemberDirectoryEntry;
  status: ParticipationStatus;
}

export interface ParticipationCounts {
  totalAvailable: number;
  womenAvailable: number;
  menAvailable: number;
  uncertain: number;
  notConcerned: number;
  noResponse: number;
  unavailable: number;
  totalResponses: number;
}

function allowedKey(sex: MemberDirectoryEntry["sex"], ageCategoryId: string): string {
  return `${sex}:${ageCategoryId}`;
}

/**
 * Détermine, pour chaque membre actif, s'il est concerné par l'événement
 * (son sexe + sa catégorie d'âge courante font partie des catégories
 * autorisées) et, si oui, son statut de réponse actuel.
 */
export function evaluateParticipants(
  members: readonly MemberDirectoryEntry[],
  ageCategories: readonly AgeCategory[],
  allowedCategories: readonly AllowedCategory[],
  availabilityByMemberId: ReadonlyMap<string, AvailabilityStatus>,
): ParticipantEvaluation[] {
  const allowedKeys = new Set(allowedCategories.map((c) => allowedKey(c.sex, c.ageCategoryId)));

  return members.map((member) => {
    const category = computeAgeCategory(ageCategories, member.sex, member.birthYear);
    const concerned = category !== null && allowedKeys.has(allowedKey(member.sex, category.id));
    if (!concerned) {
      return { member, status: "not-concerned" };
    }
    return { member, status: availabilityByMemberId.get(member.id) ?? "no-response" };
  });
}

/**
 * Événements pour lesquels le membre est concerné, n'a pas encore répondu,
 * et dont la date butoir n'est pas dépassée — utilisé par la page d'accueil.
 */
export function findUnansweredEvents(
  events: readonly SportEvent[],
  member: Pick<MemberDirectoryEntry, "sex" | "birthYear">,
  ageCategories: readonly AgeCategory[],
  respondedEventIds: ReadonlySet<string>,
  today: string = new Date().toISOString().slice(0, 10),
): SportEvent[] {
  const category = computeAgeCategory(ageCategories, member.sex, member.birthYear);
  if (!category) return [];

  return events.filter((event) => {
    if (respondedEventIds.has(event.id)) return false;
    if (event.responseDeadline < today) return false;
    return event.allowedCategories.some((c) => c.sex === member.sex && c.ageCategoryId === category.id);
  });
}

export function summarizeParticipants(evaluations: readonly ParticipantEvaluation[]): ParticipationCounts {
  const counts: ParticipationCounts = {
    totalAvailable: 0,
    womenAvailable: 0,
    menAvailable: 0,
    uncertain: 0,
    notConcerned: 0,
    noResponse: 0,
    unavailable: 0,
    totalResponses: 0,
  };

  for (const { member, status } of evaluations) {
    switch (status) {
      case "available":
        counts.totalAvailable += 1;
        if (member.sex === "F") counts.womenAvailable += 1;
        else counts.menAvailable += 1;
        counts.totalResponses += 1;
        break;
      case "unavailable":
        counts.unavailable += 1;
        counts.totalResponses += 1;
        break;
      case "uncertain":
        counts.uncertain += 1;
        counts.totalResponses += 1;
        break;
      case "no-response":
        counts.noResponse += 1;
        break;
      case "not-concerned":
        counts.notConcerned += 1;
        break;
    }
  }

  return counts;
}
