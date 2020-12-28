import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-maintenanc',
  templateUrl: './line-maintenanc.component.html',
  styleUrls: ['./line-maintenanc.component.css']
})
export class LineMaintenancComponent implements OnInit {

maintenanc: any = [["200DA200310704", "Thermo PM 2.5", "1", "ว่าง 1"], ["xxxxxxxxxxxxxx", "สาย Thermo PM 2.5", "5", "ว่าง 3"]]
  constructor() { }

  ngOnInit(): void {
  }

}
