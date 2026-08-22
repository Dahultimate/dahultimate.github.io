import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { SportEvent } from "../domain/event";
import "./events-list";
import "./event-form";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; event: SportEvent };

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

  @state() private view: ViewMode = { mode: "list" };
  @state() private listRefreshToken = 0;

  private goToList(): void {
    this.view = { mode: "list" };
    this.listRefreshToken += 1;
  }

  override render() {
    return html`
      <header>
        <h2>Événements</h2>
        ${this.view.mode === "list" ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Créer un événement</button>` : ""}
      </header>

      ${this.view.mode === "list"
        ? html`<events-list
            .refreshToken=${this.listRefreshToken}
            @edit=${(e: CustomEvent<SportEvent>) => (this.view = { mode: "edit", event: e.detail })}
          ></events-list>`
        : html`<event-form
            .event=${this.view.mode === "edit" ? this.view.event : null}
            @saved=${() => this.goToList()}
            @cancel=${() => this.goToList()}
          ></event-form>`}
    `;
  }
}
