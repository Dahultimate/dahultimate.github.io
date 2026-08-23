import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { deletePhysicalSession, fetchPhysicalSessions } from "../services/physical-sessions.repository";
import type { PhysicalSession } from "../domain/physical-session";
import "./physical-session-form";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; session: PhysicalSession };

@customElement("physical-sessions-list")
export class PhysicalSessionsList extends LitElement {
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
    h3 {
      font-size: 1rem;
      margin: 0;
    }
    header button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      padding: 0.75rem 1rem;
    }
    .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .meta {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.82rem;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      flex-shrink: 0;
    }
    .actions button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .actions button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  `;

  @state() private view: ViewMode = { mode: "list" };
  @state() private sessions: PhysicalSession[] = [];
  @state() private loading = true;
  @state() private errorMessage: string | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    this.sessions = await fetchPhysicalSessions();
    this.loading = false;
  }

  private goToList(): void {
    this.view = { mode: "list" };
    void this.refresh();
  }

  private async handleDelete(session: PhysicalSession): Promise<void> {
    if (!confirm(`Supprimer la session "${session.name}" ?`)) return;
    this.errorMessage = null;
    const errorMessage = await deletePhysicalSession(session.id);
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    await this.refresh();
  }

  private renderList() {
    if (this.loading) return html`<p>Chargement…</p>`;
    if (this.sessions.length === 0) return html`<p class="empty">Aucune session pour le moment.</p>`;

    return html`
      <ul>
        ${this.sessions.map(
          (session) => html`
            <li class="card">
              <div>
                <div class="name">${session.name}</div>
                <div class="meta">${[session.objective, session.prepType].filter(Boolean).join(" · ") || "—"}</div>
              </div>
              <div class="actions">
                <button @click=${() => (this.view = { mode: "edit", session })}>Modifier</button>
                <button class="danger" @click=${() => this.handleDelete(session)}>Supprimer</button>
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  override render() {
    return html`
      <header>
        <h3>Sessions</h3>
        ${this.view.mode === "list" ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Créer une session</button>` : ""}
      </header>

      ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

      ${this.view.mode === "list"
        ? this.renderList()
        : html`<physical-session-form
            .session=${this.view.mode === "edit" ? this.view.session : null}
            @saved=${() => this.goToList()}
            @cancel=${() => this.goToList()}
          ></physical-session-form>`}
    `;
  }
}
