import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit, UnitToDB } from '../models/Unit';

@Injectable({
  providedIn: 'root'
})
export class RemovedUnitService {

  // Observable qui envoie une unité supprimé aux components abonnés au subject
  unitsSubject = new Subject<number>();

  removeUnit(unit: UnitToDB) {
    this.unitsSubject.next(unit.id)
  }

  constructor() { }
}
