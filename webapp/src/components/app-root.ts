import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sessionStore, type SessionState } from "../state/session-store";
import "./login-view";
import "./change-password-view";
import "./app-shell";

@customElement("dahultiapp-root")
export class AppRoot extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .loading {
      font-family: system-ui, sans-serif;
      text-align: center;
      margin-top: 3rem;
      color: #6b7280;
    }
  `;

  @state()
  private session: SessionState = { status: "loading" };

  private unsubscribe: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribe = sessionStore.subscribe((state) => {
      this.session = state;
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  override render() {
    switch (this.session.status) {
      case "loading":
        return html`<p class="loading">Chargement…</p>`;
      case "signed-out":
        return html`<login-view></login-view>`;
      case "signed-in":
        return this.session.member.mustChangePassword
          ? html`<change-password-view></change-password-view>`
          : html`<app-shell .member=${this.session.member}></app-shell>`;
    }
  }
}
