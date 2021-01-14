import { Component, OnInit } from '@angular/core';
import { Unit } from '../../models/Unit';
import { ListesEtudiantsService } from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-change-ue',
  templateUrl: './change-ue.component.html',
  styleUrls: ['./change-ue.component.css']
})
export class ChangeUEComponent implements OnInit {

  ue: Unit;
  //listUE: Unit[] = new Array();
  title: string = "Gestion 1 ";

  constructor(private liste: ListesEtudiantsService) { }

  ngOnInit(): void {
    this.updateChange();
  }

  updateChange() {
    //var title: string[] = this
    this.liste.listUE.forEach(ueselect => {
      if (ueselect.title == this.title) {
        this.ue = ueselect;
        console.log(this.title);
      }
      console.log(ueselect);
    });
    return this.ue;
  }

}

