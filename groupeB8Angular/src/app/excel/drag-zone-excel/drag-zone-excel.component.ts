import {Component, Input, OnInit} from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as xlsx from 'xlsx';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';
import {Bloc} from "../../models/Bloc";
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {Unit} from "../../models/Unit";
import {Activity} from "../../models/Activity";
import {Student} from "../../models/Student";

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
  fullname: [];
  bloc: [];
  year: number = new Date().getFullYear();
  unit : Unit[];
  creditValidated : number[];

  studentListCopied : StudentToDisplay[] = [];

  studentResultList : Student[] = [];
  studentResultListCopied : Student[] = [];

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
    alert("Lecture du fichier en cours");
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
      this.createStudentListWithResult();
      console.log(this.listes.studentResultList);
    };

    reader.readAsBinaryString(this.files[0]);

    alert("Lecture terminée");
  }


  //Obtenir Toutes les UEs du fichier Excel
  private getAllUE() {
    //Attribut
    var listStudentCopied: StudentToDisplay[] = this.listes.studentList;
    var unit: Unit = null;
    var dividedText: any[] = new Array();
    var nameUE: string = "";

    var nameAA: string = "";
    var activity: Activity = null;
    var isLastAA : boolean = false;

    var credit : number[] = new Array();
    var compteurCreditTable : number = 0;
    var compteurSection : number = 0;

    //Chaque feuilles Excel correspond à une section
    this.listes.data.forEach(section => {
      section.forEach(datas => {

        //Création des UE et AA et ajout dans une liste
        /**
         * Ligne 1 : Listes des UE et AA
         * Nous obtenons sur la première ligne différentes données utiles pour les UE et AA
         * UE : title / code / activities
         * AA : title
         * La section est déterminé en fonction du numéro de feuilles que l'on compare par après avec la liste de section.
         * L'année académique équivaut à l'année actuelle
         */
        if(section.indexOf(datas)==0) {
              datas.forEach(data => {
                //Les UE et AA ne commençant que sur la colonne E => Index est supérieur à 4
                if (datas.indexOf(data) >= 4) {
                  data = "" + data;
                  dividedText = data.split(" ");
                  /**Vérifier si UE ou AA grâce à la séparation du texte =>
                   * le troisième élément de l'attribut 'dividedText' est UE lorsqu'il s'agit d'une UE
                   **/
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
                      academicYear: this.year - 1 + "/" + this.year
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

                /**
                 * Si il s'agit de la dernière colonne => On ajoute l'UE dans la liste
                 * On fait une condition ici car les UE à plusieurs Activités vont s'ajouter dans la liste n fois
                 * (n correspond au nombre d'activités de l'UE)
                 */
                if(datas.lastIndexOf(data)==datas.length - 1)this.listUE.push(unit);
              })
            }
            //Attribution des bloc d'apprentissage
            /**
             * Ligne 2 : Tous les blocs des UE et AA
             * On gère l'attribution des blocs aux UE et AA de la liste précédemment créée
             */
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
        /**
         * Ligne 3 : Ligne des crédits des UE et AA
         */
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

  //Création d'une liste d'étudiant (Simplement pour l'affichage => table-student.component.html)
  createStudentList() {
    this.students = []
    this.matricule = [];
    this.fullname = [];
    this.bloc = [];
    this.generateDataStudentDisplay();
    let cpt = this.matricule.length;
    let etudiant: StudentToDisplay;

    //création des étudiants
    for (let i: number = 0; i < cpt; i++) {
      // @ts-ignore
      etudiant = {
        matricule: this.matricule[i],
        fullname: this.fullname[i],
        bloc: this.bloc[i]
      };
      this.students.push(etudiant);

    }
    this.studentListCopied = this.students;

    this.attributeSection(this.students,this.studentListCopied);

    this.listes.studentList = this.students;
  }

  //Création d'une liste d'étudiant => DB
  createStudentListWithResult() {
    this.studentResultList = []
    this.matricule = [];
    this.fullname = [];
    this.bloc = [];
    this.creditValidated = []
    this.generateDataStudentResult();
    let cpt = this.matricule.length;
    let etudiantResult: Student;

    for (let i: number = 0; i < cpt; i++) {
      // @ts-ignore
      etudiantResult = {
        matricule: this.matricule[i],
        fullname: this.fullname[i],
        bloc: this.bloc[i],
        academicYear : this.year - 1 + "/" + this.year,
        units : new Array(),
        creditsNumber : this.creditValidated[i]
      };
      this.studentResultList.push(etudiantResult);
      this.studentResultListCopied = this.studentResultList;

      this.attributeSection(this.studentResultList,this.studentResultListCopied);
      this.listes.studentResultList = this.studentResultList;
    }
  }


  generateDataStudentDisplay(){
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
    this.listes.data.forEach(section=>{
      section.forEach(data =>{
        data.forEach(n =>{
          if(data.indexOf(n)==1 && n!="Etudiants"){

            // @ts-ignore
            this.fullname.push(n);
          }
        })
      })
    });
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


  private generateDataStudentResult() {
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
    this.listes.data.forEach(section=>{
      section.forEach(data =>{
        data.forEach(n =>{
          if(data.indexOf(n)==1 && n!="Etudiants"){

            // @ts-ignore
            this.fullname.push(n);
          }
        })
      })
    });
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

    this.listes.data.forEach((section=>{
      this.creditValidated.slice(this.creditValidated.length - 1,1);
      section.forEach(datas=>{
        if(section.indexOf(datas)>2){
          console.log(section.indexOf(datas) + " : " + datas[datas.length-2]);
          this.creditValidated.push(datas[datas.length-2]);
        }
      })
    }))
  }


  attributeSection(studentList,studentListCopied) {
    let increment : number = 0;

    studentList.forEach(student=>{
      if(studentList.indexOf(student)==0){
        student.section = this.listes.sections[increment];
      }
      else{
        studentListCopied.forEach(studentCopied=>{
          if(studentList.indexOf(student)==studentListCopied.indexOf(studentCopied)+1){
            if(student.fullname < studentCopied.fullname){
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
