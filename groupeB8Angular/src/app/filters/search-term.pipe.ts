import { Pipe, PipeTransform } from '@angular/core';
import { StudentToDB } from "../models/Student";

@Pipe({
  name: 'searchTerm'
})
export class SearchTermPipe implements PipeTransform {

  // Pipe est un type de component qui permet de transformer les données
  transform(students: StudentToDB[], searchTerm: string): StudentToDB[] {
    // searchTerm est ce que l'utilisateur entre dans un input
    if (searchTerm === "") {
      return students;
    }

    // retourne une liste qui correspond au matricule/nom
    return students.filter(student => {
      if (student.fullname.toLowerCase().includes(searchTerm.toLowerCase())) {
        return student
      }
      if (student.matricule.toLowerCase().includes(searchTerm.toLowerCase())) {
        return student
      }
    })

  }
}
