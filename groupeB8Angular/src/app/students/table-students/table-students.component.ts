import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc, getDisplayNameBloc } from 'src/app/models/Bloc';
import { Section, getDisplayName } from 'src/app/models/Section';
import { Student } from 'src/app/models/Student';
import { StudentToDisplay } from 'src/app/models/StudentsToDisplay';
import {ListesEtudiantsService} from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {

  @Input() students: StudentToDisplay[] = []
  @Input() selectedSection: number = 0;
  @Input() selectedBloc: number = 0;
  @Input() searchTerm: string = ""

  constructor(private router: Router,
              private listes: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.students = this.listes.data[1];
  }

  onClickedRow($event) {
    const row = $event.target.parentNode;
    const matricule = row.firstChild.innerHTML
    this.router.navigate(['/etudiants/', matricule])
  }

}
