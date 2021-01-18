import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../repositories/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Cette classe à le role d'implémenter la sécurité des pages
  // Précise une ou plusieur conditions pour bloquer l'accès au page
  constructor(private router: Router,
    private authenticate: AuthenticateService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // récupère l'utilisateur
    const currentUser = this.authenticate.currentUserValue;
    if (currentUser) {
      // si connecté renvoie vrai => la guarde est levé dans ce cas
      return true;
    }
    // si pas connecté => retourne à la page de connexion
    this.router.navigate(["/auth", "signin"]);
    return false;
  }

}
