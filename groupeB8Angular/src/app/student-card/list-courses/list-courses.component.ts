import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListesEtudiantsService } from "../../services/listes-etudiants.service";
import { ActivatedRoute } from "@angular/router";
import { StudentToDisplay } from "../../models/StudentsToDisplay";
import { Unit, UnitToDB } from "../../models/Unit";
import { Activity } from "../../models/Activity";
import { Bloc, convertBlocNumberToDB, convertBlocStringToNumber, fromBlocDBToDisplay } from "../../models/Bloc";
import { EventEmitter } from "events";
import { Section } from "../../models/Section";
import { UnitService } from "../../repositories/unit.service";
import { Subscription } from "rxjs";
import { StudentToDB } from "../../models/Student";
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { AddedUnitService } from 'src/app/services/added-unit.service';


@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit, OnChanges, OnDestroy {

  credits: number;
  currentTab: number = 0;
  indexToRemove: number
  nextBlocIndex: number

  currentUnitsByBloc: UnitToDB[] = new Array()
  nextUnitsByBloc: UnitToDB[] = new Array()
  blocs: string[] = new Array();


  ueTmp: UnitToDB = null;
  listUE: UnitToDB[] = new Array();
  matricule: string;
  sectionStudent;
  colorArray = { "ASSISTANT_E_DE_DIRECTION": "#BE8CF3", "INFORMATIQUE_DE_GESTION": "#417EBF", "COMPTABILITE": "#C95511" } // Purple, Blue, Orange


  lastChange: string;

  indexSectionStudent: number = 0;


  incrementUE: number = 0;
  incrementAA: number = 0;

  @Input() student: StudentToDB;

  private subscription: Subscription[] = [];

  constructor(private route: ActivatedRoute, private listes: ListesEtudiantsService,
    private unit: UnitService, private removedUnitService: RemovedUnitService, private addedUnitService: AddedUnitService) {
    // initialise la liste de bloc
    this.blocs = ["Bloc 1", "Bloc 2", "Bloc 3"]
  }

  ngOnChanges(changes: SimpleChanges): void {
    // convertit la valeur du bloc en nombre pour changer de tab
    if (changes.student.previousValue === undefined) {
      this.currentTab = convertBlocStringToNumber(this.student.bloc)
      //console.log(`${this.currentTab} === ${convertBlocStringToNumber(this.student.bloc)}`);

    }
  }

  ngOnInit(): void {
    // filtre les unités par le bloc de l'étudiant
    this.filterUnitListByBloc(this.currentTab);
    // récupère à patir de la BD toutes les UE (sans doublons)
    const sub = this.unit.queryWithoutDuplicates()
      .subscribe(unit => {
        this.listUE = unit;
        // UE filtré en fct de la section
        this.listUE = this.listUE.filter(ue => ue.section == this.student.section);
        // iste UE ordonné 
        this.listUE = this.listUE.sort(function (ueA, ueB) {
          if (ueA.code > ueB.code) {
            return 1;
          }
          else
            return -1
        });
        this.filterUnitListByBloc(this.currentTab);
      });
    this.subscription.push(sub);
    // component notifié quand une unité a été enlevé
    const rmvdUnitSub = this.removedUnitService.unitsSubject.subscribe(id => {
      this.indexToRemove = id
      console.log(`Index to remove : ${this.indexToRemove}`);

    })
    this.subscription.push(rmvdUnitSub)
    this.getNextIndex()
    console.log(this.listUE);
  }

  ngOnDestroy(): void {
    for (let i = this.subscription.length - 1; i >= 0; i--) {
      const subscription = this.subscription[i];
      subscription && subscription.unsubscribe();
      this.subscription.pop();
    }
  }

  // donne nom au bouton en fonction du bloc
  getNextBlocName(): string {
    switch (this.student.bloc) {
      case "BLOC_1":
        return "du bloc 2"
        break;
      case "BLOC_2":
        return "du bloc 3"
        break;
      case "BLOC_3":
        return "restants"

      default:
        break;
    }
  }

  // change l'index en fonction du Bloc (n+1)
  getNextIndex() {
    switch (this.student.bloc) {
      case "BLOC_1":
        this.nextBlocIndex = 1
        break;
      case "BLOC_2":
        this.nextBlocIndex = 2
        break;
      case "BLOC_3":
        this.nextBlocIndex = 2

      default:
        break;
    }
    console.log(this.nextBlocIndex);

  }

  addAllUnitNextBloc($event) {
    // filtre les unités en fct de l'index du bloc suivant
    this.filterUnitListByNextBloc(this.nextBlocIndex)
    console.log(this.nextUnitsByBloc);
    console.log(this.nextBlocIndex);

    // notifie tous les observers qu'une unité a été ajouté
    this.nextUnitsByBloc.forEach(unit => {
      this.addedUnitService.addUnit(unit)
    })
  }

  // click sur Tab
  onClickTab(event, index) {
    // change l'index de la tab sélectionné
    this.currentTab = index;
    this.filterUnitListByBloc(this.currentTab);
  }

  // filtre les unités du bloc courant
  filterUnitListByBloc(blocIndex: number) {
    this.currentUnitsByBloc = this.listUE.filter(ue => ue.bloc == convertBlocNumberToDB(blocIndex));
  }

  // filtre les unités du bloc suivant
  filterUnitListByNextBloc(blocIndex: number) {
    this.nextUnitsByBloc = this.listUE.filter(ue => ue.bloc == convertBlocNumberToDB(blocIndex));
  }


}
