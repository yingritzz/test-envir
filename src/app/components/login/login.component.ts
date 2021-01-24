import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/admin';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_data: Login;

  constructor(
    public router: Router,
    public apiService: ApiService
    ) { 
      this.login_data = new Login();
    }

  ngOnInit(): void {
  }

  async submit_login() {
    // if (this.mUsername == "kiki@lala.com" && this.mPassword == "1234") {
    //   this.route.navigateByUrl('home')
    // } else {
    //   window.alert("Login Failed");
    // }
    // this.router.navigateByUrl('home')
    
    this.apiService.login(this.login_data).then((res: any) => {
      console.log(res);
      this.router.navigateByUrl('home')
    },
    (err: any) => {
      console.log(err);
      window.alert("กรุณาตรวจสอบ username หรือ password ให้ถูกต้อง");
    });
  }

}
