import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models/User";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  // SUbject est un observable. Les component peuvent l'observer
  // pour savoir si un utilisateur est connecté
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserSub(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }

  login(login: string, password: string) {
    return this.http.post<any>("api/user/auth", { login, password })
      .pipe(map(user => {
        // enregistre l'utilisateur dans le localStorage du navigateur
        localStorage.setItem('currentUser', JSON.stringify(user));
        // l'observable renvoie un utilisateur
        // les components qui observent celui-ci seront notifiés
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // efface l'utilisateur du local storage
    localStorage.removeItem("currentUser");
    // renvoie null a tous les component abonnés au subject
    this.currentUserSubject.next(null);
  }
}
