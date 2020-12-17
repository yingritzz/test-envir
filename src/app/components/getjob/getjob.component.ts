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
  add:any
  selectedGroup: any;
getVal() {
    // console.log(this.selectedGroup); // returns selected object
    console.log(this.selectedGroup.name); // returns selected option's id
    if(this.selectedGroup == 'เพิ่มอุปกรณ์ใหม่'){
    console.log("สวัสดี"); // returns selected option's name
    }
}
myFunction() {
  console.log("สวัสดี");
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
