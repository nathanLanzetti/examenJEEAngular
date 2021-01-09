import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    // check if user is connected
    // if not, dont show nav-links
  }

  logOut() {
    console.log("Logging Out...");

  }

}
