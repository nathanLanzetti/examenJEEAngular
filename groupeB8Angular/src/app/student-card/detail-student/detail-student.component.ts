import { Component, Input, OnInit } from '@angular/core';
import { StudentToDisplay } from "../../models/StudentsToDisplay";
import { ActivatedRoute } from "@angular/router";
import { ListesEtudiantsService } from "../../services/listes-etudiants.service";
import { StudentToDB } from "../../models/Student";
import { fromBlocDBToDisplay } from 'src/app/models/Bloc';
import { fromSectionDBToDisplay } from 'src/app/models/Section';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  @Input() students: StudentToDB;
  matricule: string;
  colorArray = { "ASSISTANT_E_DE_DIRECTION": "#BE8CF3", "INFORMATIQUE_DE_GESTION": "#417EBF", "COMPTABILITE": "#C95511" } // Purple, Blue, Orange



  constructor(private route: ActivatedRoute,
    private listesEtudiants: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.matricule = params.get('matricule')
    );
    this.getStudent();
  }

  getStudent() {
    this.listesEtudiants.studentList.forEach(student => {
      if (student.matricule == this.matricule) {
        console.log(this.students);
      }
    });
    return this.students;
  }

  fromBlocDBToDisplay(blocStringFromDB: string): string {
    switch (blocStringFromDB) {
      case "BLOC_1":
        return "1B"
        break;
      case "BLOC_2":
        return "2B"
        break;
      case "BLOC_3":
        return "3B"
        break;

      default:
        break;
    }
  }

  fromSectionDBToDisplay(sectionStringFromDB: string): string {
    switch (sectionStringFromDB) {
      case "INFORMATIQUE_DE_GESTION":
        return "Assistant(e) de direction"
        break;
      case "ASSISTANT_E_DE_DIRECTION":
        return "Comptabilité"
        break;
      case "COMPTABILITE":
        return "Informatique de gestion"
        break;

      default:
        break;
    }
  }

}
