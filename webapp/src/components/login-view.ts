import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { signIn } from "../services/auth.service";

@customElement("login-view")
export class LoginView extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      max-width: 360px;
      margin: 3rem auto;
      padding: 0 1.5rem;
    }
    h1 {
      font-size: 1.4rem;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    input {
      padding: 0.6rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    button {
      margin-top: 0.5rem;
      padding: 0.7rem;
      border: none;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;

  @state()
  private email = "";

  @state()
  private password = "";

  @state()
  private errorMessage: string | null = null;

  @state()
  private submitting = false;

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = null;
    this.submitting = true;
    const error = await signIn(this.email, this.password);
    this.submitting = false;
    if (error) {
      this.errorMessage = error.message;
    }
  }

  override render() {
    return html`
      <h1>Connexion à DahultiApp</h1>
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autocomplete="username"
          .value=${this.email}
          @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
        />
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          required
          autocomplete="current-password"
          .value=${this.password}
          @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
        />
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    `;
  }
}
