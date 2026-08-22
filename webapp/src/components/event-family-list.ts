import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchEvents } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import type { SportEvent } from "../domain/event";
import type { EventFamily, EventReferenceItem } from "../domain/event-reference";

@customElement("event-family-list")
export class EventFamilyList extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      margin-bottom: 1.5rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.5rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      border-bottom: 1px solid #e5e7eb;
    }
    button {
      width: 100%;
      text-align: left;
      padding: 0.6rem 0.4rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    button:hover {
      background: #f9fafb;
    }
    .name {
      font-weight: 600;
      color: #1f2933;
    }
    .meta {
      color: #6b7280;
      white-space: nowrap;
    }
    .empty {
      color: #9ca3af;
      font-size: 0.9rem;
    }
  `;

  @property() family!: EventFamily;
  @property() heading = "";
  @property({ type: Number }) refreshToken = 0;

  @state() private events: SportEvent[] = [];
  @state() private eventTypes: EventReferenceItem[] = [];
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
    const [events, eventTypes] = await Promise.all([fetchEvents(), fetchEventReferenceItems("event_type")]);
    this.events = events;
    this.eventTypes = eventTypes;
    this.loading = false;
  }

  private eventTypeLabel(id: string): string {
    return this.eventTypes.find((t) => t.id === id)?.label ?? "—";
  }

  private get familyEvents(): SportEvent[] {
    const typeIdsInFamily = new Set(this.eventTypes.filter((t) => t.eventFamily === this.family).map((t) => t.id));
    return this.events
      .filter((e) => typeIdsInFamily.has(e.eventTypeId))
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  }

  private handleSelect(event: SportEvent): void {
    this.dispatchEvent(new CustomEvent<SportEvent>("select", { detail: event, bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) return html`<h3>${this.heading}</h3>
      <p>Chargement…</p>`;

    const events = this.familyEvents;

    return html`
      <h3>${this.heading}</h3>
      ${events.length === 0
        ? html`<p class="empty">Aucun événement pour le moment.</p>`
        : html`
            <ul>
              ${events.map(
                (event) => html`
                  <li>
                    <button @click=${() => this.handleSelect(event)}>
                      <span class="name">${this.eventTypeLabel(event.eventTypeId)} — ${event.category}</span>
                      <span class="meta">${event.eventDate} · ${event.location}</span>
                    </button>
                  </li>
                `,
              )}
            </ul>
          `}
    `;
  }
}
