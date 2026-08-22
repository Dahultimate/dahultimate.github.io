import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { Member } from "../domain/member";
import "./members-list";
import "./member-form";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; member: Member };

@customElement("admin-members-view")
export class AdminMembersView extends LitElement {
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
  /** Force members-list à se recharger après une modification. */
  @state() private listKey = 0;

  private goToList(): void {
    this.view = { mode: "list" };
    this.listKey += 1;
  }

  override render() {
    return html`
      <header>
        <h2>Membres</h2>
        ${this.view.mode === "list" ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Ajouter un membre</button>` : ""}
      </header>

      ${this.view.mode === "list"
        ? html`<members-list
            .refreshToken=${this.listKey}
            @edit=${(e: CustomEvent<Member>) => (this.view = { mode: "edit", member: e.detail })}
          ></members-list>`
        : html`<member-form
            .member=${this.view.mode === "edit" ? this.view.member : null}
            @saved=${() => this.goToList()}
            @cancel=${() => this.goToList()}
          ></member-form>`}
    `;
  }
}
