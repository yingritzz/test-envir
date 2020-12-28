import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-testing',
  templateUrl: './line-testing.component.html',
  styleUrls: ['./line-testing.component.css']
})
export class LineTestingComponent implements OnInit {

  maintenanc: any = [["Envir Service", "Thermo PM 2.5", "อยู่ระหว่างทดสอบ"], ["Envir Ser2", "สาย Thermo PM 2.5", "ส่งให้ลูกค้า"]]

  constructor() { }

  ngOnInit(): void {
  }

}
