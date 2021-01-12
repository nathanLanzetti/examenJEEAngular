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

  @Input() students: StudentToDisplay[] = []
  @Input() selectedSection: number = 0;
  @Input() selectedBloc: number = 0;
  @Input() searchTerm: string = ""
  matricule: [];
  firstname: [];
  name: [];
  bloc: [];

  constructor(private router: Router,
              private listes: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.students = []
    this.matricule = [];
    this.firstname = [];
    this.name = [];
    this.bloc = [];
    this.generateMatricule();
    this.generateNom();
    this.generateBloc();
    let cpt = this.matricule.length;
    let etudiant: StudentToDisplay;
    for (let i:number =0; i<cpt; i++){
      console.log(this.matricule[i]);
      // @ts-ignore
      etudiant = {
        matricule: this.matricule[i],
        lastname: this.name[i],
        firstname: this.firstname[i],
        bloc: this.bloc[i]
      };
      this.students.push(etudiant);
    }
  }

  onClickedRow($event) {
    const row = $event.target.parentNode;
    const matricule = row.firstChild.innerHTML
    this.router.navigate(['/etudiants/', matricule])
  }

  generateMatricule(){
    this.listes.data.forEach(sections=>{
      sections.forEach(data => {
        data.forEach(a => {
          if (data.indexOf(a)==2){
            // @ts-ignore
            this.matricule.push(a);
          }
        })
      })
    });
    console.log(this.matricule);
  }

  generateNom(){
    var name: string;
    var firstName: string = "";
    var lastName: string = "";
    var morceau: string[] = [];
    this.listes.data.forEach(section=>{
      section.forEach(data =>{
        data.forEach(n =>{
          if(data.indexOf(n)==1 && n!="Etudiants"){

            name = ""+n;
            morceau = name.split(" ",2);
            lastName = morceau[0];
            firstName = morceau[1];
            // @ts-ignore
            this.firstname.push(firstName);
            // @ts-ignore
            this.name.push(lastName);
          }
        })
      })
    });
    console.log(this.name);
  }

  generateBloc(){
    this.listes.data.forEach(section=>{
      section.forEach(data => {
        data.forEach(a => {
          if (data.indexOf(a)==3){
            // @ts-ignore
            this.bloc.push(a)
          }
        })
      })
    });
    console.log(this.bloc);
  }

}
