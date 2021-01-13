import {Component, OnInit, Output} from '@angular/core';
import {ListesEtudiantsService} from "../../services/listes-etudiants.service";
import {ActivatedRoute} from "@angular/router";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit} from "../../models/Unit";
import {Activity} from "../../models/Activity";
import {Bloc} from "../../models/Bloc";
import {EventEmitter} from "events";


@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  @Output() myEvent = new EventEmitter();

  bloc1: Unit[] = new Array();
  bloc2: Unit[] = new Array();
  bloc3: Unit[] = new Array();

  listUE: Unit[] = new Array();
  matricule: string;

  lastChange : string;

  indexSectionStudent: number = 0;


  incrementUE : number = 0;
  incrementAA : number = 0;

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
    var bloc: Bloc;
    var year: number = new Date().getFullYear();
    var nameAA: string = "";
    var activity: Activity = null;
    var titleUnit : string = "";
    var compteurTest = 1;


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

            //Création des UE et AA et ajout dans une liste
            if(section.indexOf(datas)==0) {
              datas.forEach(data => {
                if (datas.indexOf(data) >= 4) {
                  data = "" + data;
                  dividedText = data.split(" ");
                  if (dividedText[2] == "UE") {
                    if (unit != null) this.listUE.push(unit);
                    dividedText.forEach(text => {
                      if (dividedText.indexOf(text) >= 4) {
                        nameUE += text + " ";
                      }
                    });

                    unit = {
                      code: dividedText[3],
                      title: nameUE,
                      section: this.listes.sections[this.indexSectionStudent],
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
                        section: this.listes.sections[this.indexSectionStudent]
                      }
                      nameAA = "";
                      if (unit != null) unit.activities.push(activity);
                    }
                  }
                }
                if(datas.lastIndexOf(data)==datas.length - 1)this.listUE.push(unit);
              })
            }
            //ATtribution des bloc d'apprentissage
            else if(section.indexOf(datas)==1){
              datas.forEach(data => {
                if (datas.indexOf(data) >= 4) {
                  data = "" + data;
                  if(data != "") {
                    if(this.listUE.length > this.incrementUE) {
                      if (data != "AcAp") {
                        dividedText = data.split(" ");
                        console.log(this.incrementUE);
                        console.log(this.listUE[this.incrementUE]);
                        if (dividedText[1] == "1B") {

                          this.listUE[this.incrementUE].bloc = Bloc.BLOC_1
                        } else if (dividedText[1] == "2B") {
                          //this.listUE[incrementUE].bloc = Bloc.BLOC_2
                        } else {
                          //this.listUE[incrementUE].bloc = Bloc.BLOC_3
                        }
                        dividedText = [];

                        this.incrementAA = 0;

                      } else {

                        this.listUE.forEach(ue => {
                          if (this.listUE.indexOf(ue) == this.incrementUE) {
                            ue.activities.forEach(activity => {
                              if (ue.activities.indexOf(activity) == this.incrementAA) {

                                activity.bloc = ue.bloc;
                                this.incrementAA++;

                              }
                              if (ue.activities.length <= this.incrementAA) {
                                this.incrementAA = 0;
                                this.incrementUE++;
                              }
                            });
                          }
                        });
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
    })

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
    this.lastChange = "";
    var btnAdd, btnRemove;
    btnAdd = document.getElementsByClassName("btnAdd");
    btnRemove = document.getElementsByClassName("btnRemove");

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

    this.lastChange = "UE "+this.listUE[index].code + " : "+this.listUE[index].title + " supprimée";
    btnAdd[index].style.display = "block";
    btnRemove[index].style.display = "none";

    console.log(this.lastChange);

  }
}