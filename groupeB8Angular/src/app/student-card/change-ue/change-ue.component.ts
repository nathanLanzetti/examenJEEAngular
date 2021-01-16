import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentToDB } from 'src/app/models/Student';
import { StudentService } from 'src/app/repositories/student.service';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { Unit, UnitToDB } from '../../models/Unit';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-change-ue',
  templateUrl: './change-ue.component.html',
  styleUrls: ['./change-ue.component.css']
})
export class ChangeUEComponent implements OnInit, OnDestroy, OnChanges {

  ue: Unit;
  //listUE: Unit[] = new Array();
  //title: string = "Gestion 1 ";
  creditsTotal: number = 0
  @Input()
  summaryUnits: UnitToDB[] = []
  @Input()
  student: StudentToDB
  subscriptions: Subscription[] = []

  constructor(private studentService: StudentService, private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('data', this.student);

    console.log("changes", changes);
    if (changes.student.previousValue === undefined) {
      this.student.units.forEach(unit => {
        this.creditsTotal += unit.creditsNumber
      })
    }

  }

  ngOnInit(): void {
    //this.updateChange();
    this.subscribeToRemovedUnit()
    this.subscribeToAddedUnit()

  }

  subscribeToAddedUnit() {
    const sub = this.addedUnitService.unitsSubject.subscribe(unit => {
      console.log(`Adding Unit .. ${unit}`);
      console.log(unit.creditsNumber);
      this.creditsTotal += unit.creditsNumber
      this.summaryUnits.push(unit);
      console.log(this.summaryUnits);
    })
    this.subscriptions.push(sub)
  }

  subscribeToRemovedUnit() {
    const sub = this.removedUnitService.unitsSubject.subscribe(id => {
      console.log(`Removing Unit .. ${id}`);

      this.summaryUnits = this.summaryUnits.filter(unit => {
        console.log(unit.creditsNumber);
        if (unit.id === id) this.creditsTotal -= unit.creditsNumber
        else return unit.id !== id
      })
      console.log("filter updated");

      console.log(this.summaryUnits);

    })
    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  updateStudent($event) {
    this.student.units = this.summaryUnits
    const sub = this.studentService
      .put(this.student)
      .subscribe()
    this.subscriptions.push(sub)
  }
  // updateChange() {
  //   //var title: string[] = this
  //   this.liste.listUE.forEach(ueselect => {
  //     if (ueselect.title == this.title) {
  //       this.ue = ueselect;
  //       console.log(this.title);
  //     }
  //     console.log(ueselect);
  //   });
  //   return this.ue;
  // }

  // calculateTotalCredits(): number {
  //   //const { creditsNumber } = this.summaryUnits
  //   this.summaryUnits.reduce((0, {creditsNumber}) => acc + creditsNumber)
  // }
}

