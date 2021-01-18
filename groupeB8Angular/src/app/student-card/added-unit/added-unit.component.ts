import { Component, Input, OnInit } from '@angular/core';
import { UnitToDB } from 'src/app/models/Unit';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';

@Component({
  selector: 'app-added-unit',
  templateUrl: './added-unit.component.html',
  styleUrls: ['./added-unit.component.css']
})
export class AddedUnitComponent implements OnInit {

  // Component qui contient une unité, affiché dans le résumé du PAE

  @Input()
  unit: UnitToDB
  constructor(private removedUnitService: RemovedUnitService) { }

  ngOnInit(): void {
  }

  // Click sur le bouton delete, renvoie l'unité supprimé à tous les observers
  removeUnit($event) {
    console.log(this.unit.id);
    this.removedUnitService.removeUnit(this.unit)
  }

}
