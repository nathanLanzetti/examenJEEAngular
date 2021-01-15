import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../repositories/student.service";
import {ActivatedRoute} from "@angular/router";
import {StudentToDB} from "../../models/Student";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['./manager-student.component.css']
})
export class ManagerStudentComponent implements OnInit {
  matricule : string;
  studentDisplay : StudentToDB;

  private subscriptions: Subscription[] = [];

  constructor(private student: StudentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>this.matricule=params.get('matricule')
    );
    this.subscriptions.push(this.student.getByMatricule(this.matricule).subscribe(student=> this.studentDisplay = student));
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

}
