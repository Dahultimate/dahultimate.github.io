import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchTrainings } from "../services/trainings.repository";
import { fetchEvents } from "../services/events.repository";
import { buildMonthGrid, isDateKeyInRange, toDateKey } from "../domain/calendar";
import { AUDIENCE_COLORS, FORMAT_COLORS, type Training } from "../domain/training";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";
import "./training-form";

const MONTH_LABELS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface Badge {
  label: string;
  style: string;
}

type CellRow = { kind: "training"; format: Badge; audience: Badge } | { kind: "event"; label: string };

@customElement("calendar-view")
export class CalendarView extends LitElement {
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
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .month-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text, #1f2937);
      min-width: 10rem;
      text-align: center;
    }
    .nav-buttons {
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    .nav-buttons button {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      border: 1px solid var(--color-border, #e6e3f1);
      background: white;
      cursor: pointer;
      font-size: 1rem;
    }
    .today-button {
      border-radius: 999px !important;
      width: auto !important;
      padding: 0 0.9rem;
      font-size: 0.82rem !important;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.3rem;
    }
    .weekday {
      text-align: center;
      font-size: 0.72rem;
      color: var(--color-text-muted, #6b7280);
      padding-bottom: 0.3rem;
    }
    .day-cell {
      min-height: 4.4rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: white;
      cursor: pointer;
      padding: 0.25rem 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.12rem;
      overflow: hidden;
      color: var(--color-text, #1f2937);
      text-align: left;
    }
    .day-cell.outside {
      opacity: 0.35;
    }
    .day-cell.today {
      border-color: var(--color-primary, #7c3aed);
      border-width: 2px;
    }
    .day-number {
      font-size: 0.75rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 0.05rem;
    }
    .badge-row {
      display: flex;
      width: 100%;
      gap: 0.15rem;
    }
    .day-cell .item {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 4px;
      padding: 0.05rem 0.25rem;
      font-size: 0.6rem;
      line-height: 1.3;
    }
    .day-cell > .item {
      width: 100%;
    }
    .badge-row .item {
      flex: 1;
      min-width: 0;
    }
    .day-cell .item.event {
      background: #fce7f3;
      color: #9d174d;
    }
    .day-cell .more {
      font-size: 0.56rem;
      color: var(--color-text-muted, #6b7280);
      text-align: center;
    }

    /* En dessous de 600px, une grille à 7 colonnes ne laisse pas assez de
       place pour du texte lisible en entier : on bascule sur une liste
       verticale (un jour par ligne, pleine largeur), où le texte peut
       s'afficher plus grand et sans être coupé. */
    .agenda {
      display: none;
    }
    @media (max-width: 600px) {
      .grid {
        display: none;
      }
      .agenda {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
    }
    .agenda-day {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: white;
      cursor: pointer;
      padding: 0.5rem 0.7rem;
      text-align: left;
    }
    .agenda-day.today {
      border-color: var(--color-primary, #7c3aed);
      border-width: 2px;
    }
    .agenda-day.empty-day {
      padding: 0.3rem 0.7rem;
    }
    .agenda-date {
      flex-shrink: 0;
      width: 3.4rem;
      text-align: center;
      font-weight: 700;
      font-size: 1rem;
      color: var(--color-text, #1f2937);
    }
    .agenda-date .weekday {
      display: block;
      font-size: 0.68rem;
      font-weight: 400;
      color: var(--color-text-muted, #6b7280);
      padding: 0;
    }
    .agenda-items {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      flex: 1;
      min-width: 0;
    }
    .agenda-item {
      font-size: 1rem;
      padding: 0.35rem 0.65rem;
      border-radius: 6px;
      white-space: normal;
      word-break: break-word;
    }
    .agenda-items .badge-row {
      gap: 0.4rem;
    }
    .agenda-items .badge-row .agenda-item {
      flex: 1;
      min-width: 0;
      text-align: center;
    }
    .agenda-item.event {
      background: #fce7f3;
      color: #9d174d;
    }
    .agenda-empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.85rem;
    }
    .day-detail {
      max-width: 480px;
    }
    .day-detail h3 {
      font-size: 1.1rem;
      margin: 0 0 1rem;
    }
    .back-button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      font-size: 0.9rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    .section {
      margin-bottom: 1.25rem;
    }
    .section h4 {
      font-size: 0.85rem;
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 0.5rem;
    }
    .training-card {
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .training-card .badges span {
      display: inline-block;
      background: var(--color-primary-light, #f2ebfe);
      color: var(--color-primary-dark, #6d28d9);
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.78rem;
      margin-right: 0.3rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.88rem;
    }
    ul.event-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    ul.event-list button {
      width: 100%;
      text-align: left;
      padding: 0.6rem 0.75rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      background: white;
      cursor: pointer;
      font-size: 0.88rem;
    }
    button.primary-action {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    button.small {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
  `;

  @property({ attribute: false }) member!: Member;

  @state() private year = new Date().getFullYear();
  @state() private month = new Date().getMonth();
  @state() private trainings: Training[] = [];
  @state() private events: SportEvent[] = [];
  @state() private loading = true;
  @state() private selectedDateKey: string | null = null;
  @state() private editingTraining = false;

  private get isAdmin(): boolean {
    return this.member.isAdmin;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;
    const [trainings, events] = await Promise.all([fetchTrainings(), fetchEvents()]);
    this.trainings = trainings;
    this.events = events;
    this.loading = false;
  }

  private trainingOn(dateKey: string): Training | undefined {
    return this.trainings.find((t) => t.date === dateKey);
  }

  private eventsOn(dateKey: string): SportEvent[] {
    return this.events.filter((e) => isDateKeyInRange(dateKey, e.startDate, e.endDate));
  }

  private changeMonth(delta: number): void {
    const next = new Date(this.year, this.month + delta, 1);
    this.year = next.getFullYear();
    this.month = next.getMonth();
  }

  private goToToday(): void {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
  }

  private openDay(dateKey: string): void {
    this.selectedDateKey = dateKey;
    this.editingTraining = false;
  }

  private handleSelectEvent(event: SportEvent): void {
    this.dispatchEvent(new CustomEvent<SportEvent>("select-event", { detail: event, bubbles: true, composed: true }));
  }

  /**
   * Lignes à afficher pour un jour : l'entraînement (ses deux badges format
   * + public côte à côte, sur une seule ligne) puis un évènement par ligne.
   */
  private rowsOn(dateKey: string): CellRow[] {
    const rows: CellRow[] = [];
    const training = this.trainingOn(dateKey);
    if (training) {
      const formatColor = FORMAT_COLORS[training.format];
      const audienceColor = AUDIENCE_COLORS[training.audience];
      rows.push({
        kind: "training",
        format: { label: training.format, style: `background:${formatColor.background};color:${formatColor.text};` },
        audience: { label: training.audience, style: `background:${audienceColor.background};color:${audienceColor.text};` },
      });
    }
    for (const event of this.eventsOn(dateKey)) rows.push({ kind: "event", label: event.name });
    return rows;
  }

  private renderAgenda() {
    const grid = buildMonthGrid(this.year, this.month);
    const todayKey = toDateKey(new Date());

    return html`
      <div class="agenda">
        ${grid
          .flat()
          .filter((day) => day.getMonth() === this.month)
          .map((day) => {
            const dateKey = toDateKey(day);
            const rows = this.rowsOn(dateKey);
            const weekday = WEEKDAY_LABELS[(day.getDay() + 6) % 7];
            return html`
              <button
                class="agenda-day ${dateKey === todayKey ? "today" : ""} ${rows.length === 0 ? "empty-day" : ""}"
                @click=${() => this.openDay(dateKey)}
              >
                <span class="agenda-date"><span class="weekday">${weekday}</span>${day.getDate()}</span>
                <span class="agenda-items">
                  ${rows.length === 0
                    ? html`<span class="agenda-empty">—</span>`
                    : rows.map((row) =>
                        row.kind === "training"
                          ? html`<span class="badge-row">
                              <span class="agenda-item training" style=${row.format.style}>${row.format.label}</span>
                              <span class="agenda-item training" style=${row.audience.style}>${row.audience.label}</span>
                            </span>`
                          : html`<span class="agenda-item event">${row.label}</span>`,
                      )}
                </span>
              </button>
            `;
          })}
      </div>
    `;
  }

  private renderMonthGrid() {
    const grid = buildMonthGrid(this.year, this.month);
    const todayKey = toDateKey(new Date());

    return html`
      <header>
        <div class="nav-buttons">
          <button @click=${() => this.changeMonth(-1)} aria-label="Mois précédent">←</button>
          <button class="today-button" @click=${() => this.goToToday()}>Aujourd'hui</button>
        </div>
        <span class="month-title">${MONTH_LABELS[this.month]} ${this.year}</span>
        <div class="nav-buttons">
          <button @click=${() => this.changeMonth(1)} aria-label="Mois suivant">→</button>
        </div>
      </header>

      <div class="grid">
        ${WEEKDAY_LABELS.map((label) => html`<div class="weekday">${label}</div>`)}
        ${grid.flat().map((day) => {
          const dateKey = toDateKey(day);
          const outside = day.getMonth() !== this.month;
          const rows = this.rowsOn(dateKey);

          const maxVisible = 3;
          const visibleRows = rows.slice(0, maxVisible);
          const hiddenCount = rows.length - visibleRows.length;

          return html`
            <button
              class="day-cell ${outside ? "outside" : ""} ${dateKey === todayKey ? "today" : ""}"
              @click=${() => this.openDay(dateKey)}
            >
              <span class="day-number">${day.getDate()}</span>
              ${visibleRows.map((row) =>
                row.kind === "training"
                  ? html`<span class="badge-row">
                      <span class="item training" style=${row.format.style}>${row.format.label}</span>
                      <span class="item training" style=${row.audience.style}>${row.audience.label}</span>
                    </span>`
                  : html`<span class="item event">${row.label}</span>`,
              )}
              ${hiddenCount > 0 ? html`<span class="more">+${hiddenCount}</span>` : ""}
            </button>
          `;
        })}
      </div>

      ${this.renderAgenda()}
    `;
  }

  private renderDayDetail() {
    const dateKey = this.selectedDateKey!;
    const date = new Date(`${dateKey}T00:00:00`);
    const training = this.trainingOn(dateKey);
    const events = this.eventsOn(dateKey);
    const label = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return html`
      <div class="day-detail">
        <button class="back-button" @click=${() => (this.selectedDateKey = null)}>← Retour au calendrier</button>
        <h3>${label}</h3>

        <div class="section">
          <h4>Entraînement</h4>
          ${this.editingTraining
            ? html`<training-form
                .date=${dateKey}
                .training=${training ?? null}
                @saved=${() => (this.editingTraining = false)}
                @cancel=${() => (this.editingTraining = false)}
              ></training-form>`
            : training
              ? html`
                  <div class="training-card">
                    <div class="badges">
                      <span
                        style="background:${FORMAT_COLORS[training.format].background};color:${FORMAT_COLORS[training.format].text};"
                      >
                        ${training.format}
                      </span>
                      <span
                        style="background:${AUDIENCE_COLORS[training.audience].background};color:${AUDIENCE_COLORS[training.audience].text};"
                      >
                        ${training.audience}
                      </span>
                    </div>
                    ${this.isAdmin ? html`<button class="small" @click=${() => (this.editingTraining = true)}>Modifier</button>` : ""}
                  </div>
                `
              : html`
                  <p class="empty">Aucun entraînement prévu ce jour-là.</p>
                  ${this.isAdmin
                    ? html`<button class="primary-action" @click=${() => (this.editingTraining = true)}>+ Déclarer un entraînement</button>`
                    : ""}
                `}
        </div>

        <div class="section">
          <h4>Évènements sportifs / tournois / hats</h4>
          ${events.length === 0
            ? html`<p class="empty">Aucun évènement ce jour-là.</p>`
            : html`
                <ul class="event-list">
                  ${events.map(
                    (event) => html`<li><button @click=${() => this.handleSelectEvent(event)}>${event.name}</button></li>`,
                  )}
                </ul>
              `}
        </div>
      </div>
    `;
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;
    return this.selectedDateKey ? this.renderDayDetail() : this.renderMonthGrid();
  }

  private async refreshAfterSave(): Promise<void> {
    await this.load();
  }

  override updated(changed: Map<string, unknown>): void {
    // Ne rafraîchit qu'à la fermeture réelle du formulaire (transition
    // true -> false), jamais au tout premier rendu (où "changed" peut déjà
    // contenir editingTraining avec une ancienne valeur indéfinie).
    if (changed.get("editingTraining") === true && !this.editingTraining) {
      void this.refreshAfterSave();
    }
  }
}
