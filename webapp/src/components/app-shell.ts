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
  icon: string;
  visible: (member: Member) => boolean;
  render: (member: Member) => TemplateResult;
}

const TABS: readonly TabDef[] = [
  {
    id: "home",
    label: "Accueil",
    icon: "🏠",
    visible: () => true,
    render: (member) => html`<p>Bonjour ${member.firstName}, bienvenue sur DahultiApp.</p>`,
  },
  {
    id: "events",
    label: "Événements",
    icon: "📅",
    visible: () => true,
    render: (member) => html`<events-view .member=${member}></events-view>`,
  },
  {
    id: "members",
    label: "Membres",
    icon: "👥",
    visible: (member) => member.isAdmin,
    render: () => html`<admin-members-view></admin-members-view>`,
  },
  {
    id: "age-categories",
    label: "Catégories",
    icon: "🎂",
    visible: (member) => member.isAdmin,
    render: () => html`<age-categories-view></age-categories-view>`,
  },
  {
    id: "event-references",
    label: "Référentiels",
    icon: "⚙️",
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
      min-height: 100vh;
      box-sizing: border-box;
      padding-bottom: 4.25rem;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 1.25rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .who {
      font-size: 0.9rem;
      color: #1f2933;
    }
    header button {
      padding: 0.4rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 0.82rem;
    }
    main {
      padding: 1.25rem;
      color: #374151;
      max-width: 720px;
      margin: 0 auto;
    }
    nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      background: white;
      border-top: 1px solid #e5e7eb;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }
    nav button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
      padding: 0.5rem 0.25rem;
      border: none;
      background: none;
      color: #6b7280;
      font-size: 0.7rem;
      cursor: pointer;
    }
    nav button .icon {
      font-size: 1.2rem;
      line-height: 1;
    }
    nav button.active {
      color: #2563eb;
      font-weight: 600;
    }

    @media (min-width: 720px) {
      :host {
        padding-bottom: 0;
      }
      nav {
        position: static;
        border-top: none;
        border-bottom: 1px solid #e5e7eb;
        justify-content: center;
        gap: 0.5rem;
      }
      nav button {
        flex: none;
        flex-direction: row;
        padding: 0.7rem 1rem;
      }
    }
  `;

  @property({ attribute: false })
  member!: Member;

  @state()
  private tab: Tab = "events";

  private get visibleTabs(): readonly TabDef[] {
    return TABS.filter((t) => t.visible(this.member));
  }

  override render() {
    const activeTab = this.visibleTabs.find((t) => t.id === this.tab) ?? this.visibleTabs[0];

    return html`
      <header>
        <span class="who">${this.member.firstName} ${this.member.lastName}</span>
        <button @click=${() => signOut()}>Déconnexion</button>
      </header>
      <main>${activeTab?.render(this.member)}</main>
      <nav>
        ${this.visibleTabs.map(
          (t) => html`
            <button class=${t.id === activeTab?.id ? "active" : ""} @click=${() => (this.tab = t.id)}>
              <span class="icon">${t.icon}</span>
              <span>${t.label}</span>
            </button>
          `,
        )}
      </nav>
    `;
  }
}
