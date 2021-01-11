import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListesEtudiantsService {

  data: [][];

  constructor() { }

  setData(data)
  {
    this.data = data;
    console.log(this.data);
  }
}
