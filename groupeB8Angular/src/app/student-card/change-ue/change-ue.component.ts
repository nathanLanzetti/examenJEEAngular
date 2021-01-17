import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentToDB } from 'src/app/models/Student';
import { StudentService } from 'src/app/repositories/student.service';
import { AddedUnitService } from 'src/app/services/added-unit.service';
import { RemovedUnitService } from 'src/app/services/removed-unit.service';
import { Unit, UnitToDB } from '../../models/Unit';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

  constructor(private studentService: StudentService, private addedUnitService: AddedUnitService, private removedUnitService: RemovedUnitService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('data', this.student);

    console.log("changes", changes);
    if (changes.student.previousValue === undefined) {
      this.student.units.forEach(unit => {
        this.creditsTotal += unit.creditsNumber
      })
    }

  }

  ngOnInit(): void {
    //this.updateChange();
    this.subscribeToRemovedUnit()
    this.subscribeToAddedUnit()

  }

  subscribeToAddedUnit() {
    const sub = this.addedUnitService.unitsSubject.subscribe(unit => {
      if (!this.summaryUnits.find(sumUnit => sumUnit.id === unit.id)) {
        this.creditsTotal += unit.creditsNumber
        this.summaryUnits.push(unit);
      }
    })
    this.subscriptions.push(sub)
  }

  subscribeToRemovedUnit() {
    const sub = this.removedUnitService.unitsSubject.subscribe(id => {
      console.log(`Removing Unit .. ${id}`);

      this.summaryUnits = this.summaryUnits.filter(unit => {
        console.log(unit.creditsNumber);
        if (unit.id === id) this.creditsTotal -= unit.creditsNumber
        else return unit.id !== id
      })
      console.log("filter updated");

      console.log(this.summaryUnits);

    })
    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  updateStudent($event) {
    // this.student.units = this.summaryUnits
    // const sub = this.studentService
    //   .put(this.student)
    //   .subscribe()
    // this.subscriptions.push(sub)
    // Crée un document PDF
    const doc = new jsPDF();
    // Titre et information de l'étudiant 
    doc.setFontSize(22)
    //doc.text(20, 20, )
    doc.text(`PAE de ${this.student.fullname}, ${this.student.matricule}`, 20, 10)

    doc.setFontSize(16)
    doc.text(`Etudiant en ${fromBlocDBToDisplay(this.student.bloc)} ${fromSectionDBToDisplay(this.student.section)}, `, 20, 20)

    doc.setFontSize(14)
    doc.text(`Crédits totaux : ${this.creditsTotal} `, 20, 30)

    let y = 40

    this.summaryUnits.forEach(unit => {
      doc.setFontSize(13)
      doc.text(`UE : ${unit.code} ${unit.title} / ${unit.creditsNumber} crédits`, 20, y)
      y += 7
      unit.activities.forEach(activity => {
        doc.setFontSize(11)
        doc.text(` - AA : ${activity.title} / ${activity.creditsNumber} crédits`, 30, y)
        y += 5
      })
    })
    //doc.text("Hello world!", 10, 10);
    doc.save(`${this.student.matricule.toLowerCase()}-pae.pdf`);
  }

}

