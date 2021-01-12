import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../repositories/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authenticate: AuthenticateService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticate.currentUserValue;
    if (currentUser) {
      // logged in so true
      return true;
    }
    // isn't logged in => go back to signin page
    this.router.navigate(["/auth", "signin"]);
    return false;
  }

}
