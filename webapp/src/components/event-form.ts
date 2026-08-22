import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createEvent, updateEvent } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import { fetchAgeCategories } from "../services/age-categories.repository";
import { fetchMemberDirectory } from "../services/member-directory.repository";
import { EVENT_CATEGORIES, type AllowedCategory, type EventCategory, type SportEvent } from "../domain/event";
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
    input,
    select {
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }
    fieldset {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.6rem 0.75rem;
    }
    legend {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
      padding: 0 0.3rem;
    }
    .categories-columns {
      display: flex;
      gap: 1.5rem;
    }
    .categories-column h4 {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0 0 0.3rem;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      font-weight: 400;
      margin-bottom: 0.2rem;
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

  @state() private eventTypeId = "";
  @state() private category: EventCategory = EVENT_CATEGORIES[0];
  @state() private formatId = "";
  @state() private divisionId = "";
  @state() private location = "";
  @state() private eventDate = "";
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
    if (!this.organizerId) this.organizerId = members[0]?.id ?? "";
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("event") || !this.event) return;
    this.eventTypeId = this.event.eventTypeId;
    this.category = this.event.category;
    this.formatId = this.event.formatId;
    this.divisionId = this.event.divisionId;
    this.location = this.event.location;
    this.eventDate = this.event.eventDate;
    this.organizerId = this.event.organizerId;
    this.responseDeadline = this.event.responseDeadline;
    this.allowedCategoryKeys = new Set(
      this.event.allowedCategories.map((c) => allowedCategoryKey(c.sex, c.ageCategoryId)),
    );
  }

  private toggleAllowedCategory(sex: Sex, ageCategoryId: string, checked: boolean): void {
    const key = allowedCategoryKey(sex, ageCategoryId);
    const next = new Set(this.allowedCategoryKeys);
    if (checked) next.add(key);
    else next.delete(key);
    this.allowedCategoryKeys = next;
  }

  private validate(): string | null {
    if (!this.eventTypeId || !this.formatId || !this.divisionId || !this.organizerId) {
      return "Tous les champs sont obligatoires.";
    }
    if (!this.location.trim()) return "Le lieu est obligatoire.";
    if (!this.eventDate) return "La date de l'événement est obligatoire.";
    if (!this.responseDeadline) return "La date butoir de réponse est obligatoire.";
    if (this.responseDeadline > this.eventDate) {
      return "La date butoir doit être avant ou égale à la date de l'événement.";
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
      eventTypeId: this.eventTypeId,
      category: this.category,
      formatId: this.formatId,
      divisionId: this.divisionId,
      location: this.location.trim(),
      eventDate: this.eventDate,
      organizerId: this.organizerId,
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
        ${this.ageCategories
          .filter((c) => c.sex === sex)
          .map(
            (c) => html`
              <label class="checkbox">
                <input
                  type="checkbox"
                  .checked=${this.allowedCategoryKeys.has(allowedCategoryKey(sex, c.id))}
                  @change=${(e: Event) => this.toggleAllowedCategory(sex, c.id, (e.target as HTMLInputElement).checked)}
                />
                ${c.label}
              </label>
            `,
          )}
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
          @change=${(e: Event) => (this.eventTypeId = (e.target as HTMLSelectElement).value)}
        >
          ${this.eventTypes.map((t) => html`<option value=${t.id}>${t.label}</option>`)}
        </select>

        <label for="category">Catégorie</label>
        <select
          id="category"
          .value=${this.category}
          @change=${(e: Event) => (this.category = (e.target as HTMLSelectElement).value as EventCategory)}
        >
          ${EVENT_CATEGORIES.map((c) => html`<option value=${c}>${c}</option>`)}
        </select>

        <label for="format">Format</label>
        <select
          id="format"
          .value=${this.formatId}
          @change=${(e: Event) => (this.formatId = (e.target as HTMLSelectElement).value)}
        >
          ${this.formats.map((f) => html`<option value=${f.id}>${f.label}</option>`)}
        </select>

        <label for="division">Division</label>
        <select
          id="division"
          .value=${this.divisionId}
          @change=${(e: Event) => (this.divisionId = (e.target as HTMLSelectElement).value)}
        >
          ${this.divisions.map((d) => html`<option value=${d.id}>${d.label}</option>`)}
        </select>

        <label for="location">Lieu</label>
        <input
          id="location"
          required
          .value=${this.location}
          @input=${(e: Event) => (this.location = (e.target as HTMLInputElement).value)}
        />

        <label for="event-date">Date de l'événement</label>
        <input
          id="event-date"
          type="date"
          required
          .value=${this.eventDate}
          @input=${(e: Event) => (this.eventDate = (e.target as HTMLInputElement).value)}
        />

        <label for="organizer">Porteur de projet</label>
        <select
          id="organizer"
          .value=${this.organizerId}
          @change=${(e: Event) => (this.organizerId = (e.target as HTMLSelectElement).value)}
        >
          ${this.members.map((m) => html`<option value=${m.id}>${m.firstName} ${m.lastName}</option>`)}
        </select>

        <label for="response-deadline">Date butoir de réponse</label>
        <input
          id="response-deadline"
          type="date"
          required
          .value=${this.responseDeadline}
          @input=${(e: Event) => (this.responseDeadline = (e.target as HTMLInputElement).value)}
        />

        <fieldset>
          <legend>Catégories pouvant participer</legend>
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
