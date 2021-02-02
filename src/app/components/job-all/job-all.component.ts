import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-job-all',
  templateUrl: './job-all.component.html',
  styleUrls: ['./job-all.component.css']
})
export class JobAllComponent implements OnInit {

  jobAll: any;
  id!: number;

  page = 1;
  count = 0;
  tableSize = 30;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getJobAll();
  }

  getJobAll() {
    this.apiService.getEmAll().then((res: any) => {
      this.getData(res);
    });
  }

  getData(data: any) {
    this.jobAll = data;
    console.log(this.jobAll)
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getJobAll();
  } 

}
