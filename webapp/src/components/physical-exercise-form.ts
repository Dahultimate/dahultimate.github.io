import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  createPhysicalExercise,
  updatePhysicalExercise,
} from "../services/physical-exercises.repository";
import { PHYSICAL_EXERCISE_TYPES, type PhysicalExercise, type PhysicalExerciseType } from "../domain/physical-exercise";

@customElement("physical-exercise-form")
export class PhysicalExerciseForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 480px;
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
    textarea {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
    }
    textarea {
      resize: vertical;
      min-height: 5rem;
    }
    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .chip {
      min-height: 2.6rem;
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #d1d5db);
      background: white;
      color: #374151;
      font-size: 0.85rem;
      cursor: pointer;
      touch-action: manipulation;
    }
    .chip.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
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

  /** Si fourni, le formulaire édite cet exercice existant. */
  @property({ attribute: false })
  exercise: PhysicalExercise | null = null;

  @state() private name = "";
  @state() private types = new Set<PhysicalExerciseType>();
  @state() private instructions = "";
  @state() private videoUrl = "";

  @state() private errorMessage: string | null = null;
  @state() private submitting = false;

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("exercise")) return;
    this.name = this.exercise?.name ?? "";
    this.types = new Set(this.exercise?.types ?? []);
    this.instructions = this.exercise?.instructions ?? "";
    this.videoUrl = this.exercise?.videoUrl ?? "";
  }

  private toggleType(type: PhysicalExerciseType): void {
    const next = new Set(this.types);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    this.types = next;
  }

  private validate(): string | null {
    if (!this.name.trim()) return "Le nom de l'exercice est obligatoire.";
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
      types: [...this.types],
      instructions: this.instructions.trim() ? this.instructions.trim() : null,
      videoUrl: this.videoUrl.trim() ? this.videoUrl.trim() : null,
    };

    const errorMessage = this.exercise
      ? await updatePhysicalExercise(this.exercise.id, input)
      : await createPhysicalExercise(input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

        <label for="name">Nom de l'exercice</label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${(e: Event) => (this.name = (e.target as HTMLInputElement).value)}
        />

        <label>Types <span class="hint">(facultatif, plusieurs possibles)</span></label>
        <div class="chip-grid">
          ${PHYSICAL_EXERCISE_TYPES.map((type) => {
            const active = this.types.has(type);
            return html`
              <button
                type="button"
                class="chip ${active ? "active" : ""}"
                aria-pressed=${active}
                @click=${() => this.toggleType(type)}
              >
                ${type}
              </button>
            `;
          })}
        </div>

        <label for="instructions">Consignes <span class="hint">(facultatif)</span></label>
        <textarea
          id="instructions"
          .value=${this.instructions}
          @input=${(e: Event) => (this.instructions = (e.target as HTMLTextAreaElement).value)}
        ></textarea>

        <label for="video-url">Lien vidéo de démonstration <span class="hint">(facultatif, YouTube intégré automatiquement)</span></label>
        <input
          id="video-url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          .value=${this.videoUrl}
          @input=${(e: Event) => (this.videoUrl = (e.target as HTMLInputElement).value)}
        />

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting ? "Enregistrement…" : this.exercise ? "Enregistrer" : "Ajouter l'exercice"}
          </button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            Annuler
          </button>
        </div>
      </form>
    `;
  }
}
