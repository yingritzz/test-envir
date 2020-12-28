import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-maintenanc',
  templateUrl: './line-maintenanc.component.html',
  styleUrls: ['./line-maintenanc.component.css']
})
export class LineMaintenancComponent implements OnInit {

maintenanc: any = [["Envir Service", "Thermo PM 2.5", "อยู่ระหว่างบำรุงรักษา"], ["Envir Ser2", "สาย Thermo PM 2.5", "ส่งคืนลูกค้า"]]
  constructor() { }

  ngOnInit(): void {
  }

}
