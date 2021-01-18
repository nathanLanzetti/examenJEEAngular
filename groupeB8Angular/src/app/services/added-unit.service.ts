import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit, UnitToDB } from '../models/Unit';

@Injectable({
  providedIn: 'root'
})
export class AddedUnitService {

  // Observable qui envoie une unit ajouté aux components abonnés au subject

  unitsSubject = new Subject<UnitToDB>();

  addUnit(unit: UnitToDB) {
    this.unitsSubject.next(unit)
  }

  constructor() { }
}
