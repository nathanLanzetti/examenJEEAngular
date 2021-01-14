import { Bloc } from "./Bloc";
import { Section } from "./Section";
import { Unit } from "./Unit";

export interface Student {
    id?: number,
    matricule: string,
    lastname: string,
    firstname: string,
    units: Unit[],
    creditsNumber: number,
    academicYear: string,
    section: Section,
    bloc: Bloc
}

export interface Student2 {
    id?: number,
    matricule: string,
    fullname: string,
    unitsGlobal: Unit[],
    unitsInPae: Unit[],
    creditsNumber: number,
    academicYear: string,
    section: Section,
    bloc: Bloc
}