import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentToDisplay } from 'src/app/models/StudentsToDisplay';
import {ListesEtudiantsService} from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {

  @Input()students : StudentToDisplay[] = [];
  @Input() selectedSection: number = 0;
  @Input() selectedBloc: number = 0;
  @Input() searchTerm: string = ""

  studentListCopied : StudentToDisplay[] = [];
  constructor(private router: Router,
              private listes: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.students = this.listes.studentList;
  }

  onClickedRow($event) {
    const row = $event.target.parentNode;
    const matricule = row.firstChild.innerHTML
    this.router.navigate(['/etudiants/', matricule])
  }


}
