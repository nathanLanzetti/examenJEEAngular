import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faUserGraduate, faSignOutAlt, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/repositories/authenticate.service';

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
  currentUser: User;

  constructor(private router: Router, private authService: AuthenticateService) { }

  ngOnInit(): void {
    // vérifie si l'utilisateur est connecté
    // s'il ne l'est pas, la barre de navigation est "caché"
    this.authService.currentUserSub.subscribe(x => this.currentUser = x);
  }

  logOut() {
    console.log("Logging Out...");
    this.authService.logout();
    // Redirige l'utilisateur vers la page de connexion
    this.router.navigate(["/auth", "signin"]);
  }

}
