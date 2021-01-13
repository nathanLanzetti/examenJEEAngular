export enum Bloc {
  BLOC_1 = 1,
  BLOC_2,
  BLOC_3
}

export function getDisplayNameBloc(key: number): string {
  switch (key) {
    case 1:
      return "Bloc 1"
      break;
    case 2:
      return "Bloc 2"
      break;
    case 3:
      return "Bloc 3"
      break;

    default:
      break;
  }
}
export function getDisplayNameBlocTable(key: number): string {
  switch (key) {
    case 1:
      return "1B"
      break;
    case 2:
      return "2B"
      break;
    case 3:
      return "3B"
      break;

    default:
      break;
  }
}

export function getBlocFromDisplay(displayedName: string): Bloc {
  switch (displayedName) {
    case "1B":
      return Bloc.BLOC_1
      break;
    case "2B":
      return Bloc.BLOC_2
      break;
    case "3B":
      return Bloc.BLOC_3
      break;

    default:
      break;
  }
}
