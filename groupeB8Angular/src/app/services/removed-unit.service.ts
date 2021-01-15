import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit, UnitToDB } from '../models/Unit';

@Injectable({
  providedIn: 'root'
})
export class RemovedUnitService {

  unitsSubject = new Subject<number>();

  // emitUnitsSubject(unit: Unit) {
  //   this.unitsSubject.next();
  // }

  removeUnit(unit: UnitToDB) {
    this.unitsSubject.next(unit.id)
  }

  constructor() { }
}
