export const TRAINING_FORMATS = ["Indoor", "Outdoor"] as const;
export type TrainingFormat = (typeof TRAINING_FORMATS)[number];

export const TRAINING_AUDIENCES = ["Tous", "Open N3", "Open N2", "Féminin", "Mixte", "Open DR"] as const;
export type TrainingAudience = (typeof TRAINING_AUDIENCES)[number];

export interface Training {
  id: string;
  /** Date ISO (yyyy-mm-dd), unique : au plus un entraînement par jour. */
  date: string;
  format: TrainingFormat;
  audience: TrainingAudience;
}

export type TrainingInput = Omit<Training, "id">;

export interface AudienceColor {
  background: string;
  text: string;
}

/** Couleur associée à chaque public, pour repérer un entraînement d'un coup d'œil dans le calendrier. */
export const AUDIENCE_COLORS: Record<TrainingAudience, AudienceColor> = {
  Tous: { background: "#f3f4f6", text: "#374151" }, // gris
  "Open N3": { background: "#fee2e2", text: "#991b1b" }, // rouge
  "Open N2": { background: "#ffedd5", text: "#9a3412" }, // orange
  Féminin: { background: "#fef9c3", text: "#854d0e" }, // jaune
  Mixte: { background: "#dcfce7", text: "#166534" }, // vert
  "Open DR": { background: "#ede9fe", text: "#5b21b6" }, // violet
};

/** Couleur associée à chaque format. */
export const FORMAT_COLORS: Record<TrainingFormat, AudienceColor> = {
  Indoor: { background: "#dbeafe", text: "#1e40af" }, // bleu
  Outdoor: { background: "#dcfce7", text: "#166534" }, // vert
};
