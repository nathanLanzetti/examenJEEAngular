import { Bloc } from "./Bloc";
import { Section } from "./Section";

export interface Activity {
    id?: number,
    title: string,
    creditsNumber?: number,
    section: Section,
    bloc: Bloc
}
