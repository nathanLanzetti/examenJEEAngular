import { Pipe, PipeTransform } from '@angular/core';
import { getDisplayNameSection } from '../models/Section';
import { StudentToDB } from "../models/Student";

@Pipe({
  name: 'selectSection'
})
export class SelectSectionPipe implements PipeTransform {

  transform(students: StudentToDB[], selectedSection: number): StudentToDB[] {
    // selectedBloc, valeur du select de la section
    if (selectedSection == 0) {
      return students;
    }

    // filtre les étudiants en f(x) de la section
    return students.filter(student => {
      console.log(`Selected Section :  ${selectedSection}`);
      console.log(`Displayed Name = ${student.section} =? ${getDisplayNameSection(+selectedSection)}`);

      if (student.section == getDisplayNameSection(+selectedSection)) {
        return student
      }
    })
  }

}
