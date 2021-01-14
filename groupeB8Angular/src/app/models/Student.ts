import { Bloc } from "./Bloc";
import { Section } from "./Section";
import { Unit, UnitToDB } from "./Unit";

export interface Student {
  id?: number,
  matricule: string,
  fullname: string,
  units: Unit[], //
  creditsNumber: number, //
  academicYear: string, //
  section: Section,
  bloc: Bloc,
}

export interface StudentToDB {
  id?: number,
  matricule: string,
  fullname: string,
  units: UnitToDB[], //
  creditsNumber: number, //
  academicYear: string, //
  section: string,
  bloc: string
}
