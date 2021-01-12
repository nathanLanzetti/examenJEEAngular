import { Activity } from "./Activity";
import { Bloc } from "./Bloc";
import { Section } from "./Section";

export interface Unit {
    id?: number,
    code: string,
    title: string,
    activities?: Activity[],
    academicYear: string,
    creditsNumber?: number,
    section: Section,
    bloc: Bloc
}
