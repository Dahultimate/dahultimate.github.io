import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { deleteAgeCategory, fetchAgeCategories } from "../services/age-categories.repository";
import type { AgeCategory } from "../domain/age-category";
import "./age-category-form";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; category: AgeCategory };

@customElement("age-categories-view")
export class AgeCategoriesView extends LitElement {
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
    }
    h2 {
      font-size: 1.1rem;
      margin: 0;
    }
    h3 {
      font-size: 0.9rem;
      color: #6b7280;
      margin: 1rem 0 0.4rem;
    }
    .table-scroll {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th,
    td {
      text-align: left;
      padding: 0.4rem 0.6rem;
      border-bottom: 1px solid #e5e7eb;
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
    header button {
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: 8px;
      background: var(--color-primary, #7c3aed);
      color: white;
      font-size: 0.9rem;
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

  @state() view: ViewMode = { mode: "list" };
  @state() private categories: AgeCategory[] = [];
  @state() private loading = true;
  @state() private errorMessage: string | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.refresh();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has("view") && this.view.mode === "list") {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    this.loading = true;
    this.categories = await fetchAgeCategories();
    this.loading = false;
  }

  private async handleDelete(category: AgeCategory): Promise<void> {
    const confirmed = confirm(`Supprimer la tranche "${category.label}" (${category.sex}) ?`);
    if (!confirmed) return;
    this.errorMessage = null;
    const errorMessage = await deleteAgeCategory(category.id);
    if (errorMessage) {
      this.errorMessage = errorMessage;
      return;
    }
    await this.refresh();
  }

  private renderYearRange(category: AgeCategory): string {
    if (category.minBirthYear === null) return `avant ${category.maxBirthYear} inclus`;
    if (category.maxBirthYear === null) return `après ${category.minBirthYear} inclus`;
    return `${category.minBirthYear} - ${category.maxBirthYear}`;
  }

  private renderTable(sex: "F" | "M") {
    const rows = this.categories.filter((c) => c.sex === sex);
    return html`
      <h3>${sex === "F" ? "Femmes" : "Hommes"}</h3>
      <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Années de naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (category) => html`
              <tr>
                <td>${category.label}</td>
                <td>${this.renderYearRange(category)}</td>
                <td>
                  <button @click=${() => (this.view = { mode: "edit", category })}>Modifier</button>
                  <button class="danger" @click=${() => this.handleDelete(category)}>Supprimer</button>
                </td>
              </tr>
            `,
          )}
        </tbody>
      </table>
      </div>
    `;
  }

  override render() {
    return html`
      <header>
        <h2>Catégories d'âge</h2>
        ${this.view.mode === "list" ? html`<button @click=${() => (this.view = { mode: "create" })}>+ Ajouter une tranche</button>` : ""}
      </header>

      ${this.view.mode !== "list"
        ? html`<age-category-form
            .category=${this.view.mode === "edit" ? this.view.category : null}
            @saved=${() => (this.view = { mode: "list" })}
            @cancel=${() => (this.view = { mode: "list" })}
          ></age-category-form>`
        : this.loading
          ? html`<p>Chargement…</p>`
          : html`
              ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
              ${this.renderTable("F")} ${this.renderTable("M")}
            `}
    `;
  }
}
