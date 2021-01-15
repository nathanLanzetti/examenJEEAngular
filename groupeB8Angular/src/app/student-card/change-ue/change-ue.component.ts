import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { Unit, UnitToDB } from '../../models/Unit';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-change-ue',
  templateUrl: './change-ue.component.html',
  styleUrls: ['./change-ue.component.css']
})
export class ChangeUEComponent implements OnInit, OnDestroy {

  ue: Unit;
  //listUE: Unit[] = new Array();
  //title: string = "Gestion 1 ";
  summaryUnits: UnitToDB[] = []
  subscriptions: Subscription[] = []

  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) { }

  ngOnInit(): void {
    //this.updateChange();
    this.subscribeToRemovedUnit()
    this.subscribeToAddedUnit()
  }

  subscribeToAddedUnit() {
    const sub = this.addedUnitService.unitsSubject.subscribe(unit => {
      console.log(`Adding Unit .. ${unit}`);
      this.summaryUnits.push(unit);
      console.log(this.summaryUnits);
    })
    this.subscriptions.push(sub)
  }

  subscribeToRemovedUnit() {
    const sub = this.removedUnitService.unitsSubject.subscribe(id => {
      console.log(`Removing Unit .. ${id}`);

      this.summaryUnits = this.summaryUnits.filter(unit => {
        return unit.id !== id
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

}

