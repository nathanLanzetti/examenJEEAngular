import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class SingleUnitComponent implements OnInit, OnChanges {

  faPlus = faPlus
  faMinus = faMinus
  currentIcon = null
  @Input()
  unit: UnitToDB;
  @Input()
  unitsInPae: UnitToDB[];
  @Input()
  indexToRemove: number
  toAdd: boolean;


  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`${changes.indexToRemove.currentValue} === ? ${this.unit.id}`);
    console.log(changes);

    if (changes.indexToRemove.currentValue === this.unit.id) {
      this.toAdd = true
      this.currentIcon = faPlus
      console.log("Changing stuff");

    }
  }

  ngOnInit(): void {
    this.checkUnitOperation()

  }

  checkUnitOperation() {
    //console.log(this.unitsInPae);

    const unitExist = this.unitsInPae.find(tmpUnit => this.unit.code === tmpUnit.code)

    if (unitExist === undefined) {
      this.toAdd = true
      this.currentIcon = faPlus
    } else {
      this.toAdd = false
      this.currentIcon = faMinus
    }

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
