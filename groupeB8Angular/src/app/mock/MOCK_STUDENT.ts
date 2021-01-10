import { Bloc } from "../models/Bloc"
import { Section } from "../models/Section"
import { Student } from "../models/Student"
import { Unit } from "../models/Unit"

export const students: Student[] = [
    {
        matricule: "la123456",
        lastname: "Stinson",
        firstname: "Barney",
        units: [null],
        creditsNumber: 0,
        academicYear: "2020/2021",
        section: Section.COMPTABILITE,
        bloc: Bloc.BLOC_1
    },
    {
        matricule: "la118899",
        lastname: "Mosby",
        firstname: "Ted",
        units: [null],
        creditsNumber: 15,
        academicYear: "2020/2021",
        section: Section.INFORMATIQUE_DE_GESTION,
        bloc: Bloc.BLOC_2
    },
    {
        matricule: "la558899",
        lastname: "Erikson",
        firstname: "Marshall",
        units: [null],
        creditsNumber: 29,
        academicYear: "2020/2021",
        section: Section.COMPTABILITE,
        bloc: Bloc.BLOC_1
    },
    {
        matricule: "la558899",
        lastname: "Auldren",
        firstname: "Lily",
        units: [null],
        creditsNumber: 29,
        academicYear: "2020/2021",
        section: Section.COMPTABILITE,
        bloc: Bloc.BLOC_1
    },
    {
        matricule: "la222222",
        lastname: "WhateverIsHerName",
        firstname: "Robin",
        units: [null],
        creditsNumber: 29,
        academicYear: "2020/2021",
        section: Section.COMPTABILITE,
        bloc: Bloc.BLOC_1
    },

]



/* matricule: "la123456";
        lastname: "Stinson";
        firstname: "Barney",
        units: [],
        ueValidated: Map<String, Boolean>,
        aaValidated: Map<String, Boolean>,
        creditsNumber: number,
        academicYear: string,
        section: Section,
        bloc: Bloc */