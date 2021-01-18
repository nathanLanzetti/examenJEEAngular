import { Pipe, PipeTransform } from '@angular/core';
import { getDisplayNameBlocTable } from '../models/Bloc';
import { StudentToDisplay } from '../models/StudentsToDisplay';

@Pipe({
  name: 'selectBloc'
})
export class SelectBlocPipe implements PipeTransform {

  transform(students: StudentToDisplay[], selectedBloc: number): StudentToDisplay[] {
    // selectedBloc, valeur du select du bloc 
    if (selectedBloc == 0) {
      return students;
    }

    // filtre les étudiants en f(x) du bloc
    return students.filter(student => {
      console.log(`Selected Section :  ${selectedBloc}`);
      console.log(`Displayed Name = ${student.section} =? ${getDisplayNameBlocTable(+selectedBloc)}`);

      if (student.bloc == getDisplayNameBlocTable(+selectedBloc)) {
        return student
      }
    })
  }

}
