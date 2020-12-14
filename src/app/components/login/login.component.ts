import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mUsername: String = "";
  mPassword: String = "";

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  async submit_login() {
    if (this.mUsername == "kiki@lala.com" && this.mPassword == "1234") {
      this.route.navigateByUrl('home')
    } else {
      window.alert("Login Failed");
    }
  }

}
