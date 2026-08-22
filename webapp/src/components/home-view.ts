import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchEvents } from "../services/events.repository";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import { fetchAgeCategories } from "../services/age-categories.repository";
import { fetchOwnRespondedEventIds } from "../services/availabilities.repository";
import { findUnansweredEvents } from "../domain/event-participation";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";

@customElement("home-view")
export class HomeView extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 1.3rem;
      margin: 0 0 0.3rem;
      color: var(--color-text, #1f2937);
    }
    .greeting {
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 1.5rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.6rem;
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
      border-left: 4px solid var(--color-accent, #ec4899);
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
      background: var(--color-surface, white);
      border: 1px dashed var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      padding: 1rem;
      font-size: 0.9rem;
    }
  `;

  @property({ attribute: false }) member!: Member;

  @state() private unanswered: SportEvent[] = [];
  @state() private eventTypeLabels = new Map<string, string>();
  @state() private loading = true;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;
    const [events, eventTypes, ageCategories, respondedIds] = await Promise.all([
      fetchEvents(),
      fetchEventReferenceItems("event_type"),
      fetchAgeCategories(),
      fetchOwnRespondedEventIds(),
    ]);
    this.eventTypeLabels = new Map(eventTypes.map((t) => [t.id, t.label]));
    this.unanswered = findUnansweredEvents(events, this.member, ageCategories, respondedIds).sort((a, b) =>
      a.eventDate.localeCompare(b.eventDate),
    );
    this.loading = false;
  }

  private handleSelect(event: SportEvent): void {
    this.dispatchEvent(new CustomEvent<SportEvent>("select-event", { detail: event, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <h2>Bonjour ${this.member.firstName} 👋</h2>
      <p class="greeting">Bienvenue sur DahultiApp.</p>

      <h3>Évènements en attente de votre réponse</h3>
      ${this.loading
        ? html`<p>Chargement…</p>`
        : this.unanswered.length === 0
          ? html`<p class="empty">Vous êtes à jour, aucune réponse en attente 🎉</p>`
          : html`
              <ul>
                ${this.unanswered.map(
                  (event) => html`
                    <li>
                      <button @click=${() => this.handleSelect(event)}>
                        <span class="name">${this.eventTypeLabels.get(event.eventTypeId) ?? "—"} — ${event.category}</span>
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
