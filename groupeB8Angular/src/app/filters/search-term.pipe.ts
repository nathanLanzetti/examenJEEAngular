import { Pipe, PipeTransform } from '@angular/core';
import {StudentToDB} from "../models/Student";

@Pipe({
  name: 'searchTerm'
})
export class SearchTermPipe implements PipeTransform {

  transform(students: StudentToDB[], searchTerm: string): StudentToDB[] {
    if (searchTerm === "") {
      return students;
    }

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
