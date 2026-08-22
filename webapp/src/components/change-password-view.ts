import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { changePassword } from "../services/auth.service";

const MIN_PASSWORD_LENGTH = 8;

@customElement("change-password-view")
export class ChangePasswordView extends LitElement {
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
    p.intro {
      color: #374151;
      font-size: 0.9rem;
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
      box-sizing: border-box;
      width: 100%;
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
  private newPassword = "";

  @state()
  private confirmPassword = "";

  @state()
  private errorMessage: string | null = null;

  @state()
  private submitting = false;

  private validate(): string | null {
    if (this.newPassword.length < MIN_PASSWORD_LENGTH) {
      return `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`;
    }
    if (this.newPassword !== this.confirmPassword) {
      return "Les deux mots de passe ne correspondent pas.";
    }
    return null;
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const validationError = this.validate();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }
    this.errorMessage = null;
    this.submitting = true;
    const error = await changePassword(this.newPassword);
    this.submitting = false;
    if (error) {
      this.errorMessage = error.message;
    }
  }

  override render() {
    return html`
      <h1>Choisissez votre mot de passe</h1>
      <p class="intro">
        C'est votre première connexion : merci de définir un mot de passe personnel
        avant de continuer.
      </p>
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
        <label for="new-password">Nouveau mot de passe</label>
        <input
          id="new-password"
          type="password"
          required
          autocomplete="new-password"
          .value=${this.newPassword}
          @input=${(e: Event) => (this.newPassword = (e.target as HTMLInputElement).value)}
        />
        <label for="confirm-password">Confirmer le mot de passe</label>
        <input
          id="confirm-password"
          type="password"
          required
          autocomplete="new-password"
          .value=${this.confirmPassword}
          @input=${(e: Event) => (this.confirmPassword = (e.target as HTMLInputElement).value)}
        />
        <button type="submit" ?disabled=${this.submitting}>
          ${this.submitting ? "Enregistrement…" : "Valider"}
        </button>
      </form>
    `;
  }
}
