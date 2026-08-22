import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createAgeCategory, updateAgeCategory } from "../services/age-categories.repository";
import type { AgeCategory } from "../domain/age-category";
import type { Sex } from "../domain/member";

@customElement("age-category-form")
export class AgeCategoryForm extends LitElement {
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
    .hint {
      font-weight: 400;
      color: #6b7280;
      font-size: 0.78rem;
    }
    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: #2563eb;
      color: white;
    }
    button[type="submit"]:disabled {
      background: #93c5fd;
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

  /** Si fourni, le formulaire est en mode édition d'une tranche existante. */
  @property({ attribute: false })
  category: AgeCategory | null = null;

  @state() private sex: Sex = "F";
  @state() private label = "";
  @state() private minBirthYear: number | null = null;
  @state() private maxBirthYear: number | null = null;
  @state() private sortOrder = 0;

  @state() private errorMessage: string | null = null;
  @state() private submitting = false;

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("category") || !this.category) return;
    this.sex = this.category.sex;
    this.label = this.category.label;
    this.minBirthYear = this.category.minBirthYear;
    this.maxBirthYear = this.category.maxBirthYear;
    this.sortOrder = this.category.sortOrder;
  }

  private validate(): string | null {
    if (!this.label.trim()) return "Le libellé est obligatoire.";
    if (this.minBirthYear !== null && this.maxBirthYear !== null && this.minBirthYear > this.maxBirthYear) {
      return "L'année minimale doit être inférieure ou égale à l'année maximale.";
    }
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
      sex: this.sex,
      label: this.label.trim(),
      minBirthYear: this.minBirthYear,
      maxBirthYear: this.maxBirthYear,
      sortOrder: this.sortOrder,
    };

    const errorMessage = this.category
      ? await updateAgeCategory(this.category.id, input)
      : await createAgeCategory(input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  private parseYear(value: string): number | null {
    if (value.trim() === "") return null;
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : null;
  }

  override render() {
    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

        <label for="sex">Sexe</label>
        <select id="sex" .value=${this.sex} @change=${(e: Event) => (this.sex = (e.target as HTMLSelectElement).value as Sex)}>
          <option value="F">Féminin</option>
          <option value="M">Masculin</option>
        </select>

        <label for="label">Libellé</label>
        <input
          id="label"
          required
          .value=${this.label}
          @input=${(e: Event) => (this.label = (e.target as HTMLInputElement).value)}
        />

        <label for="min-year">Année de naissance minimale <span class="hint">(vide = pas de minimum)</span></label>
        <input
          id="min-year"
          type="number"
          .value=${this.minBirthYear === null ? "" : String(this.minBirthYear)}
          @input=${(e: Event) => (this.minBirthYear = this.parseYear((e.target as HTMLInputElement).value))}
        />

        <label for="max-year">Année de naissance maximale <span class="hint">(vide = pas de maximum)</span></label>
        <input
          id="max-year"
          type="number"
          .value=${this.maxBirthYear === null ? "" : String(this.maxBirthYear)}
          @input=${(e: Event) => (this.maxBirthYear = this.parseYear((e.target as HTMLInputElement).value))}
        />

        <label for="sort-order">Ordre d'affichage</label>
        <input
          id="sort-order"
          type="number"
          .value=${String(this.sortOrder)}
          @input=${(e: Event) => (this.sortOrder = Number((e.target as HTMLInputElement).value))}
        />

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting ? "Enregistrement…" : this.category ? "Enregistrer" : "Ajouter la tranche"}
          </button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            Annuler
          </button>
        </div>
      </form>
    `;
  }
}
