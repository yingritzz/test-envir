import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }
  async onClickGetJob() {
    this.route.navigateByUrl('getjob')
  }
  async onClickMaintenanc() {
    this.route.navigateByUrl('maintenanc')
  }
  async onClickRetal() {
    this.route.navigateByUrl('rental')
  }
  async onClickSelling() {
    this.route.navigateByUrl('selling')
  }
  async onClickTesting() {
    this.route.navigateByUrl('testing')
  }

  onClickSetting() {
    this.route.navigateByUrl('setting')
  }

  onClickEquip() {
    this.route.navigateByUrl('equipment')
  }

}
