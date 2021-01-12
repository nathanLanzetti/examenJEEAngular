import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListesEtudiantsService {

  data: any[][][];


  constructor() {
    this.data = new Array();
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
