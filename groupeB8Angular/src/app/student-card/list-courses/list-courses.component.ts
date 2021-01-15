import {Component, Input, OnInit, Output} from '@angular/core';
import {ListesEtudiantsService} from "../../services/listes-etudiants.service";
import {ActivatedRoute} from "@angular/router";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit, UnitToDB} from "../../models/Unit";
import {Activity} from "../../models/Activity";
import {Bloc} from "../../models/Bloc";
import {EventEmitter} from "events";
import {Section} from "../../models/Section";
import {UnitService} from "../../repositories/unit.service";
import {Subscription} from "rxjs";
import {StudentToDB} from "../../models/Student";


@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  credits: number;

  @Output() myEvent = new EventEmitter();

  bloc1: UnitToDB[] = new Array();
  bloc2: UnitToDB[] = new Array();
  bloc3: UnitToDB[] = new Array();

  listUE: UnitToDB[] = new Array();
  matricule: string;
  sectionStudent;

  lastChange : string;

  indexSectionStudent: number = 0;


  incrementUE : number = 0;
  incrementAA : number = 0;

  @Input() student : StudentToDB;

  private subscription : Subscription[] = [];

  constructor(private route: ActivatedRoute, private listes: ListesEtudiantsService,
              private unit: UnitService) {
  }

  ngOnInit(): void {
    this.hideTabs();
    const sub = this.unit.query()
      .subscribe(unit => {
        this.listUE = unit;
        this.listUE = this.listUE.filter(ue=>ue.section == this.student.section);
        //this.listUE = this.listUE.sort(function(ueA,ueB){return ueA.code < ueB.code;});
        this.bloc1 = this.listUE.filter(ue=>ue.bloc == "BLOC_1");
        this.bloc2 = this.listUE.filter(ue=>ue.bloc == "BLOC_2");
        this.bloc3 = this.listUE.filter(ue=>ue.bloc == "BLOC_3");

      });
    this.subscription.push(sub);


    //this.getUEBySection();
    //this.getListUE();

    console.log(this.listUE);
    //affichage des boutons
    this.displayButtons()
    this.credits = 0;

  }

  private displayButtons() {
    var i, btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");
    for (i = 0; i < btnAdd.length; i++) {
      btnAdd[i].style.display = "block";
    }
    for (i = 0; i < btnRemove.length; i++) {
      btnRemove[i].style.display = "none";
    }
  }

  private hideTabs() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.color = "black";
    }

  }


  openCity(evt, bloc) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.color = "black";
    }
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      tablinks.style.color = "green";
    }

    document.getElementById(bloc).style.display = "block";
    evt.currentTarget.className += " active";
  }

  private getUEBySection() {
    var indexSection : number;
    this.listes.studentList.forEach(student=>{
      if(student.matricule == this.matricule){
        this.sectionStudent = student.section;
      }
    })
    indexSection = this.listes.sections.indexOf(this.sectionStudent);
    console.log(indexSection + " : "+this.sectionStudent);
    this.listes.listUE.forEach(section=>{
      if(this.listes.listUE.indexOf(section) == indexSection){
        this.listUE = this.listes.listUE[indexSection];
      }
    })
  }
  // //Obtenir toutes les UE filtrés dans chaque bloc en fonction de la section de l'étudiant
  // getListUE() {
  //   this.listUE.forEach(unit => {
  //     switch (unit.bloc) {
  //       case Bloc.BLOC_1 :
  //         this.bloc1.push(unit);
  //         break;
  //       case Bloc.BLOC_2 :
  //         this.bloc2.push(unit);
  //         break;
  //       case Bloc.BLOC_3:
  //         this.bloc3.push(unit);
  //         break;
  //       default :
  //         break;
  //     }
  //   })
  // }


  ajouter(index) {
    this.lastChange = "";
    var btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");

    this.credits += this.listUE[index].creditsNumber;

    this.lastChange = "UE "+this.listUE[index].code + " : "+this.listUE[index].title + " ajoutée";
    btnRemove[index].style.display = "block";
    btnAdd[index].style.display = "none";
    console.log(this.lastChange);
  }

  supprimer(index){

    console.log(index);
    this.lastChange = "";
    var btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");

    this.credits -= this.listUE[index].creditsNumber;

    this.lastChange = "UE "+this.listUE[index].code + " : "+this.listUE[index].title + " supprimée";
    btnAdd[index].style.display = "block";
    btnRemove[index].style.display = "none";

    console.log(this.lastChange);

  }


  onCheck() {

  }
}
