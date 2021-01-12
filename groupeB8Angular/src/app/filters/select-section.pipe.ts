import { Pipe, PipeTransform } from '@angular/core';
import { getDisplayNameSection } from '../models/Section';
import { StudentToDisplay } from '../models/StudentsToDisplay';

@Pipe({
  name: 'selectSection'
})
export class SelectSectionPipe implements PipeTransform {

  transform(students: StudentToDisplay[], selectedSection: number): StudentToDisplay[] {
    if (selectedSection == 0) {
      return students;
    }

    return students.filter(student => {
      console.log(`Selected Section :  ${selectedSection}`);
      console.log(`Displayed Name = ${student.section} =? ${getDisplayNameSection(+selectedSection)}`);

      if (student.section == getDisplayNameSection(+selectedSection)) {
        return student
      }
    })
  }

}
