import { describe, expect, it } from "vitest";
import { computeDefaultEventName, displayLocation, displayOrganizerName } from "./event";

describe("computeDefaultEventName", () => {
  it("concatène type, catégorie, format et division dans l'ordre", () => {
    expect(computeDefaultEventName("Championnat", "Open", "Indoor", "N3")).toBe("Championnat Open Indoor N3");
  });

  it("ignore les parts vides (ex. libellés pas encore chargés)", () => {
    expect(computeDefaultEventName("", "Mixte", "Beach", "")).toBe("Mixte Beach");
  });
});

describe("displayLocation", () => {
  it("retourne le lieu s'il est renseigné", () => {
    expect(displayLocation("Annecy")).toBe("Annecy");
  });

  it("retourne 'Lieu inconnu' si null ou vide", () => {
    expect(displayLocation(null)).toBe("Lieu inconnu");
    expect(displayLocation("   ")).toBe("Lieu inconnu");
  });
});

describe("displayOrganizerName", () => {
  const members = [{ id: "m1", firstName: "Ada", lastName: "Lovelace" }];

  it("retourne le nom du membre trouvé", () => {
    expect(displayOrganizerName("m1", members)).toBe("Ada Lovelace");
  });

  it("retourne 'Non renseigné' si aucun organisateur choisi", () => {
    expect(displayOrganizerName(null, members)).toBe("Non renseigné");
  });

  it("retourne 'Non renseigné' si l'id ne correspond à aucun membre (ex. désactivé)", () => {
    expect(displayOrganizerName("unknown", members)).toBe("Non renseigné");
  });
});
