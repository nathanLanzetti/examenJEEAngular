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
  nextUnitsByBloc: UnitToDB[];
  @Input()
  indexToRemove: number
  toAdd: boolean;


  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(`${changes.indexToRemove.currentValue} === ? ${this.unit.id}`);
    // console.log(changes);
    // console.log(this.indexToRemove);
    //console.log(changes);
    //console.log(changes.nextUnitsByBloc);


    if (changes.indexToRemove !== undefined) {

      if (changes.indexToRemove.currentValue === this.unit.id) {
        this.toAdd = true
        this.currentIcon = faPlus
        //console.log("Changing stuff");

      }
    }

    // if (changes.indexToRemove.currentValue !== undefined) {


    // }

    if (changes.nextUnitsByBloc !== undefined) {
      //console.log(this.nextUnitsByBloc);

      //console.log("Heyyyyyy ooooooh");
      //console.log(this.nextUnitsByBloc.find(nextU => nextU.code === this.unit.code));

      if (this.nextUnitsByBloc.find(nextU => nextU.id === this.unit.id) !== undefined) {
        //console.log("Added units ");

        //console.log(this.nextUnitsByBloc.find(nextU => nextU.id === this.unit.id));

        this.toAdd = false
        this.currentIcon = faMinus
        //this.addedUnitService.addUnit(this.unit)
        //console.log("Adding unit form single : " + this.unit.code);
        //changes.nextUnitsByBloc.currentValue

      }
    }

    // }
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
