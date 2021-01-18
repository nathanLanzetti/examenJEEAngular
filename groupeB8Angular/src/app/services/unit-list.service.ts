import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit } from '../models/Unit';

@Injectable({
  providedIn: 'root'
})
export class UnitListService {

  unitsSubject = new Subject<Unit>();

  emitUnitsSubject(unit: Unit) {
    this.unitsSubject.next();
  }

  addUnit(unit: Unit) {
    this.unitsSubject.next(unit)
  }

  removeUnit(unit: Unit) {
    this.unitsSubject.next(unit)
    //this.unitsSubject.
  }

  constructor() { }
}
