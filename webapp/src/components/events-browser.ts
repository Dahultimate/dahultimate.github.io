import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchEvents } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import type { SportEvent } from "../domain/event";
import type { EventFamily, EventReferenceItem } from "../domain/event-reference";

type FamilyFilter = "all" | EventFamily;

const FAMILY_FILTERS: readonly { id: FamilyFilter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "sportif", label: "Événements sportifs" },
  { id: "tournoi", label: "Tournois et Hats" },
];

@customElement("events-browser")
export class EventsBrowser extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .filters {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .filters button {
      padding: 0.4rem 0.8rem;
      border-radius: 999px;
      border: 1px solid var(--color-border, #e6e3f1);
      background: var(--color-surface, white);
      color: var(--color-text-muted, #6b7280);
      font-size: 0.82rem;
      cursor: pointer;
    }
    .filters button.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
    input[type="search"] {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      font-size: 0.95rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    li button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      text-align: left;
      padding: 0.8rem 1rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      cursor: pointer;
      font-size: 0.9rem;
    }
    li button:hover {
      box-shadow: var(--shadow-md, none);
    }
    .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .meta {
      color: var(--color-text-muted, #6b7280);
      white-space: nowrap;
      font-size: 0.82rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;

  @property({ type: Number }) refreshToken = 0;

  @state() private events: SportEvent[] = [];
  @state() private eventTypes: EventReferenceItem[] = [];
  @state() private loading = true;
  @state() private familyFilter: FamilyFilter = "all";
  @state() private search = "";

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

  private get filteredEvents(): SportEvent[] {
    const search = this.search.trim().toLowerCase();
    return this.events
      .filter((event) => {
        if (this.familyFilter !== "all") {
          const family = this.eventTypes.find((t) => t.id === event.eventTypeId)?.eventFamily;
          if (family !== this.familyFilter) return false;
        }
        if (!search) return true;
        const haystack = `${this.eventTypeLabel(event.eventTypeId)} ${event.category} ${event.location}`.toLowerCase();
        return haystack.includes(search);
      })
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  }

  private handleSelect(event: SportEvent): void {
    this.dispatchEvent(new CustomEvent<SportEvent>("select", { detail: event, bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    const events = this.filteredEvents;

    return html`
      <div class="toolbar">
        <div class="filters">
          ${FAMILY_FILTERS.map(
            (f) => html`
              <button class=${this.familyFilter === f.id ? "active" : ""} @click=${() => (this.familyFilter = f.id)}>
                ${f.label}
              </button>
            `,
          )}
        </div>
        <input
          type="search"
          placeholder="Rechercher un événement (type, catégorie, lieu)…"
          .value=${this.search}
          @input=${(e: Event) => (this.search = (e.target as HTMLInputElement).value)}
        />
      </div>

      ${events.length === 0
        ? html`<p class="empty">Aucun événement ne correspond.</p>`
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
