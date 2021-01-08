import { Component, OnInit } from '@angular/core';
import { faCoffee, faUserGraduate, faSignOutAlt, faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  faFileExcel = faFileExcel;
  faUserGraduate = faUserGraduate;
  faSignOutAlt = faSignOutAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
