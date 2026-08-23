import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchPhysicalSessions } from "../services/physical-sessions.repository";
import { fetchSessionRotation } from "../services/physical-session-rotation.repository";
import { fetchPhysicalExercises } from "../services/physical-exercises.repository";
import { currentRotationSessionId, getIsoWeekNumber } from "../domain/iso-week";
import { SESSION_EXERCISE_SLOT_COUNT, type PhysicalSession } from "../domain/physical-session";
import type { PhysicalExercise } from "../domain/physical-exercise";

@customElement("current-physical-session")
export class CurrentPhysicalSession extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    .card {
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-lg, 18px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 1.25rem;
    }
    h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 0.3rem;
    }
    h2 {
      font-size: 1.25rem;
      margin: 0 0 0.6rem;
      color: var(--color-text, #1f2937);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }
    .meta span {
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.78rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    li button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      text-align: left;
      padding: 0.55rem 0.7rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: white;
      cursor: pointer;
      font-size: 0.88rem;
    }
    li button:hover {
      background: #f7f6fb;
    }
    li button:disabled {
      color: #9ca3af;
      cursor: default;
      background: #f9fafb;
    }
    .slot-label {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.78rem;
      min-width: 5.5rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;

  @state() private session: PhysicalSession | null = null;
  @state() private exercisesById = new Map<string, PhysicalExercise>();
  @state() private loading = true;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;
    const [sessions, rotation, exercises] = await Promise.all([
      fetchPhysicalSessions(),
      fetchSessionRotation(),
      fetchPhysicalExercises(),
    ]);
    this.exercisesById = new Map(exercises.map((e) => [e.id, e]));
    const sessionId = currentRotationSessionId(rotation, new Set(sessions.map((s) => s.id)));
    this.session = sessions.find((s) => s.id === sessionId) ?? null;
    this.loading = false;
  }

  private handleSelect(exercise: PhysicalExercise): void {
    this.dispatchEvent(new CustomEvent<PhysicalExercise>("select-exercise", { detail: exercise, bubbles: true, composed: true }));
  }

  private renderSlot(label: string, exerciseId: string | null) {
    const exercise = exerciseId ? this.exercisesById.get(exerciseId) : undefined;
    return html`
      <li>
        <button ?disabled=${!exercise} @click=${() => exercise && this.handleSelect(exercise)}>
          <span class="slot-label">${label}</span>
          <span>${exercise?.name ?? "—"}</span>
        </button>
      </li>
    `;
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    const week = getIsoWeekNumber(new Date());

    if (!this.session) {
      return html`
        <h3>Semaine ${week}</h3>
        <p class="empty">Aucune session de préparation physique programmée cette semaine.</p>
      `;
    }

    return html`
      <h3>Semaine ${week}</h3>
      <div class="card">
        <h2>${this.session.name}</h2>
        <div class="meta">
          ${this.session.objective ? html`<span>${this.session.objective}</span>` : ""}
          ${this.session.prepType ? html`<span>${this.session.prepType}</span>` : ""}
          ${this.session.seriesCount ? html`<span>${this.session.seriesCount} séries</span>` : ""}
          ${this.session.exerciseDurationSeconds ? html`<span>${this.session.exerciseDurationSeconds}s d'effort</span>` : ""}
          ${this.session.restDurationSeconds !== null ? html`<span>${this.session.restDurationSeconds}s de repos</span>` : ""}
          ${this.session.betweenSeriesDurationSeconds !== null
            ? html`<span>${this.session.betweenSeriesDurationSeconds}s entre les séries</span>`
            : ""}
        </div>
        <ul>
          ${Array.from({ length: SESSION_EXERCISE_SLOT_COUNT }, (_, i) =>
            this.renderSlot(`Exercice ${i + 1}`, this.session!.exerciseIds[i] ?? null),
          )}
          ${this.renderSlot("Finisher", this.session.finisherId)}
        </ul>
      </div>
    `;
  }
}
