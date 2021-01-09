import { Bloc } from "./Bloc";
import { Section } from "./Section";
import { Unit } from "./Unit";

export interface Student {
    id?: number,
    matricule: string,
    lastname: string,
    firstname: string,
    units: Unit[],
    ueValidated: Map<String, Boolean>,
    aaValidated: Map<String, Boolean>,
    creditsNumber: number,
    academicYear: string,
    section: Section,
    bloc: Bloc
}