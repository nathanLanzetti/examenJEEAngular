import { Injectable } from '@angular/core';
import {StudentToDisplay} from "../models/StudentsToDisplay";
import {Unit} from "../models/Unit";

@Injectable({
  providedIn: 'root'
})
export class ListesEtudiantsService {

  data: any[][][];
  sections : any[];
  studentList : StudentToDisplay[] = new Array();
  listUE : Unit[] = new Array();
  constructor() {
    this.data = new Array();
    this.sections = new Array();
  }

  setData(data) {
    this.data = data;
    console.log(this.data);
  }

  addDataList(data){
    this.data.push(data);
    console.log(this.data);
  }
}
