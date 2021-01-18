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


  constructor(private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) { }

  ngOnChanges(changes: SimpleChanges): void {

    // si une unité a été retiré
    if (changes.indexToRemove !== undefined) {
      if (changes.indexToRemove.currentValue === this.unit.id) {
        this.toAdd = true
        this.currentIcon = faPlus
      }
    }
    // change le toAdd des unités qui sont ajouté via le bouton "Ajouter UE du bloc suivant"
    if (changes.nextUnitsByBloc !== undefined) {
      if (this.nextUnitsByBloc.find(nextU => nextU.id === this.unit.id) !== undefined) {
        this.toAdd = false
        this.currentIcon = faMinus
      }
    }

  }

  ngOnInit(): void {
    this.checkUnitOperation()
  }

  checkUnitOperation() {
    // si l'unité est dans le pae, on change le toAdd => ! et le style
    const unitExist = this.unitsInPae.find(tmpUnit => this.unit.code === tmpUnit.code)
    if (unitExist === undefined) {
      this.toAdd = true
      this.currentIcon = faPlus
    } else {
      this.toAdd = false
      this.currentIcon = faMinus
    }
  }

  // quand on click sur le bouton + / -
  onClickManageUnit(event) {
    // en fct de l'attribut toAdd, on ajoute ou retire une unité
    // on change l'icone et le style aussi
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
