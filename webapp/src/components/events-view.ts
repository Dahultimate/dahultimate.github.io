import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";
import "./events-browser";
import "./event-detail";
import "./event-form";

export type EventsSubView =
  | { mode: "list" }
  | { mode: "detail"; event: SportEvent }
  | { mode: "create" }
  | { mode: "edit"; event: SportEvent };

/**
 * Composant "contrôlé" : ne possède plus son propre état de navigation.
 * L'écran courant (`view`) est imposé par le parent (app-shell), qui
 * synchronise la navigation Événements avec l'historique du navigateur
 * (bouton Retour) — voir app-shell.ts. Ce composant se contente de
 * signaler les intentions de navigation via des événements.
 */
@customElement("events-view")
export class EventsView extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `;

  @property({ attribute: false }) member!: Member;
  @property({ attribute: false }) view: EventsSubView = { mode: "list" };
  @property({ type: Number }) listRefreshToken = 0;

  private get canManage(): boolean {
    return this.member.isAdmin;
  }

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  override render() {
    if (this.view.mode !== "list") {
      return html`
        ${this.view.mode === "detail"
          ? html`<event-detail
              .event=${this.view.event}
              .member=${this.member}
              @back=${() => this.emit("back-to-list")}
              @edit=${(e: CustomEvent<SportEvent>) => this.emit("edit-event", e.detail)}
            ></event-detail>`
          : html`<event-form
              .event=${this.view.mode === "edit" ? this.view.event : null}
              @saved=${() => this.emit("saved")}
              @cancel=${() => this.emit("back-to-list")}
            ></event-form>`}
      `;
    }

    return html`
      <header>
        <h2>Événements</h2>
        ${this.canManage ? html`<button @click=${() => this.emit("create-event")}>+ Créer un événement</button>` : ""}
      </header>
      <events-browser
        .refreshToken=${this.listRefreshToken}
        @select=${(e: CustomEvent<SportEvent>) => this.emit("select-event", e.detail)}
      ></events-browser>
    `;
  }
}
