import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createPhysicalSession, updatePhysicalSession } from "../services/physical-sessions.repository";
import { fetchPhysicalExercises } from "../services/physical-exercises.repository";
import { PHYSICAL_EXERCISE_TYPES, type PhysicalExercise, type PhysicalExerciseType } from "../domain/physical-exercise";
import {
  PREP_TYPES,
  SESSION_EXERCISE_SLOT_COUNT,
  emptyExerciseSlots,
  type PhysicalSession,
  type PrepType,
} from "../domain/physical-session";

function parseOptionalInt(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

@customElement("physical-session-form")
export class PhysicalSessionForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 520px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    select {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    fieldset {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    legend {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
      padding: 0 0.3rem;
    }
    .slot {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .slot label {
      width: 6.5rem;
      flex-shrink: 0;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.25rem;
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
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;

  /** Si fourni, le formulaire édite cette session existante. */
  @property({ attribute: false })
  session: PhysicalSession | null = null;

  @state() private exercises: PhysicalExercise[] = [];
  @state() private loadingOptions = true;

  @state() private name = "";
  @state() private objective: PhysicalExerciseType | "" = "";
  @state() private prepType: PrepType | "" = "";
  @state() private seriesCount = "";
  @state() private exerciseDurationSeconds = "";
  @state() private restDurationSeconds = "";
  @state() private betweenSeriesDurationSeconds = "";
  @state() private exerciseIds: (string | null)[] = emptyExerciseSlots();
  @state() private finisherId: string | null = null;

  @state() private errorMessage: string | null = null;
  @state() private submitting = false;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.loadExercises();
  }

  private async loadExercises(): Promise<void> {
    this.loadingOptions = true;
    this.exercises = await fetchPhysicalExercises();
    this.loadingOptions = false;
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("session") || !this.session) return;
    this.name = this.session.name;
    this.objective = this.session.objective ?? "";
    this.prepType = this.session.prepType ?? "";
    this.seriesCount = this.session.seriesCount?.toString() ?? "";
    this.exerciseDurationSeconds = this.session.exerciseDurationSeconds?.toString() ?? "";
    this.restDurationSeconds = this.session.restDurationSeconds?.toString() ?? "";
    this.betweenSeriesDurationSeconds = this.session.betweenSeriesDurationSeconds?.toString() ?? "";
    this.exerciseIds = [...this.session.exerciseIds];
    this.finisherId = this.session.finisherId;
  }

  private setSlot(index: number, value: string): void {
    const next = [...this.exerciseIds];
    next[index] = value ? value : null;
    this.exerciseIds = next;
  }

  private validate(): string | null {
    if (!this.name.trim()) return "Le nom de la session est obligatoire.";
    return null;
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const validationError = this.validate();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }
    this.errorMessage = null;
    this.submitting = true;

    const input = {
      name: this.name.trim(),
      objective: this.objective ? this.objective : null,
      prepType: this.prepType ? this.prepType : null,
      seriesCount: parseOptionalInt(this.seriesCount),
      exerciseDurationSeconds: parseOptionalInt(this.exerciseDurationSeconds),
      restDurationSeconds: parseOptionalInt(this.restDurationSeconds),
      betweenSeriesDurationSeconds: parseOptionalInt(this.betweenSeriesDurationSeconds),
      exerciseIds: this.exerciseIds,
      finisherId: this.finisherId,
    };

    const errorMessage = this.session
      ? await updatePhysicalSession(this.session.id, input)
      : await createPhysicalSession(input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  private renderExerciseSelect(label: string, value: string | null, onChange: (value: string) => void) {
    return html`
      <div class="slot">
        <label>${label}</label>
        <select .value=${value ?? ""} @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
          <option value="">— Aucun —</option>
          ${this.exercises.map((ex) => html`<option value=${ex.id}>${ex.name}</option>`)}
        </select>
      </div>
    `;
  }

  override render() {
    if (this.loadingOptions) return html`<p>Chargement…</p>`;

    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

        <label for="name">Nom de la session</label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${(e: Event) => (this.name = (e.target as HTMLInputElement).value)}
        />

        <label for="objective">Objectif <span class="hint">(facultatif)</span></label>
        <select
          id="objective"
          .value=${this.objective}
          @change=${(e: Event) => (this.objective = (e.target as HTMLSelectElement).value as PhysicalExerciseType | "")}
        >
          <option value="">— Aucun —</option>
          ${PHYSICAL_EXERCISE_TYPES.map((t) => html`<option value=${t}>${t}</option>`)}
        </select>

        <label for="prep-type">Type de prépa <span class="hint">(facultatif)</span></label>
        <select
          id="prep-type"
          .value=${this.prepType}
          @change=${(e: Event) => (this.prepType = (e.target as HTMLSelectElement).value as PrepType | "")}
        >
          <option value="">— Aucun —</option>
          ${PREP_TYPES.map((t) => html`<option value=${t}>${t}</option>`)}
        </select>

        <div class="grid-2">
          <div>
            <label for="series-count">Nombre de séries</label>
            <input
              id="series-count"
              type="number"
              min="1"
              .value=${this.seriesCount}
              @input=${(e: Event) => (this.seriesCount = (e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label for="exercise-duration">Durée des exercices (s)</label>
            <input
              id="exercise-duration"
              type="number"
              min="1"
              .value=${this.exerciseDurationSeconds}
              @input=${(e: Event) => (this.exerciseDurationSeconds = (e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label for="rest-duration">Durée du repos (s)</label>
            <input
              id="rest-duration"
              type="number"
              min="0"
              .value=${this.restDurationSeconds}
              @input=${(e: Event) => (this.restDurationSeconds = (e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label for="between-series-duration">Durée entre les séries (s)</label>
            <input
              id="between-series-duration"
              type="number"
              min="0"
              .value=${this.betweenSeriesDurationSeconds}
              @input=${(e: Event) => (this.betweenSeriesDurationSeconds = (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        <fieldset>
          <legend>Exercices</legend>
          ${Array.from({ length: SESSION_EXERCISE_SLOT_COUNT }, (_, i) =>
            this.renderExerciseSelect(`Exercice ${i + 1}`, this.exerciseIds[i] ?? null, (value) => this.setSlot(i, value)),
          )}
          ${this.renderExerciseSelect("Finisher", this.finisherId, (value) => (this.finisherId = value ? value : null))}
        </fieldset>

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting ? "Enregistrement…" : this.session ? "Enregistrer" : "Créer la session"}
          </button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            Annuler
          </button>
        </div>
      </form>
    `;
  }
}
