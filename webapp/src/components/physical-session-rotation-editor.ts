import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchSessionRotation, updateSessionRotation } from "../services/physical-session-rotation.repository";
import { fetchPhysicalSessions } from "../services/physical-sessions.repository";
import type { PhysicalSession } from "../domain/physical-session";

@customElement("physical-session-rotation-editor")
export class PhysicalSessionRotationEditor extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.4rem;
    }
    p.hint {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.85rem;
      margin: 0 0 1rem;
    }
    ol {
      list-style: decimal;
      margin: 0 0 1rem;
      padding-left: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    li .name {
      flex: 1;
    }
    .add-row {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    select {
      flex: 1;
      padding: 0.5rem 0.65rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.95rem;
    }
    button {
      padding: 0.4rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.85rem;
      cursor: pointer;
    }
    button.primary {
      border: none;
      background: var(--color-primary, #7c3aed);
      color: white;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;

  @state() private sessions: PhysicalSession[] = [];
  @state() private rotation: string[] = [];
  @state() private loading = true;
  @state() private toAddId = "";
  @state() private saving = false;
  @state() private message: { kind: "error" | "success"; text: string } | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;
    const [sessions, rotation] = await Promise.all([fetchPhysicalSessions(), fetchSessionRotation()]);
    this.sessions = sessions;
    this.rotation = rotation.filter((id) => sessions.some((s) => s.id === id));
    this.loading = false;
  }

  private sessionName(id: string): string {
    return this.sessions.find((s) => s.id === id)?.name ?? "(session supprimée)";
  }

  private addToRotation(): void {
    if (!this.toAddId) return;
    this.rotation = [...this.rotation, this.toAddId];
    this.toAddId = "";
  }

  private removeAt(index: number): void {
    this.rotation = this.rotation.filter((_, i) => i !== index);
  }

  private moveAt(index: number, delta: number): void {
    const target = index + delta;
    if (target < 0 || target >= this.rotation.length) return;
    const next = [...this.rotation];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved!);
    this.rotation = next;
  }

  private async handleSave(): Promise<void> {
    this.saving = true;
    this.message = null;
    const errorMessage = await updateSessionRotation(this.rotation);
    this.saving = false;
    this.message = errorMessage
      ? { kind: "error", text: errorMessage }
      : { kind: "success", text: "Roulement enregistré." };
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    const availableSessions = this.sessions;

    return html`
      <h3>Roulement des sessions</h3>
      <p class="hint">
        Ordre rejoué en boucle, une session par semaine (numérotation des semaines ISO : semaine 1 → 1er élément,
        semaine 2 → 2e, etc., puis on recommence).
      </p>

      ${this.message ? html`<p class=${this.message.kind}>${this.message.text}</p>` : ""}

      ${this.rotation.length === 0
        ? html`<p class="empty">Aucune session dans le roulement.</p>`
        : html`
            <ol>
              ${this.rotation.map(
                (id, index) => html`
                  <li>
                    <span class="name">${this.sessionName(id)}</span>
                    <button ?disabled=${index === 0} @click=${() => this.moveAt(index, -1)}>↑</button>
                    <button ?disabled=${index === this.rotation.length - 1} @click=${() => this.moveAt(index, 1)}>↓</button>
                    <button class="danger" @click=${() => this.removeAt(index)}>✕</button>
                  </li>
                `,
              )}
            </ol>
          `}

      <div class="add-row">
        <select .value=${this.toAddId} @change=${(e: Event) => (this.toAddId = (e.target as HTMLSelectElement).value)}>
          <option value="">— Choisir une session à ajouter —</option>
          ${availableSessions.map((s) => html`<option value=${s.id}>${s.name}</option>`)}
        </select>
        <button @click=${() => this.addToRotation()}>Ajouter</button>
      </div>

      <button class="primary" ?disabled=${this.saving} @click=${() => this.handleSave()}>
        ${this.saving ? "Enregistrement…" : "Enregistrer le roulement"}
      </button>
    `;
  }
}
