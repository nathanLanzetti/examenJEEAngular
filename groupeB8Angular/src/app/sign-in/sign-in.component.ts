import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserCredentials } from '../models/UserCredentials';
import { AuthenticateService } from '../repositories/authenticate.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  connected: boolean[] = [true, true];
  color: string = 'black';
  form: FormGroup = this.formbuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required]
  });
  colorEmail: string = 'black';
  colorPassword: string = "black";
  loading = false;
  submitted = false;

  constructor(private formbuilder: FormBuilder, private authenticateService: AuthenticateService, private router: Router) {
    if (this.authenticateService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  connection() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.form.value);
    const password = this.form.value['password'];
    console.log(password);
    const login = this.form.value['email'];
    //const credentials: UserCredentials = {login, password}

    this.authenticateService.login(login, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/"]);
          console.log(data);
          //this.error = false;
        }, error => {
          //this.error = true;
          this.form.reset();
          this.getColor()
        }
      );

  }

  getColor() {
    this.colorEmail = this.colorPassword = this.color = 'red';
  }

  isValidInput(fieldName): boolean {
    return this.form.controls[fieldName].invalid &&
      (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }
}
