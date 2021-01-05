import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  status = "อยู่ระหว่างการเช่า - ยืม"
  constructor() { }

  ngOnInit(): void {
  }

}
