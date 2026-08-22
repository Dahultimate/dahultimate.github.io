import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchAllMembers } from "../services/members.repository";
import { fetchAgeCategories } from "../services/age-categories.repository";
import { deleteMember, resetMemberPassword, updateMember } from "../services/admin-members.service";
import { computeAgeCategory, type AgeCategory } from "../domain/age-category";
import type { Member } from "../domain/member";

@customElement("members-list")
export class MembersList extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.5rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: middle;
    }
    tr.inactive {
      color: #9ca3af;
    }
    .badge {
      display: inline-block;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      margin-right: 0.25rem;
    }
    .badge.admin {
      background: #ede9fe;
      color: #5b21b6;
    }
    .badge.coach {
      background: #dbeafe;
      color: #1e40af;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    button {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
    button.danger {
      border-color: #fca5a5;
      color: #991b1b;
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
  `;

  /** Incrémenté par le parent pour déclencher un rechargement (ex : retour depuis le formulaire). */
  @property({ type: Number })
  refreshToken = 0;

  @state() private members: Member[] = [];
  @state() private ageCategories: AgeCategory[] = [];
  @state() private loading = true;
  @state() private errorMessage: string | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has("refreshToken") && changed.get("refreshToken") !== undefined) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    const [members, ageCategories] = await Promise.all([fetchAllMembers(), fetchAgeCategories()]);
    this.members = members;
    this.ageCategories = ageCategories;
    this.loading = false;
  }

  private async handleToggleActive(member: Member): Promise<void> {
    this.errorMessage = null;
    const result = await updateMember(member.id, { ...member, active: !member.active });
    if (result) {
      this.errorMessage = result.message;
      return;
    }
    await this.refresh();
  }

  private async handleResetPassword(member: Member): Promise<void> {
    const confirmed = confirm(
      `Réinitialiser le mot de passe de ${member.firstName} ${member.lastName} à son numéro de licence (${member.licenseNumber}) ?`,
    );
    if (!confirmed) return;
    this.errorMessage = null;
    const result = await resetMemberPassword(member.id);
    if (result) {
      this.errorMessage = result.message;
      return;
    }
    await this.refresh();
  }

  private async handleDelete(member: Member): Promise<void> {
    const confirmed = confirm(
      `Supprimer définitivement le compte de ${member.firstName} ${member.lastName} ? Cette action est irréversible.`,
    );
    if (!confirmed) return;
    this.errorMessage = null;
    const result = await deleteMember(member.id);
    if (result) {
      this.errorMessage = result.message;
      return;
    }
    await this.refresh();
  }

  private handleEdit(member: Member): void {
    this.dispatchEvent(new CustomEvent<Member>("edit", { detail: member, bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    return html`
      ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
      <table>
        <thead>
          <tr>
            <th>Membre</th>
            <th>Email</th>
            <th>Licence</th>
            <th>Catégorie</th>
            <th>Droits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.members.map(
            (member) => html`
              <tr class=${member.active ? "" : "inactive"}>
                <td>${member.firstName} ${member.lastName}</td>
                <td>${member.email}</td>
                <td>${member.licenseNumber} (${member.licenseType === "competition" ? "compétition" : "loisir"})</td>
                <td>${computeAgeCategory(this.ageCategories, member.sex, member.birthYear)?.label ?? "—"}</td>
                <td>
                  ${member.isAdmin ? html`<span class="badge admin">Admin</span>` : ""}
                  ${member.isCoach ? html`<span class="badge coach">Coach</span>` : ""}
                  ${!member.active ? html`<span class="badge">Inactif</span>` : ""}
                </td>
                <td class="actions">
                  <button @click=${() => this.handleEdit(member)}>Modifier</button>
                  <button @click=${() => this.handleToggleActive(member)}>
                    ${member.active ? "Désactiver" : "Réactiver"}
                  </button>
                  <button @click=${() => this.handleResetPassword(member)}>Réinitialiser mdp</button>
                  <button class="danger" @click=${() => this.handleDelete(member)}>Supprimer</button>
                </td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }
}
