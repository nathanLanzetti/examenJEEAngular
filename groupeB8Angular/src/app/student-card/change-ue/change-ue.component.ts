import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentToDB } from 'src/app/models/Student';
import { StudentService } from 'src/app/repositories/student.service';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { Unit, UnitToDB } from '../../models/Unit';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';
import { jsPDF } from "jspdf";
import { fromBlocDBToDisplay } from 'src/app/models/Bloc';
import { fromSectionDBToDisplay } from 'src/app/models/Section';


@Component({
  selector: 'app-change-ue',
  templateUrl: './change-ue.component.html',
  styleUrls: ['./change-ue.component.css']
})
export class ChangeUEComponent implements OnInit, OnDestroy, OnChanges {

  ue: Unit;
  //listUE: Unit[] = new Array();
  //title: string = "Gestion 1 ";
  creditsTotal: number = 0
  @Input()
  summaryUnits: UnitToDB[] = []
  @Input()
  student: StudentToDB
  subscriptions: Subscription[] = []
  isVisible = false

  constructor(private studentService: StudentService, private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('data', this.student);
    // lorsque le component reçoit l'étudiant
    // son nombre de crédits dans son PAE est incrémenté
    if (changes.student !== undefined) {

      console.log("changes", changes);
      if (changes.student.previousValue === undefined) {
        this.student.units.forEach(unit => {
          this.creditsTotal += unit.creditsNumber
        })
      }
    }

  }

  ngOnInit(): void {
    //this.updateChange();
    this.subscribeToRemovedUnit()
    this.subscribeToAddedUnit()

  }

  subscribeToAddedUnit() {
    // s'abonne au service pour etre notifié lorsqu'un component ajoute une unité
    const sub = this.addedUnitService.unitsSubject.subscribe(unit => {
      // ajoute seulement si pas déjà présent dans la liste
      if (!this.summaryUnits.find(sumUnit => sumUnit.id === unit.id)) {
        // incrémente le compteur de crédit
        this.creditsTotal += unit.creditsNumber
        this.summaryUnits.push(unit);
      }
    })
    this.subscriptions.push(sub)
  }

  subscribeToRemovedUnit() {
    // s'abonne au service pour etre notifié lorsqu'un component supprime une unité
    const sub = this.removedUnitService.unitsSubject.subscribe(id => {
      this.summaryUnits = this.summaryUnits.filter(unit => {
        console.log(unit.creditsNumber);
        if (unit.id === id) this.creditsTotal -= unit.creditsNumber
        else return unit.id !== id
      })

    })
    this.subscriptions.push(sub)
  }

  // méthode qui permet d'éviter les fuites de mémoire lors de la destruction d'un component
  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  // Quand on clique sur le bouton "confirmer"
  onClickShowModal($event) {
    // ajoute les unités à l'étudiant
    this.student.units = this.summaryUnits
    // permet de cacher le modal
    this.isVisible = true
  }

  setVisibility($event) {
    this.isVisible = false
  }

}

