import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    let id_admin = localStorage.getItem("id");
    
    if ( id_admin == null) {
      this.router.navigateByUrl('login')
    }
    window.addEventListener("beforeunload", () => localStorage.clear());
  }

  async onClickProfile() {
    this.router.navigateByUrl('user/profile')
  }

  onClickLogout() {
    localStorage.removeItem("id");
    this.router.navigateByUrl('login')
  }

}
