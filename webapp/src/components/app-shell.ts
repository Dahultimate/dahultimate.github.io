import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { signOut } from "../services/auth.service";
import type { Member } from "../domain/member";
import type { SportEvent } from "../domain/event";
import "./home-view";
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
}

const TABS: readonly TabDef[] = [
  { id: "home", label: "Accueil", icon: "🏠", visible: () => true },
  { id: "events", label: "Événements", icon: "📅", visible: () => true },
  { id: "members", label: "Membres", icon: "👥", visible: (member) => member.isAdmin },
  { id: "age-categories", label: "Catégories", icon: "🎂", visible: (member) => member.isAdmin },
  { id: "event-references", label: "Référentiels", icon: "⚙️", visible: (member) => member.isAdmin },
];

@customElement("app-shell")
export class AppShell extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      min-height: 100vh;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 20;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--color-primary, #7c3aed);
      color: white;
      box-shadow: var(--shadow-sm, none);
    }
    .menu-toggle {
      justify-self: start;
      border: none;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      font-size: 1.15rem;
      cursor: pointer;
    }
    .title {
      justify-self: center;
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
    }
    .who {
      justify-self: end;
      font-size: 0.85rem;
      text-align: right;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    main {
      padding: 1.25rem;
      color: var(--color-text, #1f2937);
      max-width: 760px;
      margin: 0 auto;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(17, 12, 34, 0.35);
      z-index: 30;
    }
    .drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: min(280px, 82vw);
      background: var(--color-surface, white);
      z-index: 31;
      box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
      display: flex;
      flex-direction: column;
      padding: 1.25rem 0.75rem;
    }
    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem 1rem;
      border-bottom: 1px solid var(--color-border, #e6e3f1);
      margin-bottom: 0.75rem;
    }
    .drawer-header span {
      font-weight: 700;
      color: var(--color-primary, #7c3aed);
    }
    .drawer-header button {
      border: none;
      background: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--color-text-muted, #6b7280);
    }
    .drawer nav {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .drawer nav button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border: none;
      background: none;
      border-radius: var(--radius-sm, 8px);
      font-size: 0.95rem;
      color: var(--color-text, #1f2937);
      cursor: pointer;
      text-align: left;
    }
    .drawer nav button .icon {
      font-size: 1.1rem;
    }
    .drawer nav button.active {
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      font-weight: 600;
    }
    .drawer-footer {
      margin-top: auto;
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border, #e6e3f1);
    }
    .drawer-footer button {
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: none;
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--color-text, #1f2937);
    }
  `;

  @property({ attribute: false })
  member!: Member;

  @state() private tab: Tab = "home";
  @state() private drawerOpen = false;
  @state() private selectedEvent: SportEvent | null = null;
  @state() private selectedEventToken = 0;

  private get visibleTabs(): readonly TabDef[] {
    return TABS.filter((t) => t.visible(this.member));
  }

  private goTo(tab: Tab): void {
    // Navigation "normale" (menu) : on efface une éventuelle sélection
    // d'événement laissée par un clic depuis l'Accueil, sinon un simple
    // retour sur "Événements" rouvrirait ce même événement à chaque fois.
    this.selectedEvent = null;
    this.tab = tab;
    this.drawerOpen = false;
  }

  private handleSelectEvent(event: SportEvent): void {
    this.selectedEvent = event;
    this.selectedEventToken += 1;
    this.tab = "events";
  }

  private renderContent(): TemplateResult {
    switch (this.tab) {
      case "home":
        return html`<home-view .member=${this.member} @select-event=${(e: CustomEvent<SportEvent>) => this.handleSelectEvent(e.detail)}></home-view>`;
      case "events":
        return html`<events-view
          .member=${this.member}
          .initialEvent=${this.selectedEvent}
          .initialEventToken=${this.selectedEventToken}
        ></events-view>`;
      case "members":
        return html`<admin-members-view></admin-members-view>`;
      case "age-categories":
        return html`<age-categories-view></age-categories-view>`;
      case "event-references":
        return html`<event-reference-admin-view></event-reference-admin-view>`;
    }
  }

  override render() {
    return html`
      <header>
        <button class="menu-toggle" @click=${() => (this.drawerOpen = true)} aria-label="Ouvrir le menu">☰</button>
        <span class="title">DahultiApp</span>
        <span class="who">${this.member.firstName} ${this.member.lastName}</span>
      </header>

      <main>${this.renderContent()}</main>

      ${this.drawerOpen
        ? html`
            <div class="backdrop" @click=${() => (this.drawerOpen = false)}></div>
            <div class="drawer">
              <div class="drawer-header">
                <span>DahultiApp</span>
                <button @click=${() => (this.drawerOpen = false)} aria-label="Fermer le menu">✕</button>
              </div>
              <nav>
                ${this.visibleTabs.map(
                  (t) => html`
                    <button class=${this.tab === t.id ? "active" : ""} @click=${() => this.goTo(t.id)}>
                      <span class="icon">${t.icon}</span>
                      <span>${t.label}</span>
                    </button>
                  `,
                )}
              </nav>
              <div class="drawer-footer">
                <button @click=${() => signOut()}>Déconnexion</button>
              </div>
            </div>
          `
        : ""}
    `;
  }
}
