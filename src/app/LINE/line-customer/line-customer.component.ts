import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-customer',
  templateUrl: './line-customer.component.html',
  styleUrls: ['./line-customer.component.css']
})
export class LineCustomerComponent implements OnInit {

  isDisplay = false;
  isDisplay2 = true;

  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
    this.isDisplay2 = !this.isDisplay2;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
