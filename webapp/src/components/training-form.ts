import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRecurringTrainings, createTraining, deleteTraining, updateTraining } from "../services/trainings.repository";
import { weeklyDatesBetween } from "../domain/calendar";
import {
  TRAINING_AUDIENCES,
  TRAINING_FORMATS,
  type Training,
  type TrainingAudience,
  type TrainingFormat,
} from "../domain/training";

@customElement("training-form")
export class TrainingForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 380px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    select,
    input[type="date"] {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    .chip-row {
      display: flex;
      gap: 0.5rem;
    }
    .chip {
      flex: 1;
      min-height: 2.6rem;
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #d1d5db);
      background: white;
      color: #374151;
      font-size: 0.9rem;
      cursor: pointer;
      touch-action: manipulation;
    }
    .chip.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
    .repeat-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.88rem;
      color: #374151;
    }
    .repeat-until {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.25rem;
      flex-wrap: wrap;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button[type="submit"]:disabled {
      background: #c4b5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;

  /** Jour concerné (fixe : on déclare un entraînement en cliquant un jour, la date ne se modifie pas ici). */
  @property() date!: string;

  /** Si fourni, le formulaire édite cet entraînement existant (pas de répétition possible dans ce cas). */
  @property({ attribute: false })
  training: Training | null = null;

  @state() private format: TrainingFormat = "Indoor";
  @state() private audience: TrainingAudience = "Tous";
  @state() private repeatWeekly = false;
  @state() private repeatUntil = "";
  @state() private errorMessage: string | null = null;
  @state() private successMessage: string | null = null;
  @state() private submitting = false;

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("training") || !this.training) return;
    this.format = this.training.format;
    this.audience = this.training.audience;
  }

  private get weekdayLabel(): string {
    return new Date(`${this.date}T00:00:00`).toLocaleDateString("fr-FR", { weekday: "long" });
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = null;
    this.successMessage = null;

    if (this.repeatWeekly) {
      if (!this.repeatUntil || this.repeatUntil < this.date) {
        this.errorMessage = "Choisissez une date de fin de répétition postérieure au jour de départ.";
        return;
      }
      this.submitting = true;
      const dates = weeklyDatesBetween(this.date, this.repeatUntil);
      const result = await createRecurringTrainings(dates, this.format, this.audience);
      this.submitting = false;
      if (typeof result === "string") {
        this.errorMessage = result;
        return;
      }
      this.successMessage =
        result.skipped > 0
          ? `${result.created} entraînement(s) créé(s), ${result.skipped} déjà existant(s) ignoré(s).`
          : `${result.created} entraînement(s) créé(s).`;
      return;
    }

    this.submitting = true;
    const input = { date: this.date, format: this.format, audience: this.audience };
    const errorMessage = this.training
      ? await updateTraining(this.training.id, input)
      : await createTraining(input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  private async handleDelete(): Promise<void> {
    if (!this.training) return;
    if (!confirm("Supprimer cet entraînement ?")) return;
    this.errorMessage = null;
    const errorMessage = await deleteTraining(this.training.id);
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  override render() {
    if (this.successMessage) {
      return html`
        <p class="success">${this.successMessage}</p>
        <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }))}>
          Fermer
        </button>
      `;
    }

    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

        <label>Format</label>
        <div class="chip-row">
          ${TRAINING_FORMATS.map(
            (f) => html`
              <button
                type="button"
                class="chip ${this.format === f ? "active" : ""}"
                aria-pressed=${this.format === f}
                @click=${() => (this.format = f)}
              >
                ${f}
              </button>
            `,
          )}
        </div>

        <label for="audience">Public</label>
        <select
          id="audience"
          .value=${this.audience}
          @change=${(e: Event) => (this.audience = (e.target as HTMLSelectElement).value as TrainingAudience)}
        >
          ${TRAINING_AUDIENCES.map((a) => html`<option value=${a}>${a}</option>`)}
        </select>

        ${!this.training
          ? html`
              <label class="repeat-row">
                <input
                  type="checkbox"
                  .checked=${this.repeatWeekly}
                  @change=${(e: Event) => (this.repeatWeekly = (e.target as HTMLInputElement).checked)}
                />
                Répéter chaque ${this.weekdayLabel}
              </label>
              ${this.repeatWeekly
                ? html`
                    <div class="repeat-until">
                      <label for="repeat-until">Jusqu'au</label>
                      <input
                        id="repeat-until"
                        type="date"
                        min=${this.date}
                        .value=${this.repeatUntil}
                        @input=${(e: Event) => (this.repeatUntil = (e.target as HTMLInputElement).value)}
                      />
                    </div>
                  `
                : ""}
            `
          : ""}

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting
              ? "Enregistrement…"
              : this.training
                ? "Enregistrer"
                : this.repeatWeekly
                  ? "Déclarer les entraînements"
                  : "Déclarer l'entraînement"}
          </button>
          ${this.training
            ? html`<button type="button" class="danger" @click=${() => this.handleDelete()}>Supprimer</button>`
            : ""}
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            Annuler
          </button>
        </div>
      </form>
    `;
  }
}
