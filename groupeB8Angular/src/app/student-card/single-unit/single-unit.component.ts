import { Component, Input, OnInit } from '@angular/core';
import { UnitToDB } from 'src/app/models/Unit';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';

@Component({
  selector: 'app-single-unit',
  templateUrl: './single-unit.component.html',
  styleUrls: ['./single-unit.component.css']
})
export class SingleUnitComponent implements OnInit {

  @Input()
  unit: UnitToDB;
  @Input()
  unitsInPae: UnitToDB[];
  toAdd: boolean;

  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) {

  }

  ngOnInit(): void {
    this.checkUnitOperation()
  }

  checkUnitOperation() {
    console.log(this.unitsInPae);

    const unitExist = this.unitsInPae.find(tmpUnit => this.unit.code === tmpUnit.code)
    //console.log(unitExist);

    if (unitExist === undefined) {
      this.toAdd = true
      // console.log("weeeeeee");

    } else {
      this.toAdd = false
      // console.log("woooooooo");
    }
    //console.log(this.toAdd);

  }

  onClickManageUnit(event) {
    if (this.toAdd) {
      console.log("Adding unit");

      this.addedUnitService.addUnit(this.unit)
    } else {
      this.removedUnitService.removeUnit(this.unit)
    }
    this.toAdd = !this.toAdd

  }

}
