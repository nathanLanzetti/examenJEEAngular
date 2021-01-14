import { Injectable } from '@angular/core';
import { StudentToDisplay } from "../models/StudentsToDisplay";
import { Unit } from "../models/Unit";
import { Student, StudentToDB } from "../models/Student";

@Injectable({
  providedIn: 'root'
})
export class ListesEtudiantsService {
  resetData() {
    this.data = new Array();
    this.listUE = new Array();
    this.sections = new Array();
    this.studentList = new Array();
    this.studentResultList = new Array()
  }

  data: any[][][];
  sections: any[];
  studentList: StudentToDisplay[] = new Array();
  listUE: any[] = new Array();
  studentResultList: StudentToDB[] = new Array();

  constructor() {
    this.data = new Array();
    this.sections = new Array();
  }

  setData(data) {
    this.data = data;
    console.log(this.data);
  }

  addDataList(data) {
    this.data.push(data);
  }
}
