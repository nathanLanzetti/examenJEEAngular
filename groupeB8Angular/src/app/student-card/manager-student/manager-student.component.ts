import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from "../../repositories/student.service";
import { ActivatedRoute } from "@angular/router";
import { StudentToDB } from "../../models/Student";
import { Subscription } from "rxjs";
import { Section } from "../../models/Section";

@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {
  matricule: string;
  student: StudentToDB;

  private subscriptions: Subscription[] = [];

  constructor(private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // récupère paramètre de l'url
    this.route.paramMap.subscribe(
      params => this.matricule = params.get('matricule')
    );
    console.log(this.matricule);
    // récupère un étudiant en fct de son matricule
    const sub = this.studentService
      .getByMatricule(this.matricule)
      .subscribe(student => {
        this.student = student;
        console.log(this.student)
      })
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

}
