export const PHYSICAL_EXERCISE_TYPES = [
  "Course",
  "Jambes",
  "Abdos",
  "Dos",
  "Bras",
  "Cardio",
  "Mobilité / Plio",
  "Disque",
  "Proprioception",
] as const;

export type PhysicalExerciseType = (typeof PHYSICAL_EXERCISE_TYPES)[number];

export interface PhysicalExercise {
  id: string;
  name: string;
  types: PhysicalExerciseType[];
  /** Facultatif. */
  instructions: string | null;
  /** Facultatif : lien vers une vidéo de démonstration (YouTube ou autre). */
  videoUrl: string | null;
}

export type PhysicalExerciseInput = Omit<PhysicalExercise, "id">;

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{6,20}$/;

/**
 * Extrait l'identifiant de vidéo YouTube d'une URL (watch, youtu.be, embed,
 * shorts), ou null si l'URL n'est pas reconnue comme une vidéo YouTube
 * intégrable — dans ce cas la page affiche un simple lien cliquable.
 */
export function extractYouTubeVideoId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\.|^m\.|^music\./, "");
  let id: string | null = null;

  if (host === "youtu.be") {
    id = parsed.pathname.slice(1).split("/")[0] ?? null;
  } else if (host === "youtube.com") {
    if (parsed.pathname === "/watch") {
      id = parsed.searchParams.get("v");
    } else {
      const match = /^\/(?:embed|shorts)\/([^/?]+)/.exec(parsed.pathname);
      id = match?.[1] ?? null;
    }
  }

  return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
}

export function youTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}
