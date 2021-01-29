import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  admin: any = [];
  id_admin: any;

  constructor(
    public router: Router,
    public apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.id_admin = localStorage.getItem("id");
    if ( this.id_admin == null) {
      this.router.navigateByUrl('login')
    }

    //window.addEventListener("beforeunload", () => localStorage.removeItem('id'));
    this.getprofile();
  }

  getprofile(){
    this.apiService.adminProfile(this.id_admin).then((res: any) => {
      this.admin = res[0];
    });
  }

  async onClickProfile() {
    this.router.navigateByUrl('user/profile')
  }

  onClickLogout() {
    // localStorage.removeItem("id");
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

}
