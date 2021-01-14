import { Bloc } from "./Bloc";
import { Section } from "./Section";
import { Unit } from "./Unit";
import {ScoredUnit} from './ScoredUnit';

export interface Student {
  id?: number,
  matricule: string,
  fullname: string,
  units: Unit[], //
  creditsNumber: number, //
  academicYear: string, //
  section: Section,
  bloc: Bloc,
  scores?: ScoredUnit[]
}
