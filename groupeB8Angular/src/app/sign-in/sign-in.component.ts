import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  connected : boolean[] = [true,true];
  color : string = 'black';
  form : FormGroup = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  connection() {
    console.log(this.form.value);
    const password = this.form.value['password'];
    console.log(password);
    const email = this.form.value['email'];
    if(password == "helha"){
      if(this.form.controls['email'].valid)
      {
        alert("Vous êtes connecté");
      }
      else this.connected[1] = false;
    }
    else{
      if(this.form.controls['email'].invalid)
      {
       this.connected[1] = false;
      }
      alert("Vous n'êtes pas connecté");
      this.getColor();
      this.connected[0] = false;
    }

  }

  getColor() {
    this.color = 'red';
  }
}
