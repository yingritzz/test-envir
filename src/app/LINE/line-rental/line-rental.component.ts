import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-rental',
  templateUrl: './line-rental.component.html',
  styleUrls: ['./line-rental.component.css']
})
export class LineRentalComponent implements OnInit {

  maintenanc: any = [["Envir Service", "Thermo PM 2.5", "อยู่ระหว่างการเช่า-ยืม"], ["Envir Ser2", "สาย Thermo PM 2.5", "ส่งให้ลูกค้า"]]

  constructor() { }

  ngOnInit(): void {
  }

}
