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
    input[type="search"] {
      box-sizing: border-box;
      width: 100%;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .card {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-md, 12px);
      background: var(--color-surface, white);
      box-shadow: var(--shadow-sm, none);
      padding: 0.85rem 1rem;
    }
    .card.inactive {
      opacity: 0.6;
    }
    .identity .name {
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }
    .identity .details {
      font-size: 0.82rem;
      color: var(--color-text-muted, #6b7280);
      margin-top: 0.15rem;
      line-height: 1.5;
    }
    .badges {
      margin-top: 0.35rem;
      display: flex;
      gap: 0.3rem;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-block;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      font-size: 0.72rem;
    }
    .badge.admin {
      background: var(--color-primary-light, #ede9fe);
      color: var(--color-primary-dark, #5b21b6);
    }
    .badge.coach {
      background: var(--color-info-bg, #dbeafe);
      color: #1e40af;
    }
    .badge.inactive-badge {
      background: #f3f4f6;
      color: #6b7280;
    }
    .menu-wrapper {
      position: relative;
    }
    .menu-button {
      border: none;
      background: none;
      font-size: 1.2rem;
      line-height: 1;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      color: var(--color-text-muted, #6b7280);
      border-radius: 6px;
    }
    .menu-button:hover {
      background: #f3f4f6;
    }
    .menu {
      position: absolute;
      right: 0;
      top: 2rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      background: var(--color-surface, white);
      border: 1px solid var(--color-border, #e6e3f1);
      border-radius: var(--radius-sm, 8px);
      box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12));
      overflow: hidden;
    }
    .menu button {
      border: none;
      background: none;
      text-align: left;
      padding: 0.55rem 0.85rem;
      font-size: 0.85rem;
      cursor: pointer;
      color: var(--color-text, #1f2937);
    }
    .menu button:hover {
      background: #f7f6fb;
    }
    .menu button.danger {
      color: var(--color-danger, #991b1b);
    }
    .error {
      color: #991b1b;
      background: #fee2e2;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .empty {
      color: var(--color-text-muted, #6b7280);
      font-size: 0.9rem;
    }
  `;

  /** Incrémenté par le parent pour déclencher un rechargement (ex : retour depuis le formulaire). */
  @property({ type: Number })
  refreshToken = 0;

  @state() private members: Member[] = [];
  @state() private ageCategories: AgeCategory[] = [];
  @state() private loading = true;
  @state() private errorMessage: string | null = null;
  @state() private search = "";
  @state() private openMenuId: string | null = null;

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

  private categoryLabel(member: Member): string {
    return computeAgeCategory(this.ageCategories, member.sex, member.birthYear)?.label ?? "—";
  }

  private get filteredMembers(): Member[] {
    const search = this.search.trim().toLowerCase();
    if (!search) return this.members;
    return this.members.filter((member) => {
      const rights = [member.isAdmin ? "admin" : "", member.isCoach ? "coach" : "", member.active ? "actif" : "inactif"].join(" ");
      const haystack = [
        member.firstName,
        member.lastName,
        member.email,
        member.licenseNumber,
        this.categoryLabel(member),
        rights,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }

  private async handleToggleActive(member: Member): Promise<void> {
    this.openMenuId = null;
    this.errorMessage = null;
    const result = await updateMember(member.id, { ...member, active: !member.active });
    if (result) {
      this.errorMessage = result.message;
      return;
    }
    await this.refresh();
  }

  private async handleResetPassword(member: Member): Promise<void> {
    this.openMenuId = null;
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
    this.openMenuId = null;
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
    this.openMenuId = null;
    this.dispatchEvent(new CustomEvent<Member>("edit", { detail: member, bubbles: true, composed: true }));
  }

  private toggleMenu(memberId: string): void {
    this.openMenuId = this.openMenuId === memberId ? null : memberId;
  }

  private renderMenu(member: Member) {
    if (this.openMenuId !== member.id) return "";
    return html`
      <div class="menu">
        <button @click=${() => this.handleEdit(member)}>Modifier</button>
        <button @click=${() => this.handleToggleActive(member)}>${member.active ? "Désactiver" : "Réactiver"}</button>
        <button @click=${() => this.handleResetPassword(member)}>Réinitialiser le mot de passe</button>
        <button class="danger" @click=${() => this.handleDelete(member)}>Supprimer</button>
      </div>
    `;
  }

  override render() {
    if (this.loading) return html`<p>Chargement…</p>`;

    const members = this.filteredMembers;

    return html`
      ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
      <input
        type="search"
        placeholder="Rechercher (nom, email, licence, catégorie, droits)…"
        .value=${this.search}
        @input=${(e: Event) => (this.search = (e.target as HTMLInputElement).value)}
      />
      ${members.length === 0
        ? html`<p class="empty">Aucun membre ne correspond.</p>`
        : html`
            <ul>
              ${members.map(
                (member) => html`
                  <li>
                    <div class="card ${member.active ? "" : "inactive"}">
                      <div class="identity">
                        <div class="name">${member.firstName} ${member.lastName}</div>
                        <div class="details">
                          ${member.email}<br />
                          Licence ${member.licenseNumber} (${member.licenseType === "competition" ? "compétition" : "loisir"})
                          · ${this.categoryLabel(member)}
                        </div>
                        <div class="badges">
                          ${member.isAdmin ? html`<span class="badge admin">Admin</span>` : ""}
                          ${member.isCoach ? html`<span class="badge coach">Coach</span>` : ""}
                          ${!member.active ? html`<span class="badge inactive-badge">Inactif</span>` : ""}
                        </div>
                      </div>
                      <div class="menu-wrapper">
                        <button class="menu-button" @click=${() => this.toggleMenu(member.id)} aria-label="Actions">⋮</button>
                        ${this.renderMenu(member)}
                      </div>
                    </div>
                  </li>
                `,
              )}
            </ul>
          `}
    `;
  }
}
