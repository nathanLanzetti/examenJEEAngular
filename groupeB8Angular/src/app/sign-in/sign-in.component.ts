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
  submitted = false;
  error = false;
  errorMessage: String;
  color: string = 'black';
  signinForm: FormGroup;
  colorEmail: string = 'black';
  colorPassword: string = "black";
  loading = false;

  constructor(private formbuilder: FormBuilder, private authenticateService: AuthenticateService, private router: Router) {
    if (this.authenticateService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signinForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    console.log(this.signinForm.value);
    const password = this.signinForm.value['password'];
    console.log(password);
    const login = this.signinForm.value['email'];
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
          this.signinForm.reset();
          this.getColor()
        }
      );

  }

  getColor() {
    this.colorEmail = this.colorPassword = this.color = 'red';
  }

  isValidInput(fieldName): boolean {
    return this.signinForm.controls[fieldName].invalid &&
      (this.signinForm.controls[fieldName].dirty || this.signinForm.controls[fieldName].touched);
  }
}
