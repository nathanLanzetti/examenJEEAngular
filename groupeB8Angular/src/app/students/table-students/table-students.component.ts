import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';
import { StudentService } from "../../repositories/student.service";
import { StudentToDB } from "../../models/Student";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {

  @Input() students: StudentToDB[] = []; // liste de tous les étudiants
  @Input() selectedSection: number = 0;
  @Input() selectedBloc: number = 0;
  @Input() searchTerm: string = ""

  private subscriptions: Subscription[] = [];

  studentListCopied: StudentToDB[] = [];
  constructor(private router: Router,
    private listes: ListesEtudiantsService,
    private student: StudentService) { }

  ngOnInit(): void { }

  onClickedRow($event) {
    // récupère la ligne 
    const row = $event.target.parentNode;
    // récupère le matricule 
    const matricule = row.firstChild.innerHTML
    // navigue sur la fiche de l'étudiant
    this.router.navigate(['/etudiants/', matricule])
  }

}
