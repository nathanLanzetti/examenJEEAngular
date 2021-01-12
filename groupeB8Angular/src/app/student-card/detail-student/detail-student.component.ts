import { Component, OnInit } from '@angular/core';
import {StudentToDisplay} from "../../models/StudentsToDisplay";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  students: StudentToDisplay;
  firstname: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>this.firstname=params.get('firstname')
    );
  }

}
