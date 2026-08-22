import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createEvent, updateEvent } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import { fetchAgeCategories } from "../services/age-categories.repository";
import { fetchMemberDirectory } from "../services/member-directory.repository";
import {
  computeDefaultEventName,
  EVENT_CATEGORIES,
  type AllowedCategory,
  type EventCategory,
  type SportEvent,
} from "../domain/event";
import type { AgeCategory } from "../domain/age-category";
import type { EventReferenceItem } from "../domain/event-reference";
import type { MemberDirectoryEntry, Sex } from "../domain/member";

function allowedCategoryKey(sex: Sex, ageCategoryId: string): string {
  return `${sex}:${ageCategoryId}`;
}

@customElement("event-form")
export class EventForm extends LitElement {
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
    select {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    .dates-row {
      display: flex;
      gap: 0.75rem;
    }
    .dates-row > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    fieldset {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.75rem;
    }
    legend {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
      padding: 0 0.3rem;
    }
    .select-all {
      display: block;
      width: 100%;
      margin-bottom: 0.75rem;
      padding: 0.6rem;
      border-radius: 999px;
      border: 1px dashed var(--color-primary, #7c3aed);
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .categories-columns {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .categories-column {
      flex: 1;
      min-width: 140px;
    }
    .categories-column h4 {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0 0 0.5rem;
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

  /** Si fourni, le formulaire édite cet événement existant. */
  @property({ attribute: false })
  event: SportEvent | null = null;

  @state() private eventTypes: EventReferenceItem[] = [];
  @state() private formats: EventReferenceItem[] = [];
  @state() private divisions: EventReferenceItem[] = [];
  @state() private ageCategories: AgeCategory[] = [];
  @state() private members: MemberDirectoryEntry[] = [];
  @state() private loadingOptions = true;

  @state() private name = "";
  /** Une fois vrai, le nom n'est plus recalculé automatiquement quand type/catégorie/format/division changent. */
  @state() private nameManuallyEdited = false;
  @state() private eventTypeId = "";
  @state() private category: EventCategory = EVENT_CATEGORIES[0];
  @state() private formatId = "";
  @state() private divisionId = "";
  @state() private location = "";
  @state() private startDate = "";
  @state() private endDate = "";
  @state() private organizerId = "";
  @state() private responseDeadline = "";
  @state() private allowedCategoryKeys = new Set<string>();

  @state() private errorMessage: string | null = null;
  @state() private submitting = false;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.loadOptions();
  }

  private async loadOptions(): Promise<void> {
    this.loadingOptions = true;
    const [eventTypes, formats, divisions, ageCategories, members] = await Promise.all([
      fetchEventReferenceItems("event_type"),
      fetchEventReferenceItems("format"),
      fetchEventReferenceItems("division"),
      fetchAgeCategories(),
      fetchMemberDirectory(),
    ]);
    this.eventTypes = eventTypes;
    this.formats = formats;
    this.divisions = divisions;
    this.ageCategories = ageCategories;
    this.members = [...members].sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.loadingOptions = false;

    if (!this.eventTypeId) this.eventTypeId = eventTypes[0]?.id ?? "";
    if (!this.formatId) this.formatId = formats[0]?.id ?? "";
    if (!this.divisionId) this.divisionId = divisions[0]?.id ?? "";
    // Le porteur de projet est facultatif : pas de sélection automatique, l'admin choisit explicitement.

    this.maybeRecomputeName();
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("event") || !this.event) return;
    this.name = this.event.name;
    this.nameManuallyEdited = true;
    this.eventTypeId = this.event.eventTypeId;
    this.category = this.event.category;
    this.formatId = this.event.formatId;
    this.divisionId = this.event.divisionId;
    this.location = this.event.location ?? "";
    this.startDate = this.event.startDate;
    this.endDate = this.event.endDate;
    this.organizerId = this.event.organizerId ?? "";
    this.responseDeadline = this.event.responseDeadline;
    this.allowedCategoryKeys = new Set(
      this.event.allowedCategories.map((c) => allowedCategoryKey(c.sex, c.ageCategoryId)),
    );
  }

  /** Recalcule le nom par défaut tant que l'utilisateur ne l'a pas modifié à la main. */
  private maybeRecomputeName(): void {
    if (this.nameManuallyEdited) return;
    this.name = computeDefaultEventName(
      this.eventTypes.find((t) => t.id === this.eventTypeId)?.label ?? "",
      this.category,
      this.formats.find((f) => f.id === this.formatId)?.label ?? "",
      this.divisions.find((d) => d.id === this.divisionId)?.label ?? "",
    );
  }

  private handleNameInput(value: string): void {
    this.name = value;
    this.nameManuallyEdited = true;
  }

  private toggleAllowedCategory(sex: Sex, ageCategoryId: string, checked: boolean): void {
    const key = allowedCategoryKey(sex, ageCategoryId);
    const next = new Set(this.allowedCategoryKeys);
    if (checked) next.add(key);
    else next.delete(key);
    this.allowedCategoryKeys = next;
  }

  private get allCategoryKeys(): string[] {
    return this.ageCategories.map((c) => allowedCategoryKey(c.sex, c.id));
  }

  private get allCategoriesSelected(): boolean {
    return this.allCategoryKeys.length > 0 && this.allCategoryKeys.every((key) => this.allowedCategoryKeys.has(key));
  }

  private toggleSelectAllCategories(): void {
    this.allowedCategoryKeys = this.allCategoriesSelected ? new Set() : new Set(this.allCategoryKeys);
  }

  private validate(): string | null {
    if (!this.name.trim()) return "Le nom de l'événement est obligatoire.";
    if (!this.eventTypeId || !this.formatId || !this.divisionId) {
      return "Tous les champs sont obligatoires.";
    }
    if (!this.startDate) return "La date de début est obligatoire.";
    if (!this.endDate) return "La date de fin est obligatoire.";
    if (this.endDate < this.startDate) {
      return "La date de fin doit être après la date de début.";
    }
    if (!this.responseDeadline) return "La date butoir de réponse est obligatoire.";
    if (this.responseDeadline >= this.startDate) {
      return "La date butoir doit être avant la date de début de l'événement.";
    }
    if (this.allowedCategoryKeys.size === 0) {
      return "Sélectionnez au moins une catégorie pouvant participer.";
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

    const allowedCategories: AllowedCategory[] = [...this.allowedCategoryKeys].map((key) => {
      const [sex, ageCategoryId] = key.split(":") as [Sex, string];
      return { sex, ageCategoryId };
    });

    const input = {
      name: this.name.trim(),
      eventTypeId: this.eventTypeId,
      category: this.category,
      formatId: this.formatId,
      divisionId: this.divisionId,
      location: this.location.trim() ? this.location.trim() : null,
      startDate: this.startDate,
      endDate: this.endDate,
      organizerId: this.organizerId ? this.organizerId : null,
      responseDeadline: this.responseDeadline,
      allowedCategories,
    };

    const errorMessage = this.event ? await updateEvent(this.event.id, input) : await createEvent(input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  private renderCategoryColumn(sex: Sex, label: string) {
    return html`
      <div class="categories-column">
        <h4>${label}</h4>
        <div class="chip-grid">
          ${this.ageCategories
            .filter((c) => c.sex === sex)
            .map((c) => {
              const active = this.allowedCategoryKeys.has(allowedCategoryKey(sex, c.id));
              return html`
                <button
                  type="button"
                  class="chip ${active ? "active" : ""}"
                  aria-pressed=${active}
                  @click=${() => this.toggleAllowedCategory(sex, c.id, !active)}
                >
                  ${c.label}
                </button>
              `;
            })}
        </div>
      </div>
    `;
  }

  override render() {
    if (this.loadingOptions) return html`<p>Chargement…</p>`;

    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

        <label for="event-type">Type d'événement</label>
        <select
          id="event-type"
          .value=${this.eventTypeId}
          @change=${(e: Event) => {
            this.eventTypeId = (e.target as HTMLSelectElement).value;
            this.maybeRecomputeName();
          }}
        >
          ${this.eventTypes.map((t) => html`<option value=${t.id}>${t.label}</option>`)}
        </select>

        <label for="category">Catégorie</label>
        <select
          id="category"
          .value=${this.category}
          @change=${(e: Event) => {
            this.category = (e.target as HTMLSelectElement).value as EventCategory;
            this.maybeRecomputeName();
          }}
        >
          ${EVENT_CATEGORIES.map((c) => html`<option value=${c}>${c}</option>`)}
        </select>

        <label for="format">Format</label>
        <select
          id="format"
          .value=${this.formatId}
          @change=${(e: Event) => {
            this.formatId = (e.target as HTMLSelectElement).value;
            this.maybeRecomputeName();
          }}
        >
          ${this.formats.map((f) => html`<option value=${f.id}>${f.label}</option>`)}
        </select>

        <label for="division">Division</label>
        <select
          id="division"
          .value=${this.divisionId}
          @change=${(e: Event) => {
            this.divisionId = (e.target as HTMLSelectElement).value;
            this.maybeRecomputeName();
          }}
        >
          ${this.divisions.map((d) => html`<option value=${d.id}>${d.label}</option>`)}
        </select>

        <label for="name">Nom de l'événement <span class="hint">(pré-rempli, modifiable)</span></label>
        <input
          id="name"
          required
          .value=${this.name}
          @input=${(e: Event) => this.handleNameInput((e.target as HTMLInputElement).value)}
        />

        <label for="location">Lieu <span class="hint">(facultatif — "Lieu inconnu" si non renseigné)</span></label>
        <input
          id="location"
          .value=${this.location}
          @input=${(e: Event) => (this.location = (e.target as HTMLInputElement).value)}
        />

        <div class="dates-row">
          <div>
            <label for="start-date">Date de début</label>
            <input
              id="start-date"
              type="date"
              required
              .value=${this.startDate}
              @input=${(e: Event) => (this.startDate = (e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label for="end-date">Date de fin</label>
            <input
              id="end-date"
              type="date"
              required
              .value=${this.endDate}
              @input=${(e: Event) => (this.endDate = (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        <label for="organizer">Porteur de projet <span class="hint">(facultatif)</span></label>
        <select
          id="organizer"
          .value=${this.organizerId}
          @change=${(e: Event) => (this.organizerId = (e.target as HTMLSelectElement).value)}
        >
          <option value="">— Aucun —</option>
          ${this.members.map((m) => html`<option value=${m.id}>${m.firstName} ${m.lastName}</option>`)}
        </select>

        <label for="response-deadline">Date butoir de réponse <span class="hint">(avant la date de début)</span></label>
        <input
          id="response-deadline"
          type="date"
          required
          .value=${this.responseDeadline}
          @input=${(e: Event) => (this.responseDeadline = (e.target as HTMLInputElement).value)}
        />

        <fieldset>
          <legend>Catégories pouvant participer</legend>
          <button type="button" class="select-all" @click=${() => this.toggleSelectAllCategories()}>
            ${this.allCategoriesSelected ? "Tout désélectionner" : "Toutes les catégories"}
          </button>
          <div class="categories-columns">
            ${this.renderCategoryColumn("F", "Femmes")} ${this.renderCategoryColumn("M", "Hommes")}
          </div>
        </fieldset>

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting ? "Enregistrement…" : this.event ? "Enregistrer" : "Créer l'événement"}
          </button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            Annuler
          </button>
        </div>
      </form>
    `;
  }
}
