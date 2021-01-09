import { Pipe, PipeTransform } from '@angular/core';
import { getDisplayNameBloc } from '../models/Bloc';
import { StudentToDisplay } from '../models/StudentsToDisplay';

@Pipe({
  name: 'selectBloc'
})
export class SelectBlocPipe implements PipeTransform {

  transform(students: StudentToDisplay[], selectedBloc: number): StudentToDisplay[] {
    if (selectedBloc == 0) {
      return students;
    }

    return students.filter(student => {
      console.log(`Selected Section :  ${selectedBloc}`);
      console.log(`Displayed Name = ${student.section} =? ${getDisplayNameBloc(+selectedBloc)}`);

      if (student.bloc == getDisplayNameBloc(+selectedBloc)) {
        return student
      }
    })
  }

}
