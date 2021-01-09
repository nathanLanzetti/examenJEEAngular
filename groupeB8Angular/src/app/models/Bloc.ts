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