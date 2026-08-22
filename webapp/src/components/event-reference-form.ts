import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  createEventReferenceItem,
  updateEventReferenceItem,
} from "../services/event-reference-items.repository";
import type { EventReferenceItem, EventReferenceKind } from "../domain/event-reference";

@customElement("event-reference-form")
export class EventReferenceForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      align-items: flex-end;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
    }
    input {
      padding: 0.5rem 0.65rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
    }
    input[name="sortOrder"] {
      width: 5rem;
    }
    button {
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      font-size: 0.9rem;
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
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.8rem;
      flex-basis: 100%;
    }
  `;

  @property() kind!: EventReferenceKind;

  /** Si fourni, le formulaire édite cet item ; sinon il en crée un nouveau. */
  @property({ attribute: false })
  item: EventReferenceItem | null = null;

  @state() private label = "";
  @state() private sortOrder = 0;
  @state() private errorMessage: string | null = null;
  @state() private submitting = false;

  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("item")) return;
    this.label = this.item?.label ?? "";
    this.sortOrder = this.item?.sortOrder ?? 0;
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.label.trim()) {
      this.errorMessage = "Le libellé est obligatoire.";
      return;
    }
    this.errorMessage = null;
    this.submitting = true;

    const input = { label: this.label.trim(), sortOrder: this.sortOrder };
    const errorMessage = this.item
      ? await updateEventReferenceItem(this.item.id, input)
      : await createEventReferenceItem(this.kind, input);

    this.submitting = false;
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    this.label = "";
    this.sortOrder = 0;
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
        <div class="field">
          <label for="label-${this.kind}">Libellé</label>
          <input
            id="label-${this.kind}"
            name="label"
            required
            .value=${this.label}
            @input=${(e: Event) => (this.label = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="field">
          <label for="order-${this.kind}">Ordre</label>
          <input
            id="order-${this.kind}"
            name="sortOrder"
            type="number"
            .value=${String(this.sortOrder)}
            @input=${(e: Event) => (this.sortOrder = Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting ? "…" : this.item ? "Enregistrer" : "Ajouter"}
        </button>
        ${this.item
          ? html`<button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
              Annuler
            </button>`
          : ""}
      </form>
    `;
  }
}
