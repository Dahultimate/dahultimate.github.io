import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  deletePhysicalExercise,
  fetchPhysicalExercises,
} from "../services/physical-exercises.repository";
import type { PhysicalExercise } from "../domain/physical-exercise";
import type { Member } from "../domain/member";
import "./physical-exercise-form";
import "./physical-exercise-video";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; exercise: PhysicalExercise };

@customElement("physical-exercises-view")
export class PhysicalExercisesView extends LitElement {
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
      gap: 1rem;
    }
    .card {
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 1rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    }
    h3 {
      font-size: 1rem;
      margin: 0 0 0.4rem;
      color: var(--color-text, #1f2937);
    }
    .types {
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }
    .type-badge {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.72rem;
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
    }
    .instructions {
      white-space: pre-wrap;
      font-size: 0.9rem;
      color: #374151;
      margin: 0 0 0.75rem;
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

  @property({ attribute: false }) member!: Member;

  @state() private view: ViewMode = { mode: "list" };
  @state() private exercises: PhysicalExercise[] = [];
  @state() private loading = true;
  @state() private errorMessage: string | null = null;

  private get canManage(): boolean {
    return this.member.isAdmin;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    this.exercises = await fetchPhysicalExercises();
    this.loading = false;
  }

  private goToList(): void {
    this.view = { mode: "list" };
    void this.refresh();
  }

  private async handleDelete(exercise: PhysicalExercise): Promise<void> {
    if (!confirm(`Supprimer l'exercice "${exercise.name}" ?`)) return;
    this.errorMessage = null;
    const errorMessage = await deletePhysicalExercise(exercise.id);
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    await this.refresh();
  }

  private renderList() {
    if (this.loading) return html`<p>Chargement…</p>`;
    if (this.exercises.length === 0) return html`<p class="empty">Aucun exercice pour le moment.</p>`;

    return html`
      <ul>
        ${this.exercises.map(
          (exercise) => html`
            <li class="card">
              <div class="card-header">
                <div>
                  <h3>${exercise.name}</h3>
                  ${exercise.types.length > 0
                    ? html`<div class="types">
                        ${exercise.types.map((t) => html`<span class="type-badge">${t}</span>`)}
                      </div>`
                    : ""}
                </div>
                ${this.canManage
                  ? html`
                      <div class="actions">
                        <button @click=${() => (this.view = { mode: "edit", exercise })}>Modifier</button>
                        <button class="danger" @click=${() => this.handleDelete(exercise)}>Supprimer</button>
                      </div>
                    `
                  : ""}
              </div>
              ${exercise.instructions ? html`<p class="instructions">${exercise.instructions}</p>` : ""}
              <physical-exercise-video
                .videoUrl=${exercise.videoUrl}
                videoTitle="Vidéo de démonstration — ${exercise.name}"
              ></physical-exercise-video>
            </li>
          `,
        )}
      </ul>
    `;
  }

  override render() {
    return html`
      <header>
        <h2>Préparation physique</h2>
        ${this.view.mode === "list" && this.canManage
          ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Ajouter un exercice</button>`
          : ""}
      </header>

      ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}

      ${this.view.mode === "list"
        ? this.renderList()
        : html`<physical-exercise-form
            .exercise=${this.view.mode === "edit" ? this.view.exercise : null}
            @saved=${() => this.goToList()}
            @cancel=${() => this.goToList()}
          ></physical-exercise-form>`}
    `;
  }
}
