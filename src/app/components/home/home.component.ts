import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countRepair:any = 5555
  countRent:any = 5432
  countTest:any = 5678
  countBuy:any = 5210
  constructor() { }

  ngOnInit(): void {
  }

}
