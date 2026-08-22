import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchEventReferenceItems } from "../services/event-reference-items.repository";
import { fetchAgeCategories } from "../services/age-categories.repository";
import { fetchMemberDirectory } from "../services/member-directory.repository";
import { fetchAvailabilitiesForEvent, submitAvailability } from "../services/availabilities.repository";
import { evaluateParticipants, summarizeParticipants, type ParticipantEvaluation } from "../domain/event-participation";
import type { SportEvent } from "../domain/event";
import type { Member } from "../domain/member";
import type { AvailabilityStatus } from "../domain/availability";
import type { EventFamily } from "../domain/event-reference";

function isPastDeadline(responseDeadline: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return today > responseDeadline;
}

@customElement("event-detail")
export class EventDetail extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 640px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.4rem;
    }
    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.25rem 1rem;
      font-size: 0.9rem;
      margin: 0 0 1.25rem;
    }
    dt {
      color: #6b7280;
    }
    dd {
      margin: 0;
      color: #1f2933;
    }
    .counters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 0.6rem;
      margin-bottom: 1.5rem;
    }
    .counter {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.6rem 0.75rem;
    }
    .counter .value {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1f2933;
    }
    .counter .label {
      font-size: 0.75rem;
      color: #6b7280;
    }
    .lists {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }
    .list h3 {
      font-size: 0.85rem;
      color: #374151;
      margin: 0 0 0.4rem;
    }
    .list ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.85rem;
    }
    .list li {
      padding: 0.15rem 0;
    }
    .list .empty {
      color: #9ca3af;
      font-size: 0.85rem;
    }
    button {
      padding: 0.5rem 0.9rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: white;
      font-size: 0.9rem;
      cursor: pointer;
    }
    button.primary {
      border: none;
      background: #2563eb;
      color: white;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .my-response {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 0.9rem 1rem;
      margin-bottom: 1.5rem;
    }
    .my-response h3 {
      font-size: 0.9rem;
      margin: 0 0 0.6rem;
      color: #374151;
    }
    .not-concerned {
      color: #6b7280;
      font-size: 0.9rem;
    }
    .deadline-passed {
      color: #6b7280;
      font-size: 0.9rem;
    }
    .engagement {
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #92400e;
      padding: 0.6rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0 0 0.75rem;
    }
    .response-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .response-buttons button {
      flex: 1;
      min-width: 120px;
      font-weight: 600;
    }
    .response-buttons button.available.active {
      background: #16a34a;
      border-color: #16a34a;
      color: white;
    }
    .response-buttons button.unavailable.active {
      background: #dc2626;
      border-color: #dc2626;
      color: white;
    }
    .response-buttons button.uncertain.active {
      background: #d97706;
      border-color: #d97706;
      color: white;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0.6rem 0 0;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin: 0.6rem 0 0;
    }
  `;

  @property({ attribute: false }) event!: SportEvent;
  @property({ attribute: false }) member!: Member;

  @state() private labels = new Map<string, string>();
  @state() private eventTypeFamily: EventFamily | null = null;
  @state() private organizerName = "—";
  @state() private evaluations: ParticipantEvaluation[] = [];
  @state() private loading = true;

  @state() private submittingStatus: AvailabilityStatus | null = null;
  @state() private responseFeedback: { kind: "success" | "error"; message: string } | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.loadDetail();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has("event") && changed.get("event") !== undefined) {
      void this.loadDetail();
    }
  }

  private async loadDetail(): Promise<void> {
    this.loading = true;
    const [eventTypes, formats, divisions, ageCategories, members, availabilities] = await Promise.all([
      fetchEventReferenceItems("event_type"),
      fetchEventReferenceItems("format"),
      fetchEventReferenceItems("division"),
      fetchAgeCategories(),
      fetchMemberDirectory(),
      fetchAvailabilitiesForEvent(this.event.id),
    ]);

    const labels = new Map<string, string>();
    for (const item of [...eventTypes, ...formats, ...divisions]) labels.set(item.id, item.label);
    this.labels = labels;
    this.eventTypeFamily = eventTypes.find((t) => t.id === this.event.eventTypeId)?.eventFamily ?? null;

    const organizer = members.find((m) => m.id === this.event.organizerId);
    this.organizerName = organizer ? `${organizer.firstName} ${organizer.lastName}` : "—";

    this.evaluations = evaluateParticipants(members, ageCategories, this.event.allowedCategories, availabilities);
    this.loading = false;
  }

  private get myEvaluation(): ParticipantEvaluation | undefined {
    return this.evaluations.find((e) => e.member.id === this.member.id);
  }

  private async handleRespond(status: AvailabilityStatus): Promise<void> {
    this.submittingStatus = status;
    this.responseFeedback = null;
    const errorMessage = await submitAvailability(this.event.id, status);
    this.submittingStatus = null;
    if (errorMessage) {
      this.responseFeedback = { kind: "error", message: "Votre réponse n'a pas pu être enregistrée." };
      return;
    }
    this.responseFeedback = { kind: "success", message: "Votre réponse a bien été enregistrée." };
    await this.loadDetail();
  }

  private renderMyResponse() {
    const evaluation = this.myEvaluation;
    if (!evaluation || evaluation.status === "not-concerned") {
      return html`<p class="not-concerned">Vous n'êtes pas concerné(e) par cet événement (catégorie non autorisée à y participer).</p>`;
    }

    const deadlinePassed = isPastDeadline(this.event.responseDeadline);
    const currentStatus = evaluation.status === "no-response" ? null : evaluation.status;

    return html`
      <section class="my-response">
        <h3>Votre disponibilité</h3>
        ${deadlinePassed
          ? html`<p class="deadline-passed">
              La date butoir de réponse (${this.event.responseDeadline}) est dépassée${currentStatus
                ? html`, votre réponse enregistrée est <strong>${this.statusLabel(currentStatus)}</strong>.`
                : ", vous n'avez pas répondu."}
            </p>`
          : html`
              ${this.eventTypeFamily === "sportif"
                ? html`<p class="engagement">
                    En vous déclarant disponible pour cet évènement, vous vous engagez à être au maximum
                    disponible pour les entrainements de préparation et pour la compétition
                  </p>`
                : ""}
              <div class="response-buttons">
                <button
                  class=${currentStatus === "available" ? "available active" : "available"}
                  ?disabled=${this.submittingStatus !== null}
                  @click=${() => this.handleRespond("available")}
                >
                  Disponible
                </button>
                <button
                  class=${currentStatus === "unavailable" ? "unavailable active" : "unavailable"}
                  ?disabled=${this.submittingStatus !== null}
                  @click=${() => this.handleRespond("unavailable")}
                >
                  Indisponible
                </button>
                <button
                  class=${currentStatus === "uncertain" ? "uncertain active" : "uncertain"}
                  ?disabled=${this.submittingStatus !== null}
                  @click=${() => this.handleRespond("uncertain")}
                >
                  Incertain
                </button>
              </div>
            `}
        ${this.responseFeedback
          ? html`<p class=${this.responseFeedback.kind}>${this.responseFeedback.message}</p>`
          : ""}
      </section>
    `;
  }

  private statusLabel(status: AvailabilityStatus): string {
    switch (status) {
      case "available":
        return "Disponible";
      case "unavailable":
        return "Indisponible";
      case "uncertain":
        return "Incertain";
    }
  }

  private byStatus(status: "available" | "unavailable" | "uncertain" | "no-response"): ParticipantEvaluation[] {
    return this.evaluations
      .filter((e) => e.status === status)
      .sort((a, b) => a.member.lastName.localeCompare(b.member.lastName));
  }

  private renderList(title: string, status: "available" | "unavailable" | "uncertain" | "no-response") {
    const rows = this.byStatus(status);
    return html`
      <div class="list">
        <h3>${title} (${rows.length})</h3>
        ${rows.length === 0
          ? html`<p class="empty">—</p>`
          : html`<ul>
              ${rows.map((e) => html`<li>${e.member.firstName} ${e.member.lastName}</li>`)}
            </ul>`}
      </div>
    `;
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    const counts = summarizeParticipants(this.evaluations);
    const canEdit = this.member.isAdmin;

    return html`
      <header>
        <div>
          <h2>${this.labels.get(this.event.eventTypeId) ?? "—"} — ${this.event.category}</h2>
        </div>
        <div class="actions">
          ${canEdit
            ? html`<button class="primary" @click=${() => this.dispatchEvent(new CustomEvent("edit", { detail: this.event, bubbles: true, composed: true }))}>
                Modifier
              </button>`
            : ""}
          <button @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}>← Retour</button>
        </div>
      </header>

      <dl>
        <dt>Format</dt>
        <dd>${this.labels.get(this.event.formatId) ?? "—"}</dd>
        <dt>Division</dt>
        <dd>${this.labels.get(this.event.divisionId) ?? "—"}</dd>
        <dt>Lieu</dt>
        <dd>${this.event.location}</dd>
        <dt>Date</dt>
        <dd>${this.event.eventDate}</dd>
        <dt>Porteur de projet</dt>
        <dd>${this.organizerName}</dd>
        <dt>Date butoir de réponse</dt>
        <dd>${this.event.responseDeadline}</dd>
      </dl>

      ${this.renderMyResponse()}

      <div class="counters">
        <div class="counter"><div class="value">${counts.totalAvailable}</div><div class="label">Disponibles</div></div>
        <div class="counter"><div class="value">${counts.womenAvailable}</div><div class="label">dont femmes</div></div>
        <div class="counter"><div class="value">${counts.menAvailable}</div><div class="label">dont hommes</div></div>
        <div class="counter"><div class="value">${counts.uncertain}</div><div class="label">Incertains</div></div>
        <div class="counter"><div class="value">${counts.unavailable}</div><div class="label">Indisponibles</div></div>
        <div class="counter"><div class="value">${counts.noResponse}</div><div class="label">Sans réponse</div></div>
        <div class="counter"><div class="value">${counts.notConcerned}</div><div class="label">Non concernés</div></div>
        <div class="counter"><div class="value">${counts.totalResponses}</div><div class="label">Total réponses</div></div>
      </div>

      <div class="lists">
        ${this.renderList("Disponibles", "available")} ${this.renderList("Indisponibles", "unavailable")}
        ${this.renderList("Incertains", "uncertain")} ${this.renderList("Sans réponse", "no-response")}
      </div>
    `;
  }
}
