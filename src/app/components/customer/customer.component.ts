import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
  }
  async onClickHome() {
    this.route.navigateByUrl('home')
  }
}
