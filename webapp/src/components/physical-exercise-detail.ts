import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { PhysicalExercise } from "../domain/physical-exercise";
import "./physical-exercise-video";

@customElement("physical-exercise-detail")
export class PhysicalExerciseDetail extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 560px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }
    h2 {
      font-size: 1.15rem;
      margin: 0 0 0.4rem;
    }
    .types {
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
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
      margin: 0.75rem 0;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      font-size: 0.9rem;
      cursor: pointer;
      flex-shrink: 0;
    }
  `;

  @property({ attribute: false }) exercise!: PhysicalExercise;

  override render() {
    return html`
      <header>
        <div>
          <h2>${this.exercise.name}</h2>
          ${this.exercise.types.length > 0
            ? html`<div class="types">
                ${this.exercise.types.map((t) => html`<span class="type-badge">${t}</span>`)}
              </div>`
            : ""}
        </div>
        <button @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}>← Retour</button>
      </header>
      ${this.exercise.instructions ? html`<p class="instructions">${this.exercise.instructions}</p>` : ""}
      <physical-exercise-video
        .videoUrl=${this.exercise.videoUrl}
        videoTitle="Vidéo de démonstration — ${this.exercise.name}"
      ></physical-exercise-video>
    `;
  }
}
