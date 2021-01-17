import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UnitToDB } from 'src/app/models/Unit';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-unit',
  templateUrl: './single-unit.component.html',
  styleUrls: ['./single-unit.component.css']
})
export class SingleUnitComponent implements OnInit, OnDestroy {

  faPlus = faPlus
  faMinus = faMinus
  currentIcon = null
  @Input()
  unit: UnitToDB;
  @Input()
  unitsInPae: UnitToDB[];
  toAdd: boolean;
  subscriptions: Subscription[] = []

  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) {

  }

  ngOnInit(): void {
    this.checkUnitOperation()
    // const sub = this.removedUnitService.unitsSubject.subscribe(id => {
    //   if (id === this.unit.id) {
    //     this.toAdd = true
    //     this.currentIcon = faPlus
    //   }
    // })
    // this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  checkUnitOperation() {
    console.log(this.unitsInPae);

    const unitExist = this.unitsInPae.find(tmpUnit => this.unit.code === tmpUnit.code)
    //console.log(unitExist);

    if (unitExist === undefined) {
      this.toAdd = true
      this.currentIcon = faPlus
      // console.log("weeeeeee");

    } else {
      this.toAdd = false
      this.currentIcon = faMinus

      // console.log("woooooooo");
    }
    //console.log(this.toAdd);

  }

  onClickManageUnit(event) {
    if (this.toAdd) {
      console.log("Adding unit");
      this.currentIcon = faMinus
      this.addedUnitService.addUnit(this.unit)
    } else {
      this.currentIcon = faPlus
      this.removedUnitService.removeUnit(this.unit)
    }
    this.toAdd = !this.toAdd

  }

}
