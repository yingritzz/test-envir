import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/admin';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

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
    this.apiService.login(this.login_data).then((res: any) => {
      //console.log(res);
      this.router.navigateByUrl('home')
      localStorage.setItem("id", res[0].id);
    },
      (err: any) => {
        console.log(err);
        window.alert("กรุณาตรวจสอบ username หรือ password ให้ถูกต้อง");
        Swal.fire("Login ไม่สำเร็จ", "กรุณาตรวจสอบ username หรือ password ให้ถูกต้อง", "error");
      });
  }

}
