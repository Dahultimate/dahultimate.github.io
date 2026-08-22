import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";
import "./event-family-list";
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
      border-radius: 8px;
      background: #2563eb;
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `;

  @property({ attribute: false }) member!: Member;

  @state() private view: ViewMode = { mode: "lists" };
  @state() private listRefreshToken = 0;

  private get canManage(): boolean {
    return this.member.isAdmin;
  }

  private goToLists(): void {
    this.view = { mode: "lists" };
    this.listRefreshToken += 1;
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
      <event-family-list
        family="sportif"
        heading="Événements sportifs"
        .refreshToken=${this.listRefreshToken}
        @select=${(e: CustomEvent<SportEvent>) => (this.view = { mode: "detail", event: e.detail })}
      ></event-family-list>
      <event-family-list
        family="tournoi"
        heading="Tournois et Hats"
        .refreshToken=${this.listRefreshToken}
        @select=${(e: CustomEvent<SportEvent>) => (this.view = { mode: "detail", event: e.detail })}
      ></event-family-list>
    `;
  }
}
