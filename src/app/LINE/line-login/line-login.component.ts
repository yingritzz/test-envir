import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Login, LineLogin } from '../../models/admin';
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';
import liff from '@line/liff';

@Component({
  selector: 'app-line-login',
  templateUrl: './line-login.component.html',
  styleUrls: ['./line-login.component.css']
})
export class LineLoginComponent implements OnInit {

  login_data: Login;
  line: LineLogin;

  id: any;


  constructor(
    public router: Router,
    public apiService: ApiService,
    private _location: Location,
    private _Activatedroute: ActivatedRoute
  ) {
    this.login_data = new Login();
    this.line = new LineLogin();
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    console.log(this.id)

    // liff.ready.then(async () => {
    //   if (liff.isLoggedIn()) {
    //     const profile = await liff.getProfile();
    //     this.line.line_id = profile.userId;
    //   }
    //   else {
    //     liff.login()
    //   }
    // })
    // liff.init({ liffId: '1655682941-n3bkLoQv' });
  }

  async submit_login() {
    // this.apiService.login(this.login_data).then((res: any) => {
    //   this.apiService.addAdminLine(this.login_data).then((res: any) => {
    //     this._location.back();
    //   });
    //   // this._location.back();
    // },
    //   (err: any) => {
    //     console.log(err);
    //     Swal.fire("Login ไม่สำเร็จ", "กรุณาตรวจสอบ username หรือ password ให้ถูกต้อง", "error");
    //   });
  }

}
