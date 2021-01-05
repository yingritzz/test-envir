import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cus-add',
  templateUrl: './cus-add.component.html',
  styleUrls: ['./cus-add.component.css']
})
export class CusAddComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  onClickBack() {
    this.location.back();
  }
}
