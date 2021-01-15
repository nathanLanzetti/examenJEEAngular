import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ListesEtudiantsService} from '../../services/listes-etudiants.service';
import {StudentService} from "../../repositories/student.service";
import {StudentToDB} from "../../models/Student";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {

  @Input()students : StudentToDB[] = [];
  @Input() selectedSection: number = 0;
  @Input() selectedBloc: number = 0;
  @Input() searchTerm: string = ""

  private subscriptions: Subscription[] = [];

  studentListCopied : StudentToDB[] = [];
  constructor(private router: Router,
              private listes: ListesEtudiantsService,
              private student: StudentService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.student.query()
        .subscribe(studentList =>{this.students = studentList;
        this.students = this.students.sort(function(stdA,stdB){
          if(stdA.fullname > stdB.fullname){
            return 1;
          }
          else
            return -1
        });}));
  }

  onClickedRow($event) {
    const row = $event.target.parentNode;
    const matricule = row.firstChild.innerHTML
    this.router.navigate(['/etudiants/', matricule])
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

}
