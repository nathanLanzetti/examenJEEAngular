import { Activity, ActivityToDB } from "./Activity";
import { Bloc } from "./Bloc";
import { Section } from "./Section";

export interface Unit {
    id?: number,
    code: string,
    title: string,
    activities: Activity[],
    academicYear: string,
    creditsNumber?: number,
    section: Section,
    bloc?: Bloc
}

export interface UnitToDB {
    id?: number,
    code: string,
    title: string,
    activities: ActivityToDB[],
    academicYear: string,
    creditsNumber?: number,
    section: string,
    bloc?: string
}
