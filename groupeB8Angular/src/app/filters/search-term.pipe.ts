import { Pipe, PipeTransform } from '@angular/core';
import { StudentToDisplay } from '../models/StudentsToDisplay';

@Pipe({
  name: 'searchTerm'
})
export class SearchTermPipe implements PipeTransform {

  transform(students: StudentToDisplay[], searchTerm: string): StudentToDisplay[] {
    if (searchTerm === "") {
      return students;
    }

    return students.filter(student => {
      if (student.lastname.toLowerCase().includes(searchTerm.toLowerCase())) {
        return student
      }
      if (student.matricule.toLowerCase().includes(searchTerm.toLowerCase())) {
        return student
      }
    })

  }
}