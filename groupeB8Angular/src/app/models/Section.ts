export enum Section {
  ASSISTANT_E_DE_DIRECTION = 1,
  COMPTABILITE,
  INFORMATIQUE_DE_GESTION,
}

export function getDisplayName(key: number): string {
  switch (key) {
    case 1:
      return "Assistant(e) de direction"
      break;
    case 2:
      return "Comptabilité"
      break;
    case 3:
      return "Informatique de gestion"
      break;

    default:
      break;
  }
}

export function getDisplayNameSection(key: number): string {
  switch (key) {
    case 1:
      return "ASSISTANT_E_DE_DIRECTION"
      break;
    case 2:
      return "COMPTABILITE"
      break;
    case 3:
      return "INFORMATIQUE_DE_GESTION"
      break;

    default:
      break;
  }
}

export function getSectionFromDisplay(displayedName: string): Section {
  switch (displayedName) {
    case "IG":
      return Section.INFORMATIQUE_DE_GESTION
      break;
    case "AD":
      return Section.ASSISTANT_E_DE_DIRECTION
      break;
    case "CT":
      return Section.COMPTABILITE
      break;

    default:
      break;
  }
}

export function getSectionToDB(displayedName: string): string {
  switch (displayedName) {
    case "IG":
      return "INFORMATIQUE_DE_GESTION"
      break;
    case "AD":
      return "ASSISTANT_E_DE_DIRECTION"
      break;
    case "CT":
      return "COMPTABILITE"
      break;

    default:
      break;
  }
}
