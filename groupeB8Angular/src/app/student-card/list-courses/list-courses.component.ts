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
    this.blocs = ["Bloc 1", "Bloc 2", "Bloc 3"]
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.student);
    if (changes.student.previousValue === undefined) {
      this.currentTab = convertBlocStringToNumber(this.student.bloc)
      console.log(`${this.currentTab} === ${convertBlocStringToNumber(this.student.bloc)}`);

    }
  }

  ngOnInit(): void {
    //this.hideTabs();
    //this.currentTab = convertBlocStringToNumber(this.student.bloc)
    this.filterUnitListByBloc(this.currentTab);
    const sub = this.unit.queryWithoutDuplicates()
      .subscribe(unit => {
        this.listUE = unit;
        this.listUE = this.listUE.filter(ue => ue.section == this.student.section);
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
    //this.currentTab = this.nextBlocIndex
    this.filterUnitListByNextBloc(this.nextBlocIndex)
    console.log(this.nextUnitsByBloc);
    console.log(this.nextBlocIndex);

    this.nextUnitsByBloc.forEach(unit => {

      this.addedUnitService.addUnit(unit)
    })
    //this.currentUnitsByBloc = []
    //console.log(this.nextUnitsByBloc);
  }

  onClickTab(event, index) {
    // console.log(`${event} : ${index}`);
    this.currentTab = index;
    this.filterUnitListByBloc(this.currentTab);
    // console.log(this.currentUnitsByBloc);
  }

  filterUnitListByBloc(blocIndex: number) {

    // console.log(this.currentTab);
    // console.log(this.student);

    // console.log(convertBlocNumberToDB(blocIndex));
    this.currentUnitsByBloc = this.listUE.filter(ue => ue.bloc == convertBlocNumberToDB(blocIndex));
  }

  filterUnitListByNextBloc(blocIndex: number) {

    // console.log(this.currentTab);
    // console.log(this.student);

    // console.log(convertBlocNumberToDB(blocIndex));
    this.nextUnitsByBloc = this.listUE.filter(ue => ue.bloc == convertBlocNumberToDB(blocIndex));
    //console.log(this.nextUnitsByBloc);

  }


}
