import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentToDB } from 'src/app/models/Student';
import { StudentService } from 'src/app/repositories/student.service';
import { jsPDF } from "jspdf";
import { fromBlocDBToDisplay } from 'src/app/models/Bloc';
import { fromSectionDBToDisplay } from 'src/app/models/Section';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() isVisible: boolean
  @Input() student: StudentToDB
  @Input() creditsTotal: number
  @Output() setVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>()
  @Output() onSuccessUpdateAndSave: EventEmitter<Boolean> = new EventEmitter<Boolean>()
  confirmationMsg: string = ""
  subscriptions: Subscription[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  // affiche un msg de confirmation en fct du nombre de crédit et du bloc de l'étudiant
  // voir document M. Duroisin
  getConfirmationMsg(): string {
    console.log(this.student.creditsNumber, this.creditsTotal);
    let cantHave55Credits = false
    if (this.student.bloc === "BLOC_1") {

      if (this.student.creditsNumber < 30 && this.student.units.find(unit => unit.bloc === "BLOC_2")) {
        cantHave55Credits = true
        this.confirmationMsg = "Cet étudiant du bloc 1 a réussi moins de 30 crédits. Etes-vous sur de vouloir lui accorder des unités du bloc 2 ? "
      } else if (this.student.creditsNumber >= 30 && this.student.creditsNumber < 45 && this.creditsTotal >= 60) {
        this.confirmationMsg = "Cet étudiant du bloc 1 a réussi moins de 45 crédits. Etes-vous sur de vouloir lui accorder plus de 60 crédits ? "
      }
    }
    // if (this.student.creditsNumber === 60 && this.creditsTotal !== 60 && this.student.bloc !== "BLOC_3") {

    //   this.confirmationMsg = "Cet étudiant a réussi 60 crédits. Celui-ci devrait se voir accorder les 60 crédits du bloc suivant. Etes-vous sur de vouloir continuer ? "
    // }
    if (!cantHave55Credits && this.creditsTotal < 55) {
      this.confirmationMsg += "\nCet étudiant a moins de 55 crédits dans son PAE. Etes-vous sur de vouloir continuer ?"
    }
    return this.confirmationMsg
  }

  updateAndSaveToPdf($event) {
    // ferme le modal
    this.setVisibility.emit(false)
    this.updateStudent()
    this.saveToPdf()
  }

  saveToPdf() {
    // crée le doc
    const doc = new jsPDF();
    // doc.setFontSize() configure la taille de la police
    // doc.text() crée un nouveau paragraphe avec x, y pour positionner le texte
    doc.setFontSize(22)
    doc.text(`PAE de ${this.student.fullname}, ${this.student.matricule}`, 20, 10)

    doc.setFontSize(16)
    doc.text(`Etudiant en ${fromBlocDBToDisplay(this.student.bloc)} ${fromSectionDBToDisplay(this.student.section)}, `, 20, 20)

    doc.setFontSize(14)
    doc.text(`Crédits totaux : ${this.creditsTotal} `, 20, 30)

    let y = 40

    this.student.units.forEach(unit => {
      doc.setFontSize(13)
      doc.text(`UE : ${unit.code} ${unit.title} / ${unit.creditsNumber} crédits`, 20, y)
      y += 7
      unit.activities.forEach(activity => {
        doc.setFontSize(11)
        doc.text(` - AA : ${activity.title} / ${activity.creditsNumber} crédits`, 30, y)
        y += 5
      })
    })
    // Enregistre le document chez le client
    doc.save(`${this.student.matricule.toLowerCase()}-pae.pdf`);
  }

  // CLick sur annuler
  closeModal($event) {
    this.setVisibility.emit(false)
  }

  updateStudent() {
    // modifie l'étudiant avec sa nouvelle liste de PAE
    const sub = this.studentService
      .put(this.student)
      .subscribe()
    this.subscriptions.push(sub)
  }

}
