import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit, UnitToDB } from '../models/Unit';

@Injectable({
  providedIn: 'root'
})
export class AddedUnitService {

  unitsSubject = new Subject<UnitToDB>();

  // emitUnitsSubject(unit: Unit) {
  //   this.unitsSubject.next();
  // }

  addUnit(unit: UnitToDB) {
    this.unitsSubject.next(unit)
  }

  constructor() { }
}
