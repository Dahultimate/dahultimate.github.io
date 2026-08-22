import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./event-reference-list";

@customElement("event-reference-admin-view")
export class EventReferenceAdminView extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 1.1rem;
      margin: 0 0 1rem;
    }
  `;

  override render() {
    return html`
      <h2>Référentiels événements</h2>
      <event-reference-list kind="event_type" heading="Types d'événement"></event-reference-list>
      <event-reference-list kind="format" heading="Formats"></event-reference-list>
      <event-reference-list kind="division" heading="Divisions"></event-reference-list>
    `;
  }
}
