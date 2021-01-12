import { Component, OnInit } from '@angular/core';
import {ListesEtudiantsService} from "../../services/listes-etudiants.service";
import {ActivatedRoute} from "@angular/router";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit} from "../../models/Unit";
import {Section} from "../../models/Section";

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  bloc1 : any[] = new Array();
  bloc2 : any[] = new Array();
  bloc3 : any[] = new Array();

  listUE : any[] = new Array();
  matricule : string;
  constructor(private route:ActivatedRoute , private listes : ListesEtudiantsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>this.matricule=params.get('matricule')
    );
    this.getAllUE();
    this.hideTabs();
    this.getListUE();
  }

  private hideTabs() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
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
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(bloc).style.display = "block";
    evt.currentTarget.className += " active";
  }

  getListUE(){
    this.listes.data.forEach(section=>{
      section.forEach(datas=>{
        if(datas[2]==this.matricule){
          datas.forEach(data=>{

          })
        }
      })
    })
  }

  private getAllUE() {
    //Attribut
    var indexSectionStudent : number = 0;
    var listStudentCopied : StudentToDisplay[] = this.listes.studentList;
    var unit : Unit = null;
    var dividedText : any[] = new Array();
    var nameUE : string = "";
    var bloc : number = 0;
   var year : number = new Date().getFullYear();


    //Déterminer la section de l'étudiant
    this.listes.studentList.forEach(student=>{
      if(student.matricule == this.matricule){
        indexSectionStudent = this.listes.sections.indexOf(student.section);
      }
    })


    this.listes.data.forEach(section=>{
      if(this.listes.data.indexOf(section) == indexSectionStudent){
        section.forEach(datas=>{
          if(section.indexOf(datas)<3){
            datas.forEach(data=>{
              if(datas.indexOf(data)>=5) {
                switch (indexSectionStudent) {
                  case 0 :
                    data = ""+data;
                    dividedText = data.split(" ");
                    if(dividedText[2] == "UE"){
                      if(unit != null) this.listUE.push(unit);
                      dividedText.forEach(text=>{
                        if(dividedText.indexOf(text)>=4){
                          nameUE+=text+" ";
                        }
                        else if(dividedText.indexOf(text)==0){
                          bloc = text[2];
                        }
                      });

                      unit = {
                        code : dividedText[3],
                        title : nameUE,
                        section : indexSectionStudent + 1,
                        bloc : bloc,

                        academicYear: year-1+"/"+year
                      }
                      nameUE = "";
                    }
                    else{

                    }

                    break;

                  default:
                    break;

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


}
