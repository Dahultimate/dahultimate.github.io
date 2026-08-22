import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { deleteEventReferenceItem, fetchEventReferenceItems } from "../services/event-reference-items.repository";
import type { EventReferenceItem, EventReferenceKind } from "../domain/event-reference";
import "./event-reference-form";

@customElement("event-reference-list")
export class EventReferenceList extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      margin-bottom: 1.75rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.6rem;
    }
    .table-scroll {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.4rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
      margin-right: 0.3rem;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
  `;

  @property() kind!: EventReferenceKind;
  @property() heading = "";

  @state() private items: EventReferenceItem[] = [];
  @state() private loading = true;
  @state() private editingItem: EventReferenceItem | null = null;
  @state() private errorMessage: string | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has("kind") && changed.get("kind") !== undefined) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    this.items = await fetchEventReferenceItems(this.kind);
    this.loading = false;
  }

  private async handleDelete(item: EventReferenceItem): Promise<void> {
    if (!confirm(`Supprimer "${item.label}" ?`)) return;
    this.errorMessage = null;
    const errorMessage = await deleteEventReferenceItem(item.id);
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    await this.refresh();
  }

  private handleSaved(): void {
    this.editingItem = null;
    void this.refresh();
  }

  override render() {
    return html`
      <h3>${this.heading}</h3>
      ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
      ${this.loading
        ? html`<p>Chargement…</p>`
        : html`
            <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Libellé</th>
                  <th>Ordre</th>
                  ${this.kind === "event_type" ? html`<th>Famille</th>` : ""}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.items.map(
                  (item) => html`
                    <tr>
                      <td>${item.label}</td>
                      <td>${item.sortOrder}</td>
                      ${this.kind === "event_type"
                        ? html`<td>${item.eventFamily === "tournoi" ? "Tournoi / Hat" : "Sportif"}</td>`
                        : ""}
                      <td>
                        <button @click=${() => (this.editingItem = item)}>Modifier</button>
                        <button class="danger" @click=${() => this.handleDelete(item)}>Supprimer</button>
                      </td>
                    </tr>
                  `,
                )}
              </tbody>
            </table>
            </div>
          `}
      <event-reference-form
        .kind=${this.kind}
        .item=${this.editingItem}
        @saved=${() => this.handleSaved()}
        @cancel=${() => (this.editingItem = null)}
      ></event-reference-form>
    `;
  }
}
