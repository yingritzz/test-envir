import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  groups = [{
      "name": "CO2NO2"
  },
  {
      "name": "NO2"
  },
  {
      "name": "NOx"
  }];
}
