import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createMember, updateMember } from "../services/admin-members.service";
import type { LicenseType, Member, Sex } from "../domain/member";

const CURRENT_YEAR = new Date().getFullYear();

@customElement("member-form")
export class MemberForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 420px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #374151;
    }
    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    .checkboxes {
      display: flex;
      gap: 1.25rem;
      margin-top: 0.25rem;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
    }
    .actions {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.5rem;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
    }
    button[type="submit"] {
      border: none;
      background: #2563eb;
      color: white;
    }
    button[type="submit"]:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
    button[type="button"] {
      border: 1px solid #d1d5db;
      background: white;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
    .success {
      color: #065f46;
      background: #d1fae5;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
    }
  `;

  /** Si fourni, le formulaire est en mode édition d'une fiche existante. */
  @property({ attribute: false })
  member: Member | null = null;

  @state() private lastName = "";
  @state() private firstName = "";
  @state() private email = "";
  @state() private sex: Sex = "F";
  @state() private birthYear = CURRENT_YEAR - 20;
  @state() private licenseNumber = "";
  @state() private licenseType: LicenseType = "loisir";
  @state() private isAdmin = false;
  @state() private isCoach = false;
  @state() private active = true;

  @state() private errorMessage: string | null = null;
  @state() private successMessage: string | null = null;
  @state() private submitting = false;

  /**
   * `.member` n'est assigné par le parent qu'après la construction de
   * l'élément (liaison de propriété, pas un attribut) : on ne peut donc pas
   * initialiser les champs directement depuis this.member ci-dessus, il
   * faut les resynchroniser ici dès que la propriété change.
   */
  override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("member") || !this.member) return;
    this.lastName = this.member.lastName;
    this.firstName = this.member.firstName;
    this.email = this.member.email;
    this.sex = this.member.sex;
    this.birthYear = this.member.birthYear;
    this.licenseNumber = this.member.licenseNumber;
    this.licenseType = this.member.licenseType;
    this.isAdmin = this.member.isAdmin;
    this.isCoach = this.member.isCoach;
    this.active = this.member.active;
  }

  private validate(): string | null {
    if (!this.lastName.trim() || !this.firstName.trim()) return "Le nom et le prénom sont obligatoires.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) return "L'adresse email n'est pas valide.";
    if (!Number.isInteger(this.birthYear) || this.birthYear < 1900 || this.birthYear > CURRENT_YEAR) {
      return "L'année de naissance n'est pas valide.";
    }
    if (!this.licenseNumber.trim()) return "Le numéro de licence est obligatoire.";
    return null;
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const validationError = this.validate();
    if (validationError) {
      this.errorMessage = validationError;
      this.successMessage = null;
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;
    this.submitting = true;

    const base = {
      lastName: this.lastName.trim(),
      firstName: this.firstName.trim(),
      email: this.email.trim(),
      sex: this.sex,
      birthYear: this.birthYear,
      licenseNumber: this.licenseNumber.trim(),
      licenseType: this.licenseType,
    };

    if (this.member) {
      const result = await updateMember(this.member.id, {
        ...base,
        isAdmin: this.isAdmin,
        isCoach: this.isCoach,
        active: this.active,
      });
      this.submitting = false;
      if (result) {
        this.errorMessage = result.message;
        return;
      }
      this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true }));
      return;
    }

    const result = await createMember(base);
    this.submitting = false;
    if ("message" in result) {
      this.errorMessage = result.message;
      return;
    }
    this.successMessage = `Membre créé. Son mot de passe initial est son numéro de licence (${base.licenseNumber}) — communiquez-le lui, il devra le changer à sa première connexion.`;
    this.lastName = "";
    this.firstName = "";
    this.email = "";
    this.sex = "F";
    this.birthYear = CURRENT_YEAR - 20;
    this.licenseNumber = "";
    this.licenseType = "loisir";
    this.dispatchEvent(new CustomEvent("saved", { bubbles: true, composed: true, detail: result.member }));
  }

  override render() {
    return html`
      <form @submit=${this.handleSubmit}>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
        ${this.successMessage ? html`<p class="success">${this.successMessage}</p>` : ""}

        <label for="last-name">Nom</label>
        <input
          id="last-name"
          required
          .value=${this.lastName}
          @input=${(e: Event) => (this.lastName = (e.target as HTMLInputElement).value)}
        />

        <label for="first-name">Prénom</label>
        <input
          id="first-name"
          required
          .value=${this.firstName}
          @input=${(e: Event) => (this.firstName = (e.target as HTMLInputElement).value)}
        />

        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          required
          .value=${this.email}
          @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
        />

        <label for="sex">Sexe</label>
        <select id="sex" .value=${this.sex} @change=${(e: Event) => (this.sex = (e.target as HTMLSelectElement).value as Sex)}>
          <option value="F">Féminin</option>
          <option value="M">Masculin</option>
        </select>

        <label for="birth-year">Année de naissance</label>
        <input
          id="birth-year"
          type="number"
          required
          min="1900"
          max=${CURRENT_YEAR}
          .value=${String(this.birthYear)}
          @input=${(e: Event) => (this.birthYear = Number((e.target as HTMLInputElement).value))}
        />

        <label for="license-number">Numéro de licence</label>
        <input
          id="license-number"
          required
          .value=${this.licenseNumber}
          @input=${(e: Event) => (this.licenseNumber = (e.target as HTMLInputElement).value)}
        />

        <label for="license-type">Type de licence</label>
        <select
          id="license-type"
          .value=${this.licenseType}
          @change=${(e: Event) => (this.licenseType = (e.target as HTMLSelectElement).value as LicenseType)}
        >
          <option value="loisir">Loisir</option>
          <option value="competition">Compétition</option>
        </select>

        ${this.member
          ? html`
              <div class="checkboxes">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.isCoach}
                    @change=${(e: Event) => (this.isCoach = (e.target as HTMLInputElement).checked)}
                  />
                  Coach
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.isAdmin}
                    @change=${(e: Event) => (this.isAdmin = (e.target as HTMLInputElement).checked)}
                  />
                  Administrateur
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this.active}
                    @change=${(e: Event) => (this.active = (e.target as HTMLInputElement).checked)}
                  />
                  Actif
                </label>
              </div>
            `
          : ""}

        <div class="actions">
          <button type="submit" ?disabled=${this.submitting}>
            ${this.submitting ? "Enregistrement…" : this.member ? "Enregistrer" : "Créer le membre"}
          </button>
          <button type="button" @click=${() => this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }))}>
            ${this.member ? "Annuler" : "Retour à la liste"}
          </button>
        </div>
      </form>
    `;
  }
}
