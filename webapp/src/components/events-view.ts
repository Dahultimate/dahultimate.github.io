import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";
import "./events-browser";
import "./event-detail";
import "./event-form";

type ViewMode = { mode: "lists" } | { mode: "detail"; event: SportEvent } | { mode: "create" } | { mode: "edit"; event: SportEvent };

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
      background: var(--color-primary, var(--color-primary, #7c3aed));
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `;

  @property({ attribute: false }) member!: Member;

  /** Sélection imposée par un autre écran (ex : page d'accueil). */
  @property({ attribute: false }) initialEvent: SportEvent | null = null;
  @property({ type: Number }) initialEventToken = 0;

  @state() private view: ViewMode = { mode: "lists" };
  @state() private listRefreshToken = 0;

  private get canManage(): boolean {
    return this.member.isAdmin;
  }

  private goToLists(): void {
    this.view = { mode: "lists" };
    this.listRefreshToken += 1;
  }

  override willUpdate(changed: PropertyValues<this>): void {
    // Contrairement au pattern "refreshToken" (qui ignore volontairement le
    // premier rendu), ce token doit déclencher le saut vers le détail dès
    // le tout premier montage : c'est justement le cas d'usage principal
    // (arrivée depuis l'accueil sur un events-view fraîchement créé).
    if (changed.has("initialEventToken") && this.initialEvent) {
      this.view = { mode: "detail", event: this.initialEvent };
    }
  }

  override render() {
    if (this.view.mode !== "lists") {
      return html`
        ${this.view.mode === "detail"
          ? html`<event-detail
              .event=${this.view.event}
              .member=${this.member}
              @back=${() => this.goToLists()}
              @edit=${(e: CustomEvent<SportEvent>) => (this.view = { mode: "edit", event: e.detail })}
            ></event-detail>`
          : html`<event-form
              .event=${this.view.mode === "edit" ? this.view.event : null}
              @saved=${() => this.goToLists()}
              @cancel=${() => this.goToLists()}
            ></event-form>`}
      `;
    }

    return html`
      <header>
        <h2>Événements</h2>
        ${this.canManage ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Créer un événement</button>` : ""}
      </header>
      <events-browser
        .refreshToken=${this.listRefreshToken}
        @select=${(e: CustomEvent<SportEvent>) => (this.view = { mode: "detail", event: e.detail })}
      ></events-browser>
    `;
  }
}
