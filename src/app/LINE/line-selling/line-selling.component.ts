import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-selling',
  templateUrl: './line-selling.component.html',
  styleUrls: ['./line-selling.component.css']
})
export class LineSellingComponent implements OnInit {

  maintenanc: any = [["Envir Service", "Thermo PM 2.5", "จำหน่ายแล้ว"], ["Envir Ser2", "สาย Thermo PM 2.5", "ส่งให้ลูกค้า"]]

  constructor() { }

  ngOnInit(): void {
  }

}
