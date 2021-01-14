import { Component, OnInit } from '@angular/core';
import { students } from 'src/app/mock/MOCK_STUDENT';
import { Bloc, getDisplayNameBloc } from 'src/app/models/Bloc';
import { Section, getDisplayName } from 'src/app/models/Section';
import { Student } from 'src/app/models/Student';
import { StudentToDisplay } from 'src/app/models/StudentsToDisplay';

@Component({
  selector: 'app-container-students',
  templateUrl: './container-students.component.html',
  styleUrls: ['./container-students.component.css']
})
export class ContainerStudentsComponent implements OnInit {
  students: Student[] = students;
  studentsToDisplay: StudentToDisplay[] = [];
  selectedSection: number = 0;
  selectedBloc: number = 0;
  searchTerm: string = ""

  constructor() { }

  ngOnInit(): void {
    this.getStudents()
  }
  getSection($event) {
    console.log($event);
    this.selectedSection = $event

  }
  getBloc($event) {
    console.log($event);
    this.selectedBloc = $event

  }
  getSearch($event) {
    console.log($event);
    this.searchTerm = $event
  }

  getStudents() {
    students.map(students => {
      this.studentsToDisplay.push({
        matricule: students.matricule,
        fullname: `${students.lastname + students.firstname}`,
        section: getDisplayName(students.section),
        bloc: getDisplayNameBloc(students.bloc)
      })
    })
  }



}
