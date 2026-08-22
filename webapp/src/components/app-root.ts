import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { checkSupabaseConnection } from "../services/connection.service";
import type { ConnectionStatus } from "../domain/connection-status";

@customElement("dahultiapp-root")
export class AppRoot extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 480px;
      margin: 3rem auto;
      padding: 0 1.5rem;
      text-align: center;
      color: #1f2933;
    }
    h1 {
      font-size: 1.5rem;
    }
    .status {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.9rem;
    }
    .status.checking {
      background: #e5e7eb;
      color: #374151;
    }
    .status.connected {
      background: #d1fae5;
      color: #065f46;
    }
    .status.error {
      background: #fee2e2;
      color: #991b1b;
    }
  `;

  @state()
  private connectionStatus: ConnectionStatus = "checking";

  override connectedCallback(): void {
    super.connectedCallback();
    void checkSupabaseConnection().then((status) => {
      this.connectionStatus = status;
    });
  }

  private get statusLabel(): string {
    switch (this.connectionStatus) {
      case "checking":
        return "Vérification de la connexion à Supabase…";
      case "connected":
        return "Connecté à Supabase ✓";
      case "error":
        return "Connexion à Supabase impossible";
    }
  }

  override render() {
    return html`
      <h1>DahultiApp</h1>
      <p>Le socle technique de l'application est en place.</p>
      <span class="status ${this.connectionStatus}">${this.statusLabel}</span>
    `;
  }
}
