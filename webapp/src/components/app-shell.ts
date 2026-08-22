import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { signOut } from "../services/auth.service";
import type { Member } from "../domain/member";
import "./admin-members-view";

type Tab = "home" | "members";

@customElement("app-shell")
export class AppShell extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .who {
      font-size: 0.95rem;
      color: #1f2933;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 0.9rem;
    }
    nav {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    nav button {
      border: none;
      background: transparent;
      color: #6b7280;
    }
    nav button.active {
      color: #2563eb;
      font-weight: 600;
    }
    main {
      padding: 1.5rem;
      color: #374151;
    }
  `;

  @property({ attribute: false })
  member!: Member;

  @state()
  private tab: Tab = "home";

  override render() {
    return html`
      <header>
        <span class="who">${this.member.firstName} ${this.member.lastName}</span>
        <button @click=${() => signOut()}>Déconnexion</button>
      </header>
      <nav>
        <button class=${this.tab === "home" ? "active" : ""} @click=${() => (this.tab = "home")}>Accueil</button>
        ${this.member.isAdmin
          ? html`<button class=${this.tab === "members" ? "active" : ""} @click=${() => (this.tab = "members")}>
              Membres
            </button>`
          : ""}
      </nav>
      <main>
        ${this.tab === "members" && this.member.isAdmin
          ? html`<admin-members-view></admin-members-view>`
          : html`<p>Connecté avec succès. Le contenu de l'application sera ajouté au fil des prochaines phases.</p>`}
      </main>
    `;
  }
}
