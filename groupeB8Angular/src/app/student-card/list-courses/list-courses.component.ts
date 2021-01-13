import {Component, OnInit} from '@angular/core';
import {ListesEtudiantsService} from "../../services/listes-etudiants.service";
import {ActivatedRoute} from "@angular/router";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit} from "../../models/Unit";
import {Activity} from "../../models/Activity";
import {Bloc} from "../../models/Bloc";



@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  bloc1: Unit[] = new Array();
  bloc2: Unit[] = new Array();
  bloc3: Unit[] = new Array();

  listUE: Unit[] = new Array();
  matricule: string;

  indexSectionStudent: number = 0;

  constructor(private route: ActivatedRoute, private listes: ListesEtudiantsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.matricule = params.get('matricule')
    );
    this.getAllUE();
    this.hideTabs();
    //this.getCredit();
    this.getListUE();

    //affichage des boutons
    this.displayButtons()

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

  //Obtenir toutes les UE filtrés dans chaque bloc en fonction de la section de l'étudiant
  getListUE() {
    this.listUE.forEach(unit => {
      switch (unit.bloc) {
        case Bloc.BLOC_1 :
          this.bloc1.push(unit);
          break;
        case Bloc.BLOC_2 :
          this.bloc2.push(unit);
          break;
        case Bloc.BLOC_3:
          this.bloc3.push(unit);
          break;
        default :
          break;
      }
    })
  }

  //Obtenir Toutes les UE en fonction de la section de l'étudiant
  private getAllUE() {
    //Attribut

    var listStudentCopied: StudentToDisplay[] = this.listes.studentList;
    var unit: Unit = null;
    var dividedText: any[] = new Array();
    var nameUE: string = "";
    var bloc: number = 0;
    var year: number = new Date().getFullYear();
    var nameAA: string = "";
    var activity: Activity = null;

    //Déterminer la section de l'étudiant
    this.listes.studentList.forEach(student => {
      if (student.matricule == this.matricule) {
        this.indexSectionStudent = this.listes.sections.indexOf(student.section);
      }
    })


    this.listes.data.forEach(section => {
      if (this.listes.data.indexOf(section) == this.indexSectionStudent) {
        section.forEach(datas => {
          if (section.indexOf(datas) < 3) {
            datas.forEach(data => {
              if (datas.indexOf(data) >= 4) {
                data = "" + data;
                dividedText = data.split(" ");
                if (dividedText[2] == "UE") {
                  if (unit != null) this.listUE.push(unit);
                  dividedText.forEach(text => {
                    if (dividedText.indexOf(text) >= 4) {
                      nameUE += text + " ";
                    } else if (dividedText.indexOf(text) == 0) {
                      switch (text[2]) {
                        case "1" :
                          bloc = Bloc.BLOC_1;
                          break;
                        case "2" :
                          bloc = Bloc.BLOC_2;
                          break;
                        case "3" :
                          bloc = Bloc.BLOC_3;
                          break;
                        default :
                          break;
                      }
                    }
                  });

                  unit = {
                    code: dividedText[3],
                    title: nameUE,
                    section: this.listes.sections[this.indexSectionStudent],
                    bloc: bloc,
                    activities: new Array(),
                    academicYear: year - 1 + "/" + year
                  }
                  nameUE = "";
                } else {
                  dividedText.forEach(text => {
                    if (dividedText.indexOf(text) >= 2) {
                      nameAA += text + " ";
                    }
                  })
                  if (nameAA != "") {
                    activity = {
                      title: nameAA,
                      bloc: bloc,
                      section: this.listes.sections[this.indexSectionStudent]
                    }
                    nameAA = "";
                    if (unit != null) unit.activities.push(activity);
                  }
                }
              }
            })
          }
        })
      }
    })
    this.listUE.push(unit);
    console.log(this.listUE);
  }
/*
  //Attribue le nombre de crédit pour chaque UE et AA de la liste listUE
  getCredit(){
    var ue : Unit = null;
    var isAA : number = -1;
    var credit : number = 0;

      this.listes.data.forEach(section=>{
        if (this.listes.data.indexOf(section) == this.indexSectionStudent) {
          section.forEach(datas=>{
            if(section.indexOf(datas) == 2){
              datas.forEach(data=>{
                if(datas.indexOf(data)>=4){
                  if(ue!=null && isAA == -1){
                    this.listUE.forEach(ues=>{
                      if(ues.code == ue.code){
                        ues = ue;
                      }
                    })
                  }
                  if(isAA<0){
                    credit = data;
                    ue = this.listUE[datas.indexOf(data)-4];
                    ue.creditsNumber = credit;
                    isAA ++;
                  }
                  else{
                    ue.activities[isAA].creditsNumber = data;
                    isAA ++;
                    if(ue.activities.length >= isAA){
                      isAA = -1;
                    }
                  }
                }

              })
            }
          })
        }
      });
  }
*/
  ajouter(index) {
    var btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");
    btnRemove[index].style.display = "block";
    btnAdd[index].style.display = "none";
  }

  supprimer(index){
    var btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");
    btnAdd[index].style.display = "block";
    btnRemove[index].style.display = "none";

  }
}
