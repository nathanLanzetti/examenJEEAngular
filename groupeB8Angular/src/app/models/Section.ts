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
      return "AD"
      break;
    case 2:
      return "CT"
      break;
    case 3:
      return "IG"
      break;

    default:
      break;
  }
}
