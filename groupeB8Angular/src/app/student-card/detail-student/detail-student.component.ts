import { Component, OnInit } from '@angular/core';
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {ActivatedRoute} from "@angular/router";
import {ListesEtudiantsService} from "../../services/listes-etudiants.service";

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  students: StudentToDisplay;
  matricule: string;

  constructor(private route: ActivatedRoute,
              private listesEtudiants: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>this.matricule=params.get('matricule')
    );
    this.getStudent();

  }

  getStudent(){
    this.listesEtudiants.studentList.forEach(student =>{
      if(student.matricule == this.matricule){
        this.students = student;
        console.log(this.students);
      }
    });
    return this.students;
  }

}
