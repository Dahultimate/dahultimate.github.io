import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Member } from "../domain/member";
import type { PhysicalExercise } from "../domain/physical-exercise";
import "./current-physical-session";
import "./physical-exercise-detail";
import "./physical-exercises-view";
import "./physical-sessions-list";
import "./physical-session-rotation-editor";

type ViewMode =
  | { mode: "current" }
  | { mode: "exercises" }
  | { mode: "exercise-detail"; exercise: PhysicalExercise }
  | { mode: "sessions" }
  | { mode: "rotation" };

@customElement("physical-prep-view")
export class PhysicalPrepView extends LitElement {
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
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    .toolbar {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .toolbar button {
      padding: 0.45rem 0.8rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: 999px;
      background: white;
      color: var(--color-text, #1f2937);
      font-size: 0.82rem;
      cursor: pointer;
    }
    .toolbar button.active {
      background: var(--color-primary, #7c3aed);
      border-color: var(--color-primary, #7c3aed);
      color: white;
      font-weight: 600;
    }
  `;

  @property({ attribute: false }) member!: Member;

  @state() private view: ViewMode = { mode: "current" };

  private get isAdmin(): boolean {
    return this.member.isAdmin;
  }

  private renderToolbar() {
    return html`
      <div class="toolbar">
        <button class=${this.view.mode === "current" ? "active" : ""} @click=${() => (this.view = { mode: "current" })}>
          Session de la semaine
        </button>
        <button class=${this.view.mode === "exercises" ? "active" : ""} @click=${() => (this.view = { mode: "exercises" })}>
          Tous les exercices
        </button>
        ${this.isAdmin
          ? html`
              <button class=${this.view.mode === "sessions" ? "active" : ""} @click=${() => (this.view = { mode: "sessions" })}>
                Gérer les sessions
              </button>
              <button class=${this.view.mode === "rotation" ? "active" : ""} @click=${() => (this.view = { mode: "rotation" })}>
                Gérer le roulement
              </button>
            `
          : ""}
      </div>
    `;
  }

  private renderBody() {
    switch (this.view.mode) {
      case "current":
        return html`<current-physical-session
          @select-exercise=${(e: CustomEvent<PhysicalExercise>) => (this.view = { mode: "exercise-detail", exercise: e.detail })}
        ></current-physical-session>`;
      case "exercise-detail":
        return html`<physical-exercise-detail
          .exercise=${this.view.exercise}
          @back=${() => (this.view = { mode: "current" })}
        ></physical-exercise-detail>`;
      case "exercises":
        return html`<physical-exercises-view .member=${this.member}></physical-exercises-view>`;
      case "sessions":
        return html`<physical-sessions-list></physical-sessions-list>`;
      case "rotation":
        return html`<physical-session-rotation-editor></physical-session-rotation-editor>`;
    }
  }

  override render() {
    return html`
      <header>
        <h2>Préparation physique</h2>
      </header>
      ${this.view.mode !== "exercise-detail" ? this.renderToolbar() : ""}
      ${this.renderBody()}
    `;
  }
}
