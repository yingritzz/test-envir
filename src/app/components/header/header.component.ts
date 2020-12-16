import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  async onClickProfile() {
    this.route.navigateByUrl('user/profile')
  }

}
