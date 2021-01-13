import {Component, Input, OnInit} from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as xlsx from 'xlsx';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';
import {Bloc} from "../../models/Bloc";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit} from "../../models/Unit";
import {Activity} from "../../models/Activity";

@Component({
  selector: 'app-drag-zone-excel',
  templateUrl: './drag-zone-excel.component.html',
  styleUrls: ['./drag-zone-excel.component.css']
})
export class DragZoneExcelComponent implements OnInit {
  faUpload = faUpload
  files: File[] = [];
  data: [][];

  @Input() students: StudentToDisplay[] = []
  listUE: Unit[] = [];
  matricule: [];
  firstname: [];
  name: [];
  bloc: [];

  studentListCopied : StudentToDisplay[] = [];

  incrementUE : number = 0;
  incrementAA : number = 0;

  dataList : [] = [];
  constructor(private listes: ListesEtudiantsService) { }

  ngOnInit(): void {
  }

  onClickReadFile(event) {
    console.log("lol");

  }

  onSelect(event: any) {
    console.log(event);
    this.files = []
    this.files.push(...event.addedFiles);

    const target: DataTransfer = <DataTransfer>(event.target);
    //if (this.verifyExtension() == false) return;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: xlsx.WorkBook = xlsx.read(bstr, { type: 'binary' });
      const wsEtudiants: string = wb.SheetNames[0];
      const ws: xlsx.WorkSheet = wb.Sheets[wsEtudiants];
      let wsNames: string[] = [];

      console.log(ws);
      this.data = (xlsx.utils.sheet_to_json(ws, { header: 1 }));
      const jsonData = wb.SheetNames.reduce((initial, name) => {
        const sheet = wb.Sheets[name];
        wsNames.push(name);
        initial[name] = xlsx.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      console.log(wsNames);
      let excelData: [][]
      wsNames.forEach(wsName => {
        const ws: xlsx.WorkSheet = wb.Sheets[wsName];
        excelData = (xlsx.utils.sheet_to_json(ws, { header: 1 }));
        console.log(excelData);
        this.listes.addDataList(excelData);
        this.listes.sections = wsNames;
      })
      this.getAllUE();
      console.log(this.listes.listUE);
      this.createStudentList();
      console.log(this.listes.studentList);
    };

    reader.readAsBinaryString(this.files[0]);

  }


  //Obtenir Toutes les UEs
  private getAllUE() {
    //Attribut

    var listStudentCopied: StudentToDisplay[] = this.listes.studentList;
    var unit: Unit = null;
    var dividedText: any[] = new Array();
    var nameUE: string = "";
    var year: number = new Date().getFullYear();
    var nameAA: string = "";
    var activity: Activity = null;
    var isLastAA : boolean = false;

    var credit : number[] = new Array();
    var compteurCreditTable : number = 0;
    var compteurSection : number = 0;

    this.listes.data.forEach(section => {
      section.forEach(datas => {

            //Création des UE et AA et ajout dans une liste
            if(section.indexOf(datas)==0) {
              datas.forEach(data => {
                if (datas.indexOf(data) >= 4) {
                  data = "" + data;
                  dividedText = data.split(" ");
                  if (dividedText[2] == "UE") {
                    if (unit != null){
                      this.listUE.push(unit);
                    }
                    dividedText.forEach(text => {
                      if (dividedText.indexOf(text) >= 4) {
                        nameUE += text + " ";
                      }
                    });
                    unit = {
                      code: dividedText[3],
                      title: nameUE,
                      section: this.listes.sections[compteurSection],
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
                        section: this.listes.sections[compteurSection]
                      }
                      nameAA = "";
                      if (unit != null) unit.activities.push(activity);
                    }
                  }
                }
                if(datas.lastIndexOf(data)==datas.length - 1)this.listUE.push(unit);
              })
            }
            //Attribution des bloc d'apprentissage
            else if(section.indexOf(datas)==1){
              unit = null;
              this.incrementAA = 0;
              this.incrementUE = 0;
              isLastAA = false;
              datas.forEach(data => {
                if (datas.indexOf(data) >= 4) {
                  data = "" + data;
                  if(this.listUE.length >= this.incrementUE) {
                    if (data != "AcAp") {
                      if(isLastAA == true){
                        isLastAA = false;
                        this.incrementUE++;
                      }
                      dividedText = data.split(" ");
                      if (dividedText[1] == "1B") {
                        this.listUE[this.incrementUE].bloc = Bloc.BLOC_1
                      } else if (dividedText[1] == "2B") {
                        this.listUE[this.incrementUE].bloc = Bloc.BLOC_2
                      } else {
                        this.listUE[this.incrementUE].bloc = Bloc.BLOC_3
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
                            if (ue.activities.length == this.incrementAA) {
                              isLastAA = true;
                              this.incrementAA = 0;
                            }
                          });
                        }
                      });
                    }
                  }
                }
              });
            }

            //Attribution des crédits aux AA et UE
            else if(section.indexOf(datas)==2){
              this.incrementAA = 0;
              this.incrementUE = 0;
              datas.forEach(data => {
                if(data !=" ")credit.push(data);
              });

              this.listUE.forEach(ue=>{
                ue.creditsNumber = credit[compteurCreditTable];
                compteurCreditTable++;
                ue.activities.forEach(activity=>{
                  activity.creditsNumber = credit[compteurCreditTable];
                  compteurCreditTable++;
                })
              })

              this.listes.listUE.push(this.listUE);
              this.listUE = [];

              compteurSection++;
            }


        });
    })
  }

  createStudentList() {
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

    for (let i: number = 0; i < cpt; i++) {
      // @ts-ignore
      etudiant = {
        matricule: this.matricule[i],
        lastname: this.name[i],
        firstname: this.firstname[i],
        bloc: this.bloc[i]
      };
      this.students.push(etudiant);
      this.studentListCopied = this.students;

      this.attributeSection();

      this.listes.studentList = this.students;
    }
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
  }

  attributeSection() {
    let increment : number = 0;

    this.students.forEach(student=>{
      if(this.students.indexOf(student)==0){
        student.section = this.listes.sections[increment];
      }
      else{
        this.studentListCopied.forEach(studentCopied=>{
          if(this.students.indexOf(student)==this.studentListCopied.indexOf(studentCopied)+1){
            if(student.lastname < studentCopied.lastname){
              increment++;
            }
            student.section = this.listes.sections[increment];
          }
        })
      }
    })
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  verifyExtension() {
    var isExcelFile = 1;
    if (this.files == null) isExcelFile = 0;
    this.files.forEach(file => {
      if (file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2) != "xlsx") {
        isExcelFile = 0;
      };
    });
    return (isExcelFile == 1);

  }
}
