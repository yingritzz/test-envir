import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-eq-detail',
  templateUrl: './eq-detail.component.html',
  styleUrls: ['./eq-detail.component.css']
})
export class EqDetailComponent implements OnInit {

  eq_name: any = "Thermo PM 2.5"
  constructor(public route: Router) { }

  ngOnInit(): void {
  }

  async onClickHome() {
    this.route.navigateByUrl('home')
  }

  onClickEquipment() {
    this.route.navigateByUrl('equipment')
  }

}
