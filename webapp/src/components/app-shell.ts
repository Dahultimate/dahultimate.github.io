import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { signOut } from "../services/auth.service";
import type { Member } from "../domain/member";
import "./admin-members-view";
import "./age-categories-view";
import "./event-reference-admin-view";
import "./events-view";

type Tab = "home" | "members" | "age-categories" | "event-references" | "events";

interface TabDef {
  id: Tab;
  label: string;
  visible: (member: Member) => boolean;
  render: (member: Member) => TemplateResult;
}

const TABS: readonly TabDef[] = [
  {
    id: "events",
    label: "Événements",
    visible: () => true,
    render: (member) => html`<events-view .member=${member}></events-view>`,
  },
  {
    id: "members",
    label: "Membres",
    visible: (member) => member.isAdmin,
    render: () => html`<admin-members-view></admin-members-view>`,
  },
  {
    id: "age-categories",
    label: "Catégories d'âge",
    visible: (member) => member.isAdmin,
    render: () => html`<age-categories-view></age-categories-view>`,
  },
  {
    id: "event-references",
    label: "Référentiels événements",
    visible: (member) => member.isAdmin,
    render: () => html`<event-reference-admin-view></event-reference-admin-view>`,
  },
];

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
      flex-wrap: wrap;
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

  private get visibleTabs(): readonly TabDef[] {
    return TABS.filter((t) => t.visible(this.member));
  }

  override render() {
    const activeTab = this.visibleTabs.find((t) => t.id === this.tab);

    return html`
      <header>
        <span class="who">${this.member.firstName} ${this.member.lastName}</span>
        <button @click=${() => signOut()}>Déconnexion</button>
      </header>
      <nav>
        <button class=${this.tab === "home" ? "active" : ""} @click=${() => (this.tab = "home")}>Accueil</button>
        ${this.visibleTabs.map(
          (t) => html`
            <button class=${this.tab === t.id ? "active" : ""} @click=${() => (this.tab = t.id)}>${t.label}</button>
          `,
        )}
      </nav>
      <main>
        ${activeTab
          ? activeTab.render(this.member)
          : html`<p>Connecté avec succès. Le contenu de l'application sera ajouté au fil des prochaines phases.</p>`}
      </main>
    `;
  }
}
