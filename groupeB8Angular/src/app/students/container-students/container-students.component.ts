import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { students } from 'src/app/mock/MOCK_STUDENT';
import { Bloc, getDisplayNameBloc } from 'src/app/models/Bloc';
import { Section, getDisplayName } from 'src/app/models/Section';
import { Student, StudentToDB } from 'src/app/models/Student';
import { StudentToDisplay } from 'src/app/models/StudentsToDisplay';
import { StudentService } from 'src/app/repositories/student.service';

@Component({
  selector: 'app-container-students',
  templateUrl: './container-students.component.html',
  styleUrls: ['./container-students.component.css']
})
export class ContainerStudentsComponent implements OnInit, OnDestroy {
  students: StudentToDB[] = [];
  studentsToDisplay: StudentToDisplay[] = [];
  selectedSection: number = 0;
  selectedBloc: number = 0;
  searchTerm: string = ""
  loading = true
  private subscriptions: Subscription[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // récupère tous les étudants de la BD
    this.subscriptions.push(
      this.studentService.query()
        .subscribe(studentList => {
          this.students = studentList;
          this.students = this.students.sort(function (stdA, stdB) {
            if (stdA.fullname > stdB.fullname) {
              return 1;
            }
            else
              return -1
          });
        })

    );
    this.loading = false
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  // section récupéré a partir du select du menu
  getSection($event) {
    console.log($event);
    this.selectedSection = $event
  }

  // bloc récupéré a partir du select du menu
  getBloc($event) {
    console.log($event);
    this.selectedBloc = $event

  }

  // terme de recherche récupéré a partir de l'input du menu
  getSearch($event) {
    console.log($event);
    this.searchTerm = $event
  }

  getStudents() {
    students.map(students => {
      this.studentsToDisplay.push({
        matricule: students.matricule,
        fullname: students.fullname,
        section: getDisplayName(students.section),
        bloc: getDisplayNameBloc(students.bloc)
      })
    })
  }
}
