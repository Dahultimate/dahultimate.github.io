import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchEvents } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import { fetchMemberDirectory } from "../services/member-directory.repository";
import type { SportEvent } from "../domain/event";
import type { EventReferenceItem } from "../domain/event-reference";
import type { MemberDirectoryEntry } from "../domain/member";

/**
 * Liste plate provisoire, pour pouvoir tester la création/modification
 * d'événements (phase 5). Sera remplacée par les deux listes triées
 * ("Événements sportifs" / "Tournois et Hats") avec détail et compteurs
 * en phase 6.
 */
@customElement("events-list")
export class EventsList extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.5rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
  `;

  /** Incrémenté par le parent pour déclencher un rechargement. */
  @property({ type: Number })
  refreshToken = 0;

  @state() private events: SportEvent[] = [];
  @state() private eventTypeLabels = new Map<string, string>();
  @state() private memberNames = new Map<string, string>();
  @state() private loading = true;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has("refreshToken") && changed.get("refreshToken") !== undefined) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    const [events, eventTypes, members] = await Promise.all([
      fetchEvents(),
      fetchEventReferenceItems("event_type"),
      fetchMemberDirectory(),
    ]);
    this.events = events;
    this.eventTypeLabels = new Map(eventTypes.map((t: EventReferenceItem) => [t.id, t.label]));
    this.memberNames = new Map(members.map((m: MemberDirectoryEntry) => [m.id, `${m.firstName} ${m.lastName}`]));
    this.loading = false;
  }

  private handleEdit(event: SportEvent): void {
    this.dispatchEvent(new CustomEvent<SportEvent>("edit", { detail: event, bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;
    if (this.events.length === 0) return html`<p>Aucun événement pour le moment.</p>`;

    return html`
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Lieu</th>
            <th>Porteur de projet</th>
            <th>Date butoir</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.events.map(
            (event) => html`
              <tr>
                <td>${this.eventTypeLabels.get(event.eventTypeId) ?? "—"} (${event.category})</td>
                <td>${event.eventDate}</td>
                <td>${event.location}</td>
                <td>${this.memberNames.get(event.organizerId) ?? "—"}</td>
                <td>${event.responseDeadline}</td>
                <td><button @click=${() => this.handleEdit(event)}>Modifier</button></td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }
}
